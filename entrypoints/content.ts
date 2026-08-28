import { browser } from 'wxt/browser';
import { captionToPlainText, parseCaption } from '../lib/caption-parser';
import { getSettings } from '../lib/storage';
import { DEFAULT_SETTINGS, SETTINGS_KEY, type CaptionSettings, type CueSegment } from '../lib/types';

const DOM_SELECTOR = [
  '.ytp-caption-segment',
  '.player-timedtext-text-container span',
  '.vp-captions span',
  '.video-js .vjs-text-track-display div',
  '[data-testid="video-caption"]',
  '[data-testid*="closed-caption" i]',
  '[aria-live="polite"][class*="caption" i]',
  '[aria-live="assertive"][class*="caption" i]'
].join(',');

type LastCue = { text: string; video?: HTMLVideoElement; startTime?: number };

export default defineContentScript({
  matches: ['http://*/*', 'https://*/*'],
  runAt: 'document_idle',
  async main() {
    let settings = await getSettings().catch(() => DEFAULT_SETTINGS);
    let lastCue: LastCue | undefined;
    let detected = 0;
    const tracked = new Map<TextTrack, { originalMode: TextTrackMode; listener: () => void }>();
    const watchedVideos = new WeakSet<HTMLVideoElement>();
    const changedDom = new Map<HTMLElement, string>();

    const host = document.createElement('div');
    host.id = 'caption-cues-overlay';
    host.style.cssText = 'position:fixed;inset:0;z-index:2147483646;pointer-events:none;display:none;';
    const shadow = host.attachShadow({ mode: 'open' });
    shadow.innerHTML = `<style>
      :host{all:initial}.wrap{position:fixed;display:flex;justify-content:center;pointer-events:none;padding:0 16px;box-sizing:border-box}
      .line{max-width:920px;text-align:center;font:700 var(--cc-size,26px)/1.38 Arial,sans-serif;letter-spacing:.01em;background:#fff9ed;color:#171612;border:2px solid #171612;padding:10px 14px;box-shadow:5px 5px 0 #1546c7;text-wrap:balance;animation:cc-in 180ms ease-out}
      .line[data-theme="ink"]{background:#171612;color:#fff9ed;border-color:#fff9ed;box-shadow:5px 5px 0 #ef6a32}
      .cc-name,.cc-manual{font-weight:900;text-decoration:underline;text-decoration-thickness:.14em;text-underline-offset:.12em;text-decoration-color:#2a5ee5}
      .cc-speaker{font-weight:900;background:#1546c7;color:#fff;padding:.08em .24em;text-transform:uppercase}
      .cc-sound{font-weight:900;background:#c43b12;color:#fff;padding:.08em .3em;border-radius:2px}
      .notice{position:fixed;left:50%;bottom:24px;transform:translateX(-50%);background:#171612;color:#fff9ed;padding:8px 12px;font:700 14px Arial,sans-serif}
      @keyframes cc-in{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
      @media(prefers-reduced-motion:reduce){.line{animation:none}}
    </style><div class="wrap"><div class="line" role="region" aria-label="Enhanced captions"></div></div><div class="notice" role="status" aria-live="polite" hidden></div>`;
    const wrap = shadow.querySelector<HTMLElement>('.wrap')!;
    const line = shadow.querySelector<HTMLElement>('.line')!;
    const notice = shadow.querySelector<HTMLElement>('.notice')!;
    (document.body || document.documentElement).append(host);

    const markerStyle = document.createElement('style');
    markerStyle.id = 'caption-cues-page-style';
    markerStyle.textContent = `
      .caption-cues-mark{font-weight:900!important;text-decoration:underline!important;text-decoration-thickness:.14em!important;text-underline-offset:.12em!important;text-decoration-color:#4f7cff!important}
      .caption-cues-speaker{font-weight:900!important;background:#1546c7!important;color:#fff!important;padding:.06em .22em!important}
      .caption-cues-sound{font-weight:900!important;background:#c43b12!important;color:#fff!important;padding:.06em .22em!important;border-radius:2px!important}
    `;
    document.documentElement.append(markerStyle);

    function appendSegments(target: HTMLElement, segments: CueSegment[], page = false) {
      target.replaceChildren();
      for (const segment of segments) {
        if (segment.kind === 'plain') target.append(document.createTextNode(segment.text));
        else {
          const mark = document.createElement('span');
          mark.className = page
            ? segment.kind === 'speaker' ? 'caption-cues-speaker' : segment.kind === 'sound' ? 'caption-cues-sound' : 'caption-cues-mark'
            : `cc-${segment.kind}`;
          mark.textContent = segment.text;
          target.append(mark);
        }
      }
    }

    function positionFor(video?: HTMLVideoElement) {
      if (!video) {
        wrap.style.left = '0';
        wrap.style.width = '100vw';
        wrap.style.top = 'calc(100vh - 150px)';
        return;
      }
      const rect = video.getBoundingClientRect();
      wrap.style.left = `${Math.max(0, rect.left)}px`;
      wrap.style.width = `${Math.max(240, rect.width)}px`;
      wrap.style.top = `${Math.max(rect.top + 12, rect.bottom - Math.max(86, rect.height * .2))}px`;
    }

    function showCaption(text: string, cue: LastCue, temporary = false) {
      if (!settings.enabled || !text.trim()) return;
      lastCue = cue;
      appendSegments(line, parseCaption(text, settings));
      line.dataset.theme = settings.theme;
      line.style.setProperty('--cc-size', `${settings.captionSize}px`);
      positionFor(cue.video);
      host.style.display = 'block';
      if (temporary) window.setTimeout(() => { if (lastCue === cue) host.style.display = 'none'; }, 3500);
    }

    function cueChange(track: TextTrack, video: HTMLVideoElement) {
      const active = Array.from(track.activeCues ?? []) as VTTCue[];
      const cues = active.length ? active : (Array.from(track.cues ?? []) as VTTCue[]).filter((cue) => cue.startTime <= video.currentTime && cue.endTime >= video.currentTime);
      if (!cues.length) { host.style.display = 'none'; return; }
      const text = cues.map((cue) => captionToPlainText(cue.text)).join(' ');
      const startTime = Math.min(...cues.map((cue) => cue.startTime));
      detected += 1;
      showCaption(text, { text, video, startTime });
    }

    function scanTracks() {
      if (!settings.enabled) return;
      for (const video of document.querySelectorAll('video')) {
        if (!watchedVideos.has(video)) {
          watchedVideos.add(video);
          video.textTracks.addEventListener('change', scanTracks);
          video.textTracks.addEventListener('addtrack', scanTracks);
        }
        for (const track of Array.from(video.textTracks)) {
          if (tracked.has(track) || !['captions', 'subtitles'].includes(track.kind) || track.mode !== 'showing') continue;
          const listener = () => cueChange(track, video);
          tracked.set(track, { originalMode: track.mode, listener });
          track.addEventListener('cuechange', listener);
          track.mode = 'hidden';
          cueChange(track, video);
        }
      }
    }

    function isLikelyCaption(element: HTMLElement) {
      if (element.closest('#caption-cues-overlay') || element.querySelector('video')) return false;
      const text = element.textContent?.replace(/\s+/g, ' ').trim() ?? '';
      if (text.length < 2 || text.length > 240) return false;
      const nested = Array.from(element.children).some((child) => child.matches(DOM_SELECTOR));
      return !nested && element.getClientRects().length > 0;
    }

    function scanDom(root: ParentNode = document) {
      if (!settings.enabled) return;
      const nodes: HTMLElement[] = [];
      if (root instanceof HTMLElement && root.matches(DOM_SELECTOR)) nodes.push(root);
      nodes.push(...root.querySelectorAll<HTMLElement>(DOM_SELECTOR));
      for (const node of nodes) {
        if (!isLikelyCaption(node)) continue;
        const text = node.textContent?.replace(/\s+/g, ' ').trim() ?? '';
        if (node.dataset.captionCuesSource === text) continue;
        node.dataset.captionCuesSource = text;
        node.setAttribute('aria-label', text);
        changedDom.set(node, text);
        appendSegments(node, parseCaption(text, settings), true);
        lastCue = { text };
        detected += 1;
      }
    }

    function restore() {
      host.style.display = 'none';
      for (const [track, record] of tracked) {
        track.removeEventListener('cuechange', record.listener);
        track.mode = record.originalMode;
      }
      tracked.clear();
      for (const [node, text] of changedDom) {
        if (node.isConnected) {
          node.textContent = text;
          node.removeAttribute('data-caption-cues-source');
          node.removeAttribute('aria-label');
        }
      }
      changedDom.clear();
    }

    async function replayLast() {
      if (!lastCue) return { ok: false, reason: 'No caption has been detected on this page yet.' };
      if (lastCue.video && lastCue.startTime !== undefined) {
        lastCue.video.currentTime = Math.max(0, lastCue.startTime - .2);
        await lastCue.video.play().catch(() => undefined);
      } else showCaption(lastCue.text, lastCue, true);
      notice.textContent = 'Last caption replayed';
      notice.hidden = false;
      window.setTimeout(() => { notice.hidden = true; }, 1800);
      return { ok: true };
    }

    const observer = new MutationObserver((mutations) => {
      scanTracks();
      for (const mutation of mutations) {
        const target = mutation.target instanceof HTMLElement ? mutation.target : mutation.target.parentElement;
        if (target?.closest('#caption-cues-overlay')) continue;
        if (target?.matches(DOM_SELECTOR)) scanDom(target.parentElement ?? document);
        for (const added of mutation.addedNodes) if (added instanceof HTMLElement) scanDom(added);
      }
    });
    observer.observe(document.documentElement, { subtree: true, childList: true, characterData: true });
    scanTracks();
    scanDom();

    window.addEventListener('resize', () => positionFor(lastCue?.video), { passive: true });
    window.addEventListener('scroll', () => positionFor(lastCue?.video), { passive: true });
    document.addEventListener('fullscreenchange', () => positionFor(lastCue?.video));
    document.addEventListener('keydown', (event) => {
      if (event.altKey && event.key.toLowerCase() === 'r' && !(event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement)) {
        event.preventDefault();
        void replayLast();
      }
    });

    chrome.runtime.onMessage.addListener((message: unknown, _sender, sendResponse) => {
      const type = (message as { type?: string }).type;
      if (type === 'REPLAY_LAST') {
        void replayLast().then(sendResponse);
        return true;
      }
      if (type === 'GET_STATUS') {
        sendResponse({
          enabled: settings.enabled,
          detected,
          hasLastCue: Boolean(lastCue),
          sourceState: detected > 0 ? 'detected' : 'waiting'
        });
      }
    });
    browser.storage.onChanged.addListener((changes, area) => {
      if (area !== 'local' || !changes[SETTINGS_KEY]) return;
      settings = { ...DEFAULT_SETTINGS, ...(changes[SETTINGS_KEY].newValue as Partial<CaptionSettings>) };
      restore();
      if (settings.enabled) { scanTracks(); scanDom(); }
    });
  }
});

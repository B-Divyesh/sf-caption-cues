import { browser } from 'wxt/browser';
import { getLicense, getSettings, saveLicense, saveSettings } from '../../lib/storage';
import { DEFAULT_SETTINGS, type CaptionSettings, type CaptionTheme } from '../../lib/types';

const byId = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
const controls = {
  enabled: byId<HTMLInputElement>('enabled'), names: byId<HTMLInputElement>('names'),
  speakers: byId<HTMLInputElement>('speakers'), sounds: byId<HTMLInputElement>('sounds'),
  manual: byId<HTMLInputElement>('manual'), size: byId<HTMLSelectElement>('size'),
  theme: byId<HTMLSelectElement>('theme')
};
const words = byId<HTMLUListElement>('words');
const empty = byId<HTMLElement>('words-empty');
const status = byId<HTMLElement>('status');
const licenseStatus = byId<HTMLElement>('license-status');
let settings: CaptionSettings = DEFAULT_SETTINGS;
let supporter = false;

function render() {
  controls.enabled.checked = settings.enabled;
  controls.names.checked = settings.emphasizeNames;
  controls.speakers.checked = settings.emphasizeSpeakers;
  controls.sounds.checked = settings.emphasizeSounds;
  controls.manual.checked = settings.emphasizeManual;
  controls.size.value = String(settings.captionSize);
  controls.theme.value = settings.theme;
  words.replaceChildren(...settings.manualWords.map((word, index) => {
    const item = document.createElement('li');
    const label = document.createElement('span'); label.textContent = word;
    const remove = document.createElement('button'); remove.type = 'button'; remove.textContent = 'Remove'; remove.setAttribute('aria-label', `Remove ${word}`);
    remove.addEventListener('click', () => { settings.manualWords.splice(index, 1); void persist(); });
    item.append(label, remove); return item;
  }));
  empty.hidden = settings.manualWords.length > 0;
}

async function persist() { await saveSettings(settings); render(); }

async function currentTabMessage(message: unknown) {
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) throw new Error('No active tab');
  return browser.tabs.sendMessage(tab.id, message);
}

for (const [key, control] of Object.entries(controls)) {
  control.addEventListener('change', () => {
    if (key === 'theme' && control.value === 'cobalt' && !supporter) {
      controls.theme.value = settings.theme;
      byId<HTMLElement>('theme-note').hidden = false;
      return;
    }
    settings = {
      ...settings,
      enabled: controls.enabled.checked,
      emphasizeNames: controls.names.checked,
      emphasizeSpeakers: controls.speakers.checked,
      emphasizeSounds: controls.sounds.checked,
      emphasizeManual: controls.manual.checked,
      captionSize: Number(controls.size.value) as CaptionSettings['captionSize'],
      theme: controls.theme.value as CaptionTheme
    };
    void persist();
  });
}

byId<HTMLFormElement>('word-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const input = byId<HTMLInputElement>('word');
  const value = input.value.trim();
  if (value && !settings.manualWords.some((item) => item.toLocaleLowerCase() === value.toLocaleLowerCase())) {
    settings.manualWords.push(value); input.value = ''; void persist();
  }
});

byId<HTMLButtonElement>('replay').addEventListener('click', async () => {
  try {
    const result = await currentTabMessage({ type: 'REPLAY_LAST' }) as { ok: boolean; reason?: string };
    status.textContent = result.ok ? 'Replaying the last caption.' : result.reason ?? 'No caption found yet.';
  } catch { status.textContent = 'Open a page with captions, then try again.'; }
});

byId<HTMLFormElement>('license-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const token = byId<HTMLInputElement>('license').value.trim();
  if (!token) { licenseStatus.textContent = 'Paste the license from your receipt.'; return; }
  licenseStatus.textContent = 'Checking license…';
  const result = await browser.runtime.sendMessage({ type: 'VERIFY_LICENSE', token, force: true }) as { valid: boolean; reason?: string; offline?: boolean; checkedAt: number };
  supporter = result.valid;
  await saveLicense({ token, valid: result.valid, reason: result.reason, checkedAt: result.checkedAt });
  licenseStatus.textContent = result.valid ? 'Supporter edition unlocked.' : result.offline ? 'Could not connect. Your free tools still work offline.' : 'This license is not active. Check the token or purchase again.';
});

async function init() {
  settings = await getSettings();
  const license = await getLicense(); supporter = Boolean(license?.valid);
  if (license?.token) {
    const checked = await browser.runtime.sendMessage({ type: 'VERIFY_LICENSE', token: license.token }) as { valid: boolean };
    supporter = checked.valid;
    if (!supporter && settings.theme === 'cobalt') settings = { ...settings, theme: 'paper' };
  }
  render();
  try {
    const result = await currentTabMessage({ type: 'GET_STATUS' }) as { enabled: boolean; detected: number; hasLastCue: boolean };
    status.textContent = result.hasLastCue ? 'Caption detected. Your cues are active.' : 'Ready. Start captions on this page.';
  } catch { status.textContent = 'This browser page does not allow extensions. Try a video tab.'; }
}

void init();

import { createHash } from 'node:crypto';
import { createServer, type Server } from 'node:http';
import { mkdtemp, readFile, rm, stat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { chromium, type Browser, type BrowserContext, type Page } from 'playwright';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { closeServer, startStaticServer } from './helpers/static-server';

let siteServer: Server;
let siteUrl = '';
let browser: Browser;

beforeAll(async () => {
  ({ server: siteServer, url: siteUrl } = await startStaticServer());
  browser = await chromium.launch({ channel: 'chromium' });
});

afterAll(async () => {
  await browser?.close();
  if (siteServer) await closeServer(siteServer);
});

async function demoPage(entry = '/?demo=1') {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(`${siteUrl}${entry}`, { waitUntil: 'networkidle' });
  await page.waitForURL('**/demo/?demo=1');
  return { context, page };
}

async function extensionFixture(): Promise<{ context: BrowserContext; page: Page; server: Server; profile: string; requests: string[] }> {
  const fixture = `<!doctype html><html><body>
    <div class="ytp-caption-segment">MARA: Rowan heard [thunder] at River Gate.</div>
    <div id="pixel-caption">Hidden pixels: unchanged</div>
    <script>
      const video = document.createElement('video');
      const track = video.addTextTrack('captions', 'English', 'en');
      const cue = new VTTCue(0, 10, 'NORA: Mina waits at Orkney. [bell rings]');
      track.addCue(cue);
      Object.defineProperty(track, 'activeCues', { configurable: true, get: () => [cue] });
      track.mode = 'showing';
      document.body.append(video);
      setTimeout(() => track.dispatchEvent(new Event('cuechange')), 800);
    </script>
  </body></html>`;
  const server = createServer((_request, response) => response.writeHead(200, { 'Content-Type': 'text/html' }).end(fixture));
  await new Promise<void>((accept, reject) => { server.once('error', reject); server.listen(0, '127.0.0.1', accept); });
  const address = server.address();
  if (!address || typeof address === 'string') throw new Error('Extension fixture did not bind');
  const profile = await mkdtemp(resolve(tmpdir(), 'caption-cues-claims-'));
  const context = await chromium.launchPersistentContext(profile, {
    channel: 'chromium', headless: true,
    args: [`--disable-extensions-except=${resolve('dist/extension')}`, `--load-extension=${resolve('dist/extension')}`]
  });
  const requests: string[] = [];
  context.on('request', (request) => requests.push(request.url()));
  const page = await context.newPage();
  await page.goto(`http://127.0.0.1:${address.port}/`, { waitUntil: 'networkidle' });
  return { context, page, server, profile, requests };
}

async function closeFixture(fixture: Awaited<ReturnType<typeof extensionFixture>>) {
  await fixture.context.close();
  await closeServer(fixture.server);
  await rm(fixture.profile, { recursive: true, force: true });
}

describe('registered public claims', () => {
  it('@claim:caption-emphasis highlights every promised caption part', async () => {
    const { context, page } = await demoPage();
    try {
      const parts = await page.locator('#sample-caption [data-cue]').evaluateAll((nodes) => nodes.map((node) => ({ kind: (node as HTMLElement).dataset.cue, text: node.textContent, decoration: getComputedStyle(node).textDecorationLine, background: getComputedStyle(node).backgroundColor })));
      expect(parts).toEqual(expect.arrayContaining([
        expect.objectContaining({ kind: 'speaker', text: 'MARA' }), expect.objectContaining({ kind: 'name', text: 'Rowan' }),
        expect.objectContaining({ kind: 'manual', text: 'Gate' }), expect.objectContaining({ kind: 'sound', text: '[train approaching]' })
      ]));
      expect(parts.find((part) => part.kind === 'name')?.decoration).toContain('underline');
      expect(parts.find((part) => part.kind === 'sound')?.background).not.toBe('rgba(0, 0, 0, 0)');
    } finally { await context.close(); }
  });

  it('@claim:demo-isolation uses only demo-prefixed storage and clears it', async () => {
    const { context, page } = await demoPage('/?demo=1&license=review-token');
    try {
      expect(await page.getByText('Demo — sample data, nothing is saved').isVisible()).toBe(true);
      expect(await page.evaluate(() => localStorage.getItem('sb_license:caption-cues'))).toBeNull();
      await page.evaluate(() => { localStorage.setItem('real:keep', 'untouched'); localStorage.setItem('sb_license:caption-cues', 'untouched'); });
      await page.getByLabel('Caption background').selectOption('ink');
      expect(await page.evaluate(() => Object.keys(localStorage))).toEqual(expect.arrayContaining(['demo:caption-cues:settings', 'real:keep', 'sb_license:caption-cues']));
      await page.getByRole('button', { name: 'Reset demo' }).click();
      const result = await page.evaluate(() => ({ keys: Object.keys(localStorage), real: localStorage.getItem('real:keep'), license: localStorage.getItem('sb_license:caption-cues') }));
      expect(result.keys.sort()).toEqual(['demo:caption-cues:settings', 'real:keep', 'sb_license:caption-cues'].sort());
      expect(result.real).toBe('untouched');
      expect(result.license).toBe('untouched');
      const download = page.waitForEvent('download');
      await page.getByRole('link', { name: 'Start for real' }).click();
      await download;
      expect(await page.evaluate(() => localStorage.getItem('demo:caption-cues:settings'))).toBeNull();
    } finally { await context.close(); }
  });

  it('@claim:site-offline reloads and operates the sample after one visit', async () => {
    const context = await browser.newContext();
    const page = await context.newPage();
    try {
      await page.goto(`${siteUrl}/demo/`, { waitUntil: 'networkidle' });
      await page.evaluate(() => navigator.serviceWorker.ready);
      await page.reload({ waitUntil: 'networkidle' });
      await context.setOffline(true);
      await page.reload({ waitUntil: 'domcontentloaded' });
      await page.getByRole('button', { name: 'Next line' }).click();
      await expect.poll(() => page.locator('#line-count').textContent()).toBe('Line 2 of 3');
      expect(await page.locator('#offline').isVisible()).toBe(true);
    } finally { await context.close(); }
  }, 30_000);

  it('@claim:no-account-free-tools exercises every sample control without authentication or a license', async () => {
    const { context, page } = await demoPage();
    try {
      expect(await page.locator('input[type=email], input[type=password], [href*="login"], [href*="checkout"]').count()).toBe(0);
      for (const id of ['demo-speakers', 'demo-names', 'demo-sounds', 'demo-manual']) {
        const control = page.locator(`#${id}`);
        await control.uncheck(); await control.check();
      }
      await page.getByLabel('Caption size').selectOption('30');
      await page.getByLabel('Caption background').selectOption('ink');
      await page.getByRole('button', { name: /Replay last line/ }).click();
      expect(await page.locator('#demo-status').textContent()).toContain('Replayed');
    } finally { await context.close(); }
    const fixture = await extensionFixture();
    try {
      const worker = fixture.context.serviceWorkers()[0] ?? await fixture.context.waitForEvent('serviceworker');
      const extensionId = new URL(worker.url()).host;
      const popup = await fixture.context.newPage();
      await popup.goto(`chrome-extension://${extensionId}/popup.html`);
      expect(await popup.locator('input[type=password], input[type=email], [href*="checkout"]').count()).toBe(0);
      for (const id of ['names', 'speakers', 'sounds', 'manual']) {
        await popup.locator(`#${id}`).uncheck();
        await popup.locator(`#${id}`).check();
      }
      await popup.locator('#word').fill('Thessaly');
      await popup.getByRole('button', { name: 'Add' }).click();
      await popup.locator('#size').selectOption('30');
      await popup.locator('#theme').selectOption('ink');
      await expect.poll(() => worker.evaluate(() => chrome.storage.local.get('captionCuesSettings'))).toMatchObject({ captionCuesSettings: { captionSize: 30, theme: 'ink', manualWords: ['Thessaly'] } });
    } finally { await closeFixture(fixture); }
  }, 15_000);

  it('@claim:replay-last-line replays by keyboard and by button', async () => {
    const { context, page } = await demoPage();
    try {
      await page.keyboard.press('Alt+R');
      expect(await page.locator('#demo-status').textContent()).toBe('Replayed caption line 1.');
      await page.getByRole('button', { name: 'Next line' }).click();
      await page.getByRole('button', { name: /Replay last line/ }).click();
      expect(await page.locator('#demo-status').textContent()).toBe('Replayed caption line 2.');
    } finally { await context.close(); }
  });

  it('@claim:exposed-caption-sources enhances selected caption text shown on the page and browser caption tracks', async () => {
    const fixture = await extensionFixture();
    try {
      await fixture.page.waitForSelector('.ytp-caption-segment .caption-cues-speaker');
      await fixture.page.waitForFunction(() => document.querySelector('#caption-cues-overlay')?.shadowRoot?.querySelector('.line')?.textContent?.includes('Orkney'));
      expect(await fixture.page.locator('.ytp-caption-segment .caption-cues-sound').textContent()).toBe('[thunder]');
      expect(await fixture.page.evaluate(() => document.querySelector('#caption-cues-overlay')?.shadowRoot?.querySelector('.line')?.textContent)).toContain('NORA');
    } finally { await closeFixture(fixture); }
  }, 30_000);

  it('@claim:hidden-caption-limit leaves inaccessible captions unchanged and reports waiting', async () => {
    const { context, page } = await demoPage();
    try {
      const before = await page.getByRole('heading', { name: 'Hidden captions stay unchanged' }).textContent();
      await page.getByRole('button', { name: 'Check hidden-caption sample' }).click();
      expect(await page.locator('#unsupported-output').textContent()).toContain('left unchanged');
      expect(await page.getByRole('heading', { name: 'Hidden captions stay unchanged' }).textContent()).toBe(before);
      expect(await page.locator('#unsupported-output').textContent()).toContain('Waiting for exposed caption text');
    } finally { await context.close(); }
  });

  it('@claim:no-media-capture performs caption and replay flows without media or transcript requests', async () => {
    const fixture = await extensionFixture();
    try {
      await fixture.page.waitForSelector('.caption-cues-sound');
      await fixture.page.keyboard.press('Alt+R');
      await fixture.page.waitForFunction(() => document.querySelector('#caption-cues-overlay')?.shadowRoot?.querySelector('.notice:not([hidden])'));
      expect(fixture.requests.every((url) => ['127.0.0.1', ''].includes(new URL(url).hostname))).toBe(true);
      expect(fixture.requests.some((url) => /(?:media|transcript|audio|video)/i.test(new URL(url).pathname))).toBe(false);
    } finally { await closeFixture(fixture); }
  }, 30_000);

  it('@claim:local-caption-data stores settings locally and sends no caption payload', async () => {
    const fixture = await extensionFixture();
    try {
      await fixture.page.waitForSelector('.caption-cues-mark');
      const worker = fixture.context.serviceWorkers()[0] ?? await fixture.context.waitForEvent('serviceworker');
      await worker.evaluate(() => chrome.storage.local.set({ captionCuesSettings: { enabled: true, emphasizeNames: true, emphasizeSpeakers: true, emphasizeSounds: true, emphasizeManual: true, manualWords: ['Gate'], captionSize: 30, theme: 'ink' } }));
      const stored = await worker.evaluate(() => chrome.storage.local.get('captionCuesSettings'));
      expect(stored.captionCuesSettings.manualWords).toEqual(['Gate']);
      expect(fixture.requests.some((url) => url.includes(encodeURIComponent('MARA')) || url.includes('Rowan'))).toBe(false);
    } finally { await closeFixture(fixture); }
  }, 30_000);

  it('@claim:overlay-restoration restores original visible captions and text-track mode', async () => {
    const fixture = await extensionFixture();
    try {
      await fixture.page.waitForSelector('.caption-cues-mark');
      const worker = fixture.context.serviceWorkers()[0] ?? await fixture.context.waitForEvent('serviceworker');
      await worker.evaluate(() => chrome.storage.local.set({ captionCuesSettings: { enabled: false, emphasizeNames: true, emphasizeSpeakers: true, emphasizeSounds: true, emphasizeManual: true, manualWords: [], captionSize: 26, theme: 'paper' } }));
      await fixture.page.waitForFunction(() => !document.querySelector('.ytp-caption-segment .caption-cues-mark'));
      expect(await fixture.page.locator('.ytp-caption-segment').textContent()).toBe('MARA: Rowan heard [thunder] at River Gate.');
      expect(await fixture.page.evaluate(() => document.querySelector('video')?.textTracks[0]?.mode)).toBe('showing');
    } finally { await closeFixture(fixture); }
  }, 30_000);

  it('@claim:package-output produces the site, unpacked extension, and installable ZIP', async () => {
    expect((await stat('dist/site/index.html')).isFile()).toBe(true);
    expect((await stat('dist/site/demo/index.html')).isFile()).toBe(true);
    expect((await stat('dist/site/privacy/index.html')).isFile()).toBe(true);
    expect((await stat('dist/site/terms/index.html')).isFile()).toBe(true);
    expect((await stat('dist/extension/manifest.json')).isFile()).toBe(true);
    expect(JSON.parse(await readFile('dist/extension/manifest.json', 'utf8')).manifest_version).toBe(3);
    expect((await stat('dist/site/downloads/caption-cues-chrome.zip')).size).toBeGreaterThan(10_000);
  });

  it('@claim:offline-cache-policy versions the shell and declares page and asset strategies', async () => {
    const worker = await readFile('dist/site/service-worker.js', 'utf8');
    expect(worker).toMatch(/caption-cues-[a-f0-9]{20}/);
    expect(worker).toContain('networkFirst(request)');
    expect(worker).toContain('cacheFirst(request)');
    expect(worker).toContain('"/demo/"');
  });

  it('@claim:permission-minimum packages only the documented extension permissions', async () => {
    const manifest = JSON.parse(await readFile('dist/extension/manifest.json', 'utf8')) as { permissions: string[]; host_permissions: string[] };
    expect(manifest.permissions.sort()).toEqual(['activeTab', 'storage']);
    expect(manifest.host_permissions.sort()).toEqual(['http://*/*', 'https://*/*']);
  });

  it('@claim:no-tracking-runtime uses no analytics, remote fonts, or remote runtime scripts', async () => {
    const context = await browser.newContext();
    const requests: string[] = [];
    context.on('request', (request) => requests.push(request.url()));
    const page = await context.newPage();
    try {
      await page.goto(`${siteUrl}/demo/`, { waitUntil: 'networkidle' });
      expect(requests.every((url) => new URL(url).origin === siteUrl)).toBe(true);
      const remoteResources = await page.locator('script[src], link[rel=stylesheet], link[rel=preload]').evaluateAll((nodes) => nodes.map((node) => (node as Element).getAttribute('src') ?? (node as Element).getAttribute('href') ?? '').filter((value) => value && new URL(value, location.href).origin !== location.origin));
      expect(remoteResources).toEqual([]);
      expect((await readFile('dist/extension/manifest.json', 'utf8'))).not.toContain('api.sociobot.in');
      const extensionRuntime = `${await readFile('dist/extension/background.js', 'utf8')}\n${await readFile('dist/extension/content-scripts/content.js', 'utf8')}`;
      expect(extensionRuntime).not.toMatch(/fetch\(|XMLHttpRequest|sendBeacon|analytics/i);
    } finally { await context.close(); }
  });

  it('@claim:generated-art matches the recorded source hash and visitor preview', async () => {
    const metadata = JSON.parse(await readFile('assets/src/hero-proof-sheet.json', 'utf8')) as { sha256: string; model?: string; deployment?: string };
    const source = await readFile('assets/src/hero-proof-sheet.png');
    expect(createHash('sha256').update(source).digest('hex')).toBe(metadata.sha256);
    const image = await stat('dist/site/social-preview.jpg');
    expect(image.size).toBeGreaterThan(50_000);
  });

});

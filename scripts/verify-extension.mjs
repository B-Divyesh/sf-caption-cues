import { createServer } from 'node:http';
import { access, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { chromium } from 'playwright';

const root = resolve(import.meta.dirname, '..');
const extension = resolve(root, 'dist/extension');
await access(resolve(extension, 'manifest.json'));
await access(resolve(root, 'dist/site/downloads/caption-cues-chrome.zip'));

const fixture = `<!doctype html><html><body><div class="ytp-caption-segment">MARA: Rowan heard [thunder] at River Gate.</div></body></html>`;
const server = createServer((_request, response) => response.writeHead(200, { 'Content-Type': 'text/html' }).end(fixture));
await new Promise((accept, reject) => {
  server.once('error', reject);
  server.listen(0, '127.0.0.1', accept);
});
const address = server.address();
if (!address || typeof address === 'string') throw new Error('Fixture server did not bind a TCP port');
const profile = await mkdtemp(resolve(tmpdir(), 'caption-cues-extension-'));
const context = await chromium.launchPersistentContext(profile, {
  channel: 'chromium',
  headless: true,
  args: [`--disable-extensions-except=${extension}`, `--load-extension=${extension}`]
});

try {
  const page = await context.newPage();
  await page.goto(`http://127.0.0.1:${address.port}`, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => document.querySelector('.ytp-caption-segment .caption-cues-speaker'));
  const caption = await page.locator('.ytp-caption-segment').innerText();
  if (!caption.includes('MARA:') || !caption.includes('Rowan') || !caption.includes('[thunder]')) throw new Error('Caption text was not preserved');
  const emphasis = await page.evaluate(() => ({
    speaker: Boolean(document.querySelector('.caption-cues-speaker')),
    name: Boolean(document.querySelector('.caption-cues-mark')),
    sound: Boolean(document.querySelector('.caption-cues-sound'))
  }));
  if (!emphasis.speaker || !emphasis.name || !emphasis.sound) throw new Error('Expected speaker, name, and sound emphasis');
  await page.keyboard.press('Alt+R');
  await page.waitForFunction(() => document.querySelector('#caption-cues-overlay')?.shadowRoot?.querySelector('.line')?.textContent?.includes('Rowan'));
  console.log('Extension caption/replay smoke: PASS');
} finally {
  await context.close();
  await new Promise((accept, reject) => server.close((error) => error ? reject(error) : accept()));
  await rm(profile, { recursive: true, force: true });
}

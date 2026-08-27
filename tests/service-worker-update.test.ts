import { createServer, type Server } from 'node:http';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { chromium } from 'playwright';
import { afterEach, describe, expect, it } from 'vitest';

const execFileAsync = promisify(execFile);
const generator = resolve('scripts/build-service-worker.mjs');
let fixtureRoot = '';
let server: Server | undefined;

async function makeRelease(directory: string, label: string) {
  await mkdir(directory, { recursive: true });
  await writeFile(resolve(directory, 'index.html'), `<!doctype html><title>${label}</title><h1>${label}</h1><script>navigator.serviceWorker.register('/service-worker.js')</script>`);
  await execFileAsync('node', [generator, directory]);
  return readFile(resolve(directory, 'service-worker.js'), 'utf8');
}

async function serve(getRoot: () => string) {
  const httpServer = createServer(async (request, response) => {
    const pathname = new URL(request.url ?? '/', 'http://localhost').pathname;
    const file = resolve(getRoot(), pathname === '/' ? 'index.html' : `.${pathname}`);
    if (!file.startsWith(`${getRoot()}/`)) { response.writeHead(400).end(); return; }
    try {
      const body = await readFile(file);
      response.writeHead(200, { 'Cache-Control': 'no-cache', 'Content-Type': pathname.endsWith('.js') ? 'text/javascript' : 'text/html' }).end(body);
    } catch { response.writeHead(404).end(); }
  });
  await new Promise<void>((accept, reject) => {
    httpServer.once('error', reject);
    httpServer.listen(0, '127.0.0.1', () => accept());
  });
  return httpServer;
}

afterEach(async () => {
  await new Promise<void>((accept, reject) => server ? server.close((error) => error ? reject(error) : accept()) : accept());
  server = undefined;
  if (fixtureRoot) await rm(fixtureRoot, { recursive: true, force: true });
  fixtureRoot = '';
});

describe('generated service worker release updates', () => {
  it('moves a controlled client from build A to build B and stays available offline', async () => {
    fixtureRoot = await mkdtemp(resolve(tmpdir(), 'caption-cues-pwa-'));
    const releaseA = resolve(fixtureRoot, 'a');
    const releaseB = resolve(fixtureRoot, 'b');
    const workerA = await makeRelease(releaseA, 'Release A');
    const workerB = await makeRelease(releaseB, 'Release B');
    const cacheA = /const CACHE = '([^']+)'/.exec(workerA)?.[1];
    const cacheB = /const CACHE = '([^']+)'/.exec(workerB)?.[1];
    expect(cacheA).toMatch(/^caption-cues-/);
    expect(cacheB).toMatch(/^caption-cues-/);
    expect(cacheB).not.toBe(cacheA);
    expect(workerB).toContain('networkFirst(request)');
    expect(workerB).toContain('self.skipWaiting()');
    expect(workerB).toContain('self.clients.claim()');

    let activeRelease = releaseA;
    server = await serve(() => activeRelease);
    const address = server.address();
    if (!address || typeof address === 'string') throw new Error('Test server has no TCP address');
    const baseUrl = `http://127.0.0.1:${address.port}`;
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    try {
      await page.goto(baseUrl, { waitUntil: 'networkidle' });
      await page.evaluate(() => navigator.serviceWorker.ready);
      await page.reload({ waitUntil: 'networkidle' });
      expect(await page.locator('h1').textContent()).toBe('Release A');

      activeRelease = releaseB;
      await page.evaluate(async () => {
        const registration = await navigator.serviceWorker.getRegistration();
        if (!registration) throw new Error('service worker was not registered');
        const changed = new Promise<void>((accept) => navigator.serviceWorker.addEventListener('controllerchange', () => accept(), { once: true }));
        await registration.update();
        await Promise.race([changed, new Promise<void>((accept) => setTimeout(accept, 3000))]);
      });
      await expect.poll(() => page.evaluate(() => caches.keys())).toContain(cacheB);
      await expect.poll(() => page.evaluate(() => caches.keys())).not.toContain(cacheA);
      await page.reload({ waitUntil: 'networkidle' });
      expect(await page.locator('h1').textContent()).toBe('Release B');

      await context.setOffline(true);
      await page.reload({ waitUntil: 'domcontentloaded' });
      expect(await page.locator('h1').textContent()).toBe('Release B');
    } finally {
      await browser.close();
    }
  }, 30_000);
});

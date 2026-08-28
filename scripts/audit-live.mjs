import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';

const baseUrl = new URL(process.argv[2] ?? 'https://caption-cues.sociobot.in/');
const evidenceDirectory = process.argv[3] ?? '.factory/evidence/polish-3-live-audit';
const expectedOrigin = baseUrl.origin;
const browser = await chromium.launch({ channel: 'chromium' });
const report = { baseUrl: expectedOrigin, routes: [], checks: {} };

await mkdir(evidenceDirectory, { recursive: true });

try {
  for (const route of ['/', '/demo/', '/privacy/', '/terms/', '/not-a-real-route']) {
    for (const viewport of [{ width: 390, height: 844 }, { width: 1440, height: 900 }]) {
      const context = await browser.newContext({ viewport });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', (error) => errors.push(error.message));
      page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
      const response = await page.goto(new URL(route, baseUrl).href, { waitUntil: 'networkidle' });
      const expectedStatus = route === '/not-a-real-route' ? 404 : 200;
      assert.equal(response?.status(), expectedStatus, `${route} should return ${expectedStatus}`);
      const serious = (await new AxeBuilder({ page }).analyze()).violations
        .filter((violation) => ['serious', 'critical'].includes(violation.impact ?? ''));
      const state = await page.evaluate(() => ({
        title: document.title,
        lang: document.documentElement.lang,
        h1: document.querySelectorAll('h1').length,
        main: document.querySelectorAll('main').length,
        overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
        build: document.querySelector('.build-note')?.textContent?.trim()
      }));
      assert.deepEqual(errors.filter((error) => !(route === '/not-a-real-route' && error.includes('404'))), []);
      assert.equal(serious.length, 0, `${route} has serious Axe findings`);
      assert.equal(state.lang, 'en');
      assert.equal(state.h1, 1);
      assert.equal(state.main, 1);
      assert.equal(state.overflow, false, `${route} overflows at ${viewport.width}px`);
      assert.equal(state.build, 'Built by Param Factory · Build 1.0.3-r3');
      if (route !== '/not-a-real-route') {
        assert.equal(await page.locator('link[rel="canonical"]').count(), 1);
        assert.equal(await page.locator('meta[property="og:image"]').getAttribute('content'), `${expectedOrigin}/social-preview.jpg`);
      } else {
        assert.equal(state.title, '404 — Caption Cues');
        assert.equal(await page.getByRole('link', { name: 'Return home' }).isVisible(), true);
      }
      if (viewport.width === 390) {
        const smallTargets = await page.locator('a, button, summary, label:has(input)').evaluateAll((nodes) => nodes.filter((node) => {
          const rect = node.getBoundingClientRect();
          const style = getComputedStyle(node);
          return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0 && (rect.width < 44 || rect.height < 44);
        }).map((node) => node.textContent?.trim().slice(0, 40)));
        assert.deepEqual(smallTargets, [], `${route} has small mobile targets`);
      }
      if (viewport.width === 1440 && route === '/privacy/') {
        await page.screenshot({ path: `${evidenceDirectory}/privacy-desktop.png`, fullPage: true });
      }
      if (viewport.width === 1440 && route === '/not-a-real-route') {
        await page.screenshot({ path: `${evidenceDirectory}/404-desktop.png`, fullPage: true });
      }
      report.routes.push({ route, viewport, status: response?.status(), title: state.title, seriousAxeFindings: serious.length });
      await context.close();
    }
  }

  const homeContext = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  const home = await homeContext.newPage();
  await home.goto(baseUrl.href, { waitUntil: 'networkidle' });
  assert.equal(await home.getByRole('heading', { level: 1 }).textContent(), 'Highlight the caption words you miss');
  assert.equal(await home.getByText('For viewers who follow captions but miss names, speaker labels, or sound cues.').isVisible(), true);
  const sampleBox = await home.getByRole('link', { name: /Try it with sample data/ }).boundingBox();
  assert.ok(sampleBox && sampleBox.y + sampleBox.height <= 844, 'sample action must be in the phone first screen');
  assert.equal(await home.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior), 'auto');
  await home.screenshot({ path: `${evidenceDirectory}/home-mobile.png`, fullPage: true });
  await Promise.all([home.waitForURL('**/privacy/'), home.getByRole('link', { name: 'Privacy' }).first().click()]);
  await assert.doesNotReject(async () => home.waitForFunction(() => document.activeElement?.tagName === 'H1'));
  await home.goBack({ waitUntil: 'networkidle' });
  await assert.doesNotReject(async () => home.waitForFunction(() => document.activeElement?.tagName === 'H1'));
  report.checks.firstScreenAndFocus = 'pass';
  await homeContext.close();

  const demoContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await demoContext.addInitScript(() => localStorage.setItem('real:keep', 'untouched'));
  const requests = [];
  demoContext.on('request', (request) => requests.push(request.url()));
  const demo = await demoContext.newPage();
  await demo.goto(`${expectedOrigin}/?demo=1&license=review-token`, { waitUntil: 'networkidle' });
  await demo.waitForURL('**/demo/?demo=1');
  assert.equal(await demo.getByText('Demo — sample data, nothing is saved').isVisible(), true);
  assert.equal(await demo.evaluate(() => localStorage.getItem('sb_license:caption-cues')), null);
  await demo.getByRole('button', { name: 'Next line' }).click();
  await demo.keyboard.press('Alt+R');
  assert.equal(await demo.locator('#demo-status').textContent(), 'Replayed caption line 2.');
  await demo.getByLabel('Caption background').selectOption('ink');
  await demo.getByRole('button', { name: 'Reset demo' }).click();
  assert.equal(await demo.locator('#line-count').textContent(), 'Line 1 of 3');
  assert.equal(await demo.evaluate(() => localStorage.getItem('real:keep')), 'untouched');
  assert.deepEqual(await demo.evaluate(() => Object.keys(localStorage).filter((key) => key !== 'real:keep')), ['demo:caption-cues:settings']);
  assert.equal(requests.every((request) => new URL(request).origin === expectedOrigin), true);
  await demo.screenshot({ path: `${evidenceDirectory}/demo-mobile.png`, fullPage: true });
  const download = demo.waitForEvent('download');
  await demo.getByRole('link', { name: 'Start for real' }).click();
  await download;
  assert.equal(await demo.evaluate(() => localStorage.getItem('demo:caption-cues:settings')), null);
  assert.equal(await demo.evaluate(() => localStorage.getItem('real:keep')), 'untouched');
  report.checks.demoIsolation = 'pass';
  report.checks.sameOriginDemoRequests = requests.length;
  await demoContext.close();

  const offlineContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const offline = await offlineContext.newPage();
  await offline.goto(`${expectedOrigin}/demo/`, { waitUntil: 'networkidle' });
  await offline.evaluate(() => navigator.serviceWorker.ready);
  await offline.reload({ waitUntil: 'networkidle' });
  await offlineContext.setOffline(true);
  await offline.reload({ waitUntil: 'domcontentloaded' });
  await offline.getByRole('button', { name: 'Next line' }).click();
  assert.equal(await offline.locator('#line-count').textContent(), 'Line 2 of 3');
  assert.equal(await offline.locator('#offline').isVisible(), true);
  report.checks.offlineDemo = 'pass';
  await offlineContext.close();

  const copyContext = await browser.newContext();
  const copyPage = await copyContext.newPage();
  for (const route of ['/', '/privacy/']) {
    await copyPage.goto(new URL(route, baseUrl).href, { waitUntil: 'networkidle' });
    assert.ok((await copyPage.locator('body').textContent()).includes('selected caption text shown on the page'));
  }
  report.checks.review2Terminology = 'pass';
  await copyContext.close();

  await writeFile(`${evidenceDirectory}/audit.json`, `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify(report, null, 2));
} finally {
  await browser.close();
}

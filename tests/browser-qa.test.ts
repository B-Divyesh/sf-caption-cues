import AxeBuilder from '@axe-core/playwright';
import { readdir, stat } from 'node:fs/promises';
import { extname, resolve } from 'node:path';
import { chromium, type Browser } from 'playwright';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { closeServer, startStaticServer } from './helpers/static-server';
import type { Server } from 'node:http';

let server: Server;
let url = '';
let browser: Browser;

beforeAll(async () => {
  ({ server, url } = await startStaticServer());
  browser = await chromium.launch({ channel: 'chromium' });
});

afterAll(async () => {
  await browser?.close();
  if (server) await closeServer(server);
});

describe('built-site browser, accessibility, and route quality', () => {
  for (const route of ['/', '/demo/', '/privacy/', '/terms/', '/not-a-real-route']) {
    it(`has no serious accessibility or console errors at ${route}`, async () => {
      for (const viewport of [{ width: 390, height: 844 }, { width: 1440, height: 900 }]) {
        const context = await browser.newContext({ viewport });
        const page = await context.newPage();
        const errors: string[] = [];
        page.on('pageerror', (error) => errors.push(error.message));
        page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
        await page.goto(`${url}${route}`, { waitUntil: 'networkidle' });
        const results = await new AxeBuilder({ page: page as never }).analyze();
        expect(results.violations.filter((violation) => ['serious', 'critical'].includes(violation.impact ?? ''))).toEqual([]);
        expect(errors.filter((error) => !(route === '/not-a-real-route' && error.includes('404')))).toEqual([]);
        expect(await page.locator('html').getAttribute('lang')).toBe('en');
        expect(await page.locator('h1').count()).toBe(1);
        expect(await page.locator('main').count()).toBe(1);
        await context.close();
      }
    }, 30_000);
  }

  it('keeps the audience, sample action, and install disclosure in the phone first screen', async () => {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    try {
      await page.goto(url, { waitUntil: 'networkidle' });
      await expect.poll(() => page.getByRole('heading', { level: 1 }).textContent()).toBe('Highlight the caption words you miss');
      expect(await page.getByText('For viewers who follow captions but miss names, speaker labels, or sound cues.').isVisible()).toBe(true);
      const sample = await page.getByRole('link', { name: /Try it with sample data/ }).boundingBox();
      expect(sample && sample.y + sample.height).toBeLessThanOrEqual(844);
      expect(await page.getByText('Downloads a ZIP for Chrome Developer mode.').isVisible()).toBe(true);
    } finally { await page.close(); }
  });

  it('uses the common route shell, designed 404, focus handoff, and readable wordmark', async () => {
    const page = await browser.newPage();
    try {
      await page.goto(url, { waitUntil: 'networkidle' });
      const brand = await page.locator('header .brand-name').evaluate((node) => ({ width: node.getBoundingClientRect().width, background: getComputedStyle(node).backgroundColor }));
      expect(brand.width).toBeGreaterThan(80);
      expect(brand.background).toBe('rgba(0, 0, 0, 0)');
      await Promise.all([page.waitForURL('**/privacy/'), page.getByRole('link', { name: 'Privacy' }).first().click()]);
      await expect.poll(() => page.evaluate(() => document.activeElement?.tagName)).toBe('H1');
      await page.goBack({ waitUntil: 'networkidle' });
      await expect.poll(() => page.evaluate(() => document.activeElement?.tagName)).toBe('H1');
      const response = await page.goto(`${url}/not-a-real-route`, { waitUntil: 'networkidle' });
      expect(response?.status()).toBe(404);
      expect(await page.title()).toBe('404 — Caption Cues');
      expect(await page.getByRole('link', { name: 'Return home' }).isVisible()).toBe(true);
    } finally { await page.close(); }
  });

  it('gives visible interactive controls a 44px target on mobile', async () => {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    try {
      for (const route of ['/', '/demo/', '/privacy/', '/terms/']) {
        await page.goto(`${url}${route}`, { waitUntil: 'networkidle' });
        const small = await page.locator('a, button, summary, label:has(input)').evaluateAll((nodes) => nodes.filter((node) => {
          const rect = node.getBoundingClientRect();
          const style = getComputedStyle(node);
          return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0 && (rect.width < 44 || rect.height < 44);
        }).map((node) => ({ text: node.textContent?.trim().slice(0, 40), width: node.getBoundingClientRect().width, height: node.getBoundingClientRect().height })));
        expect(small, `${route} has undersized targets`).toEqual([]);
      }
    } finally { await page.close(); }
  });

  it('ships route metadata and stays within static performance budgets', async () => {
    const page = await browser.newPage();
    try {
      for (const route of ['/', '/demo/', '/privacy/', '/terms/']) {
        await page.goto(`${url}${route}`, { waitUntil: 'networkidle' });
        expect((await page.title()).length).toBeLessThanOrEqual(60);
        expect(await page.locator('link[rel=canonical]').count()).toBe(1);
        expect(await page.locator('meta[property="og:image"]').getAttribute('content')).toContain('social-preview.jpg');
        expect(await page.locator('meta[name="twitter:card"]').getAttribute('content')).toBe('summary_large_image');
      }
    } finally { await page.close(); }
    const assets = await readdir(resolve('dist/site/assets'));
    const sizes = await Promise.all(assets.map(async (name) => ({ name, size: (await stat(resolve('dist/site/assets', name))).size })));
    expect(sizes.filter((item) => extname(item.name) === '.js').reduce((sum, item) => sum + item.size, 0)).toBeLessThanOrEqual(200_000);
    expect(sizes.filter((item) => extname(item.name) === '.css').reduce((sum, item) => sum + item.size, 0)).toBeLessThanOrEqual(50_000);
    expect((await stat('dist/site/hero-proof-sheet-640.avif')).size).toBeLessThanOrEqual(300_000);
  });
});

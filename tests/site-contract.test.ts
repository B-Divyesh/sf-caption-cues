import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';
import { describe, expect, it } from 'vitest';

for (const page of ['site/index.html', 'site/demo/index.html', 'site/privacy/index.html', 'site/terms/index.html', 'site/404.html']) {
  describe(page, () => {
    const document = new JSDOM(readFileSync(page, 'utf8')).window.document;
    it('has the required document semantics', () => {
      expect(document.documentElement.lang).toBe('en');
      expect(document.title.length).toBeGreaterThan(5);
      expect(document.querySelectorAll('h1')).toHaveLength(1);
      expect(document.querySelectorAll('main')).toHaveLength(1);
      expect(document.querySelector('header nav')).not.toBeNull();
      expect(document.querySelector('footer a[href="/privacy/"]')).not.toBeNull();
      expect(document.querySelector('footer a[href="/terms/"]')).not.toBeNull();
    });
    it('labels images and form fields', () => {
      expect(Array.from(document.images).every((image) => image.hasAttribute('alt'))).toBe(true);
      expect(Array.from(document.querySelectorAll('input')).every((input) => input.labels && input.labels.length > 0)).toBe(true);
    });
    it('has complete route metadata', () => {
      expect(document.querySelector('link[rel="canonical"]')).not.toBeNull();
      expect(document.querySelector('meta[property="og:title"]')).not.toBeNull();
      expect(document.querySelector('meta[property="og:image"]')?.getAttribute('content')).toContain('social-preview.jpg');
      expect(document.querySelector('meta[name="twitter:card"]')?.getAttribute('content')).toBe('summary_large_image');
      expect(document.querySelector('link[rel="apple-touch-icon"]')).not.toBeNull();
    });
  });
}

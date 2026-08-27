import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';
import { describe, expect, it } from 'vitest';

for (const page of ['site/index.html', 'site/privacy/index.html', 'site/terms/index.html']) {
  describe(page, () => {
    const document = new JSDOM(readFileSync(page, 'utf8')).window.document;
    it('has the required document semantics', () => {
      expect(document.documentElement.lang).toBe('en');
      expect(document.title.length).toBeGreaterThan(5);
      expect(document.querySelectorAll('h1')).toHaveLength(1);
      expect(document.querySelectorAll('main')).toHaveLength(1);
    });
    it('labels images and form fields', () => {
      expect(Array.from(document.images).every((image) => image.hasAttribute('alt'))).toBe(true);
      expect(Array.from(document.querySelectorAll('input')).every((input) => input.labels && input.labels.length > 0)).toBe(true);
    });
  });
}

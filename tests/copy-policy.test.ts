import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const publicCopy = [
  'site/index.html', 'site/demo/index.html', 'site/privacy/index.html',
  'site/terms/index.html', 'site/404.html', 'README.md'
].map((path) => readFileSync(path, 'utf8')).join('\n');

describe('reviewed public language', () => {
  it('keeps the reviewed first-screen job, audience, action, and install disclosure', () => {
    const home = readFileSync('site/index.html', 'utf8');
    expect(home).toContain('Highlight the caption words you miss');
    expect(home).toContain('For viewers who follow captions but miss names, speaker labels, or sound cues.');
    expect(home).toContain('Try it with sample data');
    expect(home).toContain('See highlighted captions before you install.');
    expect(home).toContain('Downloads a ZIP for Chrome Developer mode.');
  });

  it('does not restore any rejected metaphor, jargon, or unfinished release copy', () => {
    const rejected = [
      'Catch the words captions usually flatten', 'Try the rules first', 'Local-first', 'Free core tools',
      'Proof 01', 'One line. The right landmarks.', 'Method 02', 'It marks up.', 'It doesn’t listen in.',
      'last DOM caption', 'Why 03', 'Built for a different kind', 'viewer-controlled hierarchy',
      'visual anchors', 'Keep the core free', 'Add more ink', 'Cobalt caption plate',
      'Dodo is merchant of record', 'Notes 04', 'Before you press play',
      'Store packaging can be added after factory release', 'visible caption DOM',
      'Useful emphasis, without another transcript', 'plate theme', 'Cobalt theme', 'speaker changes',
      'speaker cues', 'bracketed descriptions', 'Playwright 1.62.1'
    ];
    for (const phrase of rejected) expect(publicCopy).not.toContain(phrase);
  });

  it('uses one name for the supported page-caption source', () => {
    const phrase = 'selected caption text shown on the page';
    const home = readFileSync('site/index.html', 'utf8');
    const readme = readFileSync('README.md', 'utf8');
    const privacy = readFileSync('site/privacy/index.html', 'utf8');
    const claims = readFileSync('.factory/claims.json', 'utf8');
    const audit = readFileSync('.factory/copy-audit.md', 'utf8');
    for (const source of [home, readme, privacy, claims, audit]) expect(source).toContain(phrase);
    expect(audit).toContain('| README | 14 | Support for standard browser caption tracks and selected caption text shown on the page. |');
    for (const variant of ['selected visible caption elements', 'selected visible page captions', 'selected visible caption text exposed by the page']) {
      expect(publicCopy + claims + audit).not.toContain(variant);
    }
  });

  it('keeps the audited first-screen wording alongside the source copy', () => {
    const audit = readFileSync('.factory/copy-audit.md', 'utf8');
    for (const sentence of [
      'A caption highlighter for Chrome',
      'Highlight the caption words you miss',
      'For viewers who follow captions but miss names, speaker labels, or sound cues.',
      'Try it with sample data',
      'See highlighted captions before you install.',
      'Download unpacked Chrome extension'
    ]) expect(audit).toContain(sentence);
  });

  it('uses plain language for the extension popup controls and saved-word action', () => {
    const popup = readFileSync('entrypoints/popup/index.html', 'utf8');
    expect(popup).toContain('>Caption controls<');
    expect(popup).toContain('>Save word<');
    expect(popup).not.toContain('Live proof sheet');
    expect(popup).not.toContain('>Add<');
  });

  it('describes the browser extension without unexplained platform terminology', () => {
    const readme = readFileSync('README.md', 'utf8');
    expect(readme).toContain('- A Chrome extension.');
    expect(readme).not.toContain('Manifest V3');
  });

  it('recounts every audited visible string from its named source', () => {
    const audit = readFileSync('.factory/copy-audit.md', 'utf8');
    const source = {
      landing: `${readFileSync('site/index.html', 'utf8')}\n${readFileSync('site/main.ts', 'utf8')}`,
      demo: `${readFileSync('site/demo/index.html', 'utf8')}\n${readFileSync('site/demo.ts', 'utf8')}`,
      popup: `${readFileSync('entrypoints/popup/index.html', 'utf8')}\n${readFileSync('entrypoints/popup/main.ts', 'utf8')}`,
      README: readFileSync('README.md', 'utf8'),
      catalog: readFileSync('.factory/catalog-description.txt', 'utf8')
    };
    const normalise = (value: string) => value
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
      .replace(/<[^>]*>/g, ' ')
      .replace(/[\`*_]/g, '')
      .replace(/Alt\s*\+\s*R/g, 'Alt+R')
      .replace(/\s+/g, ' ')
      .replace(/\s+([.,;:!?])/g, '$1')
      .trim();
    const rows = Array.from(audit.matchAll(/^\| (landing|demo|popup|README|catalog) \| (\d+) \| (.+) \|$/gm));

    expect(rows.length).toBeGreaterThan(150);
    for (const row of rows) {
      const [, sourceName, expectedWords, copy] = row;
      if (!sourceName || !expectedWords || !copy) throw new Error('Malformed copy-audit row');
      expect(copy.trim().split(/\s+/).filter(Boolean).length, copy).toBe(Number(expectedWords));
      expect(normalise(source[sourceName as keyof typeof source]), copy).toContain(normalise(copy));
    }
  });

  it('ships a verb-first catalog sentence within 120 characters', () => {
    const description = readFileSync('.factory/catalog-description.txt', 'utf8').trim();
    expect(description.length).toBeLessThanOrEqual(120);
    expect(description).toMatch(/^Highlight\b/);
    expect(description).toBe('Highlight names, speaker labels, sound cues, and saved words in captions already shown by a page.');
  });
});

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
    expect(audit).toContain('| 14 | Support for standard browser caption tracks and selected caption text shown on the page. |');
    for (const variant of ['selected visible caption elements', 'selected visible page captions', 'selected visible caption text exposed by the page']) {
      expect(publicCopy + claims + audit).not.toContain(variant);
    }
  });

  it('keeps the audited first-screen wording alongside the source copy', () => {
    const audit = readFileSync('.factory/copy-audit.md', 'utf8');
    for (const sentence of [
      'A caption highlighter for Chrome',
      'Highlight the caption words you miss.',
      'For viewers who follow captions but miss names, speaker labels, or sound cues.',
      'Try it with sample data',
      'See highlighted captions before you install.',
      'Download unpacked Chrome extension'
    ]) expect(audit).toContain(sentence);
  });

  it('ships a verb-first catalog sentence within 120 characters', () => {
    const description = readFileSync('.factory/catalog-description.txt', 'utf8').trim();
    expect(description.length).toBeLessThanOrEqual(120);
    expect(description).toMatch(/^Highlight\b/);
    expect(description).toBe('Highlight missed names, speaker labels, sound cues, and saved words in captions shown on the page.');
  });
});

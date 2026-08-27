import { describe, expect, it } from 'vitest';
import { captionToPlainText, parseCaption } from '../lib/caption-parser';
import { DEFAULT_SETTINGS } from '../lib/types';

describe('caption emphasis', () => {
  it('prioritizes the speaker label and detects names and sounds', () => {
    const segments = parseCaption('MARA: Tell Rowan now. [train approaching]', DEFAULT_SETTINGS);
    expect(segments.filter(({ kind }) => kind !== 'plain')).toEqual([
      { kind: 'speaker', text: 'MARA' },
      { kind: 'name', text: 'Rowan' },
      { kind: 'sound', text: '[train approaching]' }
    ]);
  });

  it('matches saved phrases case-insensitively without matching inside words', () => {
    const settings = { ...DEFAULT_SETTINGS, manualWords: ['Gate'] };
    const segments = parseCaption('The gate is past Watergate.', settings);
    expect(segments.filter(({ kind }) => kind === 'manual')).toEqual([{ kind: 'manual', text: 'gate' }]);
  });

  it('respects individual rule switches', () => {
    const settings = { ...DEFAULT_SETTINGS, emphasizeNames: false, emphasizeSounds: false };
    expect(parseCaption('Meet Rowan. [music]', settings)).toEqual([{ kind: 'plain', text: 'Meet Rowan. [music]' }]);
  });

  it('normalizes whitespace and safely handles empty lines', () => {
    expect(parseCaption('  ', DEFAULT_SETTINGS)).toEqual([]);
    expect(parseCaption('Hello   there', { ...DEFAULT_SETTINGS, emphasizeNames: false })).toEqual([{ kind: 'plain', text: 'Hello there' }]);
  });

  it('strips cue markup when no document is present', () => {
    expect(captionToPlainText('<v Mina>Hello</v> <i>there</i>')).toBe('Hello there');
  });
});

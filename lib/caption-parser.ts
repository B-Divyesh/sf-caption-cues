import type { CaptionSettings, CueKind, CueSegment } from './types';

interface Range {
  start: number;
  end: number;
  kind: Exclude<CueKind, 'plain'>;
  priority: number;
}

const COMMON_CAPITALIZED = new Set([
  'A', 'An', 'And', 'Are', 'As', 'Ask', 'At', 'But', 'Can', 'Did', 'Do', 'For', 'From',
  'He', 'Her', 'Here', 'His', 'How', 'I', 'If', 'In', 'Is', 'It', 'Its', 'Let',
  'My', 'No', 'Not', 'Now', 'Of', 'Oh', 'On', 'Or', 'Our', 'She', 'So', 'That',
  'Tell', 'The', 'Their', 'Then', 'There', 'They', 'This', 'To', 'We', 'Well', 'What',
  'When', 'Where', 'Who', 'Why', 'Will', 'With', 'Yes', 'You', 'Your'
]);

function addMatches(text: string, regex: RegExp, kind: Range['kind'], priority: number, ranges: Range[]) {
  for (const match of text.matchAll(regex)) {
    if (match.index === undefined || !match[0]) continue;
    ranges.push({ start: match.index, end: match.index + match[0].length, kind, priority });
  }
}

function escapedWord(word: string) {
  return word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function parseCaption(rawText: string, settings: CaptionSettings): CueSegment[] {
  const text = rawText.replace(/\s+/g, ' ').trim();
  if (!text) return [];

  const ranges: Range[] = [];

  if (settings.emphasizeSounds) {
    addMatches(text, /\[[^\]\n]{1,80}\]|\((?:music|applause|laughter|laughing|sighs?|gasps?|doorbell|phone rings?|thunder|footsteps)[^)]*\)/gi, 'sound', 40, ranges);
  }

  if (settings.emphasizeSpeakers) {
    const match = text.match(/^\s*[-–—]?\s*([A-Z][A-Z0-9 .'-]{1,24})(?=:)/);
    if (match?.index !== undefined && match[1]) {
      const start = text.indexOf(match[1], match.index);
      ranges.push({ start, end: start + match[1].length, kind: 'speaker', priority: 50 });
    }
  }

  if (settings.emphasizeManual) {
    for (const word of settings.manualWords.map((value) => value.trim()).filter(Boolean)) {
      addMatches(text, new RegExp(`(?<![\\p{L}\\p{N}])${escapedWord(word)}(?![\\p{L}\\p{N}])`, 'giu'), 'manual', 45, ranges);
    }
  }

  if (settings.emphasizeNames) {
    for (const match of text.matchAll(/\b[A-Z][a-z]{1,}(?:['’][A-Za-z]+)?\b/g)) {
      if (match.index === undefined || COMMON_CAPITALIZED.has(match[0])) continue;
      ranges.push({ start: match.index, end: match.index + match[0].length, kind: 'name', priority: 20 });
    }
  }

  const accepted: Range[] = [];
  for (const range of ranges.sort((a, b) => b.priority - a.priority || a.start - b.start)) {
    if (!accepted.some((item) => range.start < item.end && range.end > item.start)) accepted.push(range);
  }
  accepted.sort((a, b) => a.start - b.start);

  const segments: CueSegment[] = [];
  let cursor = 0;
  for (const range of accepted) {
    if (range.start > cursor) segments.push({ kind: 'plain', text: text.slice(cursor, range.start) });
    segments.push({ kind: range.kind, text: text.slice(range.start, range.end) });
    cursor = range.end;
  }
  if (cursor < text.length) segments.push({ kind: 'plain', text: text.slice(cursor) });
  return segments.length ? segments : [{ kind: 'plain', text }];
}

export function captionToPlainText(cueText: string): string {
  if (!cueText.includes('<')) return cueText;
  if (typeof document === 'undefined') return cueText.replace(/<[^>]*>/g, '');
  const holder = document.createElement('div');
  holder.innerHTML = cueText;
  return holder.textContent ?? '';
}

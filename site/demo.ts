import { parseCaption } from '../lib/caption-parser';
import type { CaptionSettings, CaptionTheme } from '../lib/types';
import './shared';

const STORAGE_KEY = 'demo:caption-cues:settings';
const DEMO_PREFIX = 'demo:';
const lines = [
  'MARA: Rowan, wait at Thessaly Gate. [train approaching]',
  'DEV: Dr. Alvarez left the key with Mina. [door closes]',
  'NARRATOR: The ferry leaves Orkney at seven. [wind rises]'
];

type DemoState = Pick<CaptionSettings, 'emphasizeNames' | 'emphasizeSpeakers' | 'emphasizeSounds' | 'emphasizeManual' | 'manualWords' | 'captionSize'> & { theme: Extract<CaptionTheme, 'paper' | 'ink'>; line: number };

const seed: DemoState = { emphasizeNames: true, emphasizeSpeakers: true, emphasizeSounds: true, emphasizeManual: true, manualWords: ['Gate'], captionSize: 26, theme: 'paper', line: 0 };
let state: DemoState = loadState();

const byId = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
const caption = byId<HTMLElement>('sample-caption');
const status = byId<HTMLElement>('demo-status');
const wordInput = byId<HTMLInputElement>('demo-word');
const controls = {
  speakers: byId<HTMLInputElement>('demo-speakers'), names: byId<HTMLInputElement>('demo-names'),
  sounds: byId<HTMLInputElement>('demo-sounds'), manual: byId<HTMLInputElement>('demo-manual'),
  size: byId<HTMLSelectElement>('demo-size'), theme: byId<HTMLSelectElement>('demo-theme')
};

function loadState(): DemoState {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null') as Partial<DemoState> | null;
    return value ? { ...seed, ...value, manualWords: Array.isArray(value.manualWords) ? value.manualWords.slice(0, 12) : seed.manualWords } : { ...seed, manualWords: [...seed.manualWords] };
  } catch { return { ...seed, manualWords: [...seed.manualWords] }; }
}

function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }

function render(message?: string) {
  controls.speakers.checked = state.emphasizeSpeakers;
  controls.names.checked = state.emphasizeNames;
  controls.sounds.checked = state.emphasizeSounds;
  controls.manual.checked = state.emphasizeManual;
  controls.size.value = String(state.captionSize);
  controls.theme.value = state.theme;
  caption.dataset.theme = state.theme;
  caption.classList.remove('size-22', 'size-26', 'size-30');
  caption.classList.add(`size-${state.captionSize}`);
  caption.replaceChildren(...parseCaption(lines[state.line] ?? lines[0] ?? '', { enabled: true, ...state }).map((segment) => {
    if (segment.kind === 'plain') return document.createTextNode(segment.text);
    const mark = document.createElement('span');
    mark.className = `cue-${segment.kind}`;
    mark.dataset.cue = segment.kind;
    mark.textContent = segment.text;
    return mark;
  }));
  byId('line-count').textContent = `Line ${state.line + 1} of ${lines.length}`;
  byId('saved-words').textContent = state.manualWords.length ? `Saved words: ${state.manualWords.join(', ')}` : 'No saved words yet.';
  if (message) status.textContent = message;
  saveState();
}

for (const [key, input] of Object.entries(controls)) {
  input.addEventListener('change', () => {
    if (key === 'size') state.captionSize = Number(input.value) as DemoState['captionSize'];
    else if (key === 'theme') state.theme = input.value as DemoState['theme'];
    else if (key === 'speakers') state.emphasizeSpeakers = (input as HTMLInputElement).checked;
    else if (key === 'names') state.emphasizeNames = (input as HTMLInputElement).checked;
    else if (key === 'sounds') state.emphasizeSounds = (input as HTMLInputElement).checked;
    else state.emphasizeManual = (input as HTMLInputElement).checked;
    render('Caption marks updated.');
  });
}

byId<HTMLFormElement>('demo-controls').addEventListener('submit', (event) => {
  event.preventDefault();
  const value = wordInput.value.trim();
  if (!value) { status.textContent = 'Type a word before saving it.'; return; }
  if (!state.manualWords.some((word) => word.toLocaleLowerCase() === value.toLocaleLowerCase())) state.manualWords.push(value);
  render(`${value} is now a saved word.`);
});

function moveLine(step: number) {
  state.line = (state.line + step + lines.length) % lines.length;
  render(`Caption line ${state.line + 1} is highlighted.`);
}

byId('previous-line').addEventListener('click', () => moveLine(-1));
byId('next-line').addEventListener('click', () => moveLine(1));
function replay() {
  caption.classList.remove('replaying');
  void caption.offsetWidth;
  caption.classList.add('replaying');
  status.textContent = `Replayed caption line ${state.line + 1}.`;
}
byId('replay-line').addEventListener('click', replay);
document.addEventListener('keydown', (event) => {
  if (event.altKey && event.key.toLocaleLowerCase() === 'r' && !(event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement)) {
    event.preventDefault();
    replay();
  }
});

byId('check-unsupported').addEventListener('click', () => {
  byId('unsupported-output').textContent = 'Waiting for exposed caption text. The hidden-caption sample was left unchanged.';
});

byId('reset-demo').addEventListener('click', () => {
  for (let index = localStorage.length - 1; index >= 0; index -= 1) {
    const key = localStorage.key(index);
    if (key?.startsWith(DEMO_PREFIX)) localStorage.removeItem(key);
  }
  state = { ...seed, manualWords: [...seed.manualWords] };
  wordInput.value = 'Gate';
  render('Demo reset to the original sample.');
});

byId('start-real').addEventListener('click', () => {
  for (let index = localStorage.length - 1; index >= 0; index -= 1) {
    const key = localStorage.key(index);
    if (key?.startsWith(DEMO_PREFIX)) localStorage.removeItem(key);
  }
});

render();

import { parseCaption } from '../lib/caption-parser';
import { DEFAULT_SETTINGS, type CaptionSettings } from '../lib/types';
import './shared';

if (new URLSearchParams(location.search).get('demo') === '1') location.replace('/demo/');

const sample = 'MARA: Tell Rowan to meet us at Thessaly Gate. [train approaching]';
const preview = document.querySelector<HTMLElement>('#demo-caption');
const inputs = Array.from(document.querySelectorAll<HTMLInputElement>('[data-rule]'));

function renderPreview() {
  if (!preview) return;
  const flags = Object.fromEntries(inputs.map((input) => [input.dataset.rule, input.checked]));
  const settings: CaptionSettings = {
    ...DEFAULT_SETTINGS,
    emphasizeNames: Boolean(flags.names),
    emphasizeSpeakers: Boolean(flags.speakers),
    emphasizeSounds: Boolean(flags.sounds),
    emphasizeManual: Boolean(flags.manual),
    manualWords: ['Gate']
  };
  preview.replaceChildren(...parseCaption(sample, settings).map((segment) => {
    if (segment.kind === 'plain') return document.createTextNode(segment.text);
    const mark = document.createElement('span');
    mark.className = `cue-${segment.kind}`;
    mark.textContent = segment.text;
    return mark;
  }));
}

inputs.forEach((input) => input.addEventListener('change', renderPreview));
renderPreview();

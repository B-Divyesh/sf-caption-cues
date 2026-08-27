import { parseCaption } from '../lib/caption-parser';
import { DEFAULT_SETTINGS, type CaptionSettings } from '../lib/types';

const sample = 'MARA: Tell Rowan to meet us at Thessaly Gate. [train approaching]';
const demo = document.querySelector<HTMLElement>('#demo-caption');
const inputs = Array.from(document.querySelectorAll<HTMLInputElement>('[data-rule]'));

function renderDemo() {
  if (!demo) return;
  const flags = Object.fromEntries(inputs.map((input) => [input.dataset.rule, input.checked]));
  const settings: CaptionSettings = {
    ...DEFAULT_SETTINGS,
    emphasizeNames: Boolean(flags.names), emphasizeSpeakers: Boolean(flags.speakers),
    emphasizeSounds: Boolean(flags.sounds), emphasizeManual: Boolean(flags.manual), manualWords: ['Gate']
  };
  demo.replaceChildren(...parseCaption(sample, settings).map((segment) => {
    if (segment.kind === 'plain') return document.createTextNode(segment.text);
    const mark = document.createElement('span'); mark.className = `cue-${segment.kind}`; mark.textContent = segment.text; return mark;
  }));
}
inputs.forEach((input) => input.addEventListener('change', renderDemo));
renderDemo();

const offline = document.querySelector<HTMLElement>('#offline');
function setOnlineState() { if (offline) offline.hidden = navigator.onLine; }
window.addEventListener('online', setOnlineState); window.addEventListener('offline', setOnlineState); setOnlineState();

const LICENSE_KEY = 'sb_license:caption-cues';
const VERDICT_KEY = 'sb_license_verdict:caption-cues';
const verifyUrl = 'https://api.sociobot.in/api/v1/products/caption-cues/verify';
const status = document.querySelector<HTMLElement>('#license-status');
const licenseInput = document.querySelector<HTMLInputElement>('#license');
const copyLicense = document.querySelector<HTMLButtonElement>('#copy-license');

async function verify(token: string, force = false) {
  const cached = JSON.parse(localStorage.getItem(VERDICT_KEY) || 'null') as { token: string; valid: boolean; checkedAt: number } | null;
  if (!force && cached?.token === token && Date.now() - cached.checkedAt < 86_400_000) return cached.valid;
  try {
    const response = await fetch(`${verifyUrl}?license=${encodeURIComponent(token)}`);
    if (!response.ok) throw new Error('verify failed');
    const result = await response.json() as { valid: boolean };
    localStorage.setItem(VERDICT_KEY, JSON.stringify({ token, valid: result.valid, checkedAt: Date.now() }));
    return result.valid;
  } catch { throw new Error('offline'); }
}

const params = new URLSearchParams(location.search);
const returnedLicense = params.get('license');
if (returnedLicense) {
  localStorage.setItem(LICENSE_KEY, returnedLicense);
  if (licenseInput) licenseInput.value = returnedLicense;
  if (copyLicense) copyLicense.hidden = false;
  params.delete('license');
  history.replaceState({}, '', `${location.pathname}${params.size ? `?${params}` : ''}${location.hash}`);
  if (status) status.textContent = 'Purchase received. Checking your license…';
  verify(returnedLicense, true).then((valid) => { if (status) status.textContent = valid ? 'Supporter edition unlocked. Copy this license into the extension.' : 'The license could not be confirmed.'; }).catch(() => { if (status) status.textContent = 'Saved for later. We’ll verify when you are back online.'; });
}

const savedLicense = localStorage.getItem(LICENSE_KEY);
if (!returnedLicense && savedLicense && licenseInput && copyLicense) {
  licenseInput.value = savedLicense;
  copyLicense.hidden = false;
}
copyLicense?.addEventListener('click', async () => {
  const token = localStorage.getItem(LICENSE_KEY);
  if (!token || !status) return;
  try { await navigator.clipboard.writeText(token); status.textContent = 'License copied. Paste it into the extension’s Supporter panel.'; }
  catch { status.textContent = 'Select the license field and copy it manually.'; licenseInput?.select(); }
});

document.querySelector<HTMLFormElement>('#restore-form')?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const token = licenseInput?.value.trim() ?? '';
  if (!token || !status) return;
  status.textContent = 'Checking license…';
  try {
    const valid = await verify(token, true);
    if (valid) { localStorage.setItem(LICENSE_KEY, token); if (copyLicense) copyLicense.hidden = false; status.textContent = 'Supporter edition unlocked. Copy this license into the extension too.'; }
    else status.textContent = 'This license is not active. Check the token or buy again.';
  } catch { status.textContent = 'Could not connect. Try again when you are online.'; }
});

if ('serviceWorker' in navigator && location.protocol === 'https:') void navigator.serviceWorker.register('/service-worker.js');

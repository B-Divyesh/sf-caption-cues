import { browser } from 'wxt/browser';
import { getLicense, saveLicense } from '../lib/storage';
import type { LicenseState } from '../lib/types';

const VERIFY_URL = 'https://api.sociobot.in/api/v1/products/caption-cues/verify';
const DAY = 86_400_000;

async function verifyLicense(token: string, force = false): Promise<LicenseState & { offline?: boolean }> {
  const cached = await getLicense();
  if (!force && cached?.token === token && Date.now() - cached.checkedAt < DAY) return cached;

  try {
    const response = await fetch(`${VERIFY_URL}?license=${encodeURIComponent(token)}`);
    if (!response.ok) throw new Error(`Verification returned ${response.status}`);
    const result = await response.json() as { valid: boolean; reason?: string };
    const next: LicenseState = {
      token,
      valid: result.valid,
      reason: result.reason,
      checkedAt: Date.now()
    };
    await saveLicense(next);
    return next;
  } catch {
    if (cached?.token === token) return { ...cached, offline: true };
    return { token, valid: false, reason: 'offline', checkedAt: 0, offline: true };
  }
}

export default defineBackground(() => {
  browser.runtime.onMessage.addListener((message: unknown) => {
    const request = message as { type?: string; token?: string; force?: boolean };
    if (request.type === 'VERIFY_LICENSE' && request.token) {
      return verifyLicense(request.token.trim(), request.force);
    }
    if (request.type === 'GET_LICENSE') return getLicense();
  });

  browser.commands.onCommand.addListener(async (command) => {
    if (command !== 'replay-last-caption') return;
    const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
    if (tab?.id) void browser.tabs.sendMessage(tab.id, { type: 'REPLAY_LAST' }).catch(() => undefined);
  });
});

import { browser } from 'wxt/browser';
import { DEFAULT_SETTINGS, SETTINGS_KEY, type CaptionSettings } from './types';

export async function getSettings(): Promise<CaptionSettings> {
  const stored = await browser.storage.local.get(SETTINGS_KEY);
  return { ...DEFAULT_SETTINGS, ...(stored[SETTINGS_KEY] as Partial<CaptionSettings> | undefined) };
}

export async function saveSettings(settings: CaptionSettings) {
  await browser.storage.local.set({ [SETTINGS_KEY]: settings });
}

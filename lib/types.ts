export type CueKind = 'plain' | 'name' | 'speaker' | 'sound' | 'manual';

export interface CueSegment {
  kind: CueKind;
  text: string;
}

export type CaptionTheme = 'paper' | 'ink' | 'cobalt';

export interface CaptionSettings {
  enabled: boolean;
  emphasizeNames: boolean;
  emphasizeSpeakers: boolean;
  emphasizeSounds: boolean;
  emphasizeManual: boolean;
  manualWords: string[];
  captionSize: 22 | 26 | 30;
  theme: CaptionTheme;
}

export interface LicenseState {
  token: string;
  valid: boolean;
  checkedAt: number;
  reason?: string;
}

export const DEFAULT_SETTINGS: CaptionSettings = {
  enabled: true,
  emphasizeNames: true,
  emphasizeSpeakers: true,
  emphasizeSounds: true,
  emphasizeManual: true,
  manualWords: [],
  captionSize: 26,
  theme: 'paper'
};

export const SETTINGS_KEY = 'captionCuesSettings';
export const LICENSE_KEY = 'captionCuesLicense';

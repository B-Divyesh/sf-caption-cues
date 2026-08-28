import { defineConfig } from 'wxt';

export default defineConfig({
  manifest: {
    name: 'Caption Cues',
    description: 'Highlight names, speaker labels, sound cues, and saved words in caption text the page makes available.',
    version: '1.0.0',
    permissions: ['storage', 'activeTab'],
    host_permissions: ['http://*/*', 'https://*/*'],
    action: { default_title: 'Open Caption Cues' },
    commands: {
      'replay-last-caption': {
        suggested_key: { default: 'Alt+R', mac: 'Alt+R' },
        description: 'Replay the last caption line'
      }
    }
  }
});

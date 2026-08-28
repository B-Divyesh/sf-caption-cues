import { defineConfig } from 'wxt';

export default defineConfig({
  manifest: {
    name: 'Caption Cues',
    description: 'Make names, speakers, sound cues, and your saved words easier to catch in captions.',
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

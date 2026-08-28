import { browser } from 'wxt/browser';

export default defineBackground(() => {
  browser.commands.onCommand.addListener(async (command) => {
    if (command !== 'replay-last-caption') return;
    const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
    if (tab?.id) void browser.tabs.sendMessage(tab.id, { type: 'REPLAY_LAST' }).catch(() => undefined);
  });
});

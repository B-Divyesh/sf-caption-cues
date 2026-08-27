import { access } from 'node:fs/promises';
import { resolve } from 'node:path';
import { spawn } from 'node:child_process';

const root = resolve(import.meta.dirname, '..');
const playwrightCli = resolve(root, 'node_modules/playwright/cli.js');
const withDeps = process.argv.slice(2).includes('--with-deps');

if (process.argv.slice(2).some((argument) => argument !== '--with-deps')) {
  throw new Error('Usage: npm run setup:browser [-- --with-deps]');
}

try {
  await access(playwrightCli);
} catch {
  throw new Error('Playwright is not installed. Run npm ci before provisioning Chromium.');
}

const destination = process.env.PLAYWRIGHT_BROWSERS_PATH || 'Playwright default cache';
console.log(`Provisioning the lockfile-pinned Playwright Chromium into: ${destination}`);

const result = await new Promise((resolveResult, reject) => {
  const child = spawn(process.execPath, [playwrightCli, 'install', ...(withDeps ? ['--with-deps'] : []), 'chromium'], {
    cwd: root,
    env: process.env,
    stdio: 'inherit'
  });
  child.once('error', reject);
  child.once('exit', (code, signal) => resolveResult({ code, signal }));
});

if (result.code !== 0) {
  throw new Error(`Playwright Chromium provisioning failed${result.signal ? ` (${result.signal})` : ` (exit ${result.code})`}.`);
}

console.log('Playwright Chromium is ready. Run npm run check.');

import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { spawn } from 'node:child_process';

const root = resolve(import.meta.dirname, '..');
const withDeps = process.argv.slice(2).includes('--with-deps');

if (process.argv.slice(2).some((argument) => argument !== '--with-deps')) {
  throw new Error('Usage: npm run check:clean-browser [-- --with-deps]');
}

const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const browserCache = await mkdtemp(resolve(tmpdir(), 'caption-cues-playwright-cache-'));
const env = { ...process.env, PLAYWRIGHT_BROWSERS_PATH: browserCache };

function runNpm(arguments_) {
  return new Promise((resolveResult, reject) => {
    const child = spawn(npmCommand, arguments_, { cwd: root, env, stdio: 'inherit' });
    child.once('error', reject);
    child.once('exit', (code, signal) => {
      if (code === 0) resolveResult();
      else reject(new Error(`npm ${arguments_.join(' ')} failed${signal ? ` (${signal})` : ` (exit ${code})`}.`));
    });
  });
}

console.log(`Clean Playwright cache gate: ${browserCache}`);
console.log('No existing Playwright browser cache is available to this gate.');

try {
  await runNpm(['run', withDeps ? 'setup:browser:ci' : 'setup:browser']);
  await runNpm(['run', 'verify:release']);
  console.log('Clean Playwright cache gate: PASS');
} finally {
  await rm(browserCache, { recursive: true, force: true });
}

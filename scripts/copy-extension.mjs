import { cp, mkdir, readdir, rm } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const output = resolve(root, '.output');
const archives = (await readdir(output)).filter((name) => name.endsWith('.zip') && name.includes('chrome'));
if (!archives.length) throw new Error('WXT did not produce a Chrome package');

await mkdir(resolve(root, 'site/public/downloads'), { recursive: true });
await mkdir(resolve(root, 'dist'), { recursive: true });
await cp(resolve(output, archives.sort().at(-1)), resolve(root, 'site/public/downloads/caption-cues-chrome.zip'));
await rm(resolve(root, 'dist/extension'), { recursive: true, force: true });
await cp(resolve(output, 'chrome-mv3'), resolve(root, 'dist/extension'), { recursive: true, force: true });

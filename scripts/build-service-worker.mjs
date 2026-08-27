import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { relative, resolve, sep } from 'node:path';

const root = resolve(process.argv[2] ?? 'dist/site');
const workerName = 'service-worker.js';

async function filesIn(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const path = resolve(directory, entry.name);
    return entry.isDirectory() ? filesIn(path) : [path];
  }));
  return files.flat();
}

function toUrl(path) {
  const pathname = relative(root, path).split(sep).join('/');
  if (pathname === 'index.html') return '/';
  if (pathname.endsWith('/index.html')) return `/${pathname.slice(0, -'index.html'.length)}`;
  return `/${pathname}`;
}

function shouldPrecache(url) {
  return url === '/' || url.endsWith('/') || url.startsWith('/assets/') ||
    /^\/(?:icon\.svg|hero-proof-sheet.*\.(?:avif|webp|jpg))$/.test(url);
}

const releaseFiles = (await filesIn(root))
  .filter((path) => relative(root, path) !== workerName)
  .sort((a, b) => a.localeCompare(b));
const releaseContent = await Promise.all(releaseFiles.map(async (path) => {
  const content = await readFile(path);
  return `${toUrl(path)}\0${createHash('sha256').update(content).digest('hex')}`;
}));
const version = createHash('sha256').update(releaseContent.join('\n')).digest('hex').slice(0, 20);
const shell = releaseFiles.map(toUrl).filter(shouldPrecache);

if (!shell.includes('/')) throw new Error(`No root document found in ${root}`);

const source = `// Generated from finalized release content. Do not edit.\nconst CACHE = 'caption-cues-${version}';\nconst SHELL = ${JSON.stringify(shell)};\n\nself.addEventListener('install', (event) => event.waitUntil((async () => {\n  const cache = await caches.open(CACHE);\n  await cache.addAll(SHELL);\n  await self.skipWaiting();\n})()));\n\nself.addEventListener('activate', (event) => event.waitUntil((async () => {\n  const keys = await caches.keys();\n  await Promise.all(keys.filter((key) => key.startsWith('caption-cues-') && key !== CACHE).map((key) => caches.delete(key)));\n  await self.clients.claim();\n})()));\n\nasync function cacheResponse(request, response) {\n  if (response.ok) (await caches.open(CACHE)).put(request, response.clone());\n  return response;\n}\n\nasync function networkFirst(request) {\n  try { return await cacheResponse(request, await fetch(request)); }\n  catch { return (await caches.match(request)) || (await caches.match('/')); }\n}\n\nasync function cacheFirst(request) {\n  return (await caches.match(request)) || cacheResponse(request, await fetch(request));\n}\n\nself.addEventListener('fetch', (event) => {\n  const request = event.request;\n  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;\n  event.respondWith(request.mode === 'navigate' ? networkFirst(request) : cacheFirst(request));\n});\n`;

await writeFile(resolve(root, workerName), source);
console.log(`Generated ${workerName}: caption-cues-${version} (${shell.length} shell entries)`);

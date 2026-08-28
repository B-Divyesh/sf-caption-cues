import { createServer, type Server } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, resolve } from 'node:path';

const types: Record<string, string> = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.webp': 'image/webp', '.avif': 'image/avif', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8', '.zip': 'application/zip'
};

export async function startStaticServer(root = resolve('dist/site')): Promise<{ server: Server; url: string }> {
  const server = createServer(async (request, response) => {
    const pathname = decodeURIComponent(new URL(request.url ?? '/', 'http://localhost').pathname);
    const relativePath = pathname === '/' ? 'index.html' : pathname.replace(/^\//, '');
    const candidates = extname(relativePath) ? [relativePath] : [relativePath, `${relativePath}/index.html`];
    for (const candidate of candidates) {
      const path = resolve(root, candidate);
      if (!path.startsWith(`${root}/`) && path !== resolve(root, 'index.html')) continue;
      try {
        const body = await readFile(path);
        response.writeHead(200, { 'Content-Type': types[extname(path)] ?? 'application/octet-stream', 'Cache-Control': 'no-cache' }).end(body);
        return;
      } catch { /* try the next candidate */ }
    }
    const body = await readFile(resolve(root, '404.html'));
    response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' }).end(body);
  });
  await new Promise<void>((accept, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => accept());
  });
  const address = server.address();
  if (!address || typeof address === 'string') throw new Error('Static server did not bind');
  return { server, url: `http://127.0.0.1:${address.port}` };
}

export async function closeServer(server: Server) {
  await new Promise<void>((accept, reject) => server.close((error) => error ? reject(error) : accept()));
}

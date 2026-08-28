import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

type StaticWebAppsConfig = {
  globalHeaders: Record<string, string>;
  routes: Array<{ route: string; headers?: Record<string, string>; rewrite?: string }>;
  responseOverrides: Record<string, { rewrite: string; statusCode: number }>;
};

const config = JSON.parse(readFileSync(resolve('site/public/staticwebapp.config.json'), 'utf8')) as StaticWebAppsConfig;
const headerFor = (route: string) => config.routes.find((entry) => entry.route === route)?.headers?.['Cache-Control'];

describe('Static Web Apps release policy', () => {
  it('uses native SWA rules instead of a served _headers file', () => {
    expect(config.globalHeaders['Content-Security-Policy']).toContain("default-src 'self'");
    expect(config.globalHeaders['Content-Security-Policy']).not.toContain('https:');
    expect(config.globalHeaders['Permissions-Policy']).toContain('camera=()');
    expect(config.globalHeaders['Permissions-Policy']).toContain('microphone=()');
    expect(headerFor('/assets/*')).toBe('public, max-age=31536000, immutable');
    expect(headerFor('/downloads/*')).toBe('public, max-age=3600');
    expect(headerFor('/hero-proof-sheet*')).toBe('public, max-age=604800');
    expect(headerFor('/service-worker.js')).toBe('no-cache');
    expect(config.routes.find((entry) => entry.route === '/demo')?.rewrite).toBe('/demo/index.html');
    expect(config.responseOverrides['404']).toEqual({ rewrite: '/404.html', statusCode: 404 });
  });
});

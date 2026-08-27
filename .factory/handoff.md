# Caption Cues repair handoff

## Status

Repaired QA report `e5139ccd369ab7c8aa909355af64d3dfafe66216` for candidate `9de3bc208937c80ad34b901e8d29307497450a6b`.

- Replaced the inert, served `_headers` file with Azure Static Web Apps native configuration at `site/public/staticwebapp.config.json`. Standard Static deployment now emits immutable one-year caching for `/assets/*`, one-hour downloads, weekly responsive artwork caching, and `Cache-Control: no-cache` for `/service-worker.js`.
- Added a restrictive CSP compatible with the self-hosted static module, image assets, service worker, and the documented Sociobot license verification endpoint. Added a minimal Permissions-Policy; clipboard write remains available to the site’s explicit copy action.
- Replaced the fixed `caption-cues-v1` worker with a generated worker. `scripts/build-service-worker.mjs` hashes all finalized release files except the generated worker itself, writes that content-derived version into the worker, precaches the shell, removes prior Caption Cues caches, takes control immediately, uses network-first navigation, and cache-first same-origin assets.
- Registration uses `updateViaCache: 'none'`, and the deployed worker itself is `no-cache`, so a release is not held by the HTTP cache.
- Preserved the MV3 extension and downloadable ZIP. Added an automated unpacked-extension smoke check for speaker/name/sound emphasis and `Alt+R` replay.

## Build and verification

From a clean checkout with Node 20+:

```sh
npm ci
npm run check
npm run verify:extension
```

Results on 2026-08-27:

- `npm ci`: pass; 0 vulnerabilities reported.
- `npm run check`: pass — typecheck, 13 tests, production extension/ZIP/site build.
- `npm run verify:extension`: pass — loaded `dist/extension` in Chromium, verified safe DOM caption text preservation plus speaker, name, sound emphasis and `Alt+R` replay.
- `unzip -t dist/site/downloads/caption-cues-chrome.zip`: pass; 11 MV3 files, no archive errors. The ZIP SHA-256 remains `859c81e52a556fd60a44769521e3173f273e262e212b873875eb195ebb190ae4`.
- `tests/service-worker-update.test.ts`: pass — generated build A controls a browser client; after a release-content change, build B gets a distinct cache name, replaces A’s cache/controller, renders build B, and renders build B again after the context goes offline.
- Current production build: site JS 5.47 KB (2.57 KB gzip), CSS 10.26 KB (3.03 KB gzip), no webfonts, largest WebP 123.62 KB, unpacked extension 37.98 KB, ZIP 22.99 KB. The generated worker cache is `caption-cues-fc10572af8ede53ba578` for this build.

The deployable directory is `dist/site`; it includes `staticwebapp.config.json` at its root. Deploy with the factory’s Standard static path:

```sh
/opt/fleet/lib/deploy-static.sh caption-cues dist/site
```

## Remaining release verification

After deploy, run the factory URL verifier and inspect the live response headers for `/assets/<hashed-js>`, `/service-worker.js`, and `/downloads/caption-cues-chrome.zip`. Confirm CSP and Permissions-Policy are present, immutable asset caching is applied, and the worker response is `no-cache`. Then run Axe and Lighthouse against the live HTTPS URL. This handoff will be updated with live evidence once deployment completes.

## Known product boundaries

- Caption Cues only enhances browser-exposed `TextTrack` or visible caption DOM. Pixel-burned, DRM-hidden, inaccessible closed-shadow, and cross-origin-isolated captions remain intentionally untouched.
- Sociobot billing still needs the factory’s live product registration/return URL. All comprehension features remain free; the supporter unlock is cosmetic.
- The outcome study (fewer replay requests over a 20-minute video) needs moderated participant testing; the product intentionally does not silently collect analytics.

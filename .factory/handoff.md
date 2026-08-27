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

## Live Standard-static verification

Deployed to <https://caption-cues.sociobot.in/> through the factory Standard Static Web Apps path on 2026-08-27.

- Factory `verify-url.sh`: pass — HTTP 200, 1,753 ms network-idle navigation, title/lang/one `<h1>`/`<main>` present, every image has alt text, no unnamed buttons, and no console/page errors.
- Live headers: `/assets/home-BMy72pU6.js` returns `public, max-age=31536000, immutable`; `/service-worker.js` returns `no-cache`; the extension download returns `public, max-age=3600`; CSP and Permissions-Policy are present on all checked responses.
- Live artifact identity: local and deployed JS SHA-256 `511136c12c3233b6ad5a548c9b977f6f0d5199e3f2c6608aefd3f446ec81c96d`, ZIP SHA-256 `859c81e52a556fd60a44769521e3173f273e262e212b873875eb195ebb190ae4`, and worker SHA-256 `5ef1e33357074d38e82be8a119c0c8e3217a0bbd8f8940ee4981b76fa51512a2` match exactly.
- Playwright Axe WCAG 2 A/AA at 390 × 844: 0 violations. (Axe CLI’s Selenium Chrome driver could not start in this root container; Playwright Axe, already in this repository, was used instead.)
- Lighthouse mobile: Performance 100, Accessibility 100, Best Practices 100, SEO 100; FCP 0.8 s, LCP 1.2 s, TBT 0 ms, CLS 0.
- Live PWA smoke: the production worker controlled the page; a forced offline reload retained the title and `<h1>` with zero console/page errors.

## Known product boundaries

- Caption Cues only enhances browser-exposed `TextTrack` or visible caption DOM. Pixel-burned, DRM-hidden, inaccessible closed-shadow, and cross-origin-isolated captions remain intentionally untouched.
- Sociobot billing still needs the factory’s live product registration/return URL. All comprehension features remain free; the supporter unlock is cosmetic.
- The outcome study (fewer replay requests over a 20-minute video) needs moderated participant testing; the product intentionally does not silently collect analytics.

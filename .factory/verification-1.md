# Independent verification 1 — FAIL

**Verified:** 2026-08-27 UTC  
**Candidate:** `9de3bc208937c80ad34b901e8d29307497450a6b` (`chore: harden accessibility build and release handoff`)  
**Live URL:** <https://caption-cues.sociobot.in/>  
**Verdict:** **FAIL** — the caption extension and site work, but two medium-severity release defects leave caching and PWA updates non-compliant.

## Environment and build evidence

The checkout was clean and already at the requested commit before installation. Verification used Node `v22.23.2`, npm `10.9.8`, a clean `npm ci`, and Chromium 151.

| Check | Result |
| --- | --- |
| `npm ci` | PASS; 225 packages audited, 0 vulnerabilities |
| `npm run typecheck` | PASS |
| `npm test` | PASS; 2 files / 11 tests |
| Lint | No lint script or lint configuration is provided in this repository. |
| Exact production command: `npm run build` | PASS; extension, ZIP, and `dist/site` produced |
| Packaged extension | PASS; ZIP lists manifest, popup, background, content script, CSS, and icons; 22,994 bytes compressed |
| Runtime/bundle budget | PASS; site JS 5,445 B (2,550 B gzip), CSS 10,264 B (3,030 B gzip), no webfonts; extension build reports 37.98 KB; largest responsive hero WebP is 123,622 B. |

## Product exercise

Fresh Playwright checks loaded the built MV3 extension rather than calling implementation functions directly.

- **DOM captions:** a representative `MARA: Rowan heard [thunder] at River Gate.` was safely rewritten with speaker, name, and sound emphasis. Adding a saved word, turning Names off, disabling the extension, and re-enabling it all updated/restored the visible caption correctly. Blank saved-word submission left the list unchanged.
- **WebVTT/TextTrack:** an actual playing MP4 with a standard VTT track produced the accessible overlay while the native track changed from `showing` to `hidden`. At 1.96 s the overlay was visible and contained emphasized `MINA`, names, and `[doorbell]`.
- **Replay:** `Alt+R` showed the last DOM caption in the overlay; the timed-track path recorded the cue start time for seek-and-play replay.
- **Error/recovery:** an intercepted invalid license response displayed “This license is not active. Check the token or buy again.” The empty required restore field was invalid natively. The no-caption status path is exposed by the content-script `GET_STATUS` response without a detected cue.
- **Privacy/network:** first-load desktop and mobile requests were only the same-origin document, JS, and CSS. No analytics, third-party fonts, trackers, or runtime CDNs were requested. License verification is user initiated and targets only the documented Sociobot API. Caption rendering uses text nodes; the exercised DOM/VTT content did not inject caption markup.

## Browser, accessibility, and responsive evidence

- Factory `verify-url.sh https://caption-cues.sociobot.in`: PASS. HTTP 200, 676 ms navigation, title/lang/one main/one h1 present, 0 images missing `alt`, 0 unnamed buttons, and 0 browser errors.
- Playwright + axe WCAG 2 A/AA: **0 violations** at 1440×1000 and 390×844; the built extension popup also had **0 violations**.
- At 390 px, `scrollWidth - clientWidth = 0`. The interactive preview removed the Sound and Saved-word emphasis when their controls were toggled, then restored it.
- Keyboard checks reached controls and the FAQ summary, and `Alt+R` was exercised keyboard-only. The authored focus rule is a 3 px cobalt outline. With reduced motion emulated, button transitions and animations were `0s` and document smooth scrolling became `auto`.
- Offline shell: after service-worker activation, a forced offline reload rendered the cached title and h1 without page errors. The offline event also made the offline notice visible before reload.
- No product console/page errors occurred in the live-site, DOM-caption, or WebVTT exercises. (A deliberately minimal test fixture initially returned a favicon 404; that was excluded as fixture noise.)

## Live deployment identity and headers

The live response is the candidate artifact, not a stale deployment:

| Artifact | SHA-256 comparison |
| --- | --- |
| `/` vs `dist/site/index.html` | identical: `7b7d8d51140929c1d4be2a2137683dbaf90af9aa3bd5e7d67467175c76b89cb3` |
| `/assets/home-CgVli3JS.js` | identical: `9afbb3c58fbfb2d8662a7815f6df6be97e26c85a97f0b13a2699acdf34823f7e` |
| `/assets/style-a4tTYij0.css` | identical: `44ced2085a64230e5caca54ef56c0736e0ca182e4702ae8e89036511a93dfcae` |
| `/downloads/caption-cues-chrome.zip` | identical: `859c81e52a556fd60a44769521e3173f273e262e212b873875eb195ebb190ae4` |

Live responses include HSTS, `X-Content-Type-Options: nosniff`, and `Referrer-Policy: strict-origin-when-cross-origin`. No Content-Security-Policy or Permissions-Policy was returned.

## Defects

### Medium — live deployment ignores the committed cache policy

`dist/site/_headers` requests immutable year-long caching for `/assets/*`, one-hour caching for the download, weekly image caching, and `no-cache` for `/service-worker.js`. Fresh HEAD requests to the live URL instead returned the same `Cache-Control: public, must-revalidate, max-age=30` for `/`, hashed JS, CSS, ZIP, image, and service worker. The `_headers` file is being served/deployed as a static artifact rather than applied by the host.

This fails the static-product caching requirement and makes the intended service-worker update policy ineffective. Configure the deployment platform to apply these rules (or use its native headers configuration), then reverify the actual response headers.

### Medium — service-worker cache does not reliably update when the site changes

`site/public/service-worker.js` hard-codes `const CACHE = 'caption-cues-v1'` and uses cache-first responses for same-origin GETs, including `/`. A controlled browser update test using that exact worker algorithm installed release 1, changed the server HTML to release 2 while the worker source remained unchanged, and reloaded. The page still rendered **Release 1** from Cache Storage.

An ordinary site release can therefore stay stale indefinitely until cache eviction unless every release also manually changes the worker source/cache name. Generate a build-specific cache version (and update it with every deploy), or use an appropriate network-first/revalidation strategy for HTML; add an automated update test. Consider `skipWaiting`/client-update messaging so a new worker does not remain waiting unnoticed.

### Low — missing browser hardening policies

The live host does not emit CSP or Permissions-Policy. Current code did not expose an immediate injection path in testing, so this is defense-in-depth rather than a demonstrated exploit. Add a restrictive CSP compatible with the static module and required Sociobot link/fetch, and a minimal Permissions-Policy, at the deployment layer.

## Scope and follow-up

No product code was modified during verification. The core assistive workflow is otherwise suitable for release: it only processes browser-exposed captions, has the required independent emphasis controls and replay path, keeps caption data local, and plainly states its compatibility/medical boundaries. Resolve the two medium defects and repeat the live header and PWA-update checks before marking the candidate PASS.

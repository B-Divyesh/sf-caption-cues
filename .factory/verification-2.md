# Independent verification 2 — Caption Cues

## Verdict: FAIL

**Candidate:** `8e64e86e53de951c68db68376abb360adb68f704` (clean `main` checkout)  
**Live URL:** <https://caption-cues.sociobot.in/>  
**Verified:** 2026-08-27 UTC  
**Scope:** independent browser-extension and deployed-static-site QA against the researched brief and factory acceptance contract. Product source was not changed.

The shipped product and live deployment function correctly in the exercised paths and the deployment is byte-identical to the candidate build. The candidate nevertheless fails the release contract because the documented clean install cannot run the repository's integration test: `npm ci && npm run check` fails until a separately downloaded, undocumented Playwright Chromium binary is installed. This makes the required local quality gate non-reproducible from the stated prerequisites.

## Environment and build evidence

- Started from a clean worktree at exactly `8e64e86e53de951c68db68376abb360adb68f704`; `git status --short` was empty.
- Node `v22.23.2`; `npm ci` completed successfully (225 packages audited, 0 vulnerabilities).
- First clean gate attempt: `npm run check` **failed**. `tests/service-worker-update.test.ts` could not launch `/opt/pw-browsers/chromium_headless_shell-1234/.../chrome-headless-shell`; Playwright instructed `npx playwright install`.
- After the explicit environment repair `npx playwright install chromium`, `npm run check` passed: TypeScript check, all 13 Vitest tests, exact production extension/ZIP/site build.
- `npm run verify:extension` passed.
- `npm run test:pwa-update` passed independently.
- `unzip -t dist/site/downloads/caption-cues-chrome.zip` passed (11 MV3 files).

Production output from `npm run build`:

| Artifact | Size | Budget/result |
| --- | ---: | --- |
| Site JS | 5.47 KB (2.57 KB gzip) | Pass, under 200 KB |
| Site CSS | 10.26 KB (3.03 KB gzip) | Pass, under 50 KB |
| Largest hero WebP | 123.62 KB | Pass, under 300 KB |
| Unpacked MV3 extension | 37.98 KB | Small; pass |
| Chrome ZIP | 22.99 KB | Valid archive |

## End-to-end extension checks

The exact built `dist/extension` was loaded unpacked in a fresh Chromium profile.

- Visible caption normal case: `MARA: Rowan heard [thunder] at River Gate.` preserved all text and applied the separate speaker, name, sound, and saved-word treatments.
- Manual word boundary/recovery: popup submission of blank input created 0 entries; `Gate` created 1 entry; case-insensitive duplicate `gate` remained 1 entry. The saved word was emphasized on the active caption.
- Keyboard: `Alt+R` re-showed/replayed the most recent caption.
- State recovery: disabling restored the original caption text with 0 residual markup; re-enabling and rule-off settings did not leave stale emphasis.
- Standard `TextTrack` path: a muted locally served media element with a timed cue `MARA: Rowan enters [doorbell] at Gate.` displayed the extension overlay and correctly used the selected `ink` plate. This covers the brief's browser-exposed-track path, not merely a DOM mock.
- No console or page errors occurred in these runs.

The extension requests only `storage`, `activeTab`, and page access needed to locate browser-exposed captions. It processes caption text locally; no capture, download, or DRM-bypass capability was observed. The optional license verifier is the only declared outbound endpoint and is invoked only on voluntary license verification.

## Live deployment, accessibility, and resilience

The fresh build and production deployment match exactly:

| File | SHA-256 (local and live) |
| --- | --- |
| `assets/home-BMy72pU6.js` | `511136c12c3233b6ad5a548c9b977f6f0d5199e3f2c6608aefd3f446ec81c96d` |
| `service-worker.js` | `5ef1e33357074d38e82be8a119c0c8e3217a0bbd8f8940ee4981b76fa51512a2` |
| `downloads/caption-cues-chrome.zip` | `859c81e52a556fd60a44769521e3173f273e262e212b873875eb195ebb190ae4` |

- Desktop (1440 × 900): title, one `h1`, and one `main` present; interactive preview initially rendered 5 emphasis spans. Turning the speaker rule off removed its one speaker span and turning it back on restored it. No console/page errors.
- Mobile (390 × 844): `scrollWidth === innerWidth === 390` (no horizontal overflow); tested action targets were 46–54 CSS px high. No console/page errors.
- Keyboard: first Tab focuses the skip link; computed focus is a visible `rgb(21, 70, 199) solid 3px` outline. No trap was encountered in the exercised controls.
- Reduced motion: `prefers-reduced-motion: reduce` matched, demo transition duration was `0s`, and document scrolling was `auto`.
- Axe Playwright, WCAG 2 A/AA: **0 serious/critical findings** on desktop and 390 px mobile.
- A controlled invalid license response produced “This license is not active. Check the token or buy again.” A following valid response recovered to “Supporter edition unlocked…”. Core caption tools are not gated.
- Initial live navigation requested only `https://caption-cues.sociobot.in`; no analytics, fonts, scripts, or other third-party origins were requested. The optional license test was intercepted as a controlled response.
- PWA: production service worker controlled the page; after a normal reload, an offline reload retained the title and `h1`. The dedicated update test also passed, proving a changed release takes a new cache/controller and remains available offline.
- Lighthouse mobile, provided throttling: Performance 100, Accessibility 100, Best Practices 100, SEO 100; FCP 0.4 s, LCP 0.4 s, TBT 0 ms, CLS 0.

## Response policies and cache behavior

`https://caption-cues.sociobot.in/` responded HTTP/2 200 with HSTS, restrictive CSP (`default-src 'self'`; only the voluntary Sociobot license API in `connect-src`), Permissions-Policy disabling camera/mic/geolocation/payment and other unnecessary features, strict-origin cross-origin referrer policy, and `nosniff`.

- Hashed JS: `Cache-Control: public, max-age=31536000, immutable`.
- `service-worker.js`: `Cache-Control: no-cache`.
- Extension ZIP: `Cache-Control: public, max-age=3600`.
- Root document: `Cache-Control: public, must-revalidate, max-age=30`.

These match the committed Azure Static Web Apps configuration and support service-worker updates correctly.

## Defects by severity

| Severity | Defect | Evidence and required resolution |
| --- | --- | --- |
| P1 — release blocker | The clean, documented quality gate cannot run after `npm ci`. | `npm run check` fails before its production build because Playwright's Chromium/headless-shell executable is absent. README says only Node 20+ is required and tells users to run `npm ci` then `npm test`; neither package scripts nor documentation provisions the browser. Add a repeatable browser-install step (for example a CI/setup script) and document it, then verify from a fresh browser cache. |
| P2 | None found. | — |
| P3 | None found. | — |

## Known product boundaries (accepted)

The product honestly limits itself to browser-exposed `TextTrack` and visible caption DOM. Pixel-burned, DRM-hidden, inaccessible closed-shadow, and cross-origin-isolated captions remain out of scope, consistent with the brief. The brief's 20-minute/30%-fewer-replays outcome requires participant research and cannot be established by automated product QA; no undisclosed analytics were found.

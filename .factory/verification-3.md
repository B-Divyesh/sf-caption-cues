# Independent verification 3 — Caption Cues

## Verdict: PASS

**Candidate:** `f418b0fa9e269aa28f10025214b6a82414a7073d` (`docs: record repaired QA deployment`)  
**Live URL:** <https://caption-cues.sociobot.in/>  
**Verified:** 2026-08-27 UTC  
**Scope:** Clean-checkout, production-build, MV3-extension, deployed-site, privacy, accessibility, PWA, response-policy, and performance QA against `.factory/brief.json` and the factory contract. No product source was changed.

The previous deployment-only/clean-browser concern is **not reproduced**. The repository now makes its pinned Playwright browser setup explicit, and a clean install plus the full production release suite passes. The live site is byte-identical to the fresh candidate output and serves the required security and caching policies.

## Clean checkout and release gate

Environment: Node `v22.23.2`, npm `10.9.8`, Linux, Playwright `1.62.1` from the lockfile.

| Check | Result |
| --- | --- |
| Clean `npm ci` | PASS — 225 packages, 0 audit vulnerabilities |
| Isolated browser-cache gate, `npm run check:clean-browser` | PASS — created an empty `PLAYWRIGHT_BROWSERS_PATH`, downloaded only the pinned Chromium/FFmpeg/headless shell, ran the release suite, then removed that cache |
| Documented `npm run setup:browser` | PASS — provisioned Playwright Chromium `151.0.7922.34` into `/opt/pw-browsers` |
| `npm run typecheck` | PASS |
| `npm test` | PASS — 4 files, 13 tests |
| Exact production command, `npm run build` | PASS — MV3 extension, Chrome ZIP, static site, and versioned service worker produced in `dist/` |
| Full `npm run verify:release` | PASS — typecheck, tests, production build, real unpacked-extension smoke, PWA update test, and ZIP integrity check |
| Lint | No lint script/configuration is supplied; TypeScript checking is the repository's available static check. |

The production build measured 5,469 B JavaScript (2,570 B gzip), 10,264 B CSS (3,030 B gzip), no webfonts, a 123,622 B largest WebP, a 37.98 KB unpacked MV3 extension, and a valid 22,994 B Chrome ZIP. All are within the applicable budgets.

## End-to-end product evidence

The exact `dist/extension` was loaded into a fresh Chromium profile, not tested through implementation-only imports.

- A visible supported caption, `MARA: Rowan heard [thunder] at River Gate.`, retained the complete text while independently marking `MARA` as the speaker, `Rowan`/`River`/`Gate` as names, and `[thunder]` as the sound cue.
- Keyboard-only `Alt+R` rendered the last line in the overlay and announced **Last caption replayed**. The packaged smoke test also passed from the built extension.
- Popup exercise accepted one saved word (`Gate`), rejected a case-insensitive duplicate (`gate`) and whitespace-only submission, with no duplicate entry. Its enable toggle and individual rules persisted through extension storage.
- Turning Names off removed name marks; turning the master switch off restored the original DOM caption with no residual spans; turning it back on enhanced the line again.
- The popup's no-caption recovery message is **This browser page does not allow extensions. Try a video tab.** when no eligible tab is active. The extension source's status path also returns a non-error waiting state for a page without a detected cue.
- An actual playing HTML5 video with an exposed WebVTT caption track was exercised. Caption Cues changed its native track from `showing` to `hidden`, rendered `MARA: Rowan enters [doorbell] at Gate.` in its accessible overlay, and separately marked speaker, names, and sound. TextTrack handling is limited to captions that the browser exposes, as the brief requires; it neither downloads media nor circumvents DRM.

## Live deployment identity and policies

Fresh SHA-256 comparisons show the deployment is this candidate artifact:

| File | SHA-256 (local = live) |
| --- | --- |
| `/` and `dist/site/index.html` | `7d350e2a223b898487066fe0e7d84070f083a390cdfdb474166b466bf08a5f45` |
| `/assets/home-BMy72pU6.js` | `511136c12c3233b6ad5a548c9b977f6f0d5199e3f2c6608aefd3f446ec81c96d` |
| `/assets/style-a4tTYij0.css` | `44ced2085a64230e5caca54ef56c0736e0ca182e4702ae8e89036511a93dfcae` |
| `/service-worker.js` | `5ef1e33357074d38e82be8a119c0c8e3217a0bbd8f8940ee4981b76fa51512a2` |
| `/downloads/caption-cues-chrome.zip` | `859c81e52a556fd60a44769521e3173f273e262e212b873875eb195ebb190ae4` |

Live HTTP/2 responses returned 200 and include HSTS, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, the restrictive deployed CSP (`default-src 'self'`; only the voluntary Sociobot API in `connect-src`), and a restrictive Permissions-Policy. Cache policy is effective at the host: hashed JS/CSS is `public, max-age=31536000, immutable`; the ZIP is one hour; hero images are one week; and `service-worker.js` is `no-cache`. This resolves verifier-1's host-policy defect.

## Browser, accessibility, privacy, and resilience

- Fresh live desktop browser run (1440 × 1000): title, `lang=en`, exactly one `h1`, exactly one `main`, labelled image, and named buttons; preview speaker rule toggled 1 → 0 → 1; no console or page errors.
- Mobile run (390 × 844): `scrollWidth` and body width were both 390; no horizontal overflow or page errors. Reduced-motion emulation produced `scroll-behavior: auto` and `0s` button transition duration.
- Keyboard: first Tab reaches the skip link, which is visible at 178 × 52 px with a `rgb(21, 70, 199) solid 3px` focus outline. No trap found in the exercised controls.
- Axe WCAG 2 A/AA: 0 violations (therefore 0 serious/critical) on live desktop, live 390 px mobile, and the built extension popup.
- PWA: the production service worker took control; after a normal reload, forced offline reload retained the title and `h1`. The repository's controlled release-A → release-B test also passed, including offline build-B reload.
- A real invalid license response displayed **This license is not active. Check the token or buy again.** A following valid response recovered to **Supporter edition unlocked. Copy this license into the extension too.** All core assistive tools remain free.
- A fresh live first load requested only `https://caption-cues.sociobot.in`. Source and network review found no analytics, trackers, third-party font/script CDN, or caption-content upload. The only optional outbound request is user-initiated license verification to the documented Sociobot endpoint. Caption output is constructed with text nodes, preventing caption HTML injection in the exercised path.
- Lighthouse 12.8.2 mobile, provided throttling: **Performance 100, Accessibility 100, Best Practices 100, SEO 100**; FCP 0.4 s, LCP 0.4 s, TBT 0 ms, CLS 0.

## Defects by severity

| Severity | Finding |
| --- | --- |
| P1 / blocker | None found. |
| P2 | None found. |
| P3 | None found. |

## Accepted boundaries

The brief's participant outcome (30% fewer replay requests during a 20-minute video) requires user research and cannot be proven by automated QA. The product honestly confines itself to DOM/TextTrack captions exposed to the viewer; pixel-burned, DRM-hidden, closed-shadow, or inaccessible captions are correctly outside scope.

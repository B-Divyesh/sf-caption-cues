# Perfection-loop round 5 finding map

Sources read in full: `.factory/review-1.md` through `.factory/review-5.md`,
`.factory/polish-1.md` through `.factory/polish-4.md`, and
`.factory/verification-1.md` through `.factory/verification-3.md`.

Repair commit: `7644f69aa26ad70f214c4fb103d544af30daf5fe`.
The shared evidence is the fresh-clone command log, the packaged-extension
screenshot at `.factory/evidence/polish-5-extension/caption-emphasis.png`, and
the post-deploy audit at `.factory/evidence/polish-5-live-audit/`.

## This round

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-5-1 / reopened B3 | Extended the sole `@claim:caption-emphasis` test from the demo into a fresh `dist/extension` profile. It changes a recognised caption to `MARA: Rowan, wait at Thessaly Gate. [train approaching]`, saves `Gate` through the real popup, and observes the four distinct cue kinds and rendered treatments. The content script now marks each rendered cue with its kind, so a saved word cannot be mistaken for a name in evidence. | `@claim:caption-emphasis`; `.factory/evidence/polish-5-extension/caption-emphasis.png`; live `/downloads/caption-cues-chrome.zip` SHA check. |
| F-5-2 | Replaced the unexplained README phrase “Chrome Manifest V3 extension” with “Chrome extension”; regenerated its audited word-count row and added a copy regression. | `reviewed public language > describes the browser extension without unexplained platform terminology`; live `/` and README source check. |

## Review 1: first use, structure, and mobile

| Finding | Change retained and rechecked | Evidence |
| --- | --- | --- |
| B1 | The first screen keeps the direct job, named audience, phone-visible sample action, result text, and candid Developer-mode ZIP disclosure. | `browser-qa > keeps the audience, sample action, and install disclosure in the phone first screen`; `home-mobile.png`; live `/`. |
| B2 | `?demo=1` enters the separate three-line station sample with the persistent banner, Reset demo, Start for real, and `demo:` storage only. | `@claim:demo-isolation`, `@claim:site-offline`; `demo-mobile.png`; live `/?demo=1`. |
| B3 | The registry has exactly one tagged observable test per active claim. The only extension proof gap is closed by F-5-1. | `release-policy > maps every registered claim to exactly one tagged test and no extra tags`; all 15 exact fresh-clone commands; live ZIP SHA. |
| B4 | Demo, Privacy, Terms, and the branded 404 remain real routes with metadata, shell, focus handoff, and a return link. | `browser-qa > uses the common route shell, designed 404, focus handoff, and readable wordmark`; `404-desktop.png`; live `/not-a-real-route`. |
| B5 | The unavailable paid checkout, pricing, merchant, license UI, and purchase claims remain absent. | `@claim:no-account-free-tools`, `@claim:no-tracking-runtime`; live link crawl. |
| M1 | Route-specific plain titles, descriptions, canonical URLs, OG/Twitter data, favicon, and original social art remain complete. | `browser-qa > ships route metadata and stays within static performance budgets`; live `/`, `/demo/`, `/privacy/`, `/terms/`, 404. |
| M2 | Shared header/footer, legal links, skip link, polite route status, heading focus, and Back focus remain on every route. | `browser-qa > uses the common route shell, designed 404, focus handoff, and readable wordmark`; live `/privacy/` then Back. |
| M3 | `.brand-mark` remains the only circular mark; the wordmark retains its natural width. | Same browser-QA test; `home-mobile.png`; live `/`. |
| M4 | The secondary download remains honestly labelled as an unpacked Chrome extension ZIP for Developer mode. | first-screen browser-QA test; `home-mobile.png`; live `/`. |
| N1 | All visible phone controls retain 44 px targets with no horizontal overflow. | `browser-qa > gives visible interactive controls a 44px target on mobile`; live audit at 390 px. |

## Review 1: registered-claim findings

| Finding ID | Change retained and rechecked | Evidence |
| --- | --- | --- |
| site-offline | The claim is limited to the precached isolated demo after one visit. | `@claim:site-offline`; `demo-mobile.png`; live offline demo. |
| caption-emphasis | Demo and packaged extension both prove speaker, name, saved-word, and sound-cue emphasis. | `@claim:caption-emphasis`; `caption-emphasis.png`; live ZIP SHA. |
| no-account / free-core | All caption and replay controls run without sign-in, checkout, or license. | `@claim:no-account-free-tools`; `demo-mobile.png`; live `/demo/`. |
| replay-last-line | Button and `Alt+R` replay both sample lines. | `@claim:replay-last-line`; `demo-mobile.png`; live `/demo/`. |
| exposed-captions-only / supported-caption-sources / named-site-support | The wording names only tested standard browser tracks and selected caption text shown on the page. | `@claim:exposed-caption-sources`; `caption-emphasis.png`; live `/privacy/`. |
| no-media-capture | The built extension’s complete caption/replay flow makes no media, audio, video, or transcript request. | `@claim:no-media-capture`; `caption-emphasis.png`; live ZIP SHA. |
| unsupported-player-state / hidden-caption-limit | An unrecognised surface remains unchanged and the popup shows the specific waiting state. | `@claim:hidden-caption-limit`; live ZIP SHA. |
| supporter-unlock / checkout-security / merchant-of-record / site-license-transfer / license-network-only | Unavailable paid and license behavior remains removed rather than promised. | `@claim:no-account-free-tools`, `@claim:no-tracking-runtime`; live link crawl. |
| caption-local-processing / caption-data-private | Caption text and settings remain local; demo requests remain same-origin. | `@claim:local-caption-data`; `demo-mobile.png`; live request audit. |
| generated-art | Provenance hash and shipped social image remain verified. | `@claim:generated-art`; `home-mobile.png`; live footer. |
| popup-controls | All popup rules, size, background, and saved-word control run without an account. | `@claim:no-account-free-tools`; `caption-emphasis.png`; live ZIP SHA. |
| overlay-restoration | Disabling restores original DOM captions and TextTrack mode. | `@claim:overlay-restoration`; live ZIP SHA. |
| site-package / build-artifacts | Build emits legal/demo pages, MV3 extension, and valid Chrome ZIP. | `@claim:package-output`, `npm run verify:zip`; live download. |
| node-version | The unverified public Node-version promise remains absent. | copy policy; live README source. |
| browser-provisioning / clean-browser-gate | The pinned browser setup and isolated-cache release gate are rerun from a fresh clone. | fresh `npm run setup:browser`, `npm run check:clean-browser`; clean-clone log. |
| release-cache-policy | The worker keeps a release hash, network-first pages, and cache-first assets. | `@claim:offline-cache-policy`, PWA update test; live offline demo. |
| hosting-policy | Native Static Web Apps policy retains CSP, Permissions-Policy, cache directives, nosniff, and referrer policy. | Static Web Apps policy test; live response-header audit. |
| release-verifiers | All documented release checks were rerun from a fresh clone. | fresh `npm run verify:release`; live audit. |
| permissions | The package has only `activeTab`, `storage`, and page access. | `@claim:permission-minimum`; live ZIP SHA. |
| no-tracking-runtime | No analytics, remote fonts/scripts, or extension network path ships. | `@claim:no-tracking-runtime`; live request audit. |

## Review 1 copy, and later language regressions

| Finding | Change retained and rechecked | Evidence |
| --- | --- | --- |
| C1 | Direct job headline replaces “flatten.” | first-screen browser-QA; live `/`. |
| C2 | Result-naming sample action replaces “Try the rules first.” | `@claim:demo-isolation`; live `/?demo=1`. |
| C3 | Browser/no-account/offline/free facts replace technical shorthand. | copy policy and related claims; `home-mobile.png`. |
| C4 | “Caption preview” replaces “Proof 01.” | copy policy; live `/#preview`. |
| C5 | “See each highlighted caption part” replaces “landmarks.” | copy policy; live `/#preview`. |
| C6 | “How Caption Cues works” replaces “Method 02.” | copy policy; live `/#how`. |
| C7 | Literal exposed-caption/no-capture language replaces figurative privacy copy. | `@claim:no-media-capture`; live `/#how`. |
| C8 | “Visible caption text” replaces DOM jargon. | copy policy; live `/#how`. |
| C9 | Contextual selective-highlighting heading replaces “Why 03.” | copy policy; live `/`. |
| C10 | Literal spotting benefit replaces “louder.” | copy policy; live `/`. |
| C11 | User-selected caption parts replace “hierarchy” and “anchors.” | copy policy; live `/`. |
| C12 | Dead paid section remains removed. | copy policy; live `/`. |
| C13 | Obsolete Cobalt plate term remains removed. | copy policy; live `/`. |
| C14 | Merchant jargon remains removed. | copy policy; live `/`. |
| C15 | “Installation and compatibility” remains complete. | copy policy; live FAQ. |
| C16 | Developer-mode disclosure remains candid. | first-screen browser-QA; live `/`. |
| C17 / F-2-1 / F-3-1 | “Selected caption text shown on the page” remains the one tested name across landing, privacy, README, registry, audit, and tests. | terminology/copy regressions; live `/privacy/`. |
| C18 | Literal footer one-liner remains. | copy policy; live shared footer. |
| F-4-2 | The full copy audit uses a documented whitespace tokenizer, now with the corrected Chrome-extension row and round-5 stamp. | `reviewed public language > recounts every audited visible string from its named source`; `.factory/copy-audit.md`. |
| F-4-3 | Popup still says “Caption controls,” not a metaphor. | popup-language regression; live ZIP SHA. |
| F-4-4 | Popup action still says “Save word.” | popup-language regression; `caption-emphasis.png`; live ZIP SHA. |

## Earlier independent verification findings

| Finding | Change retained and rechecked | Evidence |
| --- | --- | --- |
| Verification 1: cache policy | Release worker is versioned; SWA config defines immutable assets, no-cache worker, and matching header policy. | PWA update and Static Web Apps policy tests; live header audit. |
| Verification 1: stale-worker update | Controlled release A → B update remains available offline. | `generated service worker release updates > moves a controlled client from build A to build B and stays available offline`; live offline demo. |
| Verification 1: security headers | Restrictive CSP, Permissions-Policy, nosniff, and referrer policy remain in native host config. | Static Web Apps policy test; live header audit. |
| Verification 2 P1 | Fresh setup provisions lockfile-pinned Chromium before browser tests; isolated clean-cache gate succeeds. | fresh `npm run setup:browser`; fresh `npm run check:clean-browser`; clean-clone log. |

## Post-deploy result

The work-order static deployment of `dist/site` is live at
`https://caption-cues.sociobot.in/`. `npm run verify:live` passed every route
at 390 × 844 and 1440 × 900: expected status and title, one H1/main, no
overflow, zero serious/critical Axe findings, first-screen/focus restoration,
demo isolation, 32 same-origin requests, and offline demo replay. The cold URL
check reported no errors, correct language/landmarks/alt text, and a 2444 ms
load. Local/live HTML and ZIP SHA-256 values match in `hashes.txt`; Lighthouse
mobile scored 100 Performance, 100 Accessibility, 100 Best Practices, and 100
SEO (LCP 1.3 s, TBT 40 ms, CLS 0).

Evidence: `.factory/evidence/polish-5-live-audit/audit.json`, `headers.txt`,
`hashes.txt`, `home-mobile.png`, `demo-mobile.png`, `privacy-desktop.png`, and
`404-desktop.png`; `.factory/evidence/polish-5-cold-url/verify.json`; and
`.factory/evidence/polish-5-lighthouse/report.json`. The catalog description
remains the required verb-first, 97-character sentence: “Highlight names,
speaker labels, sound cues, and saved words in captions already shown by a
page.”

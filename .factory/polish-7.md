# Perfection-loop round 7 finding map

**Repair code commit:** `839a099c69ea575704d979bc5e5841fe93d4a12f`  
**Deployment:** `https://caption-cues.sociobot.in/` (Static Web Apps deployment `fc008fe5-83e2-4fc0-9691-f5d162ba870b`)  
**Result:** PASS — no review finding remains open.

## Round 7 finding

| Finding ID | Change made | Evidence |
| --- | --- | --- |
| F-7-1 / reopened B3 | Extended the sole `@claim:replay-last-line` test into two fresh profiles running `dist/extension`. The timed-track fixture uses a browser `TextTrack` with a cue at 5.25 seconds; `Alt+R` must move the video from 11 seconds to 5.05 seconds. The page-caption fixture opens the real popup, activates **Replay last caption**, then asserts that the exact previous line is reshown in an atomic polite live status. The demo keyboard/button assertions remain in the same tagged test. Updated the registry sandbox description to match. | `registered public claims > @claim:replay-last-line replays the demo and both packaged-extension caption paths`; [replayed page caption](evidence/polish-7-extension/replay-page-caption.png); [real popup](evidence/polish-7-extension/replay-popup.png); live ZIP SHA-256 equals the tested local ZIP. |

## Review 1 structure, first use, and mobile

| Finding ID | Change retained and rechecked | Evidence |
| --- | --- | --- |
| B1 | The first screen still gives the job, audience, primary sample action, result text, three facts, and Developer-mode download disclosure. | `built-site browser... > keeps the audience, sample action, and install disclosure in the phone first screen`; [cold live phone](evidence/polish-7-live-home/screenshot-mobile.png). |
| B2 | `?demo=1` still enters the isolated three-line sample in one click. The persistent banner, Reset demo, Start for real, and `demo:`-only storage remain operational. | `@claim:demo-isolation`, `@claim:site-offline`; live audit `demoIsolation: pass`, `offlineDemo: pass`; [live demo](evidence/polish-7-live-audit/demo-mobile.png). |
| B3 | The registry still has exactly one tagged test for each of 15 claims. F-7-1 closes the remaining extension-versus-demo proof gap. | `release-policy > maps every registered claim to exactly one tagged test and no extra tags`; all 15 exact commands passed independently from the clean clone. |
| B4 | Demo, Privacy, Terms, and the designed HTTP 404 remain real routes with shared chrome and a return action. | Live audit checked ten route/viewport combinations; [designed 404](evidence/polish-7-live-audit/404-desktop.png). |
| B5 | The unavailable paid offer, checkout, merchant, and license paths remain absent. | `@claim:no-account-free-tools`, `@claim:no-tracking-runtime`; live crawl passed. |
| M1 | Route-specific titles, descriptions, canonicals, Open Graph/Twitter metadata, favicon, touch icon, and original social preview remain complete. | Browser metadata budget test; live audit titles for all five routes. |
| M2 | Shared header/footer, legal links, skip link, route announcement, H1 focus handoff, and Back focus remain intact. | Browser common-shell test; live audit `firstScreenAndFocus: pass`. |
| M3 | Only `.brand-mark` receives the circular treatment; the wordmark keeps natural width. | Browser computed-style regression; cold live screenshots. |
| M4 | The secondary action still names the unpacked Chrome extension and explains Developer mode. | First-screen browser regression; live `/`. |
| N1 | Phone controls remain at least 44 px, with no horizontal overflow. | Browser target-size regression and live audit at 390 px. |

## Review 1 copy findings

| Finding ID | Change retained and rechecked | Evidence |
| --- | --- | --- |
| C1 | Direct job headline remains: “Highlight the caption words you miss.” | Copy policy; cold live first screen. |
| C2 | Primary action remains “Try it with sample data.” | Copy policy; `@claim:demo-isolation`; live query entry. |
| C3 | Browser, account, offline, and free-tool facts remain concrete. | Copy policy; related claim tests; cold live first screen. |
| C4, C5, C6 | “Caption preview,” “See each highlighted caption part,” and “How Caption Cues works” remain contextual headings. | Copy policy and live home screenshot. |
| C7, C8 | Source and capture limits remain literal and use viewer language. | `@claim:caption-text-page-makes-available`, `@claim:no-media-capture`; live `/`. |
| C9, C10, C11 | The section says users choose what stands out and makes no untested efficacy claim. | Observable-language regression; `@claim:caption-emphasis`. |
| C12, C13, C14 | Dead paid copy, obsolete caption-background jargon, and merchant language remain absent. | Rejected-copy regression; live crawl. |
| C15, C16 | Installation heading and Developer-mode setup remain explicit. | Copy policy; first-screen browser regression. |
| C17 | “Caption text the page makes available” remains the single supported-source term. | Terminology regression; live audit `review2Terminology: pass`. |
| C18 | The footer uses the literal product one-liner on every route. | Shared-shell browser test and live screenshots. |

## Review 1 claim inventory

| Finding IDs | Change retained and rechecked | Evidence |
| --- | --- | --- |
| `site-offline` | The claim is limited to the isolated demo after one online visit. | `@claim:site-offline`; live offline reload and interaction. |
| `caption-emphasis` | All four cue treatments are observed in the demo and packaged extension. | `@claim:caption-emphasis`; live ZIP hash. |
| `no-account`, `free-core`, `popup-controls` | Every demo and popup control works without credentials, checkout, or a license. | `@claim:no-account-free-tools`. |
| `replay-last-line` | Demo button/keyboard replay plus packaged timed and page-caption paths are all observed. | `@claim:replay-last-line`; round-7 extension screenshots. |
| `exposed-captions-only`, `supported-caption-sources`, `named-site-support` | Only the tested browser TextTrack and page-provided text sources are promised. | `@claim:caption-text-page-makes-available`. |
| `unsupported-player-state`, `hidden-caption-limit` | Unsupported content remains exact and the real popup reports the waiting state. | `@claim:hidden-caption-limit`. |
| `no-media-capture` | Full extension caption/replay flow makes no media or transcript request. | `@claim:no-media-capture`. |
| `caption-local-processing`, `caption-data-private` | Settings remain in extension storage and no caption payload leaves the extension. | `@claim:local-caption-data`. |
| `supporter-unlock`, `checkout-security`, `merchant-of-record`, `site-license-transfer`, `license-network-only` | Unavailable billing behavior remains removed rather than simulated. | `@claim:no-account-free-tools`, `@claim:no-tracking-runtime`; live crawl. |
| `generated-art` | Source hash, provenance, and derived social image remain verified. | `@claim:generated-art`. |
| `overlay-restoration` | Disabling restores page caption text and the original TextTrack mode. | `@claim:overlay-restoration`. |
| `site-package`, `build-artifacts` | Build emits the legal/demo pages, unpacked extension, and valid ZIP. | `@claim:package-output`; `npm run verify:zip`; local/live ZIP hash match. |
| `node-version` | The unsupported public minimum-version promise remains absent. | Copy-policy suite. |
| `browser-provisioning`, `clean-browser-gate` | Lockfile-pinned Playwright 1.58.2 provisions into an empty isolated cache and completes the release gate. | `npm run check:clean-browser`: PASS. |
| `release-cache-policy` | Versioned worker, network-first documents, cache-first assets, and release replacement remain tested. | `@claim:offline-cache-policy`; worker A→B offline test. |
| `hosting-policy` | Native host config still applies caching and restrictive security headers. | Release-policy test and live headers. |
| `release-verifiers` | Every documented release command was rerun from the clean clone. | `npm run verify:release`: PASS. |
| `permissions` | Packaged permissions remain exactly `activeTab`, `storage`, and HTTP(S) page access. | `@claim:permission-minimum`. |
| `no-tracking-runtime` | Site and extension still use no analytics, remote fonts/code, or extension network calls. | `@claim:no-tracking-runtime`; live demo observed 32 same-origin requests. |

## Later review findings

| Finding ID | Change retained and rechecked | Evidence |
| --- | --- | --- |
| F-2-1 | The supported non-track source has one name everywhere. | Terminology regression; live Privacy and home. |
| F-3-1 | The committed copy audit contains the same source phrase and correct count. | Copy-audit recount regression. |
| F-4-1 | The packaged extension leaves an unsupported surface unchanged and reports waiting in the popup. | `@claim:hidden-caption-limit`. |
| F-4-2 | Every audit row recounts correctly, and inverse landing coverage remains enforced. | Both copy-audit regression tests. |
| F-4-3 | Popup heading remains “Caption controls.” | Popup language regression; popup screenshot. |
| F-4-4 | Popup action remains “Save word.” | Popup language regression; popup screenshot. |
| F-5-1 | Packaged extension rendering still proves speaker, name, saved-word, and sound-cue treatments. | `@claim:caption-emphasis`. |
| F-5-2 | README still says “Chrome extension,” not unexplained manifest terminology. | README copy regression. |
| F-6-1 | The untested “easier to spot” outcome remains absent. | Observable-language regression. |
| F-6-2 | The unattributed quotation remains replaced by a factual instruction. | Observable-language regression. |
| F-6-3 | Compatibility language remains “caption text the page makes available,” with the baked-picture limit stated plainly. | Terminology regression and source claim. |
| F-6-4 | Privacy copy still says the product loads no code from other sites. | Plain-language regression; `@claim:no-tracking-runtime`. |
| F-6-5 | README heading remains “What Caption Cues includes.” | Copy-audit source check. |
| F-6-6 | README states the offline result rather than cache-strategy jargon. | Plain-language regression; offline claim. |
| F-6-7 | Permission copy explains current-page effects. | Plain-language regression; permission claim. |
| F-6-8 | Offline status, image alternative, and dynamic preview caption remain in the audit, with inverse coverage. | Copy-audit inverse-coverage regression. |

## Verification and deployment evidence

- Clean clone: `/tmp/caption-cues-polish-7-clean.vt3iCv/repo` at `839a099`.
  `npm ci`, `npm run setup:browser`, and all 15 exact registry commands passed
  independently.
- `npm run verify:release`: PASS. The full run reported 58 tests in seven
  files, 15 claim tests, extension smoke, worker-update/offline behavior,
  browser/Axe checks, and ZIP integrity.
- `npm run check:clean-browser`: PASS after installing the pinned browser into
  a new empty cache and repeating the release suite.
- Local `verify-url.sh`: 200, 541 ms, no errors, correct title/lang, one H1 and
  main, no missing image alternatives, and no unnamed buttons. Local
  Lighthouse: 100 Performance, 100 Accessibility, 100 Best Practices, 100 SEO;
  LCP 1.540 s, TBT 0 ms, CLS 0.
- Live `npm run verify:live`: all five routes at 390 × 844 and 1440 × 900 had
  expected status/title, zero serious/critical Axe findings, no overflow,
  correct focus, isolated demo storage, 32 same-origin requests, and working
  offline demo.
- Cold live `verify-url.sh`: 200, 604 ms, no errors, correct title/lang and
  landmarks. Live Lighthouse: 100/100/100/100; LCP 1.218 s, TBT 10 ms, CLS 0.
- Local/live SHA-256 values match: home HTML
  `1bfd680db931923ded5d9cbbe1afaa77f5e3845d0d45fce575253e46771c5ba4`;
  extension ZIP
  `924411a23b21aa19b099f751c1250020c92016955b6bd2938e2b792043605077`.
- The catalog sentence remains verb-first and 102 bytes including its newline:
  “Highlight names, speaker labels, sound cues, and saved words in caption text
  the page makes available.”

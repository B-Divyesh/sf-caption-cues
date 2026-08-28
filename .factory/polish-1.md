# Perfection-loop round 1 finding map

Reviewed sources: `.factory/review-1.md` and the complete Git history for
`.factory/review-*.md` and `.factory/polish-*.md`. `review-1.md` is the only
review report and no earlier polish report exists.

## Main findings

| Finding | Change made | Evidence |
| --- | --- | --- |
| B1 | Replaced the metaphorical headline with “Highlight the caption words you miss,” named viewers and their situation, made the sample primary, and disclosed the Developer-mode ZIP beside the secondary action. | `reviewed public language > keeps the reviewed first-screen…`; `browser-qa > keeps the audience…`; `.factory/evidence/verify-live-home/screenshot-mobile.png`; live `/`. |
| B2 | Added the three-line isolated sample. The primary action uses `/?demo=1`, which enters `/demo/?demo=1`. The persistent banner includes Reset demo and Start for real. Only `demo:caption-cues:settings` is used. Reset and exit remove demo keys without touching ordinary keys. | `@claim:demo-isolation`; `@claim:caption-emphasis`; `.factory/evidence/verify-live-demo/screenshot-mobile.png`; live `/?demo=1&license=review-token`. |
| B3 | Added `.factory/claims.json`; retained only observable public claims; added one tagged test per claim and a one-to-one registry test. | `release-policy > maps every registered claim…`; 15/15 exact commands passed in clean clone `/tmp/caption-cues-polish-final.VKp743/repo`. |
| B4 | Added real demo, privacy, and terms routes plus a designed 404 with product chrome, one H1, and Return home. Azure returns the branded page with HTTP 404. | `browser-qa > uses the common route shell…`; `.factory/evidence/polish-1-404-desktop.png`; live `/not-a-real-route` returned 404. |
| B5 | Removed the dead Supporter CTA, license form, billing requests, billing host permission, price, merchant, and purchase claims. Paid UI stays absent until the external Sociobot product exists. | `@claim:no-account-free-tools` asserts no checkout or license gate; `@claim:no-tracking-runtime`; live crawl found 9/9 links healthy and no checkout link. |
| M1 | Added plain route titles, descriptions, canonicals, Open Graph/Twitter metadata, 1200×630 social art, favicon, and 180px touch icon on every route. | `site-contract > has complete route metadata`; `browser-qa > ships route metadata…`; live route audit for `/`, `/demo/`, `/privacy/`, `/terms/`, and 404. |
| M2 | Reused one header/footer on every route. Added the one-line description, legal links, Param Factory credit, build ID, route announcement, H1 focus handoff, and back-navigation focus. | `browser-qa > uses the common route shell…`; live `/privacy/`; `.factory/evidence/polish-1-privacy-desktop.png`. |
| M3 | Scoped the cobalt circle to `.brand-mark`; `.brand-name` has natural width and a transparent background. | `browser-qa > uses the common route shell…` checks computed width/background; live screenshots. |
| M4 | Renamed the download to “Download unpacked Chrome extension” and placed “Downloads a ZIP for Chrome Developer mode” beside it. The demo remains primary. | first-screen copy test; phone first-screen browser test; live `/`. |
| N1 | Made header, footer, detail, banner, and action targets at least 44px while retaining the designed focus ring. | `browser-qa > gives visible interactive controls a 44px target on mobile`; live Axe audit at 390px. |
| Controller SW update | Removed runtime cache writes that could recreate a retired build cache. Added a controller version handshake. The test now fails unless B takes control, deletes A and `caption-cues-31b0e5257187d71b7be8`, serves a B-only resource, and reloads B offline with only B’s cache. | `service-worker-update.test.ts > moves a controlled client from build A to build B and stays available offline`; 10 consecutive local passes; clean-clone release pass; live Cache Storage contained only `caption-cues-7f6b278cd393e0fdd1ad`. |

## Claim findings from B3

| Review ID | Disposition | Evidence |
| --- | --- | --- |
| `site-offline` | Registered and tested from the demo after one priming visit. | `@claim:site-offline`; live offline line advanced to 2 of 3. |
| `caption-emphasis` | Registered for names, speaker labels, sound cues, and saved words. | `@claim:caption-emphasis`. |
| `no-account` | Combined with the free-controls claim. | `@claim:no-account-free-tools`. |
| `free-core` | Rewritten without “core” or “forever”; every highlighting and replay control is exercised without a license. | `@claim:no-account-free-tools`. |
| `replay-last-line` | Registered for keyboard and button replay. | `@claim:replay-last-line`. |
| `exposed-captions-only` | Rewritten as the supported exposed sources and tested with positive and negative fixtures. | `@claim:exposed-caption-sources`; `@claim:hidden-caption-limit`. |
| `no-media-capture` | Registered with full-flow request interception. | `@claim:no-media-capture`. |
| `unsupported-player-state` | Registered with unchanged content and waiting status. | `@claim:hidden-caption-limit`. |
| `supporter-unlock` | Removed because the external checkout is unavailable. | `@claim:no-account-free-tools` confirms no paid gate or checkout. |
| `checkout-security` | Removed with the dead checkout. | Live link crawl contains no checkout URL. |
| `merchant-of-record` | Removed with all purchase copy. | Rejected-copy regression test. |
| `site-license-transfer` | Removed with site and extension license UI. | `@claim:no-tracking-runtime`; built manifest has no billing host. |
| `caption-local-processing` | Combined into the local-caption-data claim. | `@claim:local-caption-data`. |
| `caption-data-private` | Combined into the local-caption-data claim and tested through storage plus request interception. | `@claim:local-caption-data`. |
| `supported-caption-sources` | Registered for standard TextTrack and selected visible page captions. | `@claim:exposed-caption-sources`. |
| `hidden-caption-limit` | Registered with a negative fixture. | `@claim:hidden-caption-limit`. |
| `generated-art` | Registered with provenance hash and output checks. | `@claim:generated-art`. |
| `popup-controls` | All listed controls are exercised in the unpacked extension. | `@claim:no-account-free-tools`. |
| `overlay-restoration` | Registered for visible captions and TextTrack mode. | `@claim:overlay-restoration`. |
| `named-site-support` | Removed unproved YouTube/Vimeo/Video.js names; copy now states the exact source types tested. | `@claim:exposed-caption-sources`. |
| `site-package` | Narrowed to concrete shipped pages and artifacts. | `@claim:package-output`; route browser suite. |
| `node-version` | Removed the unproved minimum-version sentence. | Registry/source one-to-one test; README review. |
| `browser-provisioning` | Removed version/cache/fallback assertions from public copy. The package remains exactly pinned to Playwright 1.58.2. | `package-lock.json`; clean-cache release gate passed. |
| `clean-browser-gate` | Removed behavioral prose from public copy; retained the optional command. | `npm run check:clean-browser` passed from an empty temporary cache. |
| `build-artifacts` | Registered for legal/demo pages, Manifest V3 output, unpacked extension, and ZIP. | `@claim:package-output`. |
| `release-cache-policy` | Registered for release hash, network-first pages, and cache-first precached assets. | `@claim:offline-cache-policy`; strict A→B update test. |
| `hosting-policy` | Removed expansive hosting prose; retained the config location. | `release-policy > uses native SWA rules…`; live header check. |
| `release-verifiers` | Removed prose that described commands as product behavior. | Clean-clone `npm run verify:release` passed. |
| `permissions` | Registered against the exact packaged manifest. | `@claim:permission-minimum`. |
| `license-network-only` | Removed because this release contains no license flow or extension network call. | `@claim:no-tracking-runtime`. |
| `no-tracking-runtime` | Registered across the site and packaged extension. | `@claim:no-tracking-runtime`. |

## Copy findings

The copy table rows in the review had no supplied IDs, so the row order below
is used as a stable identifier.

| ID | Change made | Evidence |
| --- | --- | --- |
| C1 | Replaced “flatten” with the direct job headline. | first-screen copy test; live home screenshot. |
| C2 | Replaced “Try the rules first” with “Try it with sample data.” | first-screen copy test; live query demo. |
| C3 | Replaced “Local-first / core” facts with browser storage, no-account, offline, and free-control facts. | rejected-copy test; `@claim:site-offline`; `@claim:no-account-free-tools`. |
| C4 | Replaced “Proof 01” with “Caption preview.” | rejected-copy test. |
| C5 | Replaced “landmarks” with “See each highlighted caption part.” | rejected-copy test. |
| C6 | Replaced “Method 02” with “How Caption Cues works.” | rejected-copy test. |
| C7 | Replaced “marks up / listen in” with literal exposed-caption and capture wording. | rejected-copy test; `@claim:no-media-capture`. |
| C8 | Replaced “DOM caption” with “visible caption text.” | rejected-copy test. |
| C9 | Replaced “Why 03” with “Why selective highlighting helps.” | rejected-copy test. |
| C10 | Replaced the “louder” metaphor with “Make key caption words easier to spot.” | rejected-copy test. |
| C11 | Replaced “hierarchy / anchors” with the exact parts users choose. | rejected-copy test. |
| C12 | Removed the paid “core / ink” section with the dead checkout. | rejected-copy test; live home. |
| C13 | Removed “Cobalt caption plate” terminology. | rejected-copy test. |
| C14 | Removed merchant jargon with the unavailable purchase offer. | rejected-copy test. |
| C15 | Replaced “Notes 04 / Before you press play” with “Installation and compatibility.” | rejected-copy test. |
| C16 | Replaced internal factory-release copy with the Developer-mode install disclosure. | rejected-copy test; first-screen browser test. |
| C17 | Replaced visitor-facing DOM jargon with “caption text shown on the page.” | rejected-copy test. |
| C18 | Replaced the unsupported “Useful emphasis” footer line with the literal product one-liner. | rejected-copy test. |

All seven overlong README sentences were split or removed. The four jargon
groups now consistently use Manifest V3 where needed, caption background,
speaker label, and sound cue. `copy-policy.test.ts` prevents every rejected
phrase from returning. `.factory/copy-audit.md` records all landing sentences,
word counts, and the terminology table; no sentence exceeds 22 words.

## Final evidence

- Product commits: `86210653f13e897c4a49747b09086a476485a5e6` and
  `b6a9258a6120b5b6e4b6620240ea0b7c8d0e51a4`.
- Clean clone: `/tmp/caption-cues-polish-final.VKp743/repo` at `b6a9258`.
- Every exact claim command: 15/15 passed independently.
- Clean-clone release gate: 47/47 tests, 15/15 claims, extension smoke,
  browser/route/Axe checks, strict worker update, build, and ZIP passed.
- Final working-tree `npm test`: 50/50 passed, including all reviewed-copy
  regressions.
- Fresh-browser-cache gate: passed after downloading Playwright Chromium 1208
  into an empty temporary cache.
- Service-worker update: 10/10 consecutive runs passed before the full gates.
- Local Lighthouse: home 100/100/100/100, demo 99/100/100/100; LCP 1.7s and
  1.8s, CLS 0, TBT 0ms.
- Deployment: `0bc7b917-01c4-4684-953c-253834ebbca0`.
- Live Lighthouse: home 100/100/100/100, demo 99/100/100/100; both LCP 1.2s,
  CLS 0; demo TBT 110ms.
- Live URL verifier: home and query demo returned 200 with correct title,
  `lang=en`, one H1, one main, image alternatives, named buttons, and no errors.
- Live cold audit: 5 routes × 2 widths, zero unexpected console errors, zero
  serious/critical Axe findings, 9/9 links healthy, branded 404 returned 404.
- Screenshots: `.factory/evidence/verify-live-home/screenshot-mobile.png`,
  `.factory/evidence/verify-live-demo/screenshot-mobile.png`,
  `.factory/evidence/polish-1-privacy-desktop.png`, and
  `.factory/evidence/polish-1-404-desktop.png`.

No review finding remains open.

# Perfection-loop round 2 finding map

Reviewed sources: `.factory/review-1.md`, `.factory/polish-1.md`,
`.factory/review-2.md`, every earlier verification report, and the release at
candidate `a5770d584c99156368e97f44a4b47d073008ee11`.

Repair commit: `532b3fbee944aff8bad773e238587891471177cd`.
Production deployment: `b7e1e27a-78b2-4bb8-947d-cb1bf440b92d`.

## Review 2

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-2-1 | Standardized the supported non-track source as “selected caption text shown on the page” in the landing FAQ, README, privacy policy, claim registry, claim test, and copy audit. Added a regression test that rejects all three old variants. | Test: `reviewed public language > uses one name for the supported page-caption source` and `@claim:exposed-caption-sources`. Screenshot: `.factory/evidence/polish-2-live-audit/home-mobile.png`. Live: `/` and `/privacy/` contain the exact phrase; `npm run verify:live` reports `review2Terminology: pass`. |

## Review 1 main findings

| Finding | Change retained or reinforced | Evidence |
| --- | --- | --- |
| B1 | Retained the direct job headline, named audience, primary one-click sample action, adjacent outcome, and secondary Developer-mode ZIP disclosure. | Test: `browser-qa > keeps the audience, sample action, and install disclosure in the phone first screen`. Screenshot: `.factory/evidence/polish-2-live-home/screenshot-mobile.png`. Live: `/` returned 200; the sample action ends at y=462 within 390×844. |
| B2 | Retained `?demo=1` entry, three-line sample, persistent banner, reset/exit controls, and demo-only storage. The live auditor checks a hostile license query, ordinary sentinels, reset, exit, replay, and same-origin requests. | Test: `@claim:demo-isolation`, `@claim:caption-emphasis`, and `npm run verify:live`. Screenshot: `.factory/evidence/polish-2-live-demo/screenshot-mobile.png`. Live: `/?demo=1&license=review-token` redirected to `/demo/?demo=1`; only `demo:caption-cues:settings` was written. |
| B3 | Retained 15 registry entries, exactly one test tag per claim, and exact runnable commands. Updated the affected compatibility claim and test together. | Test: `release-policy > maps every registered claim to exactly one tagged test and no extra tags`; all 15 exact commands passed independently. Screenshot: `.factory/evidence/polish-2-live-audit/demo-mobile.png`. Live: every browser claim was re-exercised at `/?demo=1`. |
| B4 | Retained real demo/legal routes and the product-designed HTTP 404 with common chrome and a return action. | Test: `browser-qa > uses the common route shell, designed 404, focus handoff, and readable wordmark`. Screenshot: `.factory/evidence/polish-2-live-audit/404-desktop.png`. Live: `/demo`, `/privacy`, and `/terms` returned 200; `/not-a-real-route` returned the branded page with HTTP 404. |
| B5 | Retained removal of the unregistered paid offer, checkout, merchant, license UI, and billing network access. | Test: `@claim:no-account-free-tools` and `@claim:no-tracking-runtime`. Screenshot: `.factory/evidence/polish-2-live-home/screenshot-mobile.png`. Live: the seven-link crawl returned 200 and found no checkout URL or paid UI. |
| M1 | Retained route-specific titles, descriptions, canonicals, Open Graph/Twitter data, social art, favicon, and touch icon. | Test: `site-contract > has complete route metadata` and `browser-qa > ships route metadata and stays within static performance budgets`. Screenshot: `.factory/evidence/polish-2-live-audit/privacy-desktop.png`. Live: all four 200 routes and the 404 passed metadata/title checks. |
| M2 | Retained the shared header/footer, legal links, build marker, route announcement, route-heading focus, and back-navigation focus. | Test: `browser-qa > uses the common route shell, designed 404, focus handoff, and readable wordmark`; `npm run verify:live` reports `firstScreenAndFocus: pass`. Screenshot: `.factory/evidence/polish-2-live-audit/privacy-desktop.png`. Live: Privacy navigation and browser Back both focused an H1. |
| M3 | Retained `.brand-mark`-only circle styling and the natural-width wordmark. | Test: `browser-qa > uses the common route shell, designed 404, focus handoff, and readable wordmark`. Screenshot: `.factory/evidence/polish-2-live-home/screenshot-mobile.png`. Live: the Caption Cues wordmark is readable on every audited route. |
| M4 | Retained the honest “Download unpacked Chrome extension” label and adjacent Developer-mode ZIP disclosure, secondary to the sample. | Test: `reviewed public language > keeps the reviewed first-screen job, audience, action, and install disclosure`. Screenshot: `.factory/evidence/polish-2-live-home/screenshot-mobile.png`. Live: the ZIP returned 200 and passed archive integrity. |
| N1 | Retained at least 44×44 px visible targets on site and demo at phone width. | Test: `browser-qa > gives visible interactive controls a 44px target on mobile`; live auditor repeats the geometry check. Screenshot: `.factory/evidence/polish-2-live-demo/screenshot-mobile.png`. Live: zero undersized targets across five routes at 390 px. |

## Review 1 claim findings

| Review ID | Resolution | Evidence |
| --- | --- | --- |
| `site-offline` | Registered and retained offline demo operation after one visit. | Test: `@claim:site-offline`. Screenshot: `.factory/evidence/polish-2-live-demo/screenshot-mobile.png`. Live: primed `/demo/` reloaded offline and advanced to line 2. |
| `caption-emphasis` | Registered names, speaker labels, sound cues, and saved words. | Test: `@claim:caption-emphasis`. Screenshot: `.factory/evidence/polish-2-live-audit/demo-mobile.png`. Live: the opening sample visibly contains all four treatments. |
| `no-account` | Combined with the free-tools claim and retained without sign-in UI. | Test: `@claim:no-account-free-tools`. Screenshot: `.factory/evidence/polish-2-live-demo/screenshot-mobile.png`. Live: the sample completed without credentials. |
| `free-core` | Rewritten without “core” or “forever”; all highlight and replay controls remain free. | Test: `@claim:no-account-free-tools`. Screenshot: `.factory/evidence/polish-2-live-audit/demo-mobile.png`. Live: every control worked with no license. |
| `replay-last-line` | Registered keyboard and button replay. | Test: `@claim:replay-last-line`. Screenshot: `.factory/evidence/polish-2-live-audit/demo-mobile.png`. Live: Alt+R reported “Replayed caption line 2.” |
| `exposed-captions-only` | Split into exact positive sources and the inaccessible-source limit. | Test: `@claim:exposed-caption-sources` and `@claim:hidden-caption-limit`. Screenshot: `.factory/evidence/polish-2-live-demo/screenshot-mobile.png`. Live: the sample and waiting state both passed. |
| `no-media-capture` | Registered and retained without media/transcript requests. | Test: `@claim:no-media-capture`. Screenshot: `.factory/evidence/polish-2-live-audit/demo-mobile.png`. Live: all 32 demo requests were same-origin. |
| `unsupported-player-state` | Registered the unchanged hidden-caption sample and waiting message. | Test: `@claim:hidden-caption-limit`. Screenshot: `.factory/evidence/polish-2-live-demo/screenshot-mobile.png`. Live: `/demo/` displayed the product-specific compatibility check. |
| `supporter-unlock` | Removed because no registered checkout exists. | Test: `@claim:no-account-free-tools`. Screenshot: `.factory/evidence/polish-2-live-home/screenshot-mobile.png`. Live: no paid gate or supporter copy. |
| `checkout-security` | Removed with the dead checkout. | Test: `@claim:no-tracking-runtime`. Screenshot: `.factory/evidence/polish-2-live-home/screenshot-mobile.png`. Live: crawl found no checkout URL. |
| `merchant-of-record` | Removed with the unavailable purchase offer. | Test: `reviewed public language > does not restore any rejected metaphor, jargon, or unfinished release copy`. Screenshot: `.factory/evidence/polish-2-live-home/screenshot-mobile.png`. Live: no merchant copy. |
| `site-license-transfer` | Removed with site and extension license UI. | Test: `@claim:no-account-free-tools` and `@claim:no-tracking-runtime`. Screenshot: `.factory/evidence/polish-2-live-demo/screenshot-mobile.png`. Live: hostile license query wrote no license key. |
| `caption-local-processing` | Combined into the local-caption-data claim. | Test: `@claim:local-caption-data`. Screenshot: `.factory/evidence/polish-2-live-demo/screenshot-mobile.png`. Live: demo requests remained same-origin. |
| `caption-data-private` | Combined into local data storage plus request interception. | Test: `@claim:local-caption-data`. Screenshot: `.factory/evidence/polish-2-live-audit/demo-mobile.png`. Live: ordinary storage was unchanged. |
| `supported-caption-sources` | Registered standard tracks and selected caption text shown on the page. | Test: `@claim:exposed-caption-sources`. Screenshot: `.factory/evidence/polish-2-live-audit/home-mobile.png`. Live: `/` and `/privacy/` use the exact standardized phrase. |
| `hidden-caption-limit` | Registered the negative fixture and unchanged-content result. | Test: `@claim:hidden-caption-limit`. Screenshot: `.factory/evidence/polish-2-live-demo/screenshot-mobile.png`. Live: compatibility UI remained present and operable. |
| `generated-art` | Registered the source hash, provenance metadata, and social output. | Test: `@claim:generated-art`. Screenshot: `.factory/evidence/polish-2-live-home/screenshot-mobile.png`. Live: the proof-sheet art and disclosure load from the same origin. |
| `popup-controls` | Every named popup control remains exercised without a license. | Test: `@claim:no-account-free-tools`. Screenshot: `.factory/evidence/polish-2-live-audit/demo-mobile.png` for the matching demo controls. Live: the packaged ZIP returned 200. |
| `overlay-restoration` | Registered DOM and TextTrack restoration when disabled. | Test: `@claim:overlay-restoration`. Screenshot: `.factory/evidence/polish-2-live-audit/demo-mobile.png`. Live: the shipped ZIP is the tested build. |
| `named-site-support` | Unproved site brands remain removed; exact source types are stated instead. | Test: `@claim:exposed-caption-sources` and the review-2 terminology regression. Screenshot: `.factory/evidence/polish-2-live-audit/home-mobile.png`. Live: no YouTube/Vimeo/Video.js claim. |
| `site-package` | Narrowed to actual demo/legal pages, Manifest V3 output, and ZIP. | Test: `@claim:package-output`. Screenshot: `.factory/evidence/polish-2-live-audit/privacy-desktop.png`. Live: pages and ZIP returned 200. |
| `node-version` | Unproved minimum-version copy remains removed. | Test: `release-policy > maps every registered claim...`. Screenshot: `.factory/evidence/polish-2-live-home/screenshot-mobile.png`. Live: no Node-version marketing claim. |
| `browser-provisioning` | Tooling prose remains removed; Playwright stays pinned to 1.58.2. | Test: `npm run check:clean-browser`. Screenshot: `.factory/evidence/polish-2-live-home/screenshot-mobile.png`. Live: production is independent of test provisioning. |
| `clean-browser-gate` | Public behavioral claim remains removed; the gate itself passed from a newly created empty cache. | Test: `npm run check:clean-browser` → PASS. Screenshot: `.factory/evidence/polish-2-live-home/screenshot-mobile.png`. Live: the audited production build matched the clean-clone build marker. |
| `build-artifacts` | Registered all documented artifacts and ZIP integrity. | Test: `@claim:package-output` and `npm run verify:zip`. Screenshot: `.factory/evidence/polish-2-live-home/screenshot-mobile.png`. Live: download returned 200. |
| `release-cache-policy` | Registered release-specific cache, network-first documents, cache-first assets, and deterministic cache retirement. | Test: `@claim:offline-cache-policy` and `service-worker-update > moves a controlled client...`. Screenshot: `.factory/evidence/polish-2-live-demo/screenshot-mobile.png`. Live: offline demo reload passed. |
| `hosting-policy` | Expansive copy remains removed; deployed rules were checked directly. | Test: `release-policy > uses native SWA rules instead of a served _headers file`. Screenshot: `.factory/evidence/polish-2-live-home/screenshot-mobile.png`. Live: CSP, Permissions-Policy, nosniff, referrer policy, immutable assets, and no-cache worker headers are present. |
| `release-verifiers` | Command-behavior marketing remains removed; all commands were actually run. | Test: clean-clone `npm run verify:release`. Screenshot: `.factory/evidence/polish-2-live-audit/404-desktop.png`. Live: `npm run verify:live` passed. |
| `permissions` | Registered exact manifest permissions and host patterns. | Test: `@claim:permission-minimum`. Screenshot: `.factory/evidence/polish-2-live-audit/demo-mobile.png`. Live: downloadable ZIP is the tested package. |
| `license-network-only` | Removed because the release has no license flow or extension network call. | Test: `@claim:no-tracking-runtime`. Screenshot: `.factory/evidence/polish-2-live-demo/screenshot-mobile.png`. Live: hostile license query caused no outbound request or license write. |
| `no-tracking-runtime` | Registered site/extension network and packaged-resource inspection. | Test: `@claim:no-tracking-runtime`. Screenshot: `.factory/evidence/polish-2-live-audit/demo-mobile.png`. Live: all demo requests were same-origin; no remote scripts/fonts or analytics. |

## Review 1 copy findings

| ID | Resolution retained | Evidence |
| --- | --- | --- |
| C1 | Direct “Highlight the caption words you miss” headline. | Test: first-screen copy regression. Screenshot: `.factory/evidence/polish-2-live-home/screenshot-mobile.png`. Live: `/`. |
| C2 | “Try it with sample data” opens the isolated sample. | Test: first-screen browser test. Screenshot: `.factory/evidence/polish-2-live-demo/screenshot-mobile.png`. Live: `/?demo=1`. |
| C3 | Concrete browser/no-account/offline/free facts. | Test: rejected-copy regression and claim tests. Screenshot: `.factory/evidence/polish-2-live-home/screenshot-mobile.png`. Live: `/`. |
| C4 | “Caption preview.” | Test: rejected-copy regression. Screenshot: `.factory/evidence/polish-2-live-home/screenshot-mobile.png`. Live: `/#preview`. |
| C5 | “See each highlighted caption part.” | Test: rejected-copy regression. Screenshot: `.factory/evidence/polish-2-live-home/screenshot-mobile.png`. Live: `/#preview`. |
| C6 | “How Caption Cues works.” | Test: rejected-copy regression. Screenshot: `.factory/evidence/polish-2-live-home/screenshot-mobile.png`. Live: `/#how`. |
| C7 | Literal exposed-caption and no-capture wording. | Test: rejected-copy regression and `@claim:no-media-capture`. Screenshot: `.factory/evidence/polish-2-live-home/screenshot-mobile.png`. Live: `/#how`. |
| C8 | “Visible caption text” replaces DOM jargon. | Test: rejected-copy regression. Screenshot: `.factory/evidence/polish-2-live-home/screenshot-mobile.png`. Live: `/#how`. |
| C9 | “Why selective highlighting helps.” | Test: rejected-copy regression. Screenshot: `.factory/evidence/polish-2-live-home/screenshot-mobile.png`. Live: `/`. |
| C10 | “Make key caption words easier to spot.” | Test: rejected-copy regression. Screenshot: `.factory/evidence/polish-2-live-home/screenshot-mobile.png`. Live: `/`. |
| C11 | Exact user-selected parts replace abstract design jargon. | Test: rejected-copy regression. Screenshot: `.factory/evidence/polish-2-live-home/screenshot-mobile.png`. Live: `/`. |
| C12 | Paid “core/ink” section remains removed. | Test: rejected-copy regression. Screenshot: `.factory/evidence/polish-2-live-home/screenshot-mobile.png`. Live: no paid section. |
| C13 | “Cobalt caption plate” remains removed. | Test: rejected-copy regression. Screenshot: `.factory/evidence/polish-2-live-home/screenshot-mobile.png`. Live: no obsolete theme term. |
| C14 | Merchant jargon remains removed. | Test: rejected-copy regression. Screenshot: `.factory/evidence/polish-2-live-home/screenshot-mobile.png`. Live: no payment section. |
| C15 | “Installation and compatibility.” | Test: rejected-copy regression. Screenshot: `.factory/evidence/polish-2-live-home/screenshot-mobile.png`. Live: landing FAQ. |
| C16 | Developer-mode requirement replaces internal release copy. | Test: first-screen copy regression. Screenshot: `.factory/evidence/polish-2-live-home/screenshot-mobile.png`. Live: `/`. |
| C17 | Standardized “selected caption text shown on the page.” | Test: review-2 terminology regression. Screenshot: `.factory/evidence/polish-2-live-audit/home-mobile.png`. Live: landing FAQ and Privacy. |
| C18 | Literal footer one-liner. | Test: rejected-copy regression. Screenshot: `.factory/evidence/polish-2-live-audit/404-desktop.png`. Live: common footer on every route. |

## Controller and final release evidence

| Item | Result | Evidence |
| --- | --- | --- |
| Controller SW update | Retired caches cannot be recreated; build B controls, deletes A and the known regressed cache, and reloads offline. | Test: `service-worker-update > moves a controlled client from build A to build B and stays available offline`. Screenshot: `.factory/evidence/polish-2-live-demo/screenshot-mobile.png`. Live: offline demo passed. |
| Catalog | Updated to a 100-character, verb-first sentence. | Test: `reviewed public language > ships a verb-first catalog sentence within 120 characters`. Screenshot: `.factory/evidence/polish-2-live-home/screenshot-mobile.png`. Live: product job is unchanged. |
| Accessibility/mobile | Ten route/viewport combinations produced zero serious/critical Axe findings, no horizontal overflow, and no undersized phone targets. | Test: `npm run verify:live`. Screenshots: `.factory/evidence/polish-2-live-audit/home-mobile.png`, `demo-mobile.png`, `privacy-desktop.png`, `404-desktop.png`. Live: `/`, `/demo/`, `/privacy/`, `/terms/`, and 404. |
| Performance | Site JS totals 7.68 KB raw, CSS is 15.03 KB raw, and the mobile AVIF stays below 300 KB. Live Lighthouse is 100/100/100/100 on home and demo. | Test: browser budget test and Lighthouse 12.8.2. Screenshot: `.factory/evidence/polish-2-live-home/screenshot-mobile.png`. Live: home LCP 1.2 s, demo LCP 0.8 s, CLS 0. |

No review-1 or review-2 finding remains open.

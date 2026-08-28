# Perfection-loop round 3 finding map

Sources reviewed in full: `.factory/review-1.md`, `.factory/review-2.md`,
`.factory/review-3.md`, `.factory/polish-1.md`, `.factory/polish-2.md`, and
the verification records. Repair commit: `c221259`. Production deployment:
`3997993f-7bf0-4b4e-a9f4-b2ccc55d406e`.

## Round 3 repair

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-3-1 | Restored the README inventory to the copy audit with the exact standardized source phrase and its corrected 14-word count. The audit now records the first-screen action wording too. The terminology regression includes the audit, so stale evidence fails the build. | `reviewed public language > uses one name for the supported page-caption source`; `reviewed public language > keeps the audited first-screen wording alongside the source copy`; clean-clone `npm run verify:release`; live `/` and `/privacy/`. |
| F-2-1 | Kept the one source name, “selected caption text shown on the page,” in the landing FAQ, README, privacy page, claim registry, claim test, and audit. | `@claim:exposed-caption-sources`; live auditor `review2Terminology: pass`; live `/` and `/privacy/`. |

## Review 1 main findings

| Finding | Change made | Evidence |
| --- | --- | --- |
| B1 | Kept the direct job headline, named audience, visible one-click sample action, adjacent result, and secondary Developer-mode ZIP disclosure. | `browser-qa > keeps the audience, sample action, and install disclosure in the phone first screen`; live screenshot `.factory/evidence/polish-3-live-audit/home-mobile.png`; live `/` at 390 × 844. |
| B2 | Kept the isolated three-line `/demo/` station sample, `?demo=1` redirect, persistent demo banner, reset/exit actions, and `demo:`-only storage. | `@claim:demo-isolation`, `@claim:caption-emphasis`, `@claim:site-offline`; live screenshot `.factory/evidence/polish-3-live-audit/demo-mobile.png`; live `/?demo=1&license=review-token`. |
| B3 | Kept `.factory/claims.json` with one tagged observable test for each public claim. | `release-policy > maps every registered claim to exactly one tagged test and no extra tags`; all 15 exact registry commands passed in a clean clone; `npm run test:claims` passed 15/15. |
| B4 | Kept real demo, privacy, and terms routes plus the product-designed HTTP 404 with common chrome and a return action. | `browser-qa > uses the common route shell, designed 404, focus handoff, and readable wordmark`; live screenshot `.factory/evidence/polish-3-live-audit/404-desktop.png`; live `/not-a-real-route` returned 404. |
| B5 | Kept the unavailable paid checkout, merchant, price, license UI, and billing requests removed. | `@claim:no-account-free-tools`, `@claim:no-tracking-runtime`; live landing link crawl in `npm run verify:live`. |
| M1 | Kept route-specific titles, descriptions, canonical URLs, Open Graph/Twitter data, self-hosted social art, favicon, and touch icon. | `site-contract > has complete route metadata`; `browser-qa > ships route metadata and stays within static performance budgets`; live `/`, `/demo/`, `/privacy/`, `/terms/`, and 404 audit. |
| M2 | Kept shared header/footer, legal links, factory/build footer, polite route announcement, H1 focus handoff, and Back focus restoration. | `browser-qa > uses the common route shell, designed 404, focus handoff, and readable wordmark`; live Privacy navigation and Back check in `npm run verify:live`. |
| M3 | Kept the circle scoped to `.brand-mark`; the wordmark has natural width and no cobalt-circle collision. | `browser-qa > uses the common route shell, designed 404, focus handoff, and readable wordmark`; live home screenshot. |
| M4 | Kept the honest Developer-mode ZIP label secondary to the sample action. | `reviewed public language > keeps the reviewed first-screen job, audience, action, and install disclosure`; live `/`. |
| N1 | Kept every visible phone target at least 44 × 44 px. | `browser-qa > gives visible interactive controls a 44px target on mobile`; all five routes at 390 px in `npm run verify:live`. |

## Review 1 public-claim findings

| Finding | Change made | Evidence |
| --- | --- | --- |
| `site-offline` | Registered the offline demo claim and precached demo shell. | `@claim:site-offline`; live auditor `offlineDemo: pass`. |
| `caption-emphasis` | Registered speaker, name, sound-cue, and saved-word emphasis. | `@claim:caption-emphasis`; live demo screenshot. |
| `no-account` | Combined with free controls; no account UI is shipped. | `@claim:no-account-free-tools`; live demo. |
| `free-core` | Rewrote the claim as free highlighting/replay controls with no forever promise. | `@claim:no-account-free-tools`; live demo. |
| `replay-last-line` | Registered button and Alt+R replay. | `@claim:replay-last-line`; live demo status check. |
| `exposed-captions-only` | Split into exact supported-source and unsupported-source claims. | `@claim:exposed-caption-sources`, `@claim:hidden-caption-limit`. |
| `no-media-capture` | Registered request interception for the extension’s caption/replay flow. | `@claim:no-media-capture`. |
| `unsupported-player-state` | Registered unchanged hidden-caption state and waiting message. | `@claim:hidden-caption-limit`; live demo compatibility check. |
| `supporter-unlock` | Removed because no registered checkout exists. | `@claim:no-account-free-tools`; live landing. |
| `checkout-security` | Removed with the dead checkout CTA. | `@claim:no-tracking-runtime`; live link crawl. |
| `merchant-of-record` | Removed with purchase/merchant copy. | `reviewed public language > does not restore any rejected metaphor, jargon, or unfinished release copy`; live landing. |
| `site-license-transfer` | Removed license UI and network path. | `@claim:demo-isolation`, `@claim:no-tracking-runtime`. |
| `caption-local-processing` | Consolidated into local browser storage and network-payload checks. | `@claim:local-caption-data`. |
| `caption-data-private` | Consolidated into the same local-data claim. | `@claim:local-caption-data`; live same-origin demo requests. |
| `supported-caption-sources` | Registered standard browser tracks and selected caption text shown on the page. | `@claim:exposed-caption-sources`; F-2-1/F-3-1 regression. |
| `hidden-caption-limit` | Registered the non-enhanced hidden/inaccessible case. | `@claim:hidden-caption-limit`. |
| `generated-art` | Registered source hash/provenance and shipped social preview inspection. | `@claim:generated-art`; footer disclosure on live `/`. |
| `popup-controls` | Exercised every popup comprehension control without a license. | `@claim:no-account-free-tools`. |
| `overlay-restoration` | Registered DOM and TextTrack restoration after disabling the extension. | `@claim:overlay-restoration`. |
| `named-site-support` | Removed unproved player brands and state only the tested source types. | `@claim:exposed-caption-sources`; live copy audit. |
| `site-package` | Registered concrete site pages, MV3 output, and Chrome ZIP. | `@claim:package-output`; `npm run verify:zip`. |
| `node-version` | Removed the unsupported minimum-version marketing claim. | Source/copy-policy clean-clone pass. |
| `browser-provisioning` | Removed public provisioning promises; the lockfile pins Playwright 1.58.2. | `npm run check:clean-browser` PASS from an empty cache. |
| `clean-browser-gate` | Removed untestable public behavior while retaining the runnable clean-cache gate. | `npm run check:clean-browser` PASS. |
| `build-artifacts` | Registered produced pages, MV3 manifest, unpacked extension, and non-empty ZIP. | `@claim:package-output`; `npm run verify:zip`. |
| `release-cache-policy` | Registered versioned shell, network-first documents, cache-first assets, and update behavior. | `@claim:offline-cache-policy`; `service-worker-update` PASS. |
| `hosting-policy` | Kept native SWA security/cache rules and tested config; verified live headers. | `release-policy > uses native SWA rules instead of a served _headers file`; live headers. |
| `release-verifiers` | Removed command-behavior marketing and ran every gate. | clean-clone `npm run verify:release` PASS. |
| `permissions` | Registered the exact built manifest permissions and host patterns. | `@claim:permission-minimum`. |
| `license-network-only` | Removed with the absent license flow. | `@claim:no-tracking-runtime`. |
| `no-tracking-runtime` | Registered full demo/manifest/runtime network inspection. | `@claim:no-tracking-runtime`; live same-origin audit. |

## Review 1 copy findings

| Finding | Change made | Evidence |
| --- | --- | --- |
| C1 | Direct headline replaces “flatten.” | first-screen browser test; live `/`. |
| C2 | “Try it with sample data” replaces the non-demo action. | first-screen test; live `/?demo=1`. |
| C3 | Browser/no-account/offline/free facts replace jargon. | copy-policy and claim suite. |
| C4 | “Caption preview” replaces “Proof 01.” | copy-policy; live `/#preview`. |
| C5 | Literal highlighted-part heading replaces “landmarks.” | copy-policy; live `/#preview`. |
| C6 | “How Caption Cues works” replaces “Method 02.” | copy-policy; live `/#how`. |
| C7 | Literal exposed-caption/no-capture copy replaces figurative phrasing. | copy-policy; `@claim:no-media-capture`. |
| C8 | Visible caption text replaces DOM jargon. | copy-policy; live `/#how`. |
| C9 | Contextual selective-highlighting heading replaces “Why 03.” | copy-policy; live `/`. |
| C10 | Literal spotting benefit replaces “louder.” | copy-policy; live `/`. |
| C11 | Exact user-selected parts replace hierarchy/anchor jargon. | copy-policy; live `/`. |
| C12 | Removed the unpaid/dead paid section. | copy-policy; live `/`. |
| C13 | Removed inconsistent Cobalt plate terminology. | copy-policy; live `/`. |
| C14 | Removed merchant jargon with the unavailable offer. | copy-policy; live `/`. |
| C15 | “Installation and compatibility” replaces fragment headings. | copy-policy; live FAQ. |
| C16 | Developer-mode disclosure replaces internal factory-release copy. | first-screen browser test; live `/`. |
| C17 | Standardized the supported non-track source wording. | F-2-1 and F-3-1 regression checks; live `/privacy/`. |
| C18 | Literal footer one-liner replaces unsupported “Useful emphasis” wording. | copy-policy; live common footer. |

## Earlier polish and verification regressions

| Finding | Change retained | Evidence |
| --- | --- | --- |
| Controller service-worker update | The generated worker advances controller/cache versions, removes retired caches, and reloads the new demo offline. | `service-worker-update > moves a controlled client from build A to build B and stays available offline`; live `offlineDemo: pass`. |
| Verification 1 cache/header defects | Native SWA configuration remains deployed for immutable hashed assets, no-cache worker, CSP, Permissions-Policy, nosniff, and referrer policy. | clean `release-policy` test; live response headers. |
| Verification 2 clean-browser blocker | The documented browser installer and isolated-cache gate remain runnable. | clean-clone `npm run setup:browser`; `npm run check:clean-browser` PASS. |

## Final live evidence

- `npm run verify:live` against `https://caption-cues.sociobot.in/` passed all
  five routes at 390 × 844 and 1440 × 900: expected HTTP status, titles,
  metadata, one H1/main, no overflow, zero serious/critical Axe findings,
  44 px targets, reduced motion, shared chrome, route/back focus, demo
  isolation, same-origin requests, and offline replay.
- Cold URL verifier output is in `.factory/evidence/polish-3-live-home/`:
  200, 684 ms navigation, no browser errors, `lang=en`, one H1/main, no
  missing `alt`, and no unnamed buttons.
- Screenshots: `.factory/evidence/polish-3-live-audit/home-mobile.png`,
  `demo-mobile.png`, `privacy-desktop.png`, and `404-desktop.png`.
- Lighthouse mobile JSON is in `.factory/evidence/polish-3-live-home/` and
  `.factory/evidence/polish-3-live-demo/`: home 100/100/100/100 (LCP 1.20 s,
  TBT 31 ms, CLS 0); query-demo 99/100/100/100 (LCP 1.22 s, TBT 132 ms,
  CLS 0).

# Perfection-loop round 4 finding map

Sources read in full: `.factory/review-1.md`, `.factory/review-2.md`,
`.factory/review-3.md`, `.factory/review-4.md`, `.factory/polish-1.md`,
`.factory/polish-2.md`, `.factory/polish-3.md`, and all three verification
records. Repair commit: `eae9efb`. Production deployment:
`98c1241f-041b-48a2-808e-91bc5ea42928`.

Evidence shorthand: **Live audit** means `npm run verify:live` against
`https://caption-cues.sociobot.in/`, whose screenshots are
`.factory/evidence/polish-4-live-audit/home-mobile.png`, `demo-mobile.png`,
`privacy-desktop.png`, and `404-desktop.png`. **Cold URL** means
`.factory/evidence/polish-4-live-home/verify.json` and its two screenshots.

## Review 4

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-4-1 / reopened B3 | `GET_STATUS` now uses Chrome's explicit response channel and returns `sourceState`. The popup presents the required waiting state. `@claim:hidden-caption-limit` loads `dist/extension` against an unrecognised caption surface, asserts exact unchanged text/markup, then reads the popup's waiting state. | `@claim:hidden-caption-limit` (fresh profile); `tests/claims.test.ts`; `.factory/evidence/polish-4-extension/popup-unsupported.png`; live ZIP SHA matches `dist/site/downloads/caption-cues-chrome.zip`. |
| F-4-2 | Rebuilt the full copy audit with a documented whitespace tokenizer. The regression parses all 180+ rows, recomputes every count, and proves the source string exists. | `reviewed public language > recounts every audited visible string from its named source`; `.factory/copy-audit.md`; Cold URL. |
| F-4-3 | Replaced popup “Live proof sheet” with “Caption controls.” | `reviewed public language > uses plain language for the extension popup controls and saved-word action`; popup screenshot; live ZIP SHA check. |
| F-4-4 | Replaced the generic popup action “Add” with “Save word.” | Same popup-language regression; popup screenshot; live ZIP SHA check. |

## Review 1 structure and first-use findings

| Finding | Change retained and rechecked | Evidence |
| --- | --- | --- |
| B1 | Direct job headline, named audience, visible phone-first `Try it with sample data` action, explanatory result, and honest Developer-mode ZIP disclosure remain in the first screen. | `browser-qa > keeps the audience, sample action, and install disclosure in the phone first screen`; home-mobile screenshot; live `/`. |
| B2 | `?demo=1` redirects to the isolated `/demo/` station sample with persistent banner, reset, Start for real, and `demo:` storage only. | `@claim:demo-isolation`, `@claim:caption-emphasis`, `@claim:site-offline`; demo-mobile screenshot; live `/?demo=1`. |
| B3 | Registry still has one unique tagged test per public claim; the reopened unsupported branch is now a packaged-extension test. | `release-policy > maps every registered claim to exactly one tagged test and no extra tags`; all 15 exact commands plus `npm run test:claims` 15/15 from fresh clone. |
| B4 | Demo, privacy, terms, and designed 404 with shared shell, return action, route focus and metadata remain real routes. | `browser-qa > uses the common route shell, designed 404, focus handoff, and readable wordmark`; 404 screenshot; live `/not-a-real-route` 404. |
| B5 | The unavailable paid checkout, license UI, merchant claim, and dead paid CTA remain removed. | `@claim:no-account-free-tools`, `@claim:no-tracking-runtime`; live link crawl in Live audit. |
| M1 | Route-specific titles, descriptions, canonical URLs, Open Graph/Twitter metadata, favicon and social image remain complete. | `browser-qa > ships route metadata and stays within static performance budgets`; Live audit of `/`, `/demo/`, `/privacy/`, `/terms/`, 404. |
| M2 | Shared shell, legal links, focus handoff, polite route status and Back focus remain in every route. | `browser-qa > uses the common route shell, designed 404, focus handoff, and readable wordmark`; Live audit. |
| M3 | The mark remains scoped to `.brand-mark`; no wordmark collision. | Same browser-QA test; home-mobile screenshot; live `/`. |
| M4 | Secondary download remains explicitly described as an unpacked Developer-mode ZIP. | first-screen browser-QA test; home-mobile screenshot; live `/`. |
| N1 | Mobile visible controls retain 44 px minimum targets without overflow. | `browser-qa > gives visible interactive controls a 44px target on mobile`; Live audit at 390 px. |

## Review 1 public-claim findings

| Finding ID | Change retained and rechecked | Evidence |
| --- | --- | --- |
| site-offline | Offline claim is limited to the precached isolated demo after one visit. | `@claim:site-offline`; Live audit `offlineDemo: pass`; demo-mobile screenshot. |
| caption-emphasis | Demo proves independently styled speaker labels, names, sound cues, and saved words. | `@claim:caption-emphasis`; demo-mobile screenshot; live `/demo/`. |
| no-account | Account-free copy is joined with free controls; no sign-in path ships. | `@claim:no-account-free-tools`; live `/demo/`. |
| free-core | Claim says all highlighting and replay controls are free, without an unprovable forever promise. | `@claim:no-account-free-tools`; live `/`. |
| replay-last-line | Keyboard `Alt+R` and replay control are exercised on two demo lines. | `@claim:replay-last-line`; demo-mobile screenshot; live `/demo/`. |
| exposed-captions-only | The support boundary is split into positive exposed-source and negative hidden-source claims. | `@claim:exposed-caption-sources`; `@claim:hidden-caption-limit`; live compatibility copy. |
| no-media-capture | The built-extension caption and replay flow is intercepted for media/transcript requests. | `@claim:no-media-capture`; fresh-clone claim loop. |
| unsupported-player-state | Unrecognised content stays untouched and the actual popup gives the waiting state. | `@claim:hidden-caption-limit`; popup screenshot; live ZIP check. |
| supporter-unlock | Removed with the unavailable paid product. | `@claim:no-account-free-tools`; live link crawl. |
| checkout-security | Removed with the dead checkout CTA. | `@claim:no-tracking-runtime`; live link crawl. |
| merchant-of-record | Removed with all unavailable purchase language. | `reviewed public language > does not restore any rejected metaphor, jargon, or unfinished release copy`; live `/`. |
| site-license-transfer | Removed with the absent license feature. | `@claim:demo-isolation`, `@claim:no-tracking-runtime`; live query-demo check. |
| caption-local-processing | Consolidated into local-data and request-payload inspection. | `@claim:local-caption-data`; fresh extension profile. |
| caption-data-private | Same local-data guarantee; demo traffic is same-origin. | `@claim:local-caption-data`; Live audit `sameOriginDemoRequests: 32`. |
| supported-caption-sources | Only standard browser tracks and selected caption text shown on the page are claimed. | `@claim:exposed-caption-sources`; live `/privacy/`. |
| hidden-caption-limit | Hidden/inaccessible caption surfaces are not enhanced; popup status is now real. | `@claim:hidden-caption-limit`; popup screenshot; live ZIP check. |
| generated-art | Source hash/provenance and shipped social art remain tested. | `@claim:generated-art`; live footer screenshot. |
| popup-controls | All comprehension popup controls are exercised without a license. | `@claim:no-account-free-tools`; popup screenshot. |
| overlay-restoration | DOM and text-track source state are restored after disabling. | `@claim:overlay-restoration`; fresh extension profile. |
| named-site-support | Unproved brand-specific support was removed; only tested source types remain. | `@claim:exposed-caption-sources`; live compatibility copy. |
| site-package | Demo/legal routes, MV3 output, and ZIP are all present. | `@claim:package-output`; `npm run verify:zip`; live ZIP SHA check. |
| node-version | Unsupported public version promise remains absent. | public-language regression; live `/`. |
| browser-provisioning | Public tool-version copy remains absent; actual pinned browser install is repeatable. | fresh `npm run setup:browser`; `npm run check:clean-browser`. |
| clean-browser-gate | The behavior claim remains absent; the isolated-cache gate was rerun. | `npm run check:clean-browser` from clean clone. |
| build-artifacts | Documented extension/site/ZIP paths are built and ZIP-tested. | `@claim:package-output`; `npm run verify:zip`. |
| release-cache-policy | Generated service worker versions the shell and uses network-first pages/cache-first assets. | `@claim:offline-cache-policy`; service-worker update test; live offline demo. |
| hosting-policy | Native SWA configuration applies CSP, permissions policy, nosniff, referrer policy and cache headers. | `release-policy > uses native SWA rules instead of a served _headers file`; live response headers. |
| release-verifiers | No public command-behavior promise remains; the commands were rerun. | fresh-clone `npm run verify:release`; Cold URL. |
| permissions | Built manifest permissions/host patterns remain minimal and tested. | `@claim:permission-minimum`; packaged ZIP. |
| license-network-only | Removed with license networking; no extension network path remains. | `@claim:no-tracking-runtime`; live query-demo audit. |
| no-tracking-runtime | Runtime/resource checks cover analytics, remote fonts/scripts and extension requests. | `@claim:no-tracking-runtime`; Cold URL and Live audit. |

## Review 1 copy findings

| Finding | Change retained and rechecked | Evidence |
| --- | --- | --- |
| C1 | Direct headline replaces “flatten.” | first-screen browser QA; live `/`. |
| C2 | One-click sample action replaces the non-demo action. | `@claim:demo-isolation`; live `/?demo=1`. |
| C3 | Concrete browser/no-account/offline/free facts remain. | copy-policy and related claim tests; home-mobile screenshot. |
| C4 | “Caption preview” remains the section label. | public-language regression; live `/#preview`. |
| C5 | “See each highlighted caption part” remains the preview heading. | public-language regression; live `/#preview`. |
| C6 | “How Caption Cues works” remains the process label. | public-language regression; live `/#how`. |
| C7 | Literal exposed-caption/no-capture copy remains. | `@claim:no-media-capture`; live `/#how`. |
| C8 | Visible caption text remains the plain-language term. | public-language regression; live `/#how`. |
| C9 | Selective-highlighting heading remains contextual. | public-language regression; live `/`. |
| C10 | Spotting benefit remains literal. | public-language regression; live `/`. |
| C11 | User-selected caption parts replace abstract design jargon. | public-language regression; live `/`. |
| C12 | The nonfunctional paid section remains absent. | rejected-copy regression; live `/`. |
| C13 | Obsolete Cobalt plate terminology remains absent. | rejected-copy regression; live `/`. |
| C14 | Merchant jargon remains absent. | rejected-copy regression; live `/`. |
| C15 | “Installation and compatibility” remains complete. | public-language regression; live FAQ. |
| C16 | Developer-mode ZIP disclosure remains candid. | first-screen browser QA; home-mobile screenshot. |
| C17 | Source wording stays “selected caption text shown on the page.” | terminology regression; live `/privacy/`. |
| C18 | Literal footer one-liner remains. | public-language regression; Live audit. |

## Review 2, review 3, and verification regressions

| Finding | Change retained and rechecked | Evidence |
| --- | --- | --- |
| F-2-1 | The exact supported non-track source phrase is shared by landing, privacy, README, registry, audit, and test. | `reviewed public language > uses one name for the supported page-caption source`; live `/` and `/privacy/`. |
| F-3-1 | The regenerated audit includes the exact standardized phrase and a count regression. | `reviewed public language > recounts every audited visible string from its named source`; `.factory/copy-audit.md`. |
| Verification 1: cache policy | Immutable hashed assets, no-cache worker, CSP, permissions policy and native SWA configuration remain in place. | release-policy test; live response headers. |
| Verification 1: worker update | Versioned worker moves a controlled client to the new release and works offline. | `generated service worker release updates > moves a controlled client from build A to build B and stays available offline`; Live audit offline demo. |
| Verification 2: clean browser | Browser provisioning remains documented and works from an empty cache. | `npm run check:clean-browser` in fresh clone. |
| Controller catalog requirement | Catalog description was updated to a verb-first 97-character sentence. | `reviewed public language > ships a verb-first catalog sentence within 120 characters`; `.factory/catalog-description.txt`. |

## Final live result

- `npm run verify:live` passed all five routes at 390 × 844 and 1440 × 900:
  expected status/title/metadata, one H1/main, no overflow, 44 px targets,
  zero serious/critical Axe findings, focus/Back restoration, demo isolation,
  same-origin requests, and offline demo replay.
- `/opt/fleet/lib/verify-url.sh` passed cold load in 605 ms with no page errors,
  `lang=en`, one H1/main, no missing image alt text, and no unnamed buttons.
- Local and live SHA-256 values match for both `index.html` and the extension
  ZIP. Lighthouse results are 100 Performance, 100 Accessibility, 100 Best
  Practices, and 100 SEO (LCP 1.2 s, TBT 0 ms, CLS 0).

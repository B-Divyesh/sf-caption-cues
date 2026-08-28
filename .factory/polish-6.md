# Perfection-loop round 6 finding map

**Repair commit:** `94bc25c38a430a0684c96ab7de1f660119c24830`  
**Deployment:** `https://caption-cues.sociobot.in/` (Static Web Apps deployment `490ecf4f-2827-47f4-9664-514acd537582`)  
**Result:** PASS — no review finding remains open.

## Shared evidence

- Fresh clone: `/tmp/caption-cues-polish-6-clean.D2OXCe/repo` at
  `94bc25c`; `npm ci`, `npm run setup:browser`, then all 15 exact commands in
  `.factory/claims.json` ran independently and passed.
- Local quality suite: `npm test` — 58 tests in seven files passed; `npm run
  verify:extension`, `npm run verify:zip`, `npm run test:pwa-update`, and
  `npm run verify:release` passed.
- Local audit: `verify-url.sh` — no console errors, one H1/main, `lang=en`,
  all images labelled, and no unnamed buttons. Lighthouse mobile:
  Performance 99, Accessibility 100, LCP 1.662 s, CLS 0
  ([report](evidence/polish-6-local/lighthouse-mobile.json)).
- Live audit: `npm run verify:live -- https://caption-cues.sociobot.in/
  .factory/evidence/polish-6-live-audit` passed all five routes at 390 and
  1440 px with zero serious/critical Axe findings. It proves the sample
  namespace, reset/exit path, offline reload, focus handoff, metadata, 44 px
  controls, and 404. See [home mobile](evidence/polish-6-live-audit/home-mobile.png),
  [demo mobile](evidence/polish-6-live-audit/demo-mobile.png),
  [privacy desktop](evidence/polish-6-live-audit/privacy-desktop.png), and
  [404 desktop](evidence/polish-6-live-audit/404-desktop.png).
- A separate cold-live Playwright check asserted every new F-6 phrase and the
  absence of all rejected phrases, exercised `?demo=1`, confirmed the new
  unsupported-caption status, Privacy wording, and the HTTP 404.

## Review 1 product, routing, and mobile findings

| Finding ID | Change made | Evidence |
| --- | --- | --- |
| B1 | The first screen retains the direct job, named audience, phone-visible `Try it with sample data` action, its result text, three facts, and candid Developer-mode ZIP disclosure. | `browser-qa > keeps the audience, sample action, and install disclosure in the phone first screen`; live `/`; [home mobile](evidence/polish-6-live-audit/home-mobile.png). |
| B2 | `?demo=1` redirects into the isolated three-line station sample. Its persistent banner, Reset demo, Start for real, and `demo:`-only storage remain real controls. | `@claim:demo-isolation`, `@claim:site-offline`; live `/?demo=1`; [demo mobile](evidence/polish-6-live-audit/demo-mobile.png). |
| B3 | The registry remains one-tag-per-claim. Round 6 renamed the human-unfriendly source claim to `caption-text-page-makes-available`; its built extension test proves both DOM and TextTrack paths. | `release-policy > maps every registered claim...`; all 15 fresh-clone commands; `@claim:caption-text-page-makes-available`. |
| B4 | `/demo/`, `/privacy/`, `/terms/`, and the product-designed 404 retain real routing, common chrome, metadata, H1 focus, and a return link. | `browser-qa > uses the common route shell...`; live `/not-a-real-route`; [404 desktop](evidence/polish-6-live-audit/404-desktop.png). |
| B5 | The unavailable checkout, price, merchant, license, and Supporter controls remain absent. | `@claim:no-account-free-tools`; `@claim:no-tracking-runtime`; live link audit. |
| M1 | Each route retains a route-specific title, description, canonical, OG/Twitter metadata, favicon, touch icon, and original social image. | `browser-qa > ships route metadata...`; live `/`, `/demo/`, `/privacy/`, `/terms/`, and 404. |
| M2 | Every route keeps the shared header/footer, legal links, skip link, polite route status, and heading focus on navigation and Back. | `browser-qa > uses the common route shell...`; live audit `firstScreenAndFocus: pass`. |
| M3 | The readable wordmark remains separate from the circular `.brand-mark`. | Same browser test; live `/`; [home mobile](evidence/polish-6-live-audit/home-mobile.png). |
| M4 | The secondary install path remains honestly labelled as an unpacked Chrome extension ZIP for Developer mode. | First-screen browser QA; live `/`. |
| N1 | Phone controls remain at least 44 px without horizontal overflow. | `browser-qa > gives visible interactive controls a 44px target on mobile`; live audit at 390 px. |

## Review 1 copy and claim-inventory findings

| Finding ID | Change made | Evidence |
| --- | --- | --- |
| C1, C2, C3 | Direct first-screen job, sample action, and concrete account/offline/free facts remain. | First-screen browser QA; `@claim:demo-isolation`; live `/`. |
| C4, C5, C6 | Contextual `Caption preview`, `See each highlighted caption part`, and `How Caption Cues works` headings remain. | Copy-policy regression; live `/#preview` and `/#how`. |
| C7, C8 | The source boundary now uses the plainer `caption text the page makes available` wording. | `@claim:caption-text-page-makes-available`; live `/` and `/privacy/`. |
| C9, C10, C11 | Replaced the outcome claim and unattributed quotation with `Choose which caption words stand out` and `Give names you might mishear a different style.` | `reviewed public language > uses observable highlighting language...`; cold live check; live `/`. |
| C12, C13, C14 | Dead paid UI, obsolete caption-background terminology, and merchant language remain removed. | `@claim:no-account-free-tools`; `@claim:no-tracking-runtime`; live link audit. |
| C15, C16, C17 | Installation remains explicit; compatibility copy now describes what a viewer sees rather than browser internals. | Copy-policy regression; live `/`; README. |
| C18 | The literal footer one-liner and build ID remain on every route. | Live route audit; [privacy desktop](evidence/polish-6-live-audit/privacy-desktop.png). |
| site-offline, caption-emphasis, no-account, free-core, replay-last-line | Offline demo, four emphasis treatments, account-free controls, and keyboard/button replay remain observable. | `@claim:site-offline`, `@claim:caption-emphasis`, `@claim:no-account-free-tools`, `@claim:replay-last-line`. |
| exposed-captions-only, supported-caption-sources, named-site-support | Unsupported brand promises stay removed; standard tracks and caption text a page makes available are tested. | `@claim:caption-text-page-makes-available`; live `/privacy/`. |
| unsupported-player-state, hidden-caption-limit | An unrecognised surface remains untouched, and the real popup/demonstration reports a plain waiting state. | `@claim:hidden-caption-limit`; cold live demo check. |
| no-media-capture, caption-local-processing, caption-data-private, local-caption-data | The built extension is intercepted through caption/replay/settings flows; no media or caption payload leaves it. | `@claim:no-media-capture`; `@claim:local-caption-data`. |
| supporter-unlock, checkout-security, merchant-of-record, site-license-transfer, license-network-only | Every unavailable payment/license promise remains removed rather than simulated. | `@claim:no-account-free-tools`; `@claim:no-tracking-runtime`; live link audit. |
| generated-art | Original artwork provenance/hash and shipped social image remain verifiable. | `@claim:generated-art`; live footer. |
| popup-controls, overlay-restoration | The shipped popup controls all rules/size/background/saved words, and disabling restores DOM and track state. | `@claim:no-account-free-tools`; `@claim:overlay-restoration`. |
| site-package, build-artifacts, release-verifiers | The build emits the deployable site, legal/demo pages, MV3 extension, and valid ZIP. | `@claim:package-output`; `npm run verify:zip`; `npm run verify:release`. |
| node-version, browser-provisioning, clean-browser-gate | Unsupported public version claims remain absent; pinned browser provisioning is repeatable. | Fresh `npm run setup:browser`; `npm run check:clean-browser`. |
| release-cache-policy, hosting-policy | Versioned worker and native Static Web Apps cache/security policy remain tested and deployed. | `@claim:offline-cache-policy`; `npm run test:pwa-update`; live response audit. |
| permissions, no-tracking-runtime | Built manifest permissions stay minimal; site/extension load no analytics, remote fonts, external code, or extension network path. | `@claim:permission-minimum`; `@claim:no-tracking-runtime`; live request audit. |

## Later review and independent-verification findings

| Finding ID | Change made | Evidence |
| --- | --- | --- |
| F-2-1, F-3-1 | The obsolete source-name variants were replaced everywhere, including the previously stale copy audit. Round 6 further simplified it to `caption text the page makes available`. | `reviewed public language > uses plain, consistent wording...`; live `/` and `/privacy/`. |
| F-4-1 | Unsupported extension content is left byte-for-byte unchanged and the popup reports the waiting state. | `@claim:hidden-caption-limit`. |
| F-4-2 | The complete audit uses one whitespace tokenizer; it now has inverse source coverage for every landing sentence/status/alt/dynamic sample string. | `reviewed public language > recounts every audited visible string...`; `...includes every static landing sentence...`; `.factory/copy-audit.md`. |
| F-4-3, F-4-4 | Popup language remains `Caption controls` and its saved-word action remains `Save word`. | Popup copy-policy regression; `@claim:caption-emphasis`. |
| F-5-1 | The four cue types are proved in the packaged extension, not only in the landing demo. | `@claim:caption-emphasis`. |
| F-5-2 | README continues to say `Chrome extension`, not unexplained platform-release terminology. | `reviewed public language > describes the browser extension...`; README. |
| Verification 1 cache policy, worker update, security headers | Generated worker updates releases; host serves the committed cache/security policy. | `@claim:offline-cache-policy`; `npm run test:pwa-update`; live audit. |
| Verification 2 P1, Verification 3 P1 | Browser provisioning is explicit and works from a clean clone/cache. | Fresh-clone `npm run setup:browser`; `npm run check:clean-browser`. |
| Verification 2 P2, P3, Verification 3 P2, P3 | No additional defect was found in those verification rows. | Full local release suite and live audit. |

## Review 6 findings

| Finding ID | Change made | Evidence |
| --- | --- | --- |
| F-6-1 | Removed the untestable “easier to spot” outcome. The section now states the observable, registered behavior: `Choose which caption words stand out`. | Copy-policy observable-language test; `@claim:caption-emphasis`; cold live check. |
| F-6-2 | Removed the unattributed blockquote and replaced it with the factual instruction `Give names you might mishear a different style.` | Copy-policy observable-language test; live `/`. |
| F-6-3 | Rewrote landing, demo, popup, Privacy, Terms, README, registry, test name, and audit around `caption text the page makes available`; rewrote the limitation in viewer language. | `@claim:caption-text-page-makes-available`; consistency regression; cold live `/` and `/privacy/`. |
| F-6-4 | Replaced “remote runtime scripts” with the privacy consequence: `loads no code from other sites`. | `@claim:no-tracking-runtime`; plain-language regression; live `/privacy/`. |
| F-6-5 | Renamed README `What ships` to `What Caption Cues includes`. | Copy-audit recount regression; README source. |
| F-6-6 | Rewrote README offline behavior as what the service worker does for a reader. | Plain-language regression; README source. |
| F-6-7 | Rewrote permissions in current-tab terms while retaining literal permission names only where useful. | Plain-language regression; README source. |
| F-6-8 | Added the missing offline status, hero alternative text, and dynamic preview caption to the audit, then added an inverse source-derived coverage test. | `reviewed public language > includes every static landing sentence, status, image alternative, and known dynamic caption in the audit`; `.factory/copy-audit.md`. |

## Post-deploy cold check

Fresh no-storage Chromium loaded the live home, `?demo=1`, Privacy, and the
unknown route. It found all eight required round-6 strings, none of the five
rejected phrases, the isolated demo's new plain waiting status, Privacy's new
privacy wording, and the designed HTTP 404. No follow-up deployment was needed.

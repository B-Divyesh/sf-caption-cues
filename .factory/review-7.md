# Adversarial first-read review 7: Caption Cues

**Verdict: FAIL**

Reviewed 2026-08-28 UTC against <https://caption-cues.sociobot.in/> and
repository commit `b42372f619f59e2df8db3737f4840a8066624f60`. Product code was not
modified.

One blocking claim-verification defect remains. The site, demo, routing, copy,
privacy boundary, and registered test commands otherwise passed this round.

## Cold first read

Fresh Chromium contexts with no cookies or storage opened the live home at
390 × 844 and 1440 × 900. I did not scroll before recording these answers.

| Question | 390 px phone | Desktop |
| --- | --- | --- |
| What does this do? | It highlights easy-to-miss words and cues in captions. | Same. |
| For whom? | Viewers who follow captions but miss names, speaker labels, or sound cues. | Same. |
| What should I click first? | **Try it with sample data.** | **Try it with sample data.** |

The exact first-screen text is “Highlight the caption words you miss,” “For
viewers who follow captions but miss names, speaker labels, or sound cues,” and
“Try it with sample data.” On the phone, the primary action occupied
y=413–462 and all three facts ended at y=664. The first screen therefore passes
the required what/who/first-action check at both widths.

## Finding

### F-7-1 — BLOCKING — B3 remains half-fixed: replay is tested only in the website demo

- **Exact quote/location:** live landing page, “Alt+R replays the last line”
  and “Press Alt+R to replay a timed cue or reshow visible caption text”;
  README, “Press `Alt+R` to replay the last timed cue or reshow the latest
  visible caption”; extension popup, “Replay last caption Alt+R.” The
  `replay-last-line` registry entry says the claim appears in the “extension
  popup” and README.
- **Evidence:** the sole `@claim:replay-last-line` test calls `demoPage()`,
  presses Alt+R on `/demo/`, and clicks the demo’s replay button. It never
  launches `dist/extension`, never opens the real popup, never drives a browser
  `TextTrack`, and never checks replay of page-provided caption text. The exact
  registry command passes, but only proves the imitation demo. The separate
  `@claim:no-media-capture` test presses Alt+R in an extension fixture only to
  inspect requests; it does not assert the promised timed seek or reshown text.
  The untagged `verify:extension` smoke check does assert keyboard reshown text,
  but it does not cover timed seeking or the popup and cannot substitute for
  the registry’s required sole tagged claim test.
- **History:** review 1’s B3 replay row required the shortcut against timed and
  page-caption samples. That requirement was marked fixed later without the
  required packaged-extension assertions, so B3 is reopened.
- **Why this misleads:** a visitor is promised that the installed extension and
  popup replay the last caption. The green claim test can remain green if that
  shipped behavior breaks, because it verifies different code on the demo
  page.
- **Concrete fix:** extend the one tagged `@claim:replay-last-line` test to a
  fresh profile running `dist/extension`. For a timed `TextTrack`, trigger
  Alt+R and assert the video seeks to that cue’s start. For page-provided
  caption text, click the real popup’s replay control and assert the exact last
  line is shown again and announced. Keep the demo assertions, update the
  registry sandbox description, and do not add a second copy of the claim tag.

## Copy audit

Counts use whitespace-delimited words. `Alt+R`, file paths, and hyphenated
terms count as one word. The inventory includes sentences, headings, actions,
status text, and meaningful alternative text so the heading and action rules
are also checked. Repeated text is retained where it appears in a distinct
landing location.

No item exceeds 22 words. No banned marketing adjective appears. Terms remain
consistent (`speaker label`, `sound cue`, `saved word`, `caption background`,
and `caption text the page makes available`). Headings make sense out of
context, and action-styled controls name their results. The replay lines are
plain but inherit the claim-test defect in F-7-1; no copy rewrite is required.

### Live landing page

| Words | Copy | Flag |
| ---: | --- | --- |
| 2 | You’re offline. | — |
| 8 | Open the sample to keep trying Caption Cues. | — |
| 4 | Skip to main content | — |
| 2 | Caption Cues | — |
| 1 | Demo | — |
| 3 | How it works | — |
| 1 | Privacy | — |
| 2 | Download ZIP | — |
| 10 | Abstract paper caption strips moving through a cobalt proofing press | — |
| 5 | A caption highlighter for Chrome | — |
| 6 | Highlight the caption words you miss | — |
| 13 | For viewers who follow captions but miss names, speaker labels, or sound cues. | — |
| 5 | Try it with sample data | — |
| 6 | See highlighted captions before you install. | — |
| 4 | Download unpacked Chrome extension | — |
| 7 | Downloads a ZIP for Chrome Developer mode. | — |
| 5 | Caption controls need no account. | — |
| 7 | The demo works offline after one visit. | — |
| 7 | All highlighting and replay tools are free. | — |
| 2 | Caption preview | — |
| 5 | See each highlighted caption part | — |
| 12 | Switch a rule off to compare the same caption without that mark. | — |
| 2 | Live preview | — |
| 11 | MARA: Tell Rowan to meet us at Thessaly Gate. [train approaching] | — |
| 5 | Alt+R replays the last line | F-7-1 claim proof |
| 2 | Emphasis rules | — |
| 2 | Speaker labels | — |
| 4 | Text before the colon | — |
| 1 | Names | — |
| 4 | Names in the line | — |
| 2 | Sound cues | — |
| 3 | Descriptions in brackets | — |
| 3 | Saved word: Gate | — |
| 4 | A word you chose | — |
| 4 | How Caption Cues works | — |
| 7 | Uses caption text already on the page | — |
| 9 | Caption Cues reads caption text the page makes available. | — |
| 11 | It does not capture audio, download video, or create a transcript. | — |
| 3 | Turn captions on | — |
| 8 | Start the captions offered by your video player. | — |
| 3 | Choose your cues | — |
| 10 | Mark names, speaker labels, sound cues, or a saved word. | — |
| 4 | Replay the last line | F-7-1 claim proof |
| 12 | Press Alt+R to replay a timed cue or reshow visible caption text. | F-7-1 claim proof |
| 5 | When a player is unsupported | — |
| 18 | It cannot change captions baked into the video picture or captions the page does not provide as text. | — |
| 3 | Choose your highlights | — |
| 6 | Choose which caption words stand out | — |
| 8 | Give names you might mishear a different style. | — |
| 13 | You choose which names, sound cues, speaker labels, and saved words stand out. | — |
| 3 | Installation and compatibility | — |
| 5 | Install and use the extension | — |
| 6 | How do I install the download? | — |
| 2 | Unzip it. | — |
| 2 | Open chrome://extensions. | — |
| 12 | Turn on Developer mode, choose “Load unpacked,” then select the unzipped folder. | — |
| 6 | Does it send my captions anywhere? | — |
| 1 | No. | — |
| 8 | Caption text and settings stay in your browser. | — |
| 12 | Caption Cues has no analytics and loads no code from other sites. | — |
| 3 | Which videos work? | — |
| 13 | It supports standard browser caption tracks and caption text the page makes available. | — |
| 5 | Which videos do not work? | — |
| 18 | It cannot change captions baked into the video picture or captions the page does not provide as text. | — |
| 8 | Highlights selected words in captions you already use. | — |
| 1 | Terms | — |
| 1 | Source | — |
| 7 | Built by Param Factory · Build 1.0.6-r6 | — |
| 10 | Original proof-sheet artwork was generated with the factory image model. | — |

### README

| Words | Copy | Flag |
| ---: | --- | --- |
| 2 | Caption Cues | — |
| 16 | Highlight names, speaker labels, sound cues, and saved words in caption text the page makes available. | — |
| 12 | Caption Cues is for viewers who follow captions but miss key words. | — |
| 11 | The Chrome extension changes caption styling without creating a new transcript. | — |
| 14 | Press Alt+R to replay the last timed cue or reshow the latest visible caption. | F-7-1 claim proof |
| 5 | Try it with sample data. | — |
| 13 | The demo is isolated, works offline after one visit, and needs no account. | — |
| 4 | What Caption Cues includes | — |
| 3 | A Chrome extension. | — |
| 14 | Controls for names, speaker labels, sound cues, saved words, text size, and caption background. | — |
| 13 | Support for standard browser caption tracks and caption text the page makes available. | — |
| 12 | Restoration of the page’s original caption state when the extension is disabled. | — |
| 9 | Keyboard and popup controls for replaying the last caption. | F-7-1 claim proof |
| 11 | A static product site, isolated demo, legal pages, and extension ZIP. | — |
| 19 | Caption Cues cannot change captions baked into the video picture or captions the page does not provide as text. | — |
| 12 | It does not capture audio, download video, or bypass a protected player. | — |
| 3 | Run and test | — |
| 2 | npm ci | — |
| 3 | npm run setup:browser | — |
| 3 | npm run check | — |
| 7 | On Ubuntu CI, use npm run setup:browser:ci. | — |
| 3 | Optional CI command: | — |
| 3 | npm run check:clean-browser | — |
| 6 | Every public claim appears in .factory/claims.json. | — |
| 10 | Run one claim with the exact command in that file. | — |
| 4 | Run them all with: | — |
| 3 | npm run test:claims | — |
| 10 | After deployment, run npm run verify:live against the production origin. | — |
| 3 | Build and load | — |
| 3 | npm run build:site | — |
| 7 | Build output is in dist/extension and dist/site. | — |
| 6 | The Chrome ZIP is in dist/site/downloads/caption-cues-chrome.zip. | — |
| 6 | To load the extension, open chrome://extensions. | — |
| 10 | Turn on Developer mode, choose Load unpacked, and select dist/extension. | — |
| 13 | The service worker checks online for pages and keeps built files available offline. | — |
| 8 | Hosting rules and security headers are in site/public/staticwebapp.config.json. | — |
| 3 | Privacy and permissions | — |
| 8 | Caption text and settings stay in the browser. | — |
| 11 | Page access lets Caption Cues find captions on the current page. | — |
| 3 | storage saves settings. | — |
| 14 | activeTab checks caption status and replays the last line only on the current tab. | F-7-1 claim proof |
| 7 | The extension makes no external network requests. | — |
| 15 | The site and extension use no analytics, remote fonts, or code loaded from other sites. | — |
| 6 | Read the privacy policy and terms. | — |
| 1 | License | — |
| 4 | MIT — see LICENSE. | — |

## Demo and sandbox behavior

- One click on the primary action opened `/demo/?demo=1` with “Demo — sample
  data, nothing is saved,” Reset demo, and Start for real.
- The first viewport already contained the Thessaly station workbench and
  active emphasis controls. At phone width the highlighted first line began at
  y=809; at desktop the sample player and checked controls were visible. The
  sample was rendered before interaction and contained realistic names,
  speaker text, a saved place word, and a sound cue.
- Changing the line and caption background wrote only
  `demo:caption-cues:settings`. Reset restored line 1, paper background, and
  `Gate`. Start for real removed the `demo:` key.
- Ordinary `caption-cues:settings` and `real:keep` sentinels stayed unchanged
  through edit, reset, and exit.
- All 32 observed demo requests were same-origin. After one online visit,
  offline reload succeeded and Next line still changed the sample.

Demo mode therefore passes isolation, reset, exit, and offline checks.

## Claims

The clean clone was `/tmp/caption-cues-review-7-clean.vHi2vb/repo` at the
reviewed commit. After `npm ci` and `npm run setup:browser`, every exact command
from `.factory/claims.json` ran separately.

| Claim ID | Result | Observable scope |
| --- | --- | --- |
| `caption-emphasis` | PASS | Demo and packaged extension show all four cue treatments. |
| `demo-isolation` | PASS | Demo-only namespace, reset, exit, and ordinary sentinels. |
| `site-offline` | PASS | Seeded demo reload and interaction while offline. |
| `no-account-free-tools` | PASS | Demo and extension controls work without credentials or a license. |
| `replay-last-line` | **INSUFFICIENT** | Command passes, but asserts only the website demo; see F-7-1. |
| `caption-text-page-makes-available` | PASS | Packaged extension handles page caption text and a browser TextTrack. |
| `hidden-caption-limit` | PASS | Unsupported content stays unchanged and the real popup reports waiting. |
| `no-media-capture` | PASS | Extension caption/replay flow emits no media or transcript request. |
| `local-caption-data` | PASS | Settings remain in extension storage; no caption payload is sent. |
| `overlay-restoration` | PASS | Disabling restores page text and TextTrack mode. |
| `package-output` | PASS | Demo/legal pages, extension manifest, and ZIP exist. |
| `offline-cache-policy` | PASS | Versioned worker and both documented cache strategies exist. |
| `permission-minimum` | PASS | Manifest permission and host patterns match the registry. |
| `no-tracking-runtime` | PASS | No analytics, remote fonts/code, or extension network path. |
| `generated-art` | PASS | Source hash and derived social image match provenance. |

No claim-like sentence on the live landing page or README lacks a registry
entry. F-7-1 is instead a mismatch between a listed claim’s published scope and
what its tagged test observes. There is therefore one untested claim surface.

## Earlier-finding verification

Every earlier review, polish report, and handoff was read. Each row below was
checked against live production and current source rather than accepted from a
prior status label.

| Earlier ID | Round-7 result and evidence |
| --- | --- |
| B1 | Fixed: the job, audience, primary sample action, result text, three facts, and install disclosure are visible in both cold first screens. |
| B2 | Fixed: one-click seeded demo, persistent banner, Reset, Start for real, and `demo:`-only storage all work. |
| B3 | **Reopened by F-7-1:** registry/tag integrity and 14 claim scopes pass, but extension replay remains unproved by its tagged test. |
| B4 | Fixed: demo and legal deep links return 200; the designed unknown route returns 404 with product chrome and Return home. |
| B5 | Fixed: no checkout, price, supporter, merchant, or license UI/link/runtime path is present. |
| M1 | Fixed: each route has the expected title, description, canonical, OG/Twitter metadata, favicon, touch icon, and social image. |
| M2 | Fixed: shared header/footer, legal links, skip link, route announcement, heading focus, and Back focus work. |
| M3 | Fixed: only `.brand-mark` has the circular treatment; the wordmark remains readable. |
| M4 | Fixed: the secondary action says it downloads an unpacked Chrome extension ZIP for Developer mode. |
| N1 | Fixed: the live 390 px audit found no visible target below 44 px and no horizontal overflow. |
| C1 | Fixed: the direct “Highlight the caption words you miss” headline remains. |
| C2 | Fixed: “Try it with sample data” remains the primary action. |
| C3 | Fixed: browser, account, offline, and free-tool facts use concrete wording. |
| C4 | Fixed: “Caption preview” remains contextual. |
| C5 | Fixed: “See each highlighted caption part” remains literal. |
| C6 | Fixed: “How Caption Cues works” remains contextual. |
| C7 | Fixed: exposed-caption and capture limits are stated literally. |
| C8 | Fixed: DOM jargon remains absent from visitor copy. |
| C9 | Fixed: the former numbered fragment is now “Choose your highlights.” |
| C10 | Fixed: the untested “easier to spot” outcome remains absent. |
| C11 | Fixed: abstract hierarchy/anchor terms remain absent. |
| C12 | Fixed: the dead paid section remains absent. |
| C13 | Fixed: obsolete Cobalt/plate terminology remains absent. |
| C14 | Fixed: merchant-of-record jargon remains absent. |
| C15 | Fixed: installation and compatibility headings identify their subject. |
| C16 | Fixed: internal factory-release wording remains replaced by Developer-mode instructions. |
| C17 | Fixed: the supported source wording remains consistent across site, privacy, README, registry, audit, and test. |
| C18 | Fixed: the footer uses the literal product one-liner. |
| F-2-1 | Fixed: no obsolete supported-source variant reappears. |
| F-3-1 | Fixed: the current copy audit includes the standardized source phrase. |
| F-4-1 | Fixed: the packaged extension leaves an unsupported surface unchanged and its popup reports waiting. |
| F-4-2 | Fixed: automated recounts match all committed copy-audit word counts and inverse landing coverage exists. |
| F-4-3 | Fixed: the real popup says “Caption controls.” |
| F-4-4 | Fixed: the real popup action says “Save word.” |
| F-5-1 | Fixed: the cue claim observes all four treatments in `dist/extension`. |
| F-5-2 | Fixed: README says “Chrome extension,” not “Manifest V3 extension.” |
| F-6-1 | Fixed: the unsupported efficacy outcome remains removed. |
| F-6-2 | Fixed: the unattributed quotation remains removed. |
| F-6-3 | Fixed: page-caption compatibility and limitations use viewer-facing language consistently. |
| F-6-4 | Fixed: privacy copy says the product loads no code from other sites. |
| F-6-5 | Fixed: README uses “What Caption Cues includes.” |
| F-6-6 | Fixed: README explains the offline result instead of cache strategies. |
| F-6-7 | Fixed: permission copy explains current-page effects; literal permission names are contextualized. |
| F-6-8 | Fixed: the audit includes offline status, image alternative, and dynamic preview text, with inverse coverage. |

Review 1 also declared every row in its missing-claim inventory a finding.
Those rows were rechecked individually:

| Earlier claim finding | Round-7 result and evidence |
| --- | --- |
| `site-offline` | Fixed: the exact tagged test and live offline reload both pass. |
| `caption-emphasis` | Fixed: its tagged test now observes all four treatments in the demo and packaged extension. |
| `no-account` | Fixed through `no-account-free-tools`, which exercises demo and extension without credentials. |
| `free-core` | Fixed through literal free-tool copy and `no-account-free-tools`; “forever” remains absent. |
| `replay-last-line` | **Reopened by F-7-1:** demo-only tagged proof does not cover the published extension/popup scope. |
| `exposed-captions-only` | Fixed through `caption-text-page-makes-available` and its packaged-extension fixtures. |
| `no-media-capture` | Fixed: the tagged extension flow intercepts requests. |
| `unsupported-player-state` | Fixed through `hidden-caption-limit` against the extension and real popup. |
| `supporter-unlock` | Fixed by removing the unavailable paid offer and gate. |
| `checkout-security` | Fixed by removing the dead checkout claim and link. |
| `merchant-of-record` | Fixed by removing the merchant claim. |
| `site-license-transfer` | Fixed by removing license UI, query writes, and extension billing access. |
| `caption-local-processing` | Fixed through `local-caption-data` and `no-media-capture`. |
| `caption-data-private` | Fixed through extension storage and request interception in `local-caption-data`. |
| `supported-caption-sources` | Fixed through page-caption and TextTrack fixtures. |
| `hidden-caption-limit` | Fixed: unsupported content remains byte-for-byte unchanged. |
| `generated-art` | Fixed: registered source hash and shipped social image test pass. |
| `popup-controls` | Fixed through `no-account-free-tools`, which exercises all real popup controls. |
| `overlay-restoration` | Fixed: DOM content and TextTrack mode are restored. |
| `named-site-support` | Fixed by removing unsupported named-site promises. |
| `site-package` | Fixed through `package-output` and the successful release build. |
| `node-version` | Fixed by removing an unsupported minimum-version promise. |
| `browser-provisioning` | Fixed: lockfile-pinned setup succeeded in the clean clone. |
| `clean-browser-gate` | Fixed: `npm run check:clean-browser` passed from an empty temporary browser cache. |
| `build-artifacts` | Fixed through `package-output`; the unpacked extension, site, and ZIP exist. |
| `release-cache-policy` | Fixed through `offline-cache-policy` and the worker-update test. |
| `hosting-policy` | Fixed: source tests and live responses confirm the committed host policy. |
| `release-verifiers` | Fixed: extension, ZIP, PWA update, browser, and full release verifiers pass. |
| `permissions` | Fixed through `permission-minimum` against the packaged manifest. |
| `license-network-only` | Fixed by removing license networking; the packaged extension has no network path. |
| `no-tracking-runtime` | Fixed: tagged request/resource inspection passes and live demo traffic is same-origin. |

Review 1’s seven over-22-word README findings are each gone; the current
README maximum is 19 words. Its jargon/terminology rows are also fixed: MV3,
WXT, DOM-caption, PWA, CSP/Permissions-Policy, plate/Cobalt variants, speaker
variants, and bracketed-sound variants are absent from visitor copy. The
complete round-7 inventory above verifies the replacement text rather than
relying on the prior polish report.

## Structure, accessibility, and identity

- `/`, `/demo/`, `/privacy/`, and `/terms/` returned 200. The designed unknown
  route returned 404. All intentional site and download links returned 200;
  `mailto:` links were treated as explicit exemptions.
- Home uses the 51-character title “Caption Cues — highlight easy-to-miss
  caption words.” Demo, Privacy, Terms, and 404 use route-specific titles. Each
  route has one H1, one main landmark, `lang=en`, description, canonical,
  Open Graph/Twitter data, favicon, and touch icon.
- Navigation to Privacy and browser Back both focused the destination H1. The
  shared shell, skip link, legal links, product one-liner, factory credit, and
  build ID are present. Reduced-motion behavior is implemented.
- The live Playwright/Axe audit found zero serious or critical findings, no
  console errors, no horizontal overflow, and no sub-44 px phone targets across
  the five audited routes at both widths.
- The warm paper, halftone proof sheet, cobalt registration marks, clipped
  controls, editorial typography, and product-specific 404 are recognizably
  distinct from a generic SaaS template and match `.factory/design.md`.

## Missed leverage

No missing AI, import/export, or sync feature is an obvious requirement of the
brief’s smallest useful product. Highlighting and replay are deterministic and
local; adding model calls would weaken the privacy/offline job without a clear
user benefit. Saved words can be added and removed in the extension, so bulk
transfer is useful future scope rather than a missing first-use requirement.
No AI feature or provider key is present.

## Verification summary

- All 15 exact registry commands: command exit 0 from the clean clone; F-7-1
  records the replay test’s scope defect.
- `npm test`: PASS, 58 tests in seven files; build produced `dist/`.
- `npm run verify:extension`, `npm run verify:zip`, and `npm run
  check:clean-browser`: PASS; the clean-browser command also completed the full
  release verifier from an empty temporary browser cache.
- `npm run verify:live -- https://caption-cues.sociobot.in/
  /tmp/review-7-live-audit-second`: PASS for all scripted checks.
- Manual cold, demo, storage, request, metadata, link, offline, route, and
  history checks: all pass except F-7-1.

## What would make this perfect

Close F-7-1 with packaged-extension assertions for both promised replay paths:
timed-cue seeking through Alt+R and page-caption reshown through the real popup
control. Then rerun the exact 15 commands from a fresh clone and the full live
audit. Nothing else found in this round requires product or copy changes.

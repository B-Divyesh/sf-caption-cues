# Adversarial first-read review 6: Caption Cues

**Verdict: FAIL**

Reviewed 2026-08-28 UTC against <https://caption-cues.sociobot.in/> and
repository commit `62ab257e07c4f8cddcfc64567fdeed0a792c9f58`. Product source was
not modified.

There is one blocking claim-registry regression, one major honesty finding,
and six minor copy/evidence findings. Existing tests pass, but they do not
cover the unlisted outcome claim on the landing page.

## Cold first read

Fresh Chromium contexts with no cookies or storage opened the live home at
390 × 844 and 1440 × 900. I did not scroll before recording these answers.

| Question | 390 px phone | Desktop |
| --- | --- | --- |
| What does this do? | It highlights names, speaker labels, sound cues, and chosen words in captions. | Same. |
| For whom? | Viewers who follow captions but miss names, speaker labels, or sound cues. | Same. |
| What should I click first? | **Try it with sample data**. | **Try it with sample data**. |

The evidence is explicit: “Highlight the caption words you miss,” “For viewers
who follow captions but miss names, speaker labels, or sound cues,” and “Try it
with sample data.” On the phone, the primary action occupied y=413–462. The
three facts ended at y=664, so all required first-screen copy was fully visible.
No first-read blocker was reproduced.

## Findings, ordered by severity

### F-6-1 — BLOCKING — B3 regressed: an accessibility outcome is an unlisted, untested claim

- **Exact quote/location:** live landing page, “Why selective highlighting
  helps” section: **“Make key caption words easier to spot.”**
- **Evidence:** `.factory/claims.json` has no entry for making words easier to
  spot. `@claim:caption-emphasis` proves that four visual treatments render; it
  does not test whether a viewer spots words more easily. Repository search for
  “easier to spot” finds the landing copy and copy audit, but no claim or claim
  test.
- **Why this misleads:** this is an accessibility-effect claim a visitor could
  rely on. The brief’s actual outcome measure requires participant research,
  so a rendering assertion cannot substitute for evidence of improved
  perception.
- **Concrete fix:** replace the heading with the observable **“Choose which
  caption words stand out”**, which is covered by the existing rendering test.
  Alternatively, register a human usability claim and supply the participant
  protocol and result; do not map “easier” to a DOM-style assertion.

### F-6-2 — MAJOR — the landing page presents an unattributed quotation as user evidence

- **Exact quote/location:** live landing page blockquote: **“I don’t need every
  caption bigger. I need the name I might mishear to look different.”**
- **Evidence:** neither the brief nor repository identifies a speaker, study,
  interview, or fictional-persona label for this quotation.
- **Why this misleads:** quotation marks in an efficacy section imply a real
  user statement. A first-time visitor cannot tell whether this is research
  evidence or marketing copy.
- **Concrete fix:** remove the quotation marks and use the factual instruction
  **“Give names you might mishear a different style.”** If it is a real quote,
  identify the research source and consent-safe attribution.

### F-6-3 — MINOR — compatibility copy uses unexplained browser-internals language

- **Exact quote/locations:** landing: “Caption Cues reads **exposed caption
  text**”; “hidden caption pixels and **closed components**”; “when exposed
  caption text is unavailable”; and “inaccessible closed components.” README:
  “exposed captions” and “closed components.”
- **Why this loses a first-time visitor:** “exposed” and “closed components”
  describe implementation boundaries, not what a viewer can recognise in a
  player.
- **Concrete fix:** use **“Caption Cues reads caption text the page makes
  available.”** For the limit, use **“It cannot change captions baked into the
  video picture or captions the page does not provide as text.”** Use this same
  wording in the landing page, README, privacy copy, claim, and test name.

### F-6-4 — MINOR — privacy copy uses “remote runtime scripts” without explaining it

- **Exact quote/locations:** landing FAQ: “Caption Cues has no analytics or
  **remote runtime scripts**.” README: “The site and extension contain no
  analytics, remote fonts, or remote runtime scripts.”
- **Why this loses a first-time visitor:** “runtime scripts” is developer
  terminology and does not state the privacy consequence.
- **Concrete fix:** use **“Caption Cues has no analytics and loads no code from
  other sites.”** In README: **“The site and extension use no analytics, remote
  fonts, or code loaded from other sites.”** Keep the existing network test.

### F-6-5 — MINOR — the README heading “What ships” does not identify its subject

- **Exact quote/location:** README heading: **“What ships.”**
- **Why this loses a first-time reader:** in a heading list, “ships” is release
  jargon and does not name what the section contains.
- **Concrete fix:** rewrite it as **“What Caption Cues includes.”**

### F-6-6 — MINOR — the README explains offline behavior with cache-strategy jargon

- **Exact quote/location:** README: “The release-specific service worker uses
  **network-first page requests and cache-first build assets**.”
- **Why this loses a first-time reader:** the sentence names implementation
  strategies without explaining the result.
- **Concrete fix:** use **“The service worker checks online for pages and keeps
  built files available offline.”** Keep detailed strategy names in code
  comments or contributor documentation.

### F-6-7 — MINOR — the README permission explanation assumes extension-development knowledge

- **Exact quote/location:** README: “Page access lets the **content script**
  find exposed captions. The `storage` permission saves settings, and
  **`activeTab`** sends status and replay commands.”
- **Why this loses a first-time reader:** “content script” and `activeTab` are
  not explained in terms of what the extension can access.
- **Concrete fix:** use **“Page access lets Caption Cues find captions on the
  current page. `storage` saves settings. `activeTab` checks caption status and
  replays the last line only on the current tab.”**

### F-6-8 — MINOR — the committed “full” copy audit omits landing-page copy

- **Exact quote/location:** `.factory/copy-audit.md` says it contains
  visitor-facing rendered landing copy. It omits the offline message
  **“You’re offline. Open the sample to keep trying Caption Cues.”**, the
  rendered sample **“MARA: Tell Rowan to meet us at Thessaly Gate. [train
  approaching]”**, and the hero image alternative **“Abstract paper caption
  strips moving through a cobalt proofing press.”**
- **Evidence:** `tests/copy-policy.test.ts` validates that every listed audit
  row exists in source, but it has no inverse coverage assertion proving every
  landing string appears in the audit.
- **Why this matters:** an incomplete audit can remain green while new dynamic,
  offline, or accessible copy exceeds the word limit or restores banned terms.
- **Concrete fix:** generate the landing inventory from static HTML plus known
  dynamic strings, include alternative/status text, and add an inverse test
  that fails for an unaudited user-facing string.

## Copy audit

Counts below use whitespace-delimited words. `Alt+R`, paths, and hyphenated
terms count as one word. Repeated navigation/footer labels are listed once.
Sentence fragments, headings, actions, and meaningful alternative/status text
are included because the plain-words rules also apply to them. No item exceeds
22 words and no banned marketing adjective appears. Flags refer to findings
above.

### Live landing page

| Words | Copy | Flag |
| ---: | --- | --- |
| 2 | You’re offline. | — |
| 8 | Open the sample to keep trying Caption Cues. | F-6-8 audit omission |
| 4 | Skip to main content | — |
| 2 | Caption Cues | — |
| 1 | Demo | — |
| 3 | How it works | — |
| 1 | Privacy | — |
| 2 | Download ZIP | — |
| 10 | Abstract paper caption strips moving through a cobalt proofing press | F-6-8 audit omission |
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
| 11 | MARA: Tell Rowan to meet us at Thessaly Gate. [train approaching] | F-6-8 audit omission |
| 5 | Alt+R replays the last line | — |
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
| 6 | Caption Cues reads exposed caption text. | F-6-3 jargon |
| 11 | It does not capture audio, download video, or create a transcript. | — |
| 3 | Turn captions on | — |
| 8 | Start the captions offered by your video player. | — |
| 3 | Choose your cues | — |
| 10 | Mark names, speaker labels, sound cues, or a saved word. | — |
| 4 | Replay the last line | — |
| 12 | Press Alt+R to replay a timed cue or reshow visible caption text. | — |
| 5 | When a player is unsupported | — |
| 10 | Caption Cues leaves hidden caption pixels and closed components unchanged. | F-6-3 jargon |
| 9 | It tells you when exposed caption text is unavailable. | F-6-3 jargon |
| 4 | Why selective highlighting helps | F-6-1 claim context |
| 7 | Make key caption words easier to spot | F-6-1 unlisted claim |
| 6 | I don’t need every caption bigger. | F-6-2 unattributed quote |
| 10 | I need the name I might mishear to look different. | F-6-2 unattributed quote |
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
| 9 | Caption Cues has no analytics or remote runtime scripts. | F-6-4 jargon |
| 3 | Which videos work? | — |
| 14 | It supports standard browser caption tracks and selected caption text shown on the page. | F-6-3 jargon |
| 5 | Which videos do not work? | — |
| 12 | It cannot change captions hidden in video pixels or inaccessible closed components. | F-6-3 jargon |
| 8 | Highlights selected words in captions you already use. | — |
| 1 | Terms | — |
| 1 | Source | — |
| 7 | Built by Param Factory · Build 1.0.5-r5 | — |
| 10 | Original proof-sheet artwork was generated with the factory image model. | — |

### README

| Words | Copy | Flag |
| ---: | --- | --- |
| 2 | Caption Cues | — |
| 12 | Highlight names, speaker labels, sound cues, and saved words in exposed captions. | F-6-3 jargon |
| 12 | Caption Cues is for viewers who follow captions but miss key words. | — |
| 11 | The Chrome extension changes caption styling without creating a new transcript. | — |
| 14 | Press Alt+R to replay the last timed cue or reshow the latest visible caption. | — |
| 5 | Try it with sample data. | — |
| 13 | The demo is isolated, works offline after one visit, and needs no account. | — |
| 2 | What ships | F-6-5 heading |
| 3 | A Chrome extension. | — |
| 14 | Controls for names, speaker labels, sound cues, saved words, text size, and caption background. | — |
| 14 | Support for standard browser caption tracks and selected caption text shown on the page. | F-6-3 jargon |
| 12 | Restoration of the page’s original caption state when the extension is disabled. | — |
| 9 | Keyboard and popup controls for replaying the last caption. | — |
| 11 | A static product site, isolated demo, legal pages, and extension ZIP. | — |
| 13 | Caption Cues cannot change captions hidden in video pixels or inaccessible closed components. | F-6-3 jargon |
| 12 | It does not capture audio, download video, or bypass a protected player. | — |
| 3 | Run and test | — |
| 2 | npm ci | — |
| 3 | npm run setup:browser | — |
| 3 | npm run check | — |
| 7 | On Ubuntu CI, use npm run setup:browser:ci. | — |
| 3 | Optional CI command: | — |
| 3 | npm run check:clean-browser | — |
| 6 | Every public claim appears in .factory/claims.json. | Contradicted by F-6-1 |
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
| 12 | The release-specific service worker uses network-first page requests and cache-first build assets. | F-6-6 jargon |
| 8 | Hosting rules and security headers are in site/public/staticwebapp.config.json. | — |
| 3 | Privacy and permissions | — |
| 8 | Caption text and settings stay in the browser. | — |
| 9 | Page access lets the content script find exposed captions. | F-6-3/F-6-7 jargon |
| 12 | The storage permission saves settings, and activeTab sends status and replay commands. | F-6-7 jargon |
| 7 | The extension makes no external network requests. | — |
| 13 | The site and extension contain no analytics, remote fonts, or remote runtime scripts. | F-6-4 jargon |
| 6 | Read the privacy policy and terms. | — |
| 1 | License | — |
| 4 | MIT — see LICENSE. | — |

The terminology is otherwise consistent: **speaker label**, **sound cue**,
**saved word**, and **caption background**. Landing actions name their results.

## Demo and sandbox behavior

The first click opened `/demo/?demo=1` with the persistent banner **“Demo —
sample data, nothing is saved,”** Reset demo, and Start for real. At 390 × 844,
the sample workbench began at y=564 and the highlighted caption began at y=780,
so the product and realistic station sample were visible in the first viewport.

The seeded sample has three lines and all four treatments. Advancing to line 2
and using `Alt+R` reported “Replayed caption line 2.” Reset restored line 1,
paper background, and saved word `Gate`. With an ordinary sentinel present,
the demo wrote only `demo:caption-cues:settings`; Reset and Start for real left
the sentinel unchanged, and Start for real removed the demo key. Source review
confirmed that demo code has no `chrome.storage` access.

Network interception recorded 32 requests and all were same-origin. After one
online visit and service-worker control, an offline reload showed the offline
status and advanced to line 2. Demo isolation, Reset, offline behavior, and the
no-real-data boundary therefore pass.

## Claims

I created a separate clean clone at
`/tmp/caption-cues-review6-clean.h5tDcw/repo`, ran `npm ci` and
`npm run setup:browser`, then ran every exact command in `.factory/claims.json`
independently.

| Claim ID | Exact command | Result |
| --- | --- | --- |
| `caption-emphasis` | `npm run test:claim -- @claim:caption-emphasis` | PASS, 1 selected test |
| `demo-isolation` | `npm run test:claim -- @claim:demo-isolation` | PASS, 1 selected test |
| `site-offline` | `npm run test:claim -- @claim:site-offline` | PASS, 1 selected test |
| `no-account-free-tools` | `npm run test:claim -- @claim:no-account-free-tools` | PASS, 1 selected test |
| `replay-last-line` | `npm run test:claim -- @claim:replay-last-line` | PASS, 1 selected test |
| `exposed-caption-sources` | `npm run test:claim -- @claim:exposed-caption-sources` | PASS, 1 selected test |
| `hidden-caption-limit` | `npm run test:claim -- @claim:hidden-caption-limit` | PASS, 1 selected test |
| `no-media-capture` | `npm run test:claim -- @claim:no-media-capture` | PASS, 1 selected test |
| `local-caption-data` | `npm run test:claim -- @claim:local-caption-data` | PASS, 1 selected test |
| `overlay-restoration` | `npm run test:claim -- @claim:overlay-restoration` | PASS, 1 selected test |
| `package-output` | `npm run test:claim -- @claim:package-output` | PASS, 1 selected test |
| `offline-cache-policy` | `npm run test:claim -- @claim:offline-cache-policy` | PASS, 1 selected test |
| `permission-minimum` | `npm run test:claim -- @claim:permission-minimum` | PASS, 1 selected test |
| `no-tracking-runtime` | `npm run test:claim -- @claim:no-tracking-runtime` | PASS, 1 selected test |
| `generated-art` | `npm run test:claim -- @claim:generated-art` | PASS, 1 selected test |

No listed test failed. F-6-1 is an unlisted claim, so the green registry cannot
cover it. The full repository `npm test` also passed: 55 tests in seven files.

## Earlier finding verification

Every earlier review, polish record, verification, and handoff was read. The
following checks were repeated against both live behavior and current source.

| Earlier ID | Round-6 result |
| --- | --- |
| B1 | Fixed: job, audience, primary sample action, adjacent result, and three facts are above the fold at both widths. |
| B2 | Fixed: one-click seeded demo, persistent banner, Reset, Start for real, and `demo:`-only storage all work. |
| B3 | **Regressed only as F-6-1:** the registry and its 15 tests exist and pass, but the “easier to spot” outcome is unlisted. |
| B4 | Fixed: demo/legal deep links work; unknown routes return the designed Caption Cues page with HTTP 404 and Return home. |
| B5 | Fixed: no unavailable checkout, price, merchant, supporter, or license interface is present. |
| M1 | Fixed: each route has a valid title, description, canonical, OG/Twitter image metadata, favicon, and touch icon. |
| M2 | Fixed: common header/footer, legal links, route announcement, H1 focus, and browser-Back focus work. |
| M3 | Fixed: only `.brand-mark` is circular; the Caption Cues wordmark is readable. |
| M4 | Fixed: the secondary download states that it is an unpacked Chrome extension for Developer mode. |
| N1 | Fixed: audited phone controls are at least 44 × 44 px and no audited route overflows horizontally. |
| C1–C18 | Fixed against their exact rejected phrases. C10’s replacement remains, but its separate claim-registration defect is now F-6-1. |
| F-2-1 | Fixed: the non-track source name is consistent across landing, privacy, README, registry, audit, and test. F-6-3 concerns clarity, not consistency. |
| F-3-1 | Fixed: the standardized source phrase is present in committed audit evidence. |
| F-4-1 | Fixed: the packaged extension preserves an unrecognised surface and its popup reports the waiting state. |
| F-4-2 | Fixed for its exact defect: listed word counts recalculate correctly. F-6-8 is the separate inverse-coverage omission. |
| F-4-3 | Fixed: the popup says “Caption controls.” |
| F-4-4 | Fixed: the popup action says “Save word.” |
| F-5-1 | Fixed: `@claim:caption-emphasis` observes all four cue kinds in the packaged extension after saving `Gate` through the popup. |
| F-5-2 | Fixed: README says “A Chrome extension,” with no Manifest V3 term. |
| Verification 1 cache policy | Fixed: hashed assets are immutable and the worker is `no-cache` on the live host. |
| Verification 1 worker update | Fixed: the release A→B offline update test passes. |
| Verification 1 hardening | Fixed: live CSP, Permissions-Policy, nosniff, referrer policy, and HSTS are present. |
| Verification 2 P1 | Fixed: the documented pinned-browser provisioner succeeds from the clean clone. |

## Structure, links, accessibility, and identity

- `/`, `/demo/`, `/privacy/`, and `/terms/` return 200. The designed unknown
  route returns 404. Each has one H1, one main landmark, route-appropriate
  title, description, canonical, OG/Twitter metadata, and common chrome.
- Route navigation focuses the new H1; browser Back focuses the restored H1.
  The polite status region is present. Deep links reload correctly.
- Every ordinary HTTP(S) link found across the five routes returned 200,
  including the ZIP and external Source link. Mail links were explicit
  exemptions. The 404 page’s `#main` skip link works within that 404 document.
- The live phone/desktop audit found no unexpected console errors, horizontal
  overflow, or serious/critical Axe findings. Reduced motion uses `auto` scroll
  behavior. First-load JavaScript is far below the stated budget.
- Live home HTML and ZIP SHA-256 values exactly match the local clean build:
  `633a6140a672f2d2f34f35da62e5887435042aad1d8cf44b5846137fbdeb488c`
  and `56ed381d0e184cc37612dae225e3fb8c1287d1739e704ab64284ed15c61cfd39`.
- The warm paper, halftone, cobalt/orange registration marks, proofing-press
  artwork, clipped controls, and editorial typography are product-specific and
  match `.factory/design.md`; this is not a generic SaaS template.

## Missed leverage

No missing AI, import/export, or sync feature is implied strongly enough by the
brief to add one. Caption Cues performs local visual emphasis over existing
captions; sending caption text to AI would weaken its central privacy boundary.
No decorative AI feature, provider key, Azure endpoint, or runtime model call
was found.

## What would make this perfect

Remove or substantiate the unlisted “easier to spot” claim, make the quotation
honest about its source, replace the flagged browser jargon with the proposed
viewer language, rename the vague README heading, simplify its cache and
permission explanations, and make the copy audit cover dynamic/status/alt
text. Then rerun all 15 exact claim commands, the full suite, and the live cold
audit. Until every finding above is closed, the required zero-finding standard
is not met.

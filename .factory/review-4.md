# Adversarial first-read review 4: Caption Cues

**Verdict: FAIL**

Reviewed 2026-08-28 UTC against https://caption-cues.sociobot.in/ and commit
10a75fe98fadf12a1b0d5fcd6f57c9b4e5387da5. Product source was not modified.

## Cold first read

Fresh no-storage Chromium contexts at 390 × 844 and 1440 × 900 answered all
three questions before scrolling.

| Question | Answer |
| --- | --- |
| What does this do? | It highlights selected parts of captions a viewer may miss. |
| For whom? | Viewers who follow captions but miss names, speaker labels, or sound cues. |
| What should I click first? | **Try it with sample data**. |

The phone action ended at y=462, inside the initial viewport. Exact supporting
copy is: “Highlight the caption words you miss”; “For viewers who follow
captions but miss names, speaker labels, or sound cues.”; and “See highlighted
captions before you install.” B1 remains fixed.

## Findings, ordered by severity

### F-4-1 — BLOCKING — B3 is half-fixed: the unsupported-caption claim is not tested against the extension

- **Exact quote/location:** Landing limitation: “Caption Cues leaves hidden
  caption pixels and closed components unchanged. It tells you when exposed
  caption text is unavailable.” The claims registry registers
  hidden-caption-limit as “Hidden or inaccessible captions stay unchanged and
  show a waiting state.”
- **Evidence:** The tagged test passes, but tests/claims.test.ts only preserves
  the static demo heading “Hidden captions stay unchanged”, clicks “Check hidden-caption sample”,
  and asserts hard-coded demo status text. It does not load dist/extension,
  provide an unsupported-caption fixture, inspect unchanged caption content, or
  read an extension waiting/unavailable state. The content script has no
  unsupported-caption status branch; it only reports detected and hasLastCue.
- **Why this matters:** A visitor is told what happens on an unsupported player,
  but the shipped extension path is not proven to provide that outcome. The
  demo cannot substitute for the extension’s real unsupported-player behavior.
- **Concrete fix:** Add an extension fixture containing an unrecognised caption
  surface and assert its text/markup remains exactly unchanged. Have the popup
  show “Waiting for exposed caption text. Start captions; some players cannot
  expose it.” when GET_STATUS has no detected source. Update the
  @claim:hidden-caption-limit test to exercise that fixture and status, then
  retain the demo as explanatory sample rather than proof.

### F-4-2 — MINOR — the committed copy-audit word counts are inaccurate

- **Exact quote/location:** .factory/copy-audit.md says “Counts treat keyboard
  shortcuts and hyphenated terms as one word,” but records “See each highlighted
  caption part” as 7 words (it is 5) and “Press Alt+R to replay a timed cue or
  reshow visible caption text.” as 17 words (it is 12). Other mismatches include
  “Caption Cues reads exposed caption text.” (listed 7, actual 6), the landing
  no-capture sentence (listed 10, actual 11), and “I don’t need every caption
  bigger.” (listed 7, actual 6).
- **Why this matters:** The evidence asserts a precise audit method and was
  previously treated as release evidence in F-3-1. Incorrect counts make that
  evidence unreliable, even though independently counted visitor copy remains
  below the 22-word cap.
- **Concrete fix:** Regenerate the entire table from rendered strings with one
  documented tokenizer (whitespace-delimited words; Alt+R and hyphenated terms
  each count once) and add a test rejecting a mismatch between audited count
  and source text.

### F-4-3 — MINOR — the extension popup restores an unexplained metaphor

- **Exact quote/location:** entrypoints/popup/index.html: “Live proof sheet”.
- **Why this matters:** It is the first small heading in the actual product UI,
  but does not identify the screen’s purpose for a visitor who has not read the
  visual thesis.
- **Concrete fix:** Replace it with “Caption controls”.

### F-4-4 — MINOR — the popup’s saved-word action does not name its result

- **Exact quote/location:** entrypoints/popup/index.html saved-word form button:
  “Add”.
- **Why this matters:** “Add” does not say what will be saved, contrary to the
  result-naming action rule. The demo already uses the clearer “Save word”.
- **Concrete fix:** Change the button label to “Save word” and retain behavior.

## Copy audit

Counts use whitespace-delimited visible words. Keyboard shortcuts and
hyphenated terms count as one word; headings and labels are included so the
audit also checks context. No landing or README item exceeds 22 words. The
terminology is consistent: **speaker label**, **sound cue**, **saved word**,
**caption background**, and **selected caption text shown on the page**. The
only landing/README copy flag is F-4-2’s inaccurate evidence; F-4-3/F-4-4
apply to the extension popup.

### Landing page

| Words | Copy |
| ---: | --- |
| 10 | You’re offline. Open the sample to keep trying Caption Cues. |
| 5 | A caption highlighter for Chrome |
| 6 | Highlight the caption words you miss. |
| 13 | For viewers who follow captions but miss names, speaker labels, or sound cues. |
| 5 | Try it with sample data |
| 6 | See highlighted captions before you install. |
| 4 | Download unpacked Chrome extension |
| 7 | Downloads a ZIP for Chrome Developer mode. |
| 5 | Caption controls need no account. |
| 7 | The demo works offline after one visit. |
| 7 | All highlighting and replay tools are free. |
| 2 | Caption preview |
| 5 | See each highlighted caption part |
| 12 | Switch a rule off to compare the same caption without that mark. |
| 2 | Live preview |
| 7 | Alt + R replays the last line |
| 2 | Emphasis rules |
| 2 | Speaker labels |
| 4 | Text before the colon |
| 1 | Names |
| 4 | Names in the line |
| 2 | Sound cues |
| 3 | Descriptions in brackets |
| 3 | Saved word: Gate |
| 4 | A word you chose |
| 4 | How Caption Cues works |
| 7 | Uses caption text already on the page |
| 6 | Caption Cues reads exposed caption text. |
| 11 | It does not capture audio, download video, or create a transcript. |
| 3 | Turn captions on |
| 8 | Start the captions offered by your video player. |
| 3 | Choose your cues |
| 10 | Mark names, speaker labels, sound cues, or a saved word. |
| 4 | Replay the last line |
| 12 | Press Alt+R to replay a timed cue or reshow visible caption text. |
| 5 | When a player is unsupported |
| 10 | Caption Cues leaves hidden caption pixels and closed components unchanged. |
| 9 | It tells you when exposed caption text is unavailable. |
| 4 | Why selective highlighting helps |
| 7 | Make key caption words easier to spot |
| 6 | I don’t need every caption bigger. |
| 10 | I need the name I might mishear to look different. |
| 13 | You choose which names, sound cues, speaker labels, and saved words stand out. |
| 3 | Installation and compatibility |
| 5 | Install and use the extension |
| 6 | How do I install the download? |
| 2 | Unzip it. |
| 2 | Open chrome://extensions. |
| 12 | Turn on Developer mode, choose “Load unpacked,” then select the unzipped folder. |
| 6 | Does it send my captions anywhere? |
| 1 | No. |
| 8 | Caption text and settings stay in your browser. |
| 9 | Caption Cues has no analytics or remote runtime scripts. |
| 3 | Which videos work? |
| 14 | It supports standard browser caption tracks and selected caption text shown on the page. |
| 5 | Which videos do not work? |
| 12 | It cannot change captions hidden in video pixels or inaccessible closed components. |
| 8 | Highlights selected words in captions you already use. |
| 7 | Built by Param Factory · Build 1.0.3-r3 |
| 10 | Original proof-sheet artwork was generated with the factory image model. |

Header/footer labels, including **Demo**, **How it works**, **Privacy**,
**Download ZIP**, **Terms**, and **Source**, were also checked. They are short,
distinct links; all primary actions name their result. The required demo exit
label **Start for real** remains the demo-sandbox exception.

### README

| Words | Copy |
| ---: | --- |
| 12 | Highlight names, speaker labels, sound cues, and saved words in exposed captions. |
| 12 | Caption Cues is for viewers who follow captions but miss key words. |
| 11 | The Chrome extension changes caption styling without creating a new transcript. |
| 14 | Press Alt+R to replay the last timed cue or reshow the latest visible caption. |
| 5 | Try it with sample data. |
| 13 | The demo is isolated, works offline after one visit, and needs no account. |
| 5 | A Chrome Manifest V3 extension. |
| 14 | Controls for names, speaker labels, sound cues, saved words, text size, and caption background. |
| 14 | Support for standard browser caption tracks and selected caption text shown on the page. |
| 12 | Restoration of the page’s original caption state when the extension is disabled. |
| 9 | Keyboard and popup controls for replaying the last caption. |
| 11 | A static product site, isolated demo, legal pages, and extension ZIP. |
| 13 | Caption Cues cannot change captions hidden in video pixels or inaccessible closed components. |
| 12 | It does not capture audio, download video, or bypass a protected player. |
| 7 | On Ubuntu CI, use npm run setup:browser:ci. |
| 6 | Every public claim appears in .factory/claims.json. |
| 10 | Run one claim with the exact command in that file. |
| 4 | Run them all with: |
| 7 | Build output is in dist/extension and dist/site. |
| 6 | The Chrome ZIP is in dist/site/downloads/caption-cues-chrome.zip. |
| 6 | To load the extension, open chrome://extensions. |
| 10 | Turn on Developer mode, choose Load unpacked, and select dist/extension. |
| 12 | The release-specific service worker uses network-first page requests and cache-first build assets. |
| 8 | Hosting rules and security headers are in site/public/staticwebapp.config.json. |
| 8 | Caption text and settings stay in the browser. |
| 9 | Page access lets the content script find exposed captions. |
| 12 | The storage permission saves settings, and activeTab sends status and replay commands. |
| 7 | The extension makes no external network requests. |
| 13 | The site and extension contain no analytics, remote fonts, or remote runtime scripts. |
| 6 | Read the privacy policy and terms. |
| 4 | MIT — see LICENSE. |

## Demo, privacy, and claims

The one-click landing action entered /?demo=1, redirected to /demo/?demo=1, and
immediately displayed the realistic three-line Thessaly station sample:
“MARA: Rowan, wait at Thessaly Gate. [train approaching]”. The persistent
banner reads “Demo — sample data, nothing is saved”; Reset demo restored line 1
of 3; Start for real cleared demo storage before downloading the ZIP. With
ordinary sentinels present, the demo wrote only demo:caption-cues:settings and
preserved ordinary keys. The live auditor observed 32 same-origin demo requests
and successfully reloaded/advanced the sample while offline after one visit.

All 15 exact commands listed in .factory/claims.json were run from a fresh
clone at /tmp/caption-cues-review-4.IsttLu/repo after npm ci and
npm run setup:browser; each exited successfully. npm run test:claims then passed
all 15 tests, and npx vitest run passed 52 tests across seven files. No
registered test failed. F-4-1 concerns the adequacy of the observable test, not
its exit status.

Every claim-like landing and README sentence maps to a registry entry:
emphasis, demo isolation, offline operation, no-account/free controls, replay,
exposed sources, unsupported limits, no media capture, local data, extension
restoration, package output, cache policy, permissions, no tracking, or
generated artwork. No unlisted landing or README claim was found. The absence
of an AI feature, import/export, or sync is appropriate: the brief calls for
local display preferences over existing captions, and no AI step is implied. No
provider key or runtime AI call exists.

## History, structure, accessibility, and identity

| Earlier findings | Round-4 result |
| --- | --- |
| B1, B2, B4, B5; M1–M4; N1 | Confirmed fixed in live production and source: clear first screen, isolated demo, designed 404, no dead paid UI, complete metadata, shared chrome/focus handoff, readable mark, candid ZIP disclosure, and 44 px mobile targets. |
| B3 | Reopened by F-4-1 only: its hidden-caption-limit evidence is not an extension test. The other 14 claim mappings and tests are present. |
| C1–C18 | Confirmed fixed: no previously rejected metaphor, support/payment jargon, obsolete theme term, or source-name variant is present. |
| F-2-1 and F-3-1 | “selected caption text shown on the page” is consistent across live home, Privacy, README, registry, test, and audit. Neither finding regressed. |
| Verifier 1 cache/header and service-worker issues; verifier 2 browser-install issue | Confirmed fixed: live assets are immutable, worker is no-cache, CSP/Permissions-Policy/nosniff/referrer policy are present, and the clean clone provisioner installed pinned Chromium. |

npm run verify:live passed /, /demo/, /privacy/, /terms/, and the designed 404 at
phone and desktop widths: expected HTTP status, one H1 and main, route
titles/descriptions/canonicals/OG/Twitter/favicon, no console errors, no
horizontal overflow, and zero serious/critical Axe findings. It verified focus
on navigation and Back. The title pattern is correct for all routes, including
Demo — Caption Cues, Privacy — Caption Cues, Terms — Caption Cues, and 404 —
Caption Cues.

The crawl returned 200 for every ordinary internal link, the ZIP, and Source;
mailto links were explicit exemptions. The intentionally tested unknown route
returned the designed product 404. Header/footer include Privacy and Terms
consistently. The paper, halftone, cobalt/orange print-sheet system is distinct
from a generic SaaS template and matches .factory/design.md.

## What would make this perfect

Make the unsupported-caption state real and prove it through the built
extension, correct the generated copy-audit counts, and replace the two popup
labels in F-4-3/F-4-4. Then rerun the exact claim loop, clean-clone suite, and
cold live audit. With those results, there would be no observed finding left.


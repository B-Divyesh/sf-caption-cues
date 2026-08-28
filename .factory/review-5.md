# Adversarial first-read review 5: Caption Cues

**Verdict: FAIL**

Reviewed 2026-08-28 UTC against https://caption-cues.sociobot.in/ and commit
e697d883933919b9a77f554c4bd76c92b9fc37b1. Product source was not modified.

## Cold first read

Fresh no-storage Chromium contexts opened the live home at 390 × 844 and
1440 × 900 without scrolling.

| Question | 390 px phone | Desktop |
| --- | --- | --- |
| What does this do? | Highlights selected words in captions the page exposes. | Same. |
| For whom? | Viewers who follow captions but miss names, speaker labels, or sound cues. | Same. |
| What should I click first? | **Try it with sample data**. | **Try it with sample data**. |

The phone action measured 48.8 px high and ended at y=462, within the initial
viewport. Evidence: “Highlight the caption words you miss”; “For viewers who
follow captions but miss names, speaker labels, or sound cues.”; and “See
highlighted captions before you install.” No first-read blocking issue exists.

## Findings, ordered by severity

### F-5-1 — BLOCKING — B3 remains half-fixed: the all-cue claim is not observed in the packaged extension

- **Exact quote/location:** `.factory/claims.json`, `caption-emphasis`:
  “Highlights names, speaker labels, sound cues, and saved words.” It appears
  on the landing page, demo, extension popup, and README.
- **Evidence:** The sole `@claim:caption-emphasis` test opens only the site demo
  and asserts its four `#sample-caption` fragments. It never loads
  `dist/extension`. `@claim:exposed-caption-sources` does load the extension,
  but observes only a speaker class and sound class in DOM captions, then plain
  `NORA` text in the timed overlay. It does not observe a styled name or saved
  word. `@claim:no-account-free-tools` saves “Thessaly” in the popup but only
  inspects storage, not a rendered caption.
- **Why this loses or misleads:** the product sold is a browser extension, but
  the proof establishes all four treatments only in a simulated sample. A saved
  setting can succeed yet fail to affect the shipped content script. This is the
  extension-versus-demo proof gap that reopened B3 in review 4.
- **Concrete fix:** extend the existing `@claim:caption-emphasis` test, without
  a second tag, with a fresh packaged-extension profile. Use a recognised DOM
  caption such as `MARA: Rowan, wait at Thessaly Gate. [train approaching]`,
  save `Gate` through the popup, and assert visible extension treatments for
  the speaker label, `Rowan`, `Gate`, and the sound cue. Retain the demo check
  and run every exact claim command from a clean clone.

### F-5-2 — MINOR — README uses an unexplained platform-version term

- **Exact quote/location:** README, **What ships**: “A Chrome Manifest V3
  extension.”
- **Why this loses a first-time visitor:** “Manifest V3” is Chrome developer
  terminology. It explains no capability, step, or limitation to the viewer.
- **Concrete fix:** rewrite it as “A Chrome extension.” Keep the manifest
  version in developer build documentation if it is needed there.

## Copy audit

Counts use whitespace-delimited words. `Alt+R` and hyphenated terms count as
one word. The full source-level inventory below is also independently
recounted in `.factory/copy-audit.md`. No item exceeds 22 words. Apart from
F-5-2, no banned marketing adjective, unclear heading, inconsistent cue term,
or non-result-naming landing action was found. Terms remain **speaker label**,
**sound cue**, **saved word**, **caption background**, and **selected caption
text shown on the page**.

### Landing page

| Words | Copy |
| ---: | --- |
| 4 | Skip to main content |
| 2 | Caption Cues |
| 1 | Demo |
| 3 | How it works |
| 1 | Privacy |
| 2 | Download ZIP |
| 5 | A caption highlighter for Chrome |
| 6 | Highlight the caption words you miss |
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
| 5 | Alt+R replays the last line |
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
| 1 | Terms |
| 1 | Source |
| 7 | Built by Param Factory · Build 1.0.4-r4 |
| 10 | Original proof-sheet artwork was generated with the factory image model. |

### README

| Words | Copy |
| ---: | --- |
| 2 | Caption Cues |
| 12 | Highlight names, speaker labels, sound cues, and saved words in exposed captions. |
| 12 | Caption Cues is for viewers who follow captions but miss key words. |
| 11 | The Chrome extension changes caption styling without creating a new transcript. |
| 14 | Press Alt+R to replay the last timed cue or reshow the latest visible caption. |
| 5 | Try it with sample data. |
| 13 | The demo is isolated, works offline after one visit, and needs no account. |
| 2 | What ships |
| 5 | A Chrome Manifest V3 extension. |
| 14 | Controls for names, speaker labels, sound cues, saved words, text size, and caption background. |
| 14 | Support for standard browser caption tracks and selected caption text shown on the page. |
| 12 | Restoration of the page’s original caption state when the extension is disabled. |
| 9 | Keyboard and popup controls for replaying the last caption. |
| 11 | A static product site, isolated demo, legal pages, and extension ZIP. |
| 13 | Caption Cues cannot change captions hidden in video pixels or inaccessible closed components. |
| 12 | It does not capture audio, download video, or bypass a protected player. |
| 3 | Run and test |
| 7 | On Ubuntu CI, use npm run setup:browser:ci. |
| 6 | Every public claim appears in .factory/claims.json. |
| 10 | Run one claim with the exact command in that file. |
| 4 | Run them all with: |
| 3 | Build and load |
| 7 | Build output is in dist/extension and dist/site. |
| 6 | The Chrome ZIP is in dist/site/downloads/caption-cues-chrome.zip. |
| 6 | To load the extension, open chrome://extensions. |
| 10 | Turn on Developer mode, choose Load unpacked, and select dist/extension. |
| 12 | The release-specific service worker uses network-first page requests and cache-first build assets. |
| 8 | Hosting rules and security headers are in site/public/staticwebapp.config.json. |
| 3 | Privacy and permissions |
| 8 | Caption text and settings stay in the browser. |
| 9 | Page access lets the content script find exposed captions. |
| 12 | The storage permission saves settings, and activeTab sends status and replay commands. |
| 7 | The extension makes no external network requests. |
| 13 | The site and extension contain no analytics, remote fonts, or remote runtime scripts. |
| 6 | Read the privacy policy and terms. |
| 1 | License |
| 4 | MIT — see LICENSE. |

## Demo, claims, history, and structure

The one-click action redirected `/?demo=1` to `/demo/?demo=1`; its first screen
already showed the three-line Thessaly station scene beginning “MARA: Rowan,
wait at Thessaly Gate. [train approaching]”. Its persistent banner reads “Demo
— sample data, nothing is saved” and includes Reset demo and Start for real.

`npm run verify:live` set an ordinary `real:keep` sentinel, changed controls,
advanced and replayed a line, and reset. It restored line 1 of 3, retained the
sentinel, left only `demo:caption-cues:settings`, and observed 32 same-origin
requests. It also reloaded and advanced the demo offline after one visit.

I created a fresh clone at `/tmp/caption-cues-review5.xOE38s/repo`, ran `npm ci`
and `npm run setup:browser`, then ran each of the 15 exact commands in
`.factory/claims.json`. All passed; a subsequent `npm run test:claims` passed
15/15. `npm test`, artifact checks, and `npm run verify:live` also passed.
Passing status does not resolve F-5-1 because its test does not observe the
promised extension outcome.

I read all earlier review, polish, verification, and handoff records. Live and
source checks confirm B1, B2, B4, B5, M1–M4, N1, F-2-1, F-3-1, F-4-2, F-4-3,
and F-4-4 remain fixed. F-4-1 is now real: its tagged test loads
`dist/extension`, preserves an unrecognised caption surface, and reads the
popup waiting state. B3 is reopened only by F-5-1.

The live audit passed `/`, `/demo/`, `/privacy/`, `/terms/`, and the designed
404 at both widths: expected status, title, one H1/main, no overflow, zero
serious/critical Axe results, focus on navigation and Back, and metadata.
Internal links, ZIP, assets, GitHub Source, and explicit mail links are live.
The paper, halftone, cobalt/orange proof-sheet system is distinct from a generic
SaaS template and matches `.factory/design.md`.

No AI, import/export, or sync feature is implied by this local caption-display
brief. No runtime AI call, provider key, or decorative AI control was found.

## What would make this perfect

Prove all four emphasis types through the packaged extension in
`@claim:caption-emphasis`, simplify the README’s Manifest V3 wording, then
repeat the exact clean-clone claim loop and live audit. Nothing else observed
in this round needs product work.

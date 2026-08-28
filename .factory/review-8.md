# Adversarial first-read review 8: Caption Cues

**Verdict: PASS**

Reviewed 2026-08-28 UTC against <https://caption-cues.sociobot.in/> and clean
commit `4098783ffc2a4b27cbfb17e93107b09611702521`. Product code was not
modified. There are zero blocking, major, or minor findings.

## Cold first read

Fresh Chromium contexts, with no prior cookies or storage and without
scrolling, opened the home page at 390 × 844 and 1440 × 900.

| Question | Phone | Desktop |
| --- | --- | --- |
| What does it do? | Highlights the caption words a viewer misses. | Same. |
| For whom? | Viewers who follow captions but miss names, speaker labels, or sound cues. | Same. |
| What should I click first? | **Try it with sample data.** | **Try it with sample data.** |

The exact first-screen copy is “Highlight the caption words you miss,” “For
viewers who follow captions but miss names, speaker labels, or sound cues.” and
“Try it with sample data.” The phone action measured 229.6 × 48.8 px at
y=413–462; it is visible before scrolling. Both fresh first loads made no
off-origin request. The first-read requirement passes.

## Copy audit

Counts use whitespace-delimited words; commands, `Alt+R`, and hyphenated words
count as one. This is the complete landing and README inventory. No item is
over 22 words. No banned marketing adjective, inconsistent product term,
context-free heading, or non-result-naming action was found. The terms remain
consistent: *speaker label*, *sound cue*, *saved word*, *caption background*,
and *caption text the page makes available*.

### Landing page

| Words | Copy |
| ---: | --- |
| 2 | You’re offline. |
| 8 | Open the sample to keep trying Caption Cues. |
| 4 | Skip to main content |
| 2 | Caption Cues |
| 1 | Demo |
| 3 | How it works |
| 1 | Privacy |
| 2 | Download ZIP |
| 10 | Abstract paper caption strips moving through a cobalt proofing press |
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
| 2 | Live preview |
| 11 | MARA: Tell Rowan to meet us at Thessaly Gate. [train approaching] |
| 5 | Alt+R replays the last line |
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
| 9 | Caption Cues reads caption text the page makes available. |
| 11 | It does not capture audio, download video, or create a transcript. |
| 3 | Turn captions on |
| 8 | Start the captions offered by your video player. |
| 3 | Choose your cues |
| 10 | Mark names, speaker labels, sound cues, or a saved word. |
| 4 | Replay the last line |
| 12 | Press Alt+R to replay a timed cue or reshow visible caption text. |
| 5 | When a player is unsupported |
| 18 | It cannot change captions baked into the video picture or captions the page does not provide as text. |
| 3 | Choose your highlights |
| 6 | Choose which caption words stand out |
| 8 | Give names you might mishear a different style. |
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
| 12 | Caption Cues has no analytics and loads no code from other sites. |
| 3 | Which videos work? |
| 13 | It supports standard browser caption tracks and caption text the page makes available. |
| 5 | Which videos do not work? |
| 18 | It cannot change captions baked into the video picture or captions the page does not provide as text. |
| 8 | Highlights selected words in captions you already use. |
| 1 | Terms |
| 1 | Source |
| 7 | Built by Param Factory · Build 1.0.7-r7 |
| 10 | Original proof-sheet artwork was generated with the factory image model. |

### README

| Words | Copy |
| ---: | --- |
| 2 | Caption Cues |
| 16 | Highlight names, speaker labels, sound cues, and saved words in caption text the page makes available. |
| 12 | Caption Cues is for viewers who follow captions but miss key words. |
| 11 | The Chrome extension changes caption styling without creating a new transcript. |
| 14 | Press Alt+R to replay the last timed cue or reshow the latest visible caption. |
| 5 | Try it with sample data. |
| 13 | The demo is isolated, works offline after one visit, and needs no account. |
| 4 | What Caption Cues includes |
| 3 | A Chrome extension. |
| 14 | Controls for names, speaker labels, sound cues, saved words, text size, and caption background. |
| 13 | Support for standard browser caption tracks and caption text the page makes available. |
| 12 | Restoration of the page’s original caption state when the extension is disabled. |
| 9 | Keyboard and popup controls for replaying the last caption. |
| 11 | A static product site, isolated demo, legal pages, and extension ZIP. |
| 19 | Caption Cues cannot change captions baked into the video picture or captions the page does not provide as text. |
| 12 | It does not capture audio, download video, or bypass a protected player. |
| 3 | Run and test |
| 2 | npm ci |
| 3 | npm run setup:browser |
| 3 | npm run check |
| 7 | On Ubuntu CI, use npm run setup:browser:ci. |
| 3 | Optional CI command: |
| 3 | npm run check:clean-browser |
| 6 | Every public claim appears in .factory/claims.json. |
| 10 | Run one claim with the exact command in that file. |
| 4 | Run them all with: |
| 3 | npm run test:claims |
| 10 | After deployment, run npm run verify:live against the production origin. |
| 3 | Build and load |
| 3 | npm run build:site |
| 7 | Build output is in dist/extension and dist/site. |
| 6 | The Chrome ZIP is in dist/site/downloads/caption-cues-chrome.zip. |
| 6 | To load the extension, open chrome://extensions. |
| 10 | Turn on Developer mode, choose Load unpacked, and select dist/extension. |
| 13 | The service worker checks online for pages and keeps built files available offline. |
| 8 | Hosting rules and security headers are in site/public/staticwebapp.config.json. |
| 3 | Privacy and permissions |
| 8 | Caption text and settings stay in the browser. |
| 11 | Page access lets Caption Cues find captions on the current page. |
| 3 | storage saves settings. |
| 14 | activeTab checks caption status and replays the last line only on the current tab. |
| 7 | The extension makes no external network requests. |
| 15 | The site and extension use no analytics, remote fonts, or code loaded from other sites. |
| 6 | Read the privacy policy and terms. |
| 1 | License |
| 4 | MIT — see LICENSE. |

## Demo and privacy sandbox

The primary action opened `/demo/?demo=1` in one click. Its first screen is a
real three-line Thessaly station caption scene, already styled with a speaker
label, names, a sound cue, and saved word. The persistent banner says “Demo —
sample data, nothing is saved” and provides **Reset demo** and **Start for
real**. In a fresh context, changing settings wrote only
`demo:caption-cues:settings`; Reset restored line 1 and preserved ordinary
sentinels; Start for real removed the demo key and left ordinary sentinels
unchanged. The live auditor logged 32 requests, all same-origin. After a first
online visit, an offline reload worked and **Next line** moved the sample to
line 2. The demo is isolated and substantive, not a mock preview.

## Claims and clean-clone verification

Fresh clone: `/tmp/caption-cues-review-8-clean.6nTeWb/repo`. `npm ci` and
`npm run setup:browser` passed. Every exact command in `.factory/claims.json`
was run separately; all passed. `npm run test:claims` then passed all 15 again.

| Claim ID | Result |
| --- | --- |
| `caption-emphasis` | PASS |
| `demo-isolation` | PASS |
| `site-offline` | PASS |
| `no-account-free-tools` | PASS |
| `replay-last-line` | PASS — demo plus packaged timed-track keyboard seek and real-popup page-caption replay. |
| `caption-text-page-makes-available` | PASS |
| `hidden-caption-limit` | PASS |
| `no-media-capture` | PASS |
| `local-caption-data` | PASS |
| `overlay-restoration` | PASS |
| `package-output` | PASS |
| `offline-cache-policy` | PASS |
| `permission-minimum` | PASS |
| `no-tracking-runtime` | PASS |
| `generated-art` | PASS |

All claim-like landing and README sentences map to those registered claims;
none is unlisted. `npm test`, `npm run build`, and the live audit completed
successfully. The fresh local/live SHA-256 values matched for home HTML
(`1bfd680db931923ded5d9cbbe1afaa77f5e3845d0d45fce575253e46771c5ba4`) and
the Chrome ZIP (`924411a23b21aa19b099f751c1250020c92016955b6bd2938e2b792043605077`).

## Earlier findings

Every earlier review, polish report, verification report, and handoff was
read. The following checks confirm each earlier finding in both the current
source and the live build.

| Earlier ID(s) | Current result |
| --- | --- |
| B1 | Fixed: job, audience, phone-visible sample action, adjacent outcome, facts, and candid ZIP disclosure remain. |
| B2 | Fixed: direct seeded demo, persistent banner, Reset, Start for real, and demo-only storage work. |
| B3 | Fixed: 15 one-to-one claim tests pass; packaged extension proof now covers both replay paths. |
| B4 | Fixed: Demo, Privacy, Terms, and the branded 404 route work. |
| B5 | Fixed: unavailable paid checkout, price, merchant, and license UI remain absent. |
| M1 | Fixed: route-specific title, description, canonical, OG/Twitter metadata, icons, and social art are present. |
| M2 | Fixed: shared shell, skip link, footer, polite route announcement, H1 route focus, and Back focus work. |
| M3 | Fixed: only the mark is circular; the wordmark is readable. |
| M4 | Fixed: the secondary action accurately names the unpacked Developer-mode ZIP. |
| N1 | Fixed: audited 390 px targets are at least 44 px and routes do not overflow. |
| C1–C18 | Fixed: the rejected metaphors, vague actions, unsupported sales wording, terminology drift, and unclear headings remain absent. |
| F-2-1, F-3-1 | Fixed: the supported page-caption source uses one plain term everywhere, including the audit. |
| F-4-1 | Fixed: the packaged extension leaves unavailable caption content unchanged and popup reports waiting. |
| F-4-2 | Fixed: source-derived audit coverage and all word counts pass their regression checks. |
| F-4-3, F-4-4 | Fixed: popup uses “Caption controls” and “Save word.” |
| F-5-1 | Fixed: packaged extension observes every claimed cue kind. |
| F-5-2 | Fixed: README uses “Chrome extension,” not platform-version jargon. |
| F-6-1 | Fixed: unsupported efficacy outcome remains removed. |
| F-6-2 | Fixed: unattributed quotation remains removed. |
| F-6-3 | Fixed: compatibility and limitation copy use viewer-facing language. |
| F-6-4 | Fixed: privacy copy says what happens: no code loads from other sites. |
| F-6-5 | Fixed: README heading identifies Caption Cues. |
| F-6-6 | Fixed: README explains the offline result rather than cache mechanics. |
| F-6-7 | Fixed: permissions are explained in current-page terms. |
| F-6-8 | Fixed: audit includes offline, image alternative, and dynamic sample text. |
| F-7-1 | Fixed: the sole replay claim test now exercises demo, timed `TextTrack` Alt+R seek, and real-popup replay of page caption text. |

## Structure, routing, and identity

`/`, `/demo/`, `/privacy/`, and `/terms/` returned 200 at 390 × 844 and
1440 × 900; the designed unknown route returned 404 with **Return home**. Each
route had one H1 and main landmark, `lang=en`, route title, description,
canonical, OG/Twitter metadata, favicon, and touch icon. The live Axe audit
reported zero serious or critical findings in all ten route/viewport checks;
there were no console errors or horizontal overflow. Privacy navigation and
browser Back focus the destination H1.

All crawled product, download, repository, and hash links returned 200;
`mailto:` links are intentional. The 404 page's skip link points to its own
main landmark and therefore operates within the 404 document. The live headers
include CSP, Permissions-Policy, HSTS, `nosniff`, and expected cache policies.
The warm paper, halftone proof sheet, registration marks, clipped controls,
editorial type, and matched 404 implement the documented proofreader-sheet
identity and do not resemble a generic SaaS template.

## Missed leverage

No AI, import/export, or sync capability is an obvious missing first-use need
from the brief. The product's value is deterministic, local caption emphasis
and replay; optional model calls would add a privacy and offline cost without a
clear job benefit. There is no decorative AI feature or embedded provider key.

## What would make this perfect

Nothing actionable was found in this round. Preserve the existing clean-clone
claim loop, especially the packaged-extension replay checks, on future changes.

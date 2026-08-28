# Adversarial first-read review 2: Caption Cues

**Verdict: FAIL**

Reviewed 2026-08-28 UTC against <https://caption-cues.sociobot.in/> and the repository at `a5770d584c99156368e97f44a4b47d073008ee11`.

There is one minor finding. The product is clear and tryable, and all registered claims passed, but the same supported caption source is named three different ways. The required standard is zero findings.

## Cold first read

Fresh Chromium contexts without cookies or storage were opened at 390 × 844 and 1440 × 900. The page was not scrolled before recording the result.

| Question | 390 px phone | Desktop |
| --- | --- | --- |
| What does this do? | It highlights names, speaker labels, sound cues, and selected words in captions. | Same. |
| For whom? | Viewers who follow captions but miss names, speaker labels, or sound cues. | Same. |
| What should I click first? | “Try it with sample data.” | “Try it with sample data.” |

The evidence is visible above the fold on both sizes: “Highlight the caption words you miss”; “For viewers who follow captions but miss names, speaker labels, or sound cues.”; and “Try it with sample data.” The primary action was fully visible at y=413–462 on the phone. No blocking first-read finding is reproduced.

## Findings, ordered by severity

### F-2-1 — inconsistent name for the same supported caption source

- **Location and quote:** landing FAQ: “It supports standard browser caption tracks and selected caption text shown on the page.” README, *What ships*: “Support for standard browser caption tracks and selected visible caption elements.” `.factory/claims.json`, `exposed-caption-sources`: “selected visible page captions.”
- **Why this needs correction:** these phrases describe the same second supported source, but “caption text,” “caption elements,” and “page captions” suggest different compatibility limits to a first-time visitor.
- **Concrete fix:** use one plain phrase everywhere, for example “selected caption text shown on the page.” Replace the README bullet and claim text with that phrase, then update the associated assertion only if its expected text is intentionally exact.

## Copy audit

Counts treat shortcuts, hyphenated terms, paths, and product names as one word. I counted sentence-like headlines and action copy as well as punctuated prose, so short imperative copy is not hidden from the audit. No entry exceeds 22 words. No banned marketing adjective or jargon finding was observed; headings are contextual, and action controls name an outcome.

### Landing page

| Words | Copy |
| ---: | --- |
| 6 | A caption highlighter for Chrome |
| 6 | Highlight the caption words you miss |
| 13 | For viewers who follow captions but miss names, speaker labels, or sound cues. |
| 6 | See highlighted captions before you install. |
| 7 | Downloads a ZIP for Chrome Developer mode. |
| 5 | Caption controls need no account. |
| 7 | The demo works offline after one visit. |
| 7 | All highlighting and replay tools are free. |
| 12 | Switch a rule off to compare the same caption without that mark. |
| 6 | Alt + R replays the last line |
| 6 | Caption Cues reads exposed caption text. |
| 10 | It does not capture audio, download video, or create a transcript. |
| 8 | Start the captions offered by your video player. |
| 10 | Mark names, speaker labels, sound cues, or a saved word. |
| 17 | Press Alt+R to replay a timed cue or reshow visible caption text. |
| 10 | Caption Cues leaves hidden caption pixels and closed components unchanged. |
| 9 | It tells you when exposed caption text is unavailable. |
| 7 | I don’t need every caption bigger. |
| 9 | I need the name I might mishear to look different. |
| 13 | You choose which names, sound cues, speaker labels, and saved words stand out. |
| 2 | Unzip it. |
| 2 | Open chrome://extensions. |
| 13 | Turn on Developer mode, choose “Load unpacked,” then select the unzipped folder. |
| 1 | No. |
| 8 | Caption text and settings stay in your browser. |
| 8 | Caption Cues has no analytics or remote runtime scripts. |
| 14 | It supports standard browser caption tracks and selected caption text shown on the page. |
| 12 | It cannot change captions hidden in video pixels or inaccessible closed components. |
| 8 | Highlights selected words in captions you already use. |
| 10 | Original proof-sheet artwork was generated with the factory image model. |

### README

| Words | Copy |
| ---: | --- |
| 12 | Highlight names, speaker labels, sound cues, and saved words in exposed captions. |
| 12 | Caption Cues is for viewers who follow captions but miss key words. |
| 11 | The Chrome extension changes caption styling without creating a new transcript. |
| 14 | Press Alt+R to replay the last timed cue or reshow the latest visible caption. |
| 13 | The demo is isolated, works offline after one visit, and needs no account. |
| 5 | A Chrome Manifest V3 extension. |
| 14 | Controls for names, speaker labels, sound cues, saved words, text size, and caption background. |
| 11 | Support for standard browser caption tracks and selected visible caption elements. |
| 12 | Restoration of the page’s original caption state when the extension is disabled. |
| 9 | Keyboard and popup controls for replaying the last caption. |
| 11 | A static product site, isolated demo, legal pages, and extension ZIP. |
| 13 | Caption Cues cannot change captions hidden in video pixels or inaccessible closed components. |
| 12 | It does not capture audio, download video, or bypass a protected player. |
| 7 | On Ubuntu CI, use `npm run setup:browser:ci`. |
| 6 | Every public claim appears in `.factory/claims.json`. |
| 10 | Run one claim with the exact command in that file. |
| 4 | Run them all with: |
| 7 | Build output is in `dist/extension` and `dist/site`. |
| 6 | The Chrome ZIP is in `dist/site/downloads/caption-cues-chrome.zip`. |
| 6 | To load the extension, open `chrome://extensions`. |
| 10 | Turn on Developer mode, choose **Load unpacked**, and select `dist/extension`. |
| 12 | The release-specific service worker uses network-first page requests and cache-first build assets. |
| 8 | Hosting rules and security headers are in `site/public/staticwebapp.config.json`. |
| 8 | Caption text and settings stay in the browser. |
| 9 | Page access lets the content script find exposed captions. |
| 12 | The `storage` permission saves settings, and `activeTab` sends status and replay commands. |
| 7 | The extension makes no external network requests. |
| 13 | The site and extension contain no analytics, remote fonts, or remote runtime scripts. |
| 6 | Read the privacy policy and terms. |
| 4 | MIT — see LICENSE. |

The source's terminology table calls the concept “exposed caption text”; F-2-1 is the only terminology exception found. The headings “How Caption Cues works,” “Installation and compatibility,” and “Install and use the extension” make sense without nearby visual context. “Try it with sample data,” “Download unpacked Chrome extension,” “Reset demo,” “Next line,” and “Replay last line” are result-naming actions. The required demo banner's “Start for real” wording is retained as the specified exit action.

## Demo and sandbox check

The landing action redirected from `/?demo=1&license=review-token` to `/demo/?demo=1` in one click. Its first phone screen already contained the highlighted station caption `MARA: Rowan, wait at Thessaly Gate. [train approaching]`, with speaker, name, saved-word, and sound-cue marks.

The persistent banner read “Demo — sample data, nothing is saved” and exposed Reset demo and Start for real. Advancing to line 2 and pressing Alt+R produced “Replayed caption line 2.” Reset returned line 1 and preserved an `ordinary-sentinel` localStorage entry. The only product storage written during the demo was `demo:caption-cues:settings`; the hostile `license` query did not write a license or ordinary key. Source inspection confirms the `demo:` prefix, prefix-only reset/exit deletion, and no extension-storage access.

After a normal live visit and service-worker control, an offline reload of the live demo retained its title and H1, showed “You’re offline. The sample and its controls still work.”, and advanced to Line 2 of 3. The fresh demo network log contained only same-origin site assets.

## Claims check

Fresh clone: `/tmp/caption-cues-review-2.B15huO/repo`, created with `git clone --no-local`, followed by `npm ci`. I ran all 15 exact `test` commands listed in `.factory/claims.json` independently. All passed. A final `npm run test:claims` run passed 15/15 registered tests, including the network-interception privacy checks, service-worker offline test, isolated storage test, packaged extension tests, and generated-art/artifact checks. `npm test` then completed successfully in the same clean clone.

The live landing claim-like sentences map to an entry: emphasis → `caption-emphasis`; no account/free controls → `no-account-free-tools`; offline → `site-offline`; exposed/hidden sources → `exposed-caption-sources` and `hidden-caption-limit`; no media capture → `no-media-capture`; local caption data → `local-caption-data`; no tracking → `no-tracking-runtime`; generated art → `generated-art`; and Chrome extension/download output → `package-output`. No unlisted-claim finding was observed.

## Earlier finding regression check

All earlier review and polish documents were read. Each `review-1.md` finding was checked both on the live artifact and in source:

| Earlier ID | Result |
| --- | --- |
| B1 | Fixed: audience, job, and sample action are above the fold at 390 px and desktop. |
| B2 | Fixed: direct isolated sample, persistent banner, reset, exit, and `demo:` namespace work. |
| B3 | Fixed: 15 registry entries have tagged clean-sandbox tests; all pass. |
| B4 | Fixed: `/not-a-real-route` returns the branded page with HTTP 404 and Return home. |
| B5 | Fixed: no supporter, checkout, price, merchant, or license UI remains; every internal landing link returned 200. |
| M1 | Fixed: each route has its own title, description, canonical, Open Graph image, and favicon. |
| M2 | Fixed: shared header/footer, legal links, skip link, H1 focus on route and back navigation. |
| M3 | Fixed: the live wordmark is readable; source scopes the mark styling to `.brand-mark`. |
| M4 | Fixed: the Developer-mode ZIP is accurately secondary to the live sample. |
| N1 | Fixed: no mobile horizontal overflow; all measured action labels are at least 44 px (caption checkboxes have 56 px labels). |

No earlier finding is reopened. F-2-1 is a new copy-consistency finding.

## Structure, accessibility, and identity check

Home, demo, privacy, terms, and the 404 returned respectively 200, 200, 200, 200, and 404. Each has one H1, one main landmark, a route-specific title, description, canonical, Open Graph image, favicon, common chrome, and Privacy and Terms links. The back-button focus returned to “Highlight the caption words you miss”; a route navigation focused “Privacy, in plain language.” Axe found no violations at 390 px across all five routes, and no console errors were observed except the expected browser error recording the deliberate 404 response. All internal landing links and the external source link returned 200.

The warm paper, cobalt proofing marks, registration details, print-sheet image, and clipped press-style actions are distinct and match `.factory/design.md`. The information order remains the required standard skeleton without a generic SaaS hero/card treatment.

## Missed leverage

No missing AI, import/export, or sync feature is implied by the brief. Sending caption text to an AI service would weaken the product's local privacy model, and the stated job is selective local emphasis rather than caption generation. No AI feature or provider key was found.

## What would make this perfect

Resolve F-2-1 by choosing one name for the visible non-TextTrack caption source everywhere. Then rerun the affected claim/copy checks and perform another cold first-read audit. With no remaining finding, this review would pass.

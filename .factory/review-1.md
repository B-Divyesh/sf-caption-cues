# Adversarial first-read review 1: Caption Cues

**Verdict: FAIL**

Reviewed 2026-08-28 UTC against live production at
<https://caption-cues.sociobot.in/> and repository commit
`ae14a02a370696394d9c2b352dd5848b8db8d1a8`.

There are five blocking findings. The product cannot pass until the first screen
names its audience, a real isolated demo exists, public claims are registered
and tested, routing has a designed 404, and the paid checkout stops returning
404.

## Cold first read

Fresh Chromium contexts were opened without prior storage or cookies at 390 ×
844 and 1440 × 900. No scrolling was performed before recording these answers.

| Question | 390 px phone | Desktop |
| --- | --- | --- |
| What does this do? | A Chrome extension that makes selected parts of existing captions stand out. | Same. |
| For whom? | Cannot determine. No person or situation is named above the fold. | Cannot determine. No person or situation is named above the fold. |
| What should I click first? | “Download for Chrome” is the only fully visible action. “Try the rules first” begins below the viewport. | “Download for Chrome” is dominant; “Try the rules first” is the secondary action. |

The mobile first screen contains the exact text “A caption highlighter for
Chrome,” “Catch the words captions usually flatten,” and “Make names, speaker
changes, sound cues, and your own easy-to-miss words stand out—right inside
captions already available on the page.” None identifies the viewer described
in the brief. The five-line headline and 157 px lede push the try action below
the viewport.

## Findings, ordered by severity

### BLOCKING B1 — the first screen does not say who the product is for or offer the required first action

- **Quote:** “Catch the words captions usually flatten.” / “Try the rules
  first.”
- **Why this loses a first-time visitor:** “flatten” is a metaphor, and the
  supporting sentence describes features rather than the viewer. A visitor
  cannot confirm whether this is for hearing loss, language learners, editors,
  or everyone. On a 390 × 844 screen, the try link is clipped below the fold;
  the only complete call to action downloads an unpacked extension ZIP.
- **Concrete fix:** use `Highlight the caption words you miss` as the headline;
  use `For viewers who follow captions but miss names, speakers, or sound cues.`
  as the supporting sentence; make `Try it with sample data` the primary
  action, followed by `See a highlighted caption before you install.` Keep the
  install action secondary and disclose `Downloads a ZIP for Chrome Developer
  mode` beside it.

### BLOCKING B2 — there is no one-click sandbox demo

- **Quote:** “Try the rules first.”
- **Observed:** the link scrolls to `/#try-it`. The preview contains one sample
  line and working rule checkboxes, but there is no “Demo — sample data,
  nothing is saved” banner, Reset demo, Start for real, or separate storage
  namespace. `/demo` returns the generic Azure 404. `/?demo=1` is the ordinary
  landing page. In a fresh context, visiting
  `/?demo=1&license=review-token` wrote `sb_license:caption-cues` and
  `sb_license_verdict:caption-cues` to ordinary localStorage, confirming that
  the query does not isolate storage.
- **Why this loses or misleads a first-time visitor:** the visitor cannot try
  the actual extension flow before downloading and manually installing it.
  The word “Try” implies a demo, but the page supplies only a styling control
  for one line and no sandbox guarantees.
- **Concrete fix:** provide `/demo` with realistic multi-line captions and the
  real settings/replay interaction. Show the persistent required banner and
  controls. Store all demo state under `demo:` keys, clear it on exit/reset,
  seed it offline, document it in `.factory/demo.md`, and add tests proving
  ordinary extension/site storage is unchanged.

### BLOCKING B3 — the claim registry and claim tests do not exist

- **Quote:** `.factory/claims.json` is absent; `rg '@claim:'` returns no matches.
- **Why this misleads a first-time visitor:** the landing page and README make
  functional, privacy, compatibility, offline, price, and payment claims with
  no auditable mapping to clean-sandbox tests. The existing release checks are
  useful but are not tagged claim tests and do not cover every promise.
- **Concrete fix:** add `.factory/claims.json`; give each row below one stable
  ID, one exact test command, and a clean demo sandbox; add exactly one
  `@claim:<id>` test per entry. Remove any sentence that cannot be tested.

Every row below is an unlisted-claim finding because the registry is missing:

| ID to add | Exact claim or equivalent duplicate | Required observable test |
| --- | --- | --- |
| `site-offline` | “The page still works” offline. | Prime `/demo`, set the context offline, reload, and exercise the sample. |
| `caption-emphasis` | “Make names, speaker changes, sound cues, and your own easy-to-miss words stand out…” / README “It emphasizes proper names…” | Assert each sample fragment receives the intended visible treatment. |
| `no-account` | “No account.” | Complete the demo and core extension flow without authentication. |
| `free-core` | “Free core tools.” / “all comprehension features remain free” / “remain free forever.” | Exercise every comprehension control without a license; avoid “forever” unless policy can enforce it. |
| `replay-last-line` | “Alt+R replays the last line.” / README replay sentence. | Trigger the shortcut against timed and DOM samples and assert playback/overlay output. |
| `exposed-captions-only` | “Caption Cues works with caption text the page already exposes.” / README TextTrack and DOM variants. | Test supported exposed tracks/DOM and an inaccessible control case. |
| `no-media-capture` | “It never downloads video, generates a transcript, or attempts to bypass protected streams.” / README capture variant. | Intercept the full extension flow and assert no media/transcript requests or protected-player access. |
| `unsupported-player-state` | “Caption Cues leaves it alone and tells you it is waiting.” | Use an unsupported sample and assert unchanged content plus the stated status. |
| `supporter-unlock` | “$9 once unlocks the cosmetic Cobalt caption plate…” | Use a billing sandbox license and assert price, one-time entitlement, and only the Cobalt theme unlock. |
| `checkout-security` | “Secure checkout from Sociobot.” | Verify the live checkout response, TLS destination, and expected checkout UI. It currently returns 404. |
| `merchant-of-record` | “Dodo is merchant of record.” | Verify the billing API’s returned checkout identifies the stated merchant. |
| `site-license-transfer` | “The extension also accepts this token in its Supporter panel.” | Complete sandbox checkout/restore and assert the same token is accepted in the extension. |
| `caption-local-processing` | “Caption processing happens in your browser.” | Intercept requests during sample processing and assert no caption payload leaves the browser. |
| `caption-data-private` | “Caption text and saved words are not sent to us.” / README “Caption text and preferences stay in the browser.” | Intercept network while reading captions and saving preferences; assert only allowed origins and no caption data. |
| `supported-caption-sources` | “Pages exposing standard browser text tracks or visible caption DOM can work.” | Run fixtures for each claimed source and assert output. |
| `hidden-caption-limit` | “Players that hide captions in video pixels or inaccessible closed components cannot be enhanced.” | Run negative fixtures and assert the page is left unchanged. |
| `generated-art` | “Hero artwork was generated …; no people or brands are depicted.” | Add provenance/hash inspection or remove this operational claim from visitor copy. |
| `popup-controls` | README: “Popup controls for each emphasis rule, caption size, plate theme, and saved words.” | Exercise and assert every listed setting in the built extension. |
| `overlay-restoration` | README: “Native text-track overlay with restoration when disabled.” | Disable after enhancement and assert the original track mode/content is restored. |
| `named-site-support` | README: “Conservative DOM-caption enhancement for YouTube, Vimeo, Video.js, and accessible caption regions.” | Add fixtures or live-safe adapters for every named source. |
| `site-package` | README: the static site has an interactive preview, responsive layout, offline shell, legal pages, and packaged download. | Check each artifact and behavior from the production build. |
| `node-version` | README: “Requires Node.js 20 or newer.” | Run the release job on the minimum supported Node version. |
| `browser-provisioning` | README: setup uses lockfile-pinned Playwright 1.62.1 and its standard cache. | Assert installed CLI/browser versions and target path from a clean cache. |
| `clean-browser-gate` | README: the clean-cache job uses an isolated browser cache and fails rather than falling back. | Run with an empty cache and a forced install failure. |
| `build-artifacts` | README: the build produces the unpacked extension, ZIP, and deployable site. | Assert all named output paths and load them. |
| `release-cache-policy` | README: release hashes change the shell cache; documents are network-first and assets cache-first. | Existing update coverage can be retagged and extended to assert both strategies. |
| `hosting-policy` | README: hashed assets are immutable, the worker revalidates, and host CSP/Permissions-Policy apply. | Assert built config plus live response headers and cache behavior. |
| `release-verifiers` | README: `verify:extension`, `test:pwa-update`, `verify:zip`, and `verify:release` perform their described checks. | Execute each command from a clean clone and assert its promised artifact/behavior. |
| `permissions` | README: page access, `storage`, and `activeTab` are used for the stated purposes. | Inspect the built manifest and exercise each permission without extra permissions. |
| `license-network-only` | README: “Network access is used only when a user voluntarily verifies a Supporter license…” | Intercept install, captions, settings, replay, and license flows; assert the sole external request occurs after verification. |
| `no-tracking-runtime` | README: “There are no analytics, third-party fonts, or runtime CDNs.” | Intercept the full site/extension demo and inspect packaged resources. |

### BLOCKING B4 — required routing ends in an undesigned host error

- **Quote:** `/demo` → HTTP 404, title “Azure Static Web Apps - 404: Not
  found,” body “We couldn’t find that page, please check the URL and try
  again.” `/not-a-real-route` returns the same host page with no product `<h1>`,
  header, footer, or way back.
- **Why this loses a first-time visitor:** a required deep link is broken and
  unknown URLs abruptly leave the product identity.
- **Concrete fix:** implement `/demo`; add a product-designed 404 response with
  `404 — Caption Cues`, one `<h1>`, the standard header/footer, and a `Return
  home` link. Add deep-link and 404 tests plus the appropriate static-host
  fallback/response override.

### BLOCKING B5 — the paid call to action is dead

- **Quote:** “Buy Supporter — $9” and “Secure checkout from Sociobot.”
- **Observed:** a fresh GET to
  `https://api.sociobot.in/api/v1/products/caption-cues/checkout` returns HTTP
  404 without redirecting.
- **Why this misleads a first-time visitor:** the page offers a purchasable tier
  and calls the destination a checkout, but the action cannot begin a purchase.
- **Concrete fix:** configure the Sociobot product/checkout route, verify it
  returns the expected checkout, and add a claim test before restoring the CTA.
  Until then, remove the purchase form and purchase claims.

### MAJOR M1 — metadata is incomplete on every route

- **Quote:** the home `<title>` is “Caption Cues — catch the words captions
  flatten”; there is no canonical link, Open Graph metadata, Twitter card, or
  apple-touch icon. Privacy and Terms also lack all four metadata groups.
- **Why this matters:** shared links have no product-specific preview or stable
  canonical URL. The title’s second half repeats the unclear “flatten” metaphor
  instead of plainly describing the extension.
- **Concrete fix:** use `Caption Cues — highlight easy-to-miss caption words`,
  add route-specific canonical URLs, OG/Twitter title and description, a real
  1200 × 630 product image, and a 180 px apple-touch icon.

### MAJOR M2 — route chrome and focus behavior are inconsistent

- **Quote:** the landing header has “How it works / Supporter / Download,” while
  Privacy and Terms replace it with “Back home.” The landing footer has
  Privacy, Terms, and Source; each legal footer contains only the other legal
  page and “© 2026 Sociobot.” No footer includes “Built by Param Factory” or a
  build ID.
- **Observed:** after navigating to Privacy, focus remained on `<body>` rather
  than the new `<h1>`. Back restored the former scroll position but not useful
  focus. There is no route announcement region.
- **Why this matters:** visitors and screen-reader users lose the common site
  frame and route-change context.
- **Concrete fix:** reuse one header/footer across all routes, include the
  required one-liner, Privacy, Terms, factory credit, and build ID, and focus
  the route `<h1>` with a polite announcement after navigation.

### MAJOR M3 — a global CSS collision makes the wordmark unreadable

- **Quote/evidence:** on the live landing page both `CC` and `Caption Cues`
  receive a 42 × 42 cobalt circle. The product name wraps inside the second
  circle at both widths. Computed styles show the same blue background, white
  text, width, and height on both `.brand span` elements.
- **Why this matters:** the primary identity is visibly broken on first load.
- **Concrete fix:** scope the legal-page `.brand span` rule to its mark class or
  shared component; apply the circle only to `.brand-mark`; add a visual or
  computed-style regression test.

### MAJOR M4 — the downloaded extension is not a normal first-use path

- **Quote:** “Download for Chrome”; the later FAQ says “Unzip it, open
  chrome://extensions, turn on Developer mode, choose ‘Load unpacked’…”
- **Why this loses a first-time visitor:** the button sounds like an install,
  but downloads a developer ZIP. The required setup is disclosed several
  screens later.
- **Concrete fix:** label the action `Download unpacked Chrome extension` and
  place `Requires Developer mode; setup takes four steps` beside it. Keep the
  real sample demo primary until a store installation exists.

### MINOR N1 — interactive targets do not consistently meet 44 px

- **Evidence:** at 390 px, “Try the rules first” measures 138 × 28 px and footer
  links measure 19 px high. Desktop header links are 28 px high. The checkboxes
  themselves are 22 × 22 px, though their full labels provide larger click
  areas.
- **Why this matters:** small links are harder to activate on a phone.
- **Concrete fix:** give interactive links at least 44 px of padded hit area and
  retain the existing visible focus treatment.

## Copy findings and proposed rewrites

No individual landing-page sentence exceeds 22 words and no banned word from
the supplied list appears. The following copy still fails the plain-word rules;
each row is a finding.

| Severity | Exact copy | Problem | Proposed rewrite |
| --- | --- | --- | --- |
| Major | “Catch the words captions usually flatten.” | “flatten” is a metaphor and does not name the product behavior. | “Highlight the caption words you miss.” |
| Major | “Try the rules first” | It does not name a result and is not a sandbox demo. | “Try it with sample data.” |
| Minor | “Version 1.0 · Local-first · No account · Free core tools” | “Local-first” is technical shorthand; “core” does not say what is free. | “Version 1.0 · Captions stay in your browser · No account · All highlighting and replay tools are free.” |
| Minor | “Proof 01” | The heading fragment has no meaning out of context. | “Caption preview.” |
| Minor | “One line. The right landmarks.” | “landmarks” is a metaphor. | “See each highlighted caption part.” |
| Minor | “Method 02” | The heading fragment does not describe its section. | “How Caption Cues works.” |
| Minor | “It marks up. It doesn’t listen in.” | “listen in” is figurative and only implies the privacy boundary. | “Uses caption text already on the page.” |
| Minor | “the last DOM caption” | “DOM” is developer jargon for the intended viewer. | “the last visible caption on the page.” |
| Minor | “Why 03” | The heading fragment does not describe its section. | “Why selective highlighting helps.” |
| Minor | “Built for a different kind of ‘louder.’” | Metaphor hides the section subject. | “Make key caption words easier to spot.” |
| Minor | “viewer-controlled hierarchy” / “visual anchors” | Abstract design jargon obscures the result. | “You choose which names, sounds, and words stand out.” |
| Minor | “Keep the core free. Add more ink.” | “core” and “ink” do not state the offer. | “All caption tools are free. The blue theme costs $9.” |
| Minor | “cosmetic Cobalt caption plate” | “Cobalt” and “plate” are unexplained product terms. | “optional blue caption background.” |
| Minor | “Dodo is merchant of record.” | Payment-industry jargon is unexplained. | “Dodo handles the payment and receipt for Sociobot.” |
| Minor | “Notes 04” / “Before you press play” | Neither heading identifies installation and compatibility content out of context. | “Installation and compatibility.” |
| Major | “Store packaging can be added after factory release.” | Internal factory language exposes unfinished distribution and does not help install the ZIP. | “This download requires Chrome Developer mode.” |
| Minor | “visible caption DOM” | Developer jargon appears in visitor-facing compatibility copy. | “captions shown as selectable page text.” |
| Minor | “Useful emphasis, without another transcript.” | “Useful” is an unsupported adjective and the line does not describe the product. | “Highlights selected words in captions you already use.” |

README sentences over 22 words are separate findings:

| Words | Exact sentence | Concrete rewrite |
| ---: | --- | --- |
| 28 | “The service-worker update and extension smoke tests launch the lockfile-pinned Playwright Chromium, so provision it explicitly after every fresh `npm ci` (or whenever the Playwright cache is removed).” | “The browser tests use the Playwright version in the lockfile. Run `npm run setup:browser` after `npm ci` or after clearing the browser cache.” |
| 31 | “`setup:browser` runs the supported `playwright install chromium` command through this repository's lockfile-pinned local CLI (Playwright `1.62.1`), rather than a global `npx` version, and installs the matching Chromium into Playwright's standard cache.” | “`setup:browser` runs the repository’s Playwright 1.62.1 CLI. It installs the matching Chromium in Playwright’s standard cache.” |
| 23 | “On an Ubuntu CI worker that also needs OS browser libraries, use `npm run setup:browser:ci`; it runs Playwright's supported `install --with-deps chromium` command.” | “On Ubuntu CI, run `npm run setup:browser:ci` to install Chromium and its OS libraries.” |
| 28 | “If Chromium or its runtime dependencies cannot be installed, it fails before tests run rather than falling back to a host browser or silently reusing a compatible-looking browser.” | “If Chromium or its dependencies cannot be installed, the command stops before testing. It never falls back to another browser.” |
| 34 | “That exact command builds and packages the extension, copies the unpacked MV3 output to `dist/extension`, adds `caption-cues-chrome.zip` to the site's downloads, and writes the deployable static site to `dist/site` with `index.html` at its root.” | “The command writes the unpacked extension to `dist/extension` and the ZIP to the site downloads. It writes the deployable site to `dist/site`.” |
| 31 | “Azure Static Web Apps policies are in `site/public/staticwebapp.config.json`: hashed assets are immutable, the worker is always revalidated, and CSP/Permissions-Policy are emitted by the host rather than as a served `_headers` file.” | “Hosting policies live in `site/public/staticwebapp.config.json`. The host caches hashed assets, revalidates the worker, and sends the security headers.” |
| 24 | “The extension requests page access so its content script can find caption tracks on the page, `storage` for preferences, and `activeTab` for popup status/replay.” | “The extension uses page access to find captions. It uses `storage` for preferences and `activeTab` for status and replay.” |

README jargon findings:

| Exact term | Why | Proposed rewrite |
| --- | --- | --- |
| “MV3”, “WXT”, “DOM-caption”, “PWA”, “CSP/Permissions-Policy” | Unexpanded abbreviations make the setup and capability list harder to scan. | Expand each on first use: “Chrome Manifest V3 (MV3),” “Web Extension Toolkit (WXT),” “page caption text,” “installable offline site,” and “browser security headers.” |
| “plate theme”, “Cobalt theme”, “Cobalt caption plate” | One cosmetic feature has three names. | Use “caption background” everywhere; name the option “blue.” |
| “speaker labels”, “speaker changes”, “speakers”, “speaker cues” | The same rule has four names. | Use “speaker labels” everywhere. |
| “bracketed sound cues”, “sounds”, “bracketed descriptions” | The same rule has three names. | Use “sound cues” everywhere. |

## Complete copy inventory

Counts treat hyphenated terms, keyboard chords, versions, URLs, and file paths as
one word. Standalone symbols are not words. Fenced shell commands are code, not
sentences. Dynamic status text is included.

### Landing page and dynamic UI

| # | Words | Copy |
| ---: | ---: | --- |
| 1 | 4 | Skip to main content |
| 2 | 2 | You’re offline. |
| 3 | 11 | The page still works; purchases and license checks need a connection. |
| 4 | 2 | Caption Cues |
| 5 | 3 | How it works |
| 6 | 1 | Supporter |
| 7 | 1 | Download |
| 8 | 5 | A caption highlighter for Chrome |
| 9 | 6 | Catch the words captions usually flatten. |
| 10 | 21 | Make names, speaker changes, sound cues, and your own easy-to-miss words stand out—right inside captions already available on the page. |
| 11 | 3 | Download for Chrome |
| 12 | 4 | Try the rules first |
| 13 | 8 | Version 1.0 · Local-first · No account · Free core tools |
| 14 | 2 | Proof 01 |
| 15 | 2 | One line. |
| 16 | 3 | The right landmarks. |
| 17 | 17 | Switch each cue off to see how quickly a useful caption becomes a wall of equal-weight words. |
| 18 | 2 | Live preview |
| 19 | 9 | MARA: Tell Rowan to meet us at Thessaly Gate. |
| 20 | 2 | [train approaching] |
| 21 | 5 | Alt+R replays the last line |
| 22 | 2 | Emphasis rules |
| 23 | 2 | Speaker changes |
| 24 | 4 | Label before the colon |
| 25 | 1 | Names |
| 26 | 5 | Proper names in the line |
| 27 | 2 | Sound cues |
| 28 | 2 | Bracketed descriptions |
| 29 | 3 | Saved word: Gate |
| 30 | 4 | A word you chose |
| 31 | 2 | Method 02 |
| 32 | 3 | It marks up. |
| 33 | 4 | It doesn’t listen in. |
| 34 | 10 | Caption Cues works with caption text the page already exposes. |
| 35 | 13 | It never downloads video, generates a transcript, or attempts to bypass protected streams. |
| 36 | 3 | Turn captions on |
| 37 | 10 | Start the subtitles or captions offered by your video player. |
| 38 | 3 | Choose your cues |
| 39 | 11 | Enable names, speakers, sounds, or add a word you often miss. |
| 40 | 3 | Replay without hunting |
| 41 | 15 | Press Alt+R to return to the last timed cue or reshow the last DOM caption. |
| 42 | 2 | Honest limitation |
| 43 | 10 | Some protected players draw captions inside video or closed components. |
| 44 | 18 | If the browser cannot expose that text, Caption Cues leaves it alone and tells you it is waiting. |
| 45 | 2 | Why 03 |
| 46 | 7 | Built for a different kind of “louder.” |
| 47 | 6 | I don’t need every caption bigger. |
| 48 | 11 | I need the name I’m likely to mishear to look different. |
| 49 | 9 | Blanket caption styling gives every syllable the same priority. |
| 50 | 17 | Caption Cues adds a viewer-controlled hierarchy, so the words carrying identity, context, and action become visual anchors. |
| 51 | 3 | One-time Supporter edition |
| 52 | 4 | Keep the core free. |
| 53 | 3 | Add more ink. |
| 54 | 12 | $9 once unlocks the cosmetic Cobalt caption plate and supports ongoing maintenance. |
| 55 | 11 | Names, sounds, saved words, speaker cues, and replay remain free forever. |
| 56 | 3 | Buy Supporter — $9 |
| 57 | 4 | Secure checkout from Sociobot. |
| 58 | 5 | Dodo is merchant of record. |
| 59 | 3 | Already bought it? |
| 60 | 3 | Paste your license |
| 61 | 2 | Verify license |
| 62 | 3 | Copy saved license |
| 63 | 10 | The extension also accepts this token in its Supporter panel. |
| 64 | 2 | Notes 04 |
| 65 | 4 | Before you press play |
| 66 | 6 | How do I install the download? |
| 67 | 17 | Unzip it, open chrome://extensions, turn on Developer mode, choose “Load unpacked,” and select the unzipped folder. |
| 68 | 8 | Store packaging can be added after factory release. |
| 69 | 8 | Does it generate or send my captions anywhere? |
| 70 | 1 | No. |
| 71 | 6 | Caption processing happens in your browser. |
| 72 | 10 | Caption text and saved words are not sent to us. |
| 73 | 3 | Which videos work? |
| 74 | 12 | Pages exposing standard browser text tracks or visible caption DOM can work. |
| 75 | 14 | Players that hide captions in video pixels or inaccessible closed components cannot be enhanced. |
| 76 | 8 | Is this a hearing test or medical profile? |
| 77 | 1 | No. |
| 78 | 11 | The controls are personal reading preferences, not diagnosis or medical advice. |
| 79 | 5 | Useful emphasis, without another transcript. |
| 80 | 1 | Privacy |
| 81 | 1 | Terms |
| 82 | 1 | Source |
| 83 | 18 | Hero artwork was generated for this product with the factory image model; no people or brands are depicted. |
| 84 | 2 | Purchase received. |
| 85 | 3 | Checking your license… |
| 86 | 3 | Supporter edition unlocked. |
| 87 | 6 | Copy this license into the extension. |
| 88 | 6 | The license could not be confirmed. |
| 89 | 3 | Saved for later. |
| 90 | 7 | We’ll verify when you are back online. |
| 91 | 2 | License copied. |
| 92 | 7 | Paste it into the extension’s Supporter panel. |
| 93 | 8 | Select the license field and copy it manually. |
| 94 | 2 | Checking license… |
| 95 | 7 | Copy this license into the extension too. |
| 96 | 5 | This license is not active. |
| 97 | 6 | Check the token or buy again. |
| 98 | 3 | Could not connect. |
| 99 | 6 | Try again when you are online. |
| 100 | 7 | Document title: Caption Cues — catch the words captions flatten |
| 101 | 21 | Meta description: Caption Cues is a local-first browser extension that emphasizes names, speakers, sounds, and words you choose in captions you already have. |
| 102 | 13 | Image alt: An abstract tabletop printing press producing strips of cobalt and black halftone marks |
| 103 | 3 | Region label: Caption styling preview |

### README

| # | Words | Copy |
| ---: | ---: | --- |
| 1 | 2 | Caption Cues |
| 2 | 21 | Caption Cues is a local-first Chrome extension for viewers who can follow captions but need the easiest-to-miss parts to stand out. |
| 3 | 14 | It emphasizes proper names, speaker labels, bracketed sound cues, and words the viewer saves. |
| 4 | 17 | Alt+R replays the most recent timed cue or reshows the latest caption exposed in the page DOM. |
| 5 | 19 | It works only with caption text a page already exposes through standard TextTrack cues or supported visible caption elements. |
| 6 | 13 | It does not generate captions, capture audio, download video, or bypass protected players. |
| 7 | 2 | What ships |
| 8 | 7 | MV3 extension built with WXT and TypeScript |
| 9 | 13 | Popup controls for each emphasis rule, caption size, plate theme, and saved words |
| 10 | 7 | Native text-track overlay with restoration when disabled |
| 11 | 11 | Conservative DOM-caption enhancement for YouTube, Vimeo, Video.js, and accessible caption regions |
| 12 | 5 | Keyboard and popup replay paths |
| 13 | 19 | Static product site with an interactive rule preview, responsive layout, offline shell, privacy policy, terms, and packaged extension download |
| 14 | 20 | Optional one-time $9 Supporter license through Sociobot; it unlocks only the cosmetic Cobalt theme, while all comprehension features remain free |
| 15 | 1 | Develop |
| 16 | 5 | Requires Node.js 20 or newer. |
| 17 | 28 | The service-worker update and extension smoke tests launch the lockfile-pinned Playwright Chromium, so provision it explicitly after every fresh `npm ci` (or whenever the Playwright cache is removed). |
| 18 | 31 | `setup:browser` runs the supported `playwright install chromium` command through this repository's lockfile-pinned local CLI (Playwright `1.62.1`), rather than a global `npx` version, and installs the matching Chromium into Playwright's standard cache. |
| 19 | 23 | On an Ubuntu CI worker that also needs OS browser libraries, use `npm run setup:browser:ci`; it runs Playwright's supported `install --with-deps chromium` command. |
| 20 | 16 | The included GitHub Actions job proves the full release gate with a newly-created, isolated browser cache: |
| 21 | 11 | The clean-cache command deliberately does not reuse the normal Playwright cache. |
| 22 | 17 | It first runs the same explicit provisioning step, then runs the release gate in that exact cache. |
| 23 | 28 | If Chromium or its runtime dependencies cannot be installed, it fails before tests run rather than falling back to a host browser or silently reusing a compatible-looking browser. |
| 24 | 1 | Build |
| 25 | 34 | That exact command builds and packages the extension, copies the unpacked MV3 output to `dist/extension`, adds `caption-cues-chrome.zip` to the site's downloads, and writes the deployable static site to `dist/site` with `index.html` at its root. |
| 26 | 11 | `npm run build` is an alias for the same production pipeline. |
| 27 | 14 | The finalized site build also generates `dist/site/service-worker.js` from a hash of its release contents. |
| 28 | 18 | Its shell cache therefore changes with every content release; documents are network-first while versioned build assets are cache-first. |
| 29 | 31 | Azure Static Web Apps policies are in `site/public/staticwebapp.config.json`: hashed assets are immutable, the worker is always revalidated, and CSP/Permissions-Policy are emitted by the host rather than as a served `_headers` file. |
| 30 | 17 | To test the extension locally, open `chrome://extensions`, enable Developer mode, choose **Load unpacked**, and select `dist/extension`. |
| 31 | 16 | Open a page with browser-exposed captions, turn captions on, and open Caption Cues from the toolbar. |
| 32 | 19 | After building, `npm run verify:extension` loads that exact unpacked output in Chromium and checks DOM-caption emphasis plus `Alt+R` replay. |
| 33 | 21 | `npm run test:pwa-update` proves a controlled client updates from generated build A to build B and can load build B offline. |
| 34 | 22 | `npm run verify:zip` checks the packaged Chrome ZIP; `npm run verify:release` runs the complete type, test, build, extension, PWA, and ZIP suite. |
| 35 | 3 | Privacy and permissions |
| 36 | 8 | Caption text and preferences stay in the browser. |
| 37 | 24 | The extension requests page access so its content script can find caption tracks on the page, `storage` for preferences, and `activeTab` for popup status/replay. |
| 38 | 15 | Network access is used only when a user voluntarily verifies a Supporter license against `api.sociobot.in`. |
| 39 | 9 | There are no analytics, third-party fonts, or runtime CDNs. |
| 40 | 4 | See `site/privacy/index.html` and `site/terms/index.html`. |
| 41 | 1 | License |
| 42 | 3 | MIT — see `LICENSE`. |

## Demo, privacy, offline, and storage evidence

- Clicking “Try the rules first” reaches the preview and the rule toggles alter
  the one sample caption. Focus remains on `<body>`, not the preview heading.
- Fresh `/?demo=1` load and offline reload both returned the landing page with
  HTTP 200 after service-worker priming. All page requests during that exercise
  were same-origin.
- A fresh built-extension flow loaded a local caption fixture, saved a word,
  switched the context offline, and replayed the caption. Interception recorded
  only the local fixture and `chrome-extension://` resources; no outbound
  request occurred. Storage contained `captionCuesSettings`.
- These checks support parts of the offline/privacy copy, but they do not create
  or validate the required demo sandbox. The `?demo=1&license=…` evidence shows
  the normal site storage remains reachable.

## Structure, links, and accessibility evidence

| Check | Result |
| --- | --- |
| `<title>` | Home is 47 characters but metaphorical; Privacy and Terms use the required route pattern. |
| `<html lang>`, `<main>`, one `<h1>` | Pass on `/`, `/privacy/`, and `/terms/`. The generic 404 has no product `<h1>`. |
| Meta description | Present and ≤ 155 characters on the three product routes. |
| Canonical, OG, Twitter, apple-touch | Missing on all three product routes. |
| Favicon | SVG favicon loads with HTTP 200. |
| Deep links | Privacy and Terms load directly with HTTP 200. `/demo` is missing. |
| Back button | Restores the former page and scroll position; useful focus is not restored. |
| Link crawl | All discovered links/anchors resolve except the Supporter checkout, which returns 404. Mail links were treated as explicit exemptions. |
| Header/footer | Inconsistent between home and legal routes; required factory/build footer text is absent. |
| Designed 404 | Fail; Azure’s default 404 is shown. |
| Visual identity | Pass: the halftone proof sheet, print palette, clipped shapes, and press artwork are recognizably product-specific rather than a generic SaaS hero. The wordmark collision remains a visible defect. |
| Axe | Zero violations at 390 × 844 and 1440 × 900. |
| Console/network | No console or request failures on cold home loads. |
| Contrast/reduced motion | Axe found no contrast violation; CSS includes a reduced-motion override. |
| Touch targets | Fail for several navigation/footer links; checkbox labels are larger than their 22 px native controls. |
| First-load JS | Pass: production JS is 5.47 kB raw / 2.57 kB gzip. |

## Test execution

The required claim-test loop could not run because `.factory/claims.json` does
not exist. As independent fallback evidence, the repository was cloned without
local changes into `/tmp/caption-cues-review.Fqz0YQ/repo`, then the lockfile was
installed and the repository’s browser provisioner installed Playwright
Chromium 1.62.1. `npm run verify:release` passed:

- TypeScript check: pass.
- Vitest: 4 files, 13 tests passed.
- Production site and extension build: pass; `dist/` produced.
- Built extension speaker/name/sound emphasis and Alt+R replay smoke: pass.
- Generated service-worker update and offline load: pass.
- Chrome ZIP integrity: pass.

No product code was modified during this review.

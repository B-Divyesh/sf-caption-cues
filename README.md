# Caption Cues

Caption Cues is a local-first Chrome extension for viewers who can follow captions but need the easiest-to-miss parts to stand out. It emphasizes proper names, speaker labels, bracketed sound cues, and words the viewer saves. `Alt+R` replays the most recent timed cue or reshows the latest caption exposed in the page DOM.

It works only with caption text a page already exposes through standard `TextTrack` cues or supported visible caption elements. It does not generate captions, capture audio, download video, or bypass protected players.

## What ships

- MV3 extension built with WXT and TypeScript
- Popup controls for each emphasis rule, caption size, plate theme, and saved words
- Native text-track overlay with restoration when disabled
- Conservative DOM-caption enhancement for YouTube, Vimeo, Video.js, and accessible caption regions
- Keyboard and popup replay paths
- Static product site with an interactive rule preview, responsive layout, offline shell, privacy policy, terms, and packaged extension download
- Optional one-time $9 Supporter license through Sociobot; it unlocks only the cosmetic Cobalt theme, while all comprehension features remain free

## Develop

Requires Node.js 20 or newer.

```sh
npm ci
npm run dev          # WXT extension development
npm run dev:site     # landing site development
npm run typecheck
npm test
```

## Build

```sh
npm run build:site
```

That exact command builds and packages the extension, copies the unpacked MV3 output to `dist/extension`, adds `caption-cues-chrome.zip` to the site's downloads, and writes the deployable static site to `dist/site` with `index.html` at its root. `npm run build` is an alias for the same production pipeline.

The finalized site build also generates `dist/site/service-worker.js` from a hash of its release contents. Its shell cache therefore changes with every content release; documents are network-first while versioned build assets are cache-first. Azure Static Web Apps policies are in `site/public/staticwebapp.config.json`: hashed assets are immutable, the worker is always revalidated, and CSP/Permissions-Policy are emitted by the host rather than as a served `_headers` file.

To test the extension locally, open `chrome://extensions`, enable Developer mode, choose **Load unpacked**, and select `dist/extension`. Open a page with browser-exposed captions, turn captions on, and open Caption Cues from the toolbar.

After building, `npm run verify:extension` loads that exact unpacked output in Chromium and checks DOM-caption emphasis plus `Alt+R` replay. `npm run test:pwa-update` proves a controlled client updates from generated build A to build B and can load build B offline.

## Privacy and permissions

Caption text and preferences stay in the browser. The extension requests page access so its content script can find caption tracks on the page, `storage` for preferences, and `activeTab` for popup status/replay. Network access is used only when a user voluntarily verifies a Supporter license against `api.sociobot.in`. There are no analytics, third-party fonts, or runtime CDNs.

See [`site/privacy/index.html`](site/privacy/index.html) and [`site/terms/index.html`](site/terms/index.html).

## License

MIT — see [`LICENSE`](LICENSE).

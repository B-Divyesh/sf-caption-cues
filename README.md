# Caption Cues

Highlight names, speaker labels, sound cues, and saved words in exposed captions.

Caption Cues is for viewers who follow captions but miss key words. The Chrome
extension changes caption styling without creating a new transcript. Press
`Alt+R` to replay the last timed cue or reshow the latest visible caption.

[Try it with sample data](https://caption-cues.sociobot.in/?demo=1). The demo is
isolated, works offline after one visit, and needs no account.

## What ships

- A Chrome Manifest V3 extension built with Web Extension Toolkit and TypeScript.
- Controls for names, speaker labels, sound cues, saved words, text size, and caption background.
- Support for standard browser caption tracks and selected visible caption elements.
- Restoration of the page’s original caption state when the extension is disabled.
- Keyboard and popup controls for replaying the last caption.
- A responsive product site, isolated demo, offline shell, legal pages, and extension ZIP.

Caption Cues cannot change captions hidden in video pixels or inaccessible
closed components. It does not capture audio, download video, or bypass a
protected player.

## Run and test

Use Node.js 20 or newer.

```sh
npm ci
npm run setup:browser
npm run check
```

The browser tests use Playwright 1.58.2 from the lockfile. Run
`npm run setup:browser` after `npm ci` or after clearing its browser cache. On
Ubuntu CI, use `npm run setup:browser:ci` to add Chromium system libraries.

Run the release gate with a new browser cache:

```sh
npm run check:clean-browser
```

This command installs the pinned Chromium build. It stops if the install fails.
It then runs type checks, tests, the production build, extension browser checks,
the offline update check, accessibility checks, and ZIP validation.

Every public claim appears in [`.factory/claims.json`](.factory/claims.json).
Run one claim with the exact command in that file. Run them all with:

```sh
npm run test:claims
```

## Build and load

```sh
npm run build:site
```

The build writes the unpacked extension to `dist/extension`. It writes the ZIP
to `dist/site/downloads/caption-cues-chrome.zip` and the site to `dist/site`.

To load the extension, open `chrome://extensions`. Turn on Developer mode,
choose **Load unpacked**, and select `dist/extension`.

The release-specific service worker uses network-first page requests and
cache-first build assets. Hosting rules and security headers are in
`site/public/staticwebapp.config.json`.

## Privacy and permissions

Caption text and settings stay in the browser. Page access lets the content
script find exposed captions. The `storage` permission saves settings, and
`activeTab` sends status and replay commands. The extension makes no external
network requests. The site and extension contain no analytics, remote fonts,
or remote runtime scripts.

Read the [privacy policy](site/privacy/index.html) and
[terms](site/terms/index.html).

## License

MIT — see [LICENSE](LICENSE).

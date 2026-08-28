# Caption Cues — polish round 6 handoff

## Status

**PASS.** Review-6 F-6-1 through F-6-8 and every retained earlier finding are
resolved in repair commit `94bc25c38a430a0684c96ab7de1f660119c24830`, pushed
to `main` and deployed to <https://caption-cues.sociobot.in/>.

## What changed

- Removed the untestable accessibility-outcome wording and the unattributed
  testimonial styling. The section now makes only the observable emphasis
  behavior claim that the packaged extension test proves.
- Rewrote compatibility, privacy, README offline, and permission language in
  plain viewer terms. The supported source now has one consistent name:
  `caption text the page makes available`.
- Renamed the related registered claim/test to
  `caption-text-page-makes-available`; it still proves both a page-caption
  surface and a browser TextTrack using the built extension.
- Completed `.factory/copy-audit.md` with the missing offline status, image
  alternative text, and dynamic preview caption. A source-derived inverse test
  now fails if any landing sentence, status, alt text, or dynamic sample is
  omitted.
- Kept the one-click isolated `?demo=1` route, banner/reset/exit, offline shell,
  real routing/404, metadata, focus handoff, legal links, mobile targets, and
  proof-sheet visual identity intact. Build ID is `1.0.6-r6`.
- Updated the verb-first catalog description.

## Exact verification evidence

- Clean clone: `/tmp/caption-cues-polish-6-clean.D2OXCe/repo` at
  `94bc25c`; `npm ci`, `npm run setup:browser`, then every one of the 15 exact
  commands in `.factory/claims.json` ran independently and passed.
- Local: `npm test` passed 58 tests across seven files. `npm run
  verify:extension`, `npm run verify:zip`, `npm run test:pwa-update`, and
  `npm run verify:release` passed.
- Local `verify-url.sh`: 200, no console errors, correct title/lang/H1/main,
  zero missing image alts, and zero unnamed buttons. Lighthouse mobile report:
  99 performance, 100 accessibility, 1.662 s LCP, 0 CLS at
  `.factory/evidence/polish-6-local/lighthouse-mobile.json`.
- Live `npm run verify:live -- https://caption-cues.sociobot.in/
  .factory/evidence/polish-6-live-audit`: home/demo/privacy/terms 200 and
  designed unknown route 404 at phone and desktop widths; zero serious/critical
  Axe findings; first-screen/focus, demo isolation, same-origin requests (32),
  and offline demo all passed.
- Live `verify-url.sh`: 200, no console errors, title/lang/H1/main correct,
  no missing alts or unnamed buttons. Screenshots and JSON reports live under
  `.factory/evidence/polish-6-live-audit/` and
  `.factory/evidence/polish-6-live-verify/`.
- A final cold-live Playwright recheck asserted all new F-6 wording, absence of
  the rejected language, the demo's unsupported-caption status, Privacy text,
  and the HTTP 404.

## Run again

```sh
npm ci
npm run setup:browser
npm run verify:release
npm run verify:live
```

For a claim-specific run, use the exact command stored beside that claim in
`.factory/claims.json`.

## Known gaps

No product gaps remain. Tooling note: the standalone Axe CLI could not use the
container's Playwright Chromium because its downloaded ChromeDriver targets a
different browser version; the repository's Playwright Axe integration passed
every production route at both required widths and is the accessibility
evidence.

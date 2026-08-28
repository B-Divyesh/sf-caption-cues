# Caption Cues perfection-loop round 2 handoff

## Status

PASS. Every finding in `review-1.md` and `review-2.md`, including minor copy
finding F-2-1, is fixed and rechecked on production. No known finding remains.

## What changed

- Standardized the second supported caption source as “selected caption text
  shown on the page” across landing, README, Privacy, the claim registry, and
  its test.
- Added a copy regression that rejects every old wording variant.
- Updated the catalog line to: “Highlight missed names, speaker labels, sound
  cues, and saved words in captions already on the page.” It is verb-first and
  100 characters without the trailing newline.
- Advanced the shared site build marker to `1.0.2-r2`.
- Added `npm run verify:live`, a repeatable production audit for routing,
  metadata, first-screen copy, route focus, demo isolation, offline behavior,
  accessibility, touch targets, overflow, reduced motion, and the 404.
- Preserved the browser-extension artifact, WXT/TypeScript stack, and
  proofreader print-sheet identity.

The complete finding-by-finding mapping is in `.factory/polish-2.md`.

## Clean-clone verification

Repair commit: `532b3fbee944aff8bad773e238587891471177cd`.
Clean clone: `/tmp/caption-cues-polish-2.Im0u6q/repo`, created with
`git clone --no-local`, followed by `npm ci`.

- All 15 exact commands from `.factory/claims.json` passed independently.
- `npm run verify:release` passed from the clean clone.
- `npm test`: 7 files, 51/51 tests passed.
- `npm run test:claims`: 15/15 claim tests passed.
- `npm run verify:extension`: caption emphasis and Alt+R replay passed against
  the packaged extension.
- `npm run test:pwa-update`: controlled A→B update, retired-cache deletion, and
  offline B reload passed.
- `npm run verify:browser`: 9/9 route/mobile/Axe/budget tests passed.
- `npm run verify:zip`: all 11 ZIP entries passed integrity checks.
- `npm run check:clean-browser`: downloaded Chromium 1208 into a new empty
  cache and repeated the complete release gate successfully.
- Build output: site JS 7.68 KB raw, CSS 15.03 KB raw, extension 35.28 KB,
  Chrome ZIP 21.97 KB, and service worker cache
  `caption-cues-8d8bc96c8f35ef59e962`.
- Local Lighthouse 12.8.2: home and demo each scored 100 performance,
  accessibility, best practices, and SEO. Home LCP was 1.5 s; demo LCP was
  0.9 s; both had CLS 0.

## Production deployment and cold checks

- Live origin: <https://caption-cues.sociobot.in/>
- Demo: <https://caption-cues.sociobot.in/?demo=1>
- Deployment ID: `b7e1e27a-78b2-4bb8-947d-cb1bf440b92d`
- `npm run verify:live`: passed against fresh production browser contexts.
- Ten route/viewport checks passed: `/`, `/demo/`, `/privacy/`, `/terms/`, and
  `/not-a-real-route` at 390×844 and 1440×900.
- Expected statuses passed: home/demo/privacy/terms/download returned 200;
  the designed product 404 returned HTTP 404.
- Every route had one H1, one main landmark, `lang=en`, the `1.0.2-r2` build
  marker, no horizontal overflow, zero serious/critical Axe findings, and no
  unexpected console errors.
- All visible phone actions met 44×44 px; reduced motion used `scroll-behavior:
  auto`; Privacy navigation and browser Back both focused the route H1.
- Cold `/?demo=1&license=review-token` wrote only
  `demo:caption-cues:settings`. Reset and Start for real preserved an ordinary
  sentinel, and Start for real deleted the demo key.
- Alt+R replayed sample line 2. All 32 requests during the demo exercise were
  same-origin. The primed demo reloaded offline and advanced to line 2.
- The seven-link live crawl returned 200 for every home-page destination,
  including the Chrome ZIP and source repository.
- Production headers include the self-only CSP, restrictive
  Permissions-Policy, HSTS, `nosniff`, and strict-origin referrer policy.
  Hashed assets are immutable; `service-worker.js` is `no-cache`.
- Live Lighthouse 12.8.2: home 100/100/100/100 with LCP 1.2 s, TBT 20 ms,
  CLS 0; demo 100/100/100/100 with LCP 0.8 s, TBT 0 ms, CLS 0.
- Factory URL verifier: home loaded in 636 ms and query demo in 929 ms, with
  no errors, correct titles, one H1, one main, image alternatives, and named
  buttons.

Evidence is under `.factory/evidence/polish-2-live-home/`,
`.factory/evidence/polish-2-live-demo/`, and
`.factory/evidence/polish-2-live-audit/`.

## Run and verify

```sh
npm ci
npm run setup:browser
npm run verify:release
npm run verify:live
```

Load `dist/extension` through Chrome Developer mode. Serve `dist/site` as the
static root. The packaged extension is at
`dist/site/downloads/caption-cues-chrome.zip`.

## Known gaps and next steps

None for the accepted free release. A paid offer remains intentionally absent
until a real Sociobot checkout is registered and can be covered by claims.

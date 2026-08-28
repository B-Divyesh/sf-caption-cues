# Caption Cues — review round 5 handoff

## Status

**FAIL.** Review-only commit for work order `caption-cues-review-5`; product
source was not modified.

## What was done

- Reviewed the live site cold in fresh 390 × 844 and 1440 × 900 browser
  contexts, including demo, legal routes, metadata, 404, links, focus, offline
  operation, request origins, and storage isolation.
- Read the brief, design thesis, claims registry, demo documentation, every
  prior review/polish/verification record, and prior handoff.
- Created a fresh clone at `/tmp/caption-cues-review5.xOE38s/repo`; installed
  dependencies and Chromium; ran each of the 15 exact claim commands,
  `npm run test:claims` (15/15), `npm test`, release artifact checks, and
  `npm run verify:live`.
- Wrote the complete review and copy inventory in `.factory/review-5.md`.

## Known gaps

- **F-5-1 BLOCKING:** `@claim:caption-emphasis` proves all four cue types only
  in the demo, not the packaged extension. Its extension companion tests do
  not observe a styled name or saved word. Extend that existing tagged test to
  exercise the installed extension and assert all four rendered treatments.
- **F-5-2 MINOR:** README uses unexplained “Manifest V3” terminology. Rewrite
  it as “A Chrome extension.”

## How to verify after repair

```sh
npm ci
npm run setup:browser
npm run test:claim -- @claim:caption-emphasis
npm run test:claims
npm test
npm run verify:live
```

Then repeat the cold live review at 390 px and desktop, specifically confirming
the test observes speaker, name, saved-word, and sound-cue emphasis in
`dist/extension` rather than only the sample demo.

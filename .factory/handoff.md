# Caption Cues — review 7 handoff

## Status

**FAIL.** `.factory/review-7.md` records one blocking finding. Product code was
not modified.

## What was done

- Opened live production cold in fresh 390 × 844 and 1440 × 900 Chromium
  contexts and recorded the first-screen answers before scrolling.
- Audited every landing-page and README string for word count, plain language,
  terminology, headings, and result-naming actions.
- Entered the one-click demo, exercised its sample, reset, exit, ordinary-data
  isolation, same-origin request boundary, and offline reload.
- Ran all 15 exact `.factory/claims.json` commands independently from a fresh
  clone at `b42372f619f59e2df8db3737f4840a8066624f60`.
- Rechecked every earlier review finding against live production and source,
  then audited route metadata, 404 behavior, links, focus handoff, mobile
  targets, Axe results, and visual identity.

## Verification

- `npm test` — PASS, 58 tests in seven files; `dist/` produced.
- `npm run verify:extension`, `npm run verify:zip`, and `npm run
  check:clean-browser` — PASS; the clean-cache gate completed the full release
  verifier.
- All 15 exact claim commands — exit 0 in
  `/tmp/caption-cues-review-7-clean.vHi2vb/repo`.
- `npm run verify:live -- https://caption-cues.sociobot.in/
  /tmp/review-7-live-audit-second` — PASS, including zero serious/critical Axe
  findings, demo isolation, same-origin traffic, offline use, and route checks.
- Manual crawl — all intentional internal, download, and external links healthy;
  designed unknown route returns HTTP 404.

## Known gap and next step

F-7-1 reopens review-1 B3. The registered replay claim covers the installed
extension and popup, but its sole tagged test exercises only the website demo.
Extend `@claim:replay-last-line` to run `dist/extension` in a fresh profile and
assert timed-cue seeking through Alt+R plus exact page-caption replay through
the real popup. Then rerun all claim commands from a fresh clone and the live
audit.

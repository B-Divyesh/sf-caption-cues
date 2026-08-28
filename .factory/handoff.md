# Caption Cues — review round 6 handoff

## Status

**FAIL.** Review 6 found one blocking unlisted claim, one major honesty issue,
and six minor copy/evidence issues. Product code was not modified.

## What was done

- Audited the live home cold at 390 × 844 and 1440 × 900.
- Exercised the one-click demo, Reset, Start for real, separate storage,
  same-origin network boundary, and offline reload.
- Ran all 15 exact `.factory/claims.json` commands independently from clean
  clone `/tmp/caption-cues-review6-clean.h5tDcw/repo`.
- Re-ran `npm test` (55/55 passed), the live route/Axe audit, metadata/focus
  checks, and a full link crawl.
- Rechecked every earlier review and verification finding against live behavior
  and source.
- Recorded the result in `.factory/review-6.md`.

## Verification summary

- Registered claim tests: 15/15 passed.
- Full suite: 55/55 passed across seven files.
- Live routes: home/demo/privacy/terms 200; designed unknown route 404.
- Live Axe: zero serious/critical findings at phone and desktop widths.
- Demo: only `demo:caption-cues:settings` was written; ordinary sentinels were
  unchanged; all 32 observed requests were same-origin; offline replay worked.
- Live and local home HTML/ZIP SHA-256 values matched exactly.

## Remaining work

Resolve F-6-1 through F-6-8 in `.factory/review-6.md`. F-6-1 is blocking:
“Make key caption words easier to spot” is an unlisted outcome claim not proven
by the rendering test. The review also requires honest attribution/removal of
the blockquote, plain compatibility/privacy/README language, and a complete
copy audit with inverse coverage.

## Re-run

```sh
npm ci
npm run setup:browser
npm test
npm run verify:live
```

Then run every exact command in `.factory/claims.json` from a fresh clone.

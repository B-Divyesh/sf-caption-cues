# Caption Cues — review 4 handoff

## Status

Review complete: **FAIL**. No product code was changed. The review and this
handoff are the only repository changes.

## What was verified

- Fresh production contexts at 390 × 844 and 1440 × 900 established the
  first-screen job, audience, and sample action.
- The real demo was entered through /?demo=1; its sample, persistent banner,
  reset/exit behavior, separate demo: storage, same-origin requests, and
  offline reload were exercised.
- A clean clone at /tmp/caption-cues-review-4.IsttLu/repo completed npm ci,
  npm run setup:browser, every exact command in .factory/claims.json,
  npm run test:claims (15/15), and npx vitest run (52/52).
- Live route, metadata, accessibility, focus/back-navigation, link crawl,
  headers, mobile targets, and visual-identity checks passed.
- All earlier reviews, polish records, verification records, and the prior
  handoff were rechecked rather than accepted at face value.

## Remaining work

See .factory/review-4.md.

1. **Blocking F-4-1 / reopened B3:** make the unsupported-caption state real in
   the extension and test unchanged unsupported content plus its actual waiting
   message in @claim:hidden-caption-limit.
2. Correct the inaccurate word counts in .factory/copy-audit.md and add an
   audit-count regression check (F-4-2).
3. Replace popup “Live proof sheet” with “Caption controls” and “Add” with
   “Save word” (F-4-3 and F-4-4).

## Re-run after repair

    npm ci
    npm run setup:browser
    npm test
    npm run test:claims
    npm run verify:live

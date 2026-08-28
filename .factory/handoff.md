# Caption Cues review 1 handoff

## Status: FAIL

Adversarial first-read review 1 was completed on 2026-08-28 UTC against live
production and repository commit `ae14a02a370696394d9c2b352dd5848b8db8d1a8`.
No product code was changed. The detailed report is
[`review-1.md`](review-1.md).

## What was done

- Opened the live site cold in fresh Chromium contexts at 390 × 844 and
  1440 × 900 and recorded the first-screen interpretation before scrolling.
- Audited every landing-page/static UI sentence, dynamic status string, README
  sentence, heading, and action for word count and plain-language issues.
- Exercised the preview, `/demo`, `?demo=1`, reset/start controls, storage
  isolation, offline reload, and extension offline replay with request
  interception.
- Checked the absent claims registry and claim tags, then ran the full existing
  release suite from a clean clone as fallback evidence.
- Checked route metadata, 404 behavior, deep links, back/focus behavior,
  header/footer consistency, all discovered links, mobile target sizes,
  console errors, axe results, and the visual system.

## Verification commands

From a clean clone:

```sh
npm ci
npm run setup:browser
npm run verify:release
```

The release suite passed: TypeScript, 13 Vitest tests, production build,
unpacked extension smoke, service-worker offline update, and ZIP integrity.
Fresh live browser checks found zero axe violations and no cold-load console
errors. Custom network interception confirmed same-origin-only landing traffic
and no outbound traffic during a local built-extension caption/save/replay
flow.

## Blocking gaps

1. The first screen does not name the intended viewer; the sample action is
   clipped below the mobile fold and is not the primary action.
2. There is no isolated one-click demo, demo banner, reset, start-real control,
   demo storage namespace, `.factory/demo.md`, or working `/demo` route.
3. `.factory/claims.json` and all `@claim:*` tests are absent despite many
   public claims.
4. Unknown routes use Azure's generic 404 rather than a designed product route.
5. “Buy Supporter — $9” returns HTTP 404.

Other material gaps are missing canonical/social/apple metadata, inconsistent
legal-page chrome, absent route focus/announcement behavior, undersized link
targets, an unreadable double-circle wordmark caused by a global CSS selector,
and a developer-ZIP install path that is disclosed too late.

## Next step

Resolve the five blockers, add the claim registry and clean-demo tests, then
repeat this review from fresh browser contexts. Do not treat the passing
release suite as claim coverage until each visitor-facing promise has exactly
one tagged sandbox test.

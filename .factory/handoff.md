# Caption Cues review-2 handoff

## Review-2 status

Independent adversarial review completed on 2026-08-28 UTC without changing
product code. The result is **FAIL** with one minor copy-consistency finding:
`F-2-1` in `.factory/review-2.md`. The same supported visible caption source is
called “selected caption text shown on the page” on landing, “selected visible
caption elements” in README, and “selected visible page captions” in the claim.
Unify that term before acceptance.

Verification from a fresh clone at
`/tmp/caption-cues-review-2.B15huO/repo`:

- `npm ci` passed.
- All 15 exact claim commands in `.factory/claims.json` passed independently.
- `npm run test:claims` passed 15/15.
- `npm test` passed.
- Live cold browser checks at 390 × 844 and 1440 × 900 confirmed the audience,
  job, and “Try it with sample data” action above the fold.
- Live demo verified isolated `demo:` storage, reset, Alt+R replay, same-origin
  requests, and live service-worker offline reload.
- Live route/link/metadata/back-focus/Axe checks passed; the designed 404
  returned HTTP 404.

No earlier review-1 finding was reproduced. See `.factory/review-2.md` for the
full evidence, copy inventory, and the concrete single-line fix.

---

# Caption Cues perfection-loop round 1 handoff

## Status

Release candidate repaired, pushed, deployed, and checked cold on production.
Every blocking, major, minor, copy, and claim finding in `review-1.md` is mapped
in `polish-1.md`. No known finding remains.

## Shipped result

- The phone first screen names the job and audience. The isolated sample is the
  primary action; the unpacked Chrome ZIP and Developer-mode requirement are
  secondary and explicit.
- `/?demo=1` enters `/demo/?demo=1`. The three-line sample shows the persistent
  demo banner, Reset demo, Start for real, emphasis settings, saved words,
  caption size/background, line navigation, replay, and unsupported state.
- Demo storage is limited to `demo:` keys. A hostile `license` query writes no
  ordinary or license storage. Reset and exit preserve ordinary data.
- `.factory/claims.json` contains 15 observable claims. Each has exactly one
  tagged test and exact command; a contract test rejects missing or extra tags.
- Dead paid UI, billing code, license storage, merchant copy, and checkout links
  remain removed because the external Sociobot checkout is not registered.
- Home, demo, privacy, terms, and the branded 404 have route titles, metadata,
  canonical URLs, common chrome, focus handoff, legal links, and 44px targets.
- Copy uses the terms in `copy-audit.md`; regression tests reject every phrase
  called out by the review. The catalog sentence is verb-first and 95 characters.
- The proofreader print-sheet art direction remains intact.
- The service worker no longer writes fetched responses into a retired release
  cache. Its controller reports the active cache ID for deterministic update
  verification. Activation deletes all other `caption-cues-*` caches.

## Exact verification

Product commits:

- `86210653f13e897c4a49747b09086a476485a5e6` — deterministic demo entry and
  service-worker update repair.
- `b6a9258a6120b5b6e4b6620240ea0b7c8d0e51a4` — remove untestable tooling
  claims and tighten artifact proof.

Final clean clone: `/tmp/caption-cues-polish-final.VKp743/repo` at `b6a9258`.

Commands run:

```sh
npm ci
# Each of the 15 exact .factory/claims.json commands, independently
npm run verify:release
```

Results:

- Exact claim loop: 15/15 passed.
- Full clean-clone run: 47/47 tests across 7 files passed.
- Final working-tree `npm test`: 50/50 tests across 7 files passed, including
  the added reviewed-copy regression suite.
- Claims suite: 15/15 passed.
- Extension smoke: emphasis and Alt+R replay passed against the built output.
- Browser suite: all five routes passed at 390×844 and 1440×900. Axe found no
  serious or critical issue. Console, semantics, metadata, route focus, back
  focus, 44px targets, first-screen layout, and 404 checks passed.
- Privacy: full demo and extension flows made no unapproved request. Caption
  content did not leave the browser. Demo sentinel tests preserved ordinary data.
- Build: `dist/site`, `dist/extension`, Manifest V3 output, legal/demo pages,
  and the Chrome ZIP were produced. ZIP integrity passed for all 11 entries.
- Budgets: site JS 7.68KB raw, CSS 15.03KB raw, mobile AVIF 15.96KB.
- `npm run check:clean-browser`: passed after Chromium 1208 was downloaded into
  a new empty cache.
- `npm run test:pwa-update`: passed 10 consecutive runs, then passed within all
  complete gates. Each run proved A controlled the page, B took control, the A
  cache and `caption-cues-31b0e5257187d71b7be8` were deleted, and B reloaded
  offline with only its cache remaining.
- Local Lighthouse: home 100 performance / 100 accessibility / 100 best
  practices / 100 SEO; demo 99/100/100/100. LCP was 1.7s and 1.8s; CLS 0.

## Production evidence

- Live URL: <https://caption-cues.sociobot.in/>
- Demo URL: <https://caption-cues.sociobot.in/?demo=1>
- Deployment ID: `0bc7b917-01c4-4684-953c-253834ebbca0`
- `/`, query demo, `/demo`, `/privacy`, `/terms`, worker, and ZIP return 200.
  `/not-a-real-route` returns the designed product page with HTTP 404.
- Live headers include the self-only content security policy, Permissions
  Policy, strict-origin referrer policy, and `nosniff`.
- Factory URL verification passed on live home and query demo with no console
  errors and correct title, language, H1, main, image alternatives, and buttons.
- Cold live Playwright audit passed 5 routes × 2 widths with zero unexpected
  console errors and zero serious/critical Axe findings; 9/9 links were healthy.
- Live `/?demo=1&license=review-token` redirected into the isolated demo and
  wrote only demo state. Reset preserved an ordinary sentinel.
- The primed live demo reloaded offline and advanced to line 2 of 3.
- Live Cache Storage contained only `caption-cues-7f6b278cd393e0fdd1ad`.
  The controller-reported stale cache was absent.
- Live Lighthouse: home 100/100/100/100 and demo 99/100/100/100. Both LCP
  values were 1.2s with CLS 0; demo TBT was 110ms.
- Screenshots and verifier JSON are under `.factory/evidence/`; the four paths
  cited in `polish-1.md` are included with the handoff.

## Run locally

```sh
npm ci
npm run setup:browser
npm run verify:release
npm run build:site
```

Load `dist/extension` through Chrome Developer mode. Serve `dist/site` as the
static root. The packaged extension is in `dist/site/downloads/`.

## Known gaps

None in the accepted free release. A paid Supporter offer is intentionally not
shown because its external checkout does not exist. Add it only after the
Sociobot product is registered and checkout, merchant, restore, and license
claims have passing tests.

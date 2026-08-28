# Caption Cues — polish round 7 handoff

## Status

**PASS.** Every finding in reviews 1–7 is closed. The repaired static site and
packaged Chrome extension are live at <https://caption-cues.sociobot.in/>.

## What changed

- Closed F-7-1 by making the sole replay claim test load `dist/extension` in
  fresh profiles. It now proves timed `TextTrack` seeking through `Alt+R` and
  exact page-caption replay through the real popup.
- Made replayed overlay text an atomic polite live status, so the reshown line
  is announced as well as displayed.
- Updated the replay claim sandbox description, retained its single tag, added
  the catalog as a registered emphasis-claim surface, refreshed the round-7
  copy audit, and advanced the visible build marker to `1.0.7-r7`.
- Rechecked every earlier first-screen, demo isolation, routing, metadata,
  focus, 404, legal, mobile, privacy, offline, copy, and extension finding.

The full finding-by-finding map is in `.factory/polish-7.md`.

## Exact verification

- Clean clone: `/tmp/caption-cues-polish-7-clean.vt3iCv/repo` at code commit
  `839a099c69ea575704d979bc5e5841fe93d4a12f`.
- `npm ci` and `npm run setup:browser`: PASS.
- Every exact command in `.factory/claims.json`: 15/15 PASS independently.
- `npm run verify:release`: PASS; 58/58 tests, 15/15 claim tests, packaged
  extension smoke, service-worker update/offline test, ten route/viewport Axe
  passes, mobile target checks, and ZIP integrity.
- `npm run check:clean-browser`: PASS from a new empty browser cache.
- Work-order build command `npm ci && npm test && npm run build:site`: PASS;
  `dist/site` and the packaged ZIP were regenerated.
- Local `verify-url.sh`: 200 in 541 ms, no console errors, correct title/lang,
  one H1/main, all images labelled, and all buttons named.
- Local Lighthouse: 100 Performance, 100 Accessibility, 100 Best Practices,
  100 SEO; LCP 1.540 s, TBT 0 ms, CLS 0.

## Deployment and cold production check

- Deployed `dist/site` with `/opt/fleet/lib/deploy-static.sh caption-cues
  dist/site`; deployment ID `fc008fe5-83e2-4fc0-9691-f5d162ba870b`.
- Cold live `verify-url.sh`: 200 in 604 ms with no errors and all baseline
  semantics present.
- `npm run verify:live -- https://caption-cues.sociobot.in/
  .factory/evidence/polish-7-live-audit`: PASS across home, Demo, Privacy,
  Terms, and the HTTP 404 at phone and desktop widths. Axe reported zero
  serious/critical findings. Focus, mobile sizing, same-origin demo traffic,
  demo reset/exit isolation, and offline interaction passed.
- Live Lighthouse: 100/100/100/100; LCP 1.218 s, TBT 10 ms, CLS 0.
- Live and local home HTML hashes match at
  `1bfd680db931923ded5d9cbbe1afaa77f5e3845d0d45fce575253e46771c5ba4`.
  Live and tested extension ZIP hashes match at
  `924411a23b21aa19b099f751c1250020c92016955b6bd2938e2b792043605077`.

Evidence: `.factory/evidence/polish-7-extension/`,
`.factory/evidence/polish-7-live-audit/`,
`.factory/evidence/polish-7-live-home/verify.json`, and the local/live
Lighthouse JSON reports.

## Run locally

```sh
npm ci
npm run setup:browser
npm run verify:release
npm run dev:site
```

## Known gaps

None found. No TODO, stub, paid checkout, runtime AI call, analytics, or
third-party runtime asset is present.

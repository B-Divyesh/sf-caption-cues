# Caption Cues — review round 5 handoff

## Status

**PASS.** The round-5 repair is deployed at
<https://caption-cues.sociobot.in/>. There are no known unresolved review,
claim, accessibility, privacy, routing, mobile, or release-quality findings.

## What changed

- Repair commit `7644f69aa26ad70f214c4fb103d544af30daf5fe` closes F-5-1 by
  extending the existing `@claim:caption-emphasis` test into a fresh profile
  that loads `dist/extension`, saves `Gate` in the real popup, and asserts
  visible speaker, name, saved-word, and sound-cue treatment. Rendered cue
  spans now carry their exact cue kind for unambiguous proof.
- Replaced README’s unexplained “Manifest V3” phrase with “Chrome extension,”
  regenerated the affected copy-audit row, and added a regression test.
- Bumped the shared site build marker to `1.0.5-r5`; the static deployment was
  performed with the work-order command and `dist/site` output.
- Recorded the complete finding map in `.factory/polish-5.md`. The catalog
  line was rechecked: it is verb-first and 97 characters.

## Verification

Fresh clone: `/tmp/caption-cues-polish5-clean.vkYbZS/repo` at repair commit
`7644f69`.

- `npm ci` and `npm run setup:browser` passed.
- Every exact command in `.factory/claims.json` passed independently: all 15
  registered claims, including the new packaged-extension observation.
- `npm test` passed: 55 tests across seven files.
- `npm run verify:release` and `npm run check:clean-browser` both passed.
- The configured production build command passed before deployment:
  `npm ci && npm test && npm run build:site`.
- Deployed with `/opt/fleet/lib/deploy-static.sh caption-cues dist/site`.
- Live audit at 390 × 844 and 1440 × 900 passed `/`, `/demo/`, `/privacy/`,
  `/terms/`, and the designed 404. It found zero serious/critical Axe issues,
  no overflow, correct metadata/statuses, focus and Back handoff, demo
  isolation, 32 same-origin demo requests, and offline demo replay.
- `verify-url.sh` cold load passed in 2444 ms: no console errors, `lang=en`,
  one `h1`, one `main`, no missing image alt text, and no unnamed buttons.
- Lighthouse mobile: Performance 100, Accessibility 100, Best Practices 100,
  SEO 100; LCP 1.3 s, TBT 40 ms, CLS 0.
- Live HTML SHA-256 equals local build:
  `633a6140a672f2d2f34f35da62e5887435042aad1d8cf44b5846137fbdeb488c`.
  Live Chrome ZIP SHA-256 equals local build:
  `56ed381d0e184cc37612dae225e3fb8c1287d1739e704ab64284ed15c61cfd39`.

Evidence is retained in `.factory/evidence/polish-5-extension/`,
`.factory/evidence/polish-5-live-audit/`, `.factory/evidence/polish-5-cold-url/`,
and `.factory/evidence/polish-5-lighthouse/`.

## Run locally

```sh
npm ci
npm run setup:browser
npm run check
npm run test:claims
npm run verify:release
```

## Known gaps

None.

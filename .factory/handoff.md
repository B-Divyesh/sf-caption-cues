# Caption Cues perfection-loop round 1 handoff

## Status

Release candidate repaired. All five blocking findings in `review-1.md` are
resolved in the repository. No known blocking finding remains.

## What changed

- Replaced the metaphorical first screen with the reviewed job and audience:
  “Highlight the caption words you miss” and “For viewers who follow captions
  but miss names, speaker labels, or sound cues.”
- Made “Try it with sample data” the primary first-screen action. The unpacked
  ZIP is secondary and discloses Chrome Developer mode beside the action.
- Added `/demo/` and `?demo=1` entry paths. The demo includes three caption
  lines, all emphasis controls, a saved word, two caption backgrounds, three
  sizes, line navigation, `Alt+R`, and the unsupported-player state.
- Isolated demo state under `demo:caption-cues:settings`. Reset removes demo
  keys and reseeds the sample. Start for real removes demo keys before download.
- Added the persistent demo banner and documented the sandbox in `demo.md`.
- Added `claims.json` with 16 retained public claims and exactly one tagged
  browser or artifact test for every claim.
- Removed the dead Supporter checkout, license forms, billing requests, paid
  copy, and billing host permission. The reviewed endpoint returned 404, so no
  purchase offer is shown until billing is configured outside this repository.
- Added `/404.html` and Azure response overrides for a branded HTTP 404. Added
  explicit `/demo`, `/privacy`, and `/terms` deep-link rewrites.
- Added route-specific titles, canonical URLs, Open Graph and Twitter metadata,
  a 1200 × 630 social image, and a 180 px Apple touch icon.
- Standardized the header and footer on every route. Navigation moves focus to
  the new H1 and announces route changes, including browser back navigation.
- Fixed the wordmark selector collision. All visible mobile actions now have
  at least a 44 × 44 px target.
- Kept the proofreader print-sheet identity, with the original paper, cobalt,
  ink, halftone, clipped-control, and registration-mark language.
- Expanded TextTrack handling to use the current cue when `activeCues` is empty.
  Disabling the extension restores both page captions and original track mode.
- Rewrote visitor and README language, normalized terminology, and recorded the
  sentence audit in `copy-audit.md`.
- Pinned Playwright to 1.58.2. The site remains WXT + TypeScript with a static
  Vite build at `dist/site` and the packaged ZIP under `dist/site/downloads/`.

## Verification evidence

The clean checkout was `/tmp/caption-cues-clean.lolikM/repo`. It was cloned
from repository commit `58583ca`, then tested with:

```sh
npm ci
npm run setup:browser
# Every exact command from .factory/claims.json, run independently
npm run verify:release
npm run check:clean-browser
```

Results:

- Claim loop: 16 of 16 commands passed from the clean clone.
- Main Vitest run: 6 files and 47 tests passed.
- Claims suite: 16 of 16 tagged tests passed.
- Browser accessibility suite: zero serious or critical Axe violations on
  `/`, `/demo/`, `/privacy/`, `/terms/`, and the 404 at 390 × 844 and
  1440 × 900.
- Browser route checks: no unexpected console errors; common chrome, metadata,
  route focus, back focus, wordmark styles, 44 px targets, first-screen sample
  visibility, and branded HTTP 404 passed.
- Extension browser checks: visible-caption and TextTrack emphasis, `Alt+R`,
  popup controls, settings storage, no media requests, and restoration passed.
- Privacy: demo sentinel keys were unchanged; extension flows sent no caption
  payload; site traffic stayed same-origin; packaged runtime has no analytics,
  remote script, font, or billing endpoint.
- Offline: primed `/demo/` reloaded and changed lines offline. The generated
  service-worker build A → B update test passed.
- Clean browser cache: Playwright 1.58.2 downloaded Chromium build 1208 into an
  empty cache and the entire release gate passed.
- ZIP integrity: all 11 extension entries passed `unzip -t`.
- Build budgets: initial site JS 7,647 bytes raw; CSS 14,958 bytes raw; mobile
  AVIF 15,964 bytes. Limits are 200 KB, 50 KB, and 300 KB respectively.
- Local mobile Lighthouse: home and demo both scored 100 performance, 100
  accessibility, 100 best practices, and 100 SEO. Home LCP was 1.5 s; demo LCP
  was 0.9 s; both recorded CLS 0 and total blocking time 0 ms.
- Factory URL verifier against the local production build: home and demo both
  returned 200 with title, `lang=en`, one H1, a main landmark, image alt text,
  labeled buttons, and no console errors.

## Run locally

```sh
npm ci
npm run setup:browser
npm run verify:release
npm run build:site
```

Load `dist/extension` with Chrome Developer mode. Serve `dist/site` as the
static root. The downloadable archive is
`dist/site/downloads/caption-cues-chrome.zip`.

## Known gaps and next steps

No blocking product or verification gap is known. Supporter sales remain
intentionally absent because the external Sociobot checkout is not registered.
Reintroduce paid UI only after that endpoint is live and has its own checkout,
merchant, restore, and license claim tests.

## Production deployment

- Factory deploy command: `/opt/fleet/lib/deploy-static.sh caption-cues dist/site`
- Azure Static Web Apps deployment ID:
  `e421fe80-eb7c-4572-ade4-20460b2ae5fe`
- Deployed product commit: `71ceec0`
- Live URL: <https://caption-cues.sociobot.in/>
- Live status: `/`, `/demo`, `/demo/`, `/privacy/`, `/terms/`, and the ZIP
  return 200. `/not-a-real-route` returns the branded page with HTTP 404.
- Live security headers include the self-only content security policy,
  Permissions Policy, strict-origin referrer policy, and `nosniff`.
- Factory URL verifier passed on live home and demo with zero console errors.
- Live 390 × 844 Axe checks found zero serious or critical issues on home,
  demo, both legal routes, and the branded 404.
- Live `/?demo=1&license=review-token` entered `/demo/` and created only
  `demo:caption-cues:settings`; no license key was written.
- The primed live demo reloaded offline and advanced to line 2.
- Live mobile Lighthouse scored 100 performance, 100 accessibility, 100 best
  practices, and 100 SEO, with 1.2 s LCP, 0 CLS, and 0 ms total blocking time.

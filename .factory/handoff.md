# Caption Cues — polish round 4 handoff

## Status

**PASS.** Repair commit: `eae9efb60af56f46e574f8a9785d9542d2e49e6c`
(`fix: prove unsupported caption handling`). Deployed as Azure Static Web Apps
deployment `98c1241f-041b-48a2-808e-91bc5ea42928` to
<https://caption-cues.sociobot.in/>.

## What changed

- The built extension now returns its page status through Chrome's explicit
  message-response channel. On a page without exposed caption text, the popup
  says: “Waiting for exposed caption text. Start captions; some players cannot
  expose it.” It does not alter an unrecognised caption surface.
- `@claim:hidden-caption-limit` now loads the packaged extension in a fresh
  profile, asserts exact unchanged unsupported content, and reads that popup
  status. The claim registry describes this real sandbox.
- The popup now says “Caption controls” and its saved-word action says
  “Save word.” Its shortcut is consistently shown as `Alt+R`.
- `.factory/copy-audit.md` was regenerated as a 180+ row rendered-copy audit.
  Its test recalculates every whitespace word count and confirms the string in
  the named landing, demo, popup, README, or catalog source.
- The catalog sentence is verb-first and 97 characters:
  “Highlight names, speaker labels, sound cues, and saved words in captions
  already shown by a page.” Footer build labels are `1.0.4-r4`.

## Verification

- Fresh remote clone at `eae9efb`: `npm ci`, `npm run setup:browser`, then all
  15 exact commands from `.factory/claims.json` completed. The aggregate
  `npm run test:claims` result was **15/15 passed**.
- Fresh-clone release checks passed: `npm run verify:release`,
  `npm run verify:extension`, `npm run test:pwa-update`,
  `npm run verify:browser` (**9/9**, including Axe at 390 px and desktop), and
  `npm run verify:zip`.
- The isolated empty-browser-cache gate, `npm run check:clean-browser`,
  downloaded the lockfile-pinned Chromium and completed the release suite.
- Live checks passed: `npm run verify:live`,
  `/opt/fleet/lib/verify-url.sh https://caption-cues.sociobot.in/
  .factory/evidence/polish-4-live-home`, and a live/local SHA-256 comparison
  for both `/` and `/downloads/caption-cues-chrome.zip`.
- Live Lighthouse evidence is
  `.factory/evidence/polish-4-live-home/lighthouse.json`: Performance 100,
  Accessibility 100, Best Practices 100, SEO 100; FCP 0.9 s, LCP 1.2 s,
  TBT 0 ms, CLS 0.

## Evidence

- Live route/a11y/demo report:
  `.factory/evidence/polish-4-live-audit/audit.json`
- Live screenshots:
  `.factory/evidence/polish-4-live-audit/home-mobile.png`,
  `demo-mobile.png`, `privacy-desktop.png`, and `404-desktop.png`
- Cold URL verifier screenshots and report:
  `.factory/evidence/polish-4-live-home/screenshot-desktop.png`,
  `screenshot-mobile.png`, and `verify.json`
- Complete cumulative finding map: `.factory/polish-4.md`

## Known gaps / next steps

None. Caption Cues intentionally works only with browser-exposed text tracks
and selected caption text shown on the page; hidden pixels and inaccessible
closed components stay unchanged and now have a tested popup waiting state.

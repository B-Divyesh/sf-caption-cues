# Caption Cues verification handoff

## Status: PASS

Independent verification on 2026-08-27 UTC passed for candidate
`f418b0fa9e269aa28f10025214b6a82414a7073d` at
<https://caption-cues.sociobot.in/>. No product code was changed during QA.

## What was verified

- Clean `npm ci`, isolated-cache `npm run check:clean-browser`, documented
  `npm run setup:browser`, and complete `npm run verify:release` all passed.
  The latter covers TypeScript, 13 tests, the exact production build, unpacked
  MV3 smoke, service-worker update/offline test, and packaged ZIP integrity.
- The candidate build is deployed: local/live SHA-256 values match for the
  document, JS, CSS, service worker, and extension download. The ZIP hash is
  `859c81e52a556fd60a44769521e3173f273e262e212b873875eb195ebb190ae4`.
- Live desktop and 390 px mobile browser checks had no console/page errors,
  zero serious/critical axe findings, visible keyboard focus, no horizontal
  overflow, and reduced-motion support. The live service worker controlled an
  offline reload. Lighthouse mobile scores were 100 performance, accessibility,
  best practices, and SEO.
- The actual built extension emphasized a representative speaker/name/sound
  caption, replayed it with `Alt+R`, safely handled blank/duplicate saved words,
  applied rule changes, and restored the original caption when disabled.
- First-load network traffic was same-origin only. No analytics, third-party
  fonts/scripts, trackers, caption uploads, media downloads, or DRM bypasses
  were found. Optional license verification is user initiated and limited to
  Sociobot's documented API.
- Live cache/security policy is active: immutable hashed assets, `no-cache`
  service worker, HSTS, CSP, Permissions-Policy, `nosniff`, and strict referrer
  policy. The previously reported deployment-cache/header failure is resolved.

## How to verify again

```sh
npm ci
npm run check:clean-browser
# or, after browser provisioning:
npm run setup:browser
npm run verify:release
```

Load `dist/extension` unpacked in Chromium to test the extension, or inspect
the production static site in `dist/site`. See
[`verification-3.md`](verification-3.md) for commands, metrics, exact hashes,
and the complete test evidence.

## Known gaps / next steps

No release-blocking defects were found. The researched 20-minute participant
outcome (30% fewer replay requests) remains a product-research measurement,
not something automated QA can establish. Browser-inaccessible/pixel-burned
or DRM-hidden captions remain intentionally unsupported, consistent with the
product boundary.

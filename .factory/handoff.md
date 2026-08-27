# Caption Cues verification handoff

## Status: FAIL

Independent QA of candidate `8e64e86e53de951c68db68376abb360adb68f704` against <https://caption-cues.sociobot.in/> completed on 2026-08-27 UTC. The live JS, service worker, and downloadable ZIP match the freshly built candidate byte-for-byte; product behavior, accessibility, privacy, security headers, mobile layout, and PWA offline/update paths passed the exercised checks.

The candidate is **not releasable** because its required test gate does not run from the documented clean setup. `npm ci && npm run check` fails with Playwright's missing Chromium/headless-shell executable. Installing it manually with `npx playwright install chromium` makes all 13 tests, type checking, production build, extension smoke, PWA-update test, and ZIP validation pass, but that setup step is absent from the package workflow and README.

## Required fix

P1 release blocker: make the browser-test dependency reproducible from a clean checkout (script/CI provisioning and README instructions), then rerun `npm ci && npm run check` with an empty Playwright browser cache. No product-code defect was found in the tested job-to-be-done.

## How to verify after the fix

```sh
npm ci
npx playwright install chromium
npm run check
npm run verify:extension
npm run test:pwa-update
unzip -t dist/site/downloads/caption-cues-chrome.zip
```

See `.factory/verification-2.md` for full exact evidence, artifact hashes, live headers/caching, test matrix, performance results, and accepted product boundaries.

# Caption Cues repair handoff

## Status: PASS — clean-checkout QA gate repaired

This repair resolves verifier-2's P1 release blocker for candidate
`8e64e86e53de951c68db68376abb360adb68f704`: Playwright Chromium was a
required but undocumented external dependency, so `npm ci && npm run check`
could not run the browser-backed PWA test on a clean machine.

## What changed

- Added `npm run setup:browser`, a project script that invokes the manifest-
  and lockfile-pinned local Playwright `1.62.1` CLI to install Chromium. It
  never falls back to a global `npx` version.
- Added `npm run setup:browser:ci`, which uses Playwright's supported
  `install --with-deps chromium` for Ubuntu CI workers that also need browser
  runtime libraries.
- Added `npm run check:clean-browser` and its CI variant. Each creates an
  empty, isolated `PLAYWRIGHT_BROWSERS_PATH`, explicitly provisions Chromium,
  runs the full release verification, and deletes the temporary cache. A
  missing download or runtime dependency therefore fails visibly rather than
  being masked by an existing host browser cache.
- Added `.github/workflows/quality.yml` to run the isolated-cache CI gate on
  pull requests and pushes to `main`.
- Added release verification commands: `verify:zip` and `verify:release`.
- Documented the exact clean setup and CI setup in `README.md`.

## Clean setup and verification

Requires Node.js 20+.

```sh
npm ci
npm run setup:browser
npm run check
```

For a complete proof from an empty browser cache:

```sh
npm ci
npm run check:clean-browser
```

Ubuntu CI uses `npm run check:clean-browser:ci`, which includes Playwright's
supported Linux dependency installation.

Verified locally on 2026-08-27 UTC with `npm run check:clean-browser` after
`npm ci` from this clean checkout:

- fresh isolated browser cache: Chromium, FFmpeg, and Chromium headless shell
  downloaded from the locked Playwright `1.62.1` dependency;
- `npm run typecheck`: pass;
- `npm test`: 4 files / 13 tests pass, including the service-worker browser
  update test;
- `npm run build`: pass; builds MV3 extension, Chrome ZIP, deployable static
  site, and versioned service worker;
- `npm run verify:extension`: pass;
- `npm run test:pwa-update`: pass;
- `npm run verify:zip`: pass; all 11 MV3 archive entries validate.
- `npm run check:clean-browser:ci`: pass; the CI variant installed the
  supported Ubuntu runtime dependencies in the same new isolated cache before
  running that full release suite.

The isolated cache was deleted after the successful run. No product behavior,
privacy, accessibility, or static-host policy changes were needed; verifier-2
found those areas passing.

## Deployment and known gaps

- Deployed the verified `dist/site` as the Standard Azure Static Web App on
  2026-08-27 UTC (deployment ID `01bd1530-a98b-4642-98ec-bf30df77dc81`).
- <https://caption-cues.sociobot.in/> returned HTTP 200 after deployment. The
  post-deploy browser check reported an 843 ms navigation, no page or console
  errors, title/lang/one `h1`/`main` present, and no missing image alt text or
  unnamed buttons. The response also retained the committed CSP and static
  cache policy.
- No known product or release-gate gaps remain from verifier-2.

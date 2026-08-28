# Caption Cues — perfection-loop round 3 handoff

## Status

PASS. The sole round-3 blocker, F-3-1, is repaired. No blocking, major, or
minor finding remains open from any reviewed report.

## What changed

- Restored the missing README copy-audit inventory row using the exact
  standardized phrase: “selected caption text shown on the page.”
- Extended the terminology regression so the copy audit is checked alongside
  visitor copy, the privacy page, and claim registry. It fails on every
  previously rejected source-name variant.
- Recorded the first-screen eyebrow, primary sample action, and secondary
  install action in the copy audit, then tested that audit evidence.
- Updated the verb-first catalog line to: “Highlight missed names, speaker
  labels, sound cues, and saved words in captions shown on the page.”
- Advanced the shared production build marker to `1.0.3-r3` and made the live
  auditor require it.

The existing WXT/TypeScript Manifest V3 extension, isolated static demo,
proofreader print-sheet visual identity, local-first privacy model, and static
deployment class are preserved.

## Exact verification evidence

Repair commit: `c221259b28adba9bcf7ec7e684788144de9ebaf7`.

Clean clone: `/tmp/caption-cues-polish-3.zyK0Bp/repo`, created with
`git clone --no-local --no-hardlinks /work/repo`, then `npm ci` and
`npm run setup:browser`.

- Each of the 15 exact commands in `.factory/claims.json` passed separately.
- `npm run test:claims`: 15/15 claims passed.
- `npm run verify:release`: 52/52 tests, all claims, packaged extension smoke,
  service-worker update/offline test, browser/Axe route suite, and ZIP
  integrity passed.
- `npm run check:clean-browser`: passed from a newly created empty Playwright
  cache after downloading Chromium 1208.
- Final build output: 7.68 KB raw JavaScript, 15.03 KB raw CSS, 35.28 KB
  unpacked extension, and 21.97 KB Chrome ZIP.

Production deployment used the factory work-order command:

```sh
/opt/fleet/lib/deploy-static.sh caption-cues dist/site
```

Deployment ID: `3997993f-7bf0-4b4e-a9f4-b2ccc55d406e`.
The live custom domain served `Built by Param Factory · Build 1.0.3-r3` before
the cold audit began.

- `npm run verify:live` passed live `/`, `/demo/`, `/privacy/`, `/terms/`, and
  the branded 404 on phone and desktop. Every check had expected status, one
  H1/main, correct title/metadata, no horizontal overflow, zero serious or
  critical Axe findings, 44 px phone controls, and no unexpected console
  errors.
- The live demo entered through `/?demo=1&license=review-token`, wrote only
  `demo:caption-cues:settings`, preserved ordinary sentinels through reset and
  exit, replayed line 2 with Alt+R, made 32 same-origin requests, and reloaded
  offline before advancing to line 2.
- `/opt/fleet/lib/verify-url.sh` recorded a cold 200 in 684 ms with no browser
  errors, `lang=en`, one H1/main, no missing image alt text, and no unnamed
  buttons. Evidence: `.factory/evidence/polish-3-live-home/`.
- Live mobile Lighthouse: home 100 performance / 100 accessibility / 100 best
  practices / 100 SEO (LCP 1.20 s, TBT 31 ms, CLS 0); query-demo 99 / 100 /
  100 / 100 (LCP 1.22 s, TBT 132 ms, CLS 0). JSON evidence is under
  `.factory/evidence/polish-3-live-home/` and
  `.factory/evidence/polish-3-live-demo/`.

Finding-by-finding evidence is in `.factory/polish-3.md`.

## Run and verify

```sh
npm ci
npm run setup:browser
npm run verify:release
npm run verify:live
```

Use `dist/extension` with Chrome Developer mode. Deploy `dist/site` with the
factory static deployment helper. The install ZIP is
`dist/site/downloads/caption-cues-chrome.zip`.

## Known gaps and next steps

None for the accepted free release. Paid checkout remains intentionally absent
until it can be registered and covered by observable claims.

# Caption Cues v1 handoff

## Shipped

- WXT + TypeScript Manifest V3 Chrome extension with a 38 KB unpacked production bundle.
- Local caption parser with independent emphasis switches for proper names, speaker labels, bracketed sound cues, and case-insensitive user-saved words.
- Standard HTML `TextTrack` support: the selected native caption track is hidden while an accessible, high-contrast overlay is active and restored when Caption Cues is disabled.
- Conservative visible-DOM support for YouTube, Vimeo, Video.js, and explicitly accessible caption regions. Page content is written with text nodes; no caption HTML is trusted.
- `Alt+R` and popup-button replay. Timed text tracks seek to the cue start; DOM-only captions are reshown for 3.5 seconds.
- Local preference storage, immediate cross-tab setting updates, three sizes, paper/night-ink plates, and an empty/error state when no compatible caption has appeared.
- One-time $9 Supporter flow through `https://api.sociobot.in/api/v1/products/caption-cues/checkout`, with return-token capture, `sb_license:caption-cues` local storage, paste-to-restore, daily verification caching, offline reconciliation, and the cosmetic Cobalt theme. All comprehension features remain free.
- Responsive static product site, interactive rule preview, honest compatibility boundary, offline shell, privacy and terms pages, install instructions, extension ZIP, sitemap, robots file, and cache headers.
- Original proofing-press artwork generated for this product. AVIF/WebP/JPEG variants are responsive; the 1280 px WebP is 121 KB and the 640 px WebP is 29 KB.

## Build and verify

From a clean clone with Node.js 20+:

```sh
npm ci
npm run check
```

The factory build command is `npm run build:site`. It writes the deployable site to `dist/site` (with `index.html` at that root), the unpacked extension to `dist/extension`, and the install archive to `dist/site/downloads/caption-cues-chrome.zip`.

Verification completed on 2026-08-27:

- `npm run typecheck`: pass
- `npm test`: 11/11 tests pass across parser precedence, whole-word matching, rule switches, markup handling, and page semantic contracts
- `npm run build`: pass
- `npm audit`: 0 vulnerabilities after moving to WXT 0.21.4 and Sharp 0.35.4
- Factory `verify-url.sh`: pass; title/lang/main/alt/button checks pass and browser console errors: 0
- Playwright + Axe, landing page at 390 × 844: 0 violations; document width 390 px with no horizontal overflow
- Playwright + Axe, built extension popup: 0 violations
- Loaded-extension smoke test: speaker/name/sound DOM emphasis and `Alt+R` replay pass; console errors: 0
- Lighthouse mobile: Performance 100, Accessibility 100, Best Practices 100, SEO 100; FCP 0.9 s, LCP 1.4 s, TBT 0 ms, CLS 0
- Runtime budgets: site JS 5.45 KB (2.55 KB gzip), site CSS 10.26 KB (3.03 KB gzip), no webfonts, hero images under 125 KB, extension total 37.98 KB

## Known gaps

- The factory still needs to register the `caption-cues` product and return URL with the Sociobot billing service. No product ID is hardcoded; checkout and verification use the required slug routes.
- Canvas-rendered, image-burned, DRM-hidden, cross-origin isolated, and inaccessible closed-shadow captions cannot be enhanced. The UI and landing page state this boundary.
- The ZIP is suitable for loading unpacked in Chrome. Store signing/listing remains a release task.
- The stated 30% reduction in replay requests still needs a moderated 20-minute participant comparison; the product is instrument-free by design, so this is not measured silently.

## Suggested next steps

1. Register the live billing product and run a real checkout/return/refund cycle.
2. Recruit viewers for the 20-minute baseline comparison and tune the proper-name stop list from observed false positives.
3. Add site-specific adapters only when a player exposes captions through permitted DOM or text-track APIs.

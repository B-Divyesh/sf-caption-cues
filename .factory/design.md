# Caption Cues visual thesis

## Direction: a live proofreader's print sheet

Caption Cues uses a dithered/halftone print system inspired by a marked-up rehearsal script: warm uncoated paper, decisive ink, cobalt pencil marks, and a small flare of safety orange. The metaphor fits the product because it does not replace captions; it annotates the few fragments a viewer most needs to catch. Texture is confined to large decorative fields so the reading surface stays calm.

The single light treatment is intentional. A consistent opaque caption plate gives predictable contrast over every possible video, while the website resembles a physical reference card rather than adopting the viewer's OS chrome. Dark video contexts are served by the ink caption plate option in the extension, not a website theme toggle.

## Tokens

| Role | Token | Value | Use |
| --- | --- | --- | --- |
| Paper | `--paper` | `#F4EBD8` | Page field |
| Clean paper | `--paper-clean` | `#FFF9ED` | Reading surfaces |
| Ink | `--ink` | `#171612` | Primary text; 15.7:1 on paper |
| Muted ink | `--ink-muted` | `#5A554A` | Secondary text; 6.5:1 on paper |
| Cobalt | `--cobalt` | `#1546C7` | Links, focus, name/manual emphasis |
| Cobalt dark | `--cobalt-dark` | `#0C2C81` | Hover and text contrast |
| Signal | `--signal` | `#C43B12` | Sound cue label and warning mark |
| Leaf | `--leaf` | `#2E6A43` | Success states |
| Rule | `--rule` | `#B8AD96` | Dividers and inactive borders |

All body text is at least 16px. Cobalt and signal are always paired with weight, shape, or a text label, never used as the only indicator.

## Type and spacing

- Display: Georgia, Charter, `Times New Roman`, serif. Its editorial cadence makes the emphasized fragment feel deliberately proofed, not algorithmically decorated.
- Utility/body: `Arial`, `Helvetica Neue`, sans-serif. Familiar and blunt at small sizes, with no external font request.
- Scale: 14, 16, 18, 24, 40, and clamp(48–80) px. Body leading is 1.55; measure is capped at 68 characters.
- Spacing follows a 4px base: 4, 8, 12, 16, 24, 32, 48, 64, 96.
- Corners are clipped or only slightly rounded (0–8px). Hairline rules, registration crosses, and offset ink shadows replace generic floating cards.

## Interaction grammar

- Primary actions look like inked press blocks: square-edged, high-contrast, and displaced 3px on hover before returning flush on press.
- Toggles resemble proofreader marks with a cobalt fill and a visible text label.
- The current caption is the content hero. Rule chips sit within the line rather than explaining themselves in detached UI chrome.
- Every target is at least 44px. Focus is a 3px cobalt outline with a paper-colored buffer.
- The phone layout drops large decorative crop marks, stacks all comparison content, and keeps the install action in ordinary document flow so it never obscures content or safe areas.

## Motion policy

Motion lasts 160–240ms and only communicates an origin: captions lift 6px into the overlay, controls depress like a print press, and status notices fade in place. Nothing loops. Under `prefers-reduced-motion: reduce`, transforms and smooth scrolling are removed and changes are instant. The halftone texture is static and below any flashing threshold.

## Original asset plan and provenance

- `public/hero-proof-sheet.webp`: original generated editorial still life showing abstract caption strips passing through a compact proofing press, used only as metaphor on the landing page. It does not depict a real player or claim generated captions.
- Extension icon and interface glyphs: hand-authored SVG/CSS using the `CC` registration-mark motif; created in-repository, MIT with the product.
- Halftone fields: CSS radial gradients, deterministic and hand-authored.

### Prompt sheet

**Use case:** stylized-concept. **Subject:** a compact tabletop proofing press feeding layered blank caption strips, several short paper rectangles with abstract ink blocks but no letters. **World/materials:** tactile uncoated paper, imperfect screen print, halftone dots, metal registration pins. **Composition:** landscape 3:2, object on the right half with calm negative paper space on the left, slightly elevated editorial angle. **Light/lens:** soft northern studio light, crisp macro paper grain, modest depth. **Palette words:** warm newsprint, carbon black, cobalt blue, safety orange. **Negative list:** people, ears, medical devices, screens, readable text, letters, logos, watermarks, glossy 3D gradients, stock-photo polish, brands, copyrighted characters.

Generated with the factory image deployment via `/opt/fleet/lib/gen-image.sh` on 2026-08-27. The resulting image is original project artwork. Source PNG and prompt metadata live in `assets/src/`; optimized WebP ships in the site. Generated-imagery disclosure appears in the footer.

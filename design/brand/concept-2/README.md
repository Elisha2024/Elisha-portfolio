# Concept 2 — Minimal & Modern EM

This implements the user's written Concept 2 specification. No separate Concept 2 reference image was attached in the conversation or supplied as a file/URL at implementation time. Exact comparison with that image remains pending; the original lowercase lettering has been removed.

## Construction

The final symbol is original SVG path geometry, not text or a font conversion. It uses a 7-unit round stroke on an 80 × 64 construction grid. E bars share y = 12, 32, and 52, providing equal 20-unit spacing; its middle bar ends at x = 23 while the lower terminal ends at x = 27. A shared left spine keeps the E correctly oriented. The upper E stroke flows into the M diagonal. Symmetric cubic valley controls give a rounded central valley; the final shoulder has a vertical tangent into the right ending. All outer caps and joins are rounded.

Gradient coordinates use `userSpaceOnUse`, so connected paths share exactly the same colour coordinates. It is a restrained cyan #008fa8 to brand blue #0078ff gradient, with brighter cyan/blue for navy surfaces. There are no gradients in the solid blue, white, or dark monochrome variants. There is no name or text in any final logo asset.

## Three refinements reviewed

| Refinement | Legibility and balance | Small-size judgment | Selection |
| --- | --- | --- | --- |
| A — Continuous ribbon | Clear E orientation, distinct shortened middle bar, one continuous upper transition | Open counters retained at 16/24px; balanced at 32/64px | Selected |
| B — Open strokes | Airier, floating E bars | More open but less immediate E recognition in monochrome | Retained alternative |
| C — Shared bridge | Explicit second support and deeper M valley | Denser left counter and a heavier joint at 16px | Retained alternative |

These are visual design judgments, not audience research or trademark-clearance claims. `review.html` shows the variants at actual 16, 24, 32, and 64px on white/navy and in monochrome. The PNG favicon examples are shown at native resolution. `review.png` is the browser capture.

## Assets and source

- Authoritative paths and palette: `src/content/brand.json`.
- React component: `src/components/brand.tsx`.
- Header/menu system and one-time reveal: `src/styles/brand.css`.
- Export generator: `scripts/build-brand.mjs`; run `npm run brand:build` after editing geometry.
- `public/brand/em-primary.svg`: primary gradient.
- `public/brand/em-on-dark.svg`: bright gradient for navy surfaces.
- `public/brand/em-solid-blue.svg`, `em-white.svg`, `em-dark-monochrome.svg`: solid variants.
- `public/brand/em-favicon-16.svg`, `em-favicon-32.svg`: tightly cropped optical favicon versions.
- `public/favicon-16x16.png`, `favicon-32x32.png`, `icon.svg`, `apple-touch-icon.png`: browser/platform icons.
- `public/opengraph.svg` and `.png`: symbol-only 1200 × 630 social asset.

All files are local. The favicon crop removes excess whitespace without stretching the geometry. The optional header stroke reveal runs once over 420ms; reduced-motion users see the complete static mark. Footer and mobile-menu symbols are static. Header height, sticky behavior, routes, theme preference, and all professional content remain intact. Active desktop links use a short underline rather than an outlined tab; keyboard focus remains visible.

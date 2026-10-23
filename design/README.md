# Simple, premium portfolio

The reference at https://conrad-otieno-product-designer.netlify.app/#work was inspected in Chromium on 23 October 2026. Its straightforward introduction, direct project cards, comfortable spacing, and restrained navigation informed this revision. Its artwork, portrait, logo, and professional content were not copied.

## Current direction

- One introduction with name, professional positioning, work action, and resume action.
- Three project cards with full-card case-study links. No project picker, filters, preview tabs, capability switcher, or atlas.
- A brief personal note and a contact footer. Deeper professional information stays on dedicated pages.
- Four navigation links: Work, About, Resume, Contact. Engineering and Experience remain reachable from About and the footer.
- Dark navy navigation and footer, warm off-white body, legible sans-serif typography, restrained blue accents.
- The navigation now uses a standalone, custom-drawn EM ligature with no visible name. Home links retain accessible names. The same geometry is used in the footer, favicon, and social image. Previous logo concepts remain in brand/.
- Carswafi's project image is an actual capture of https://carswafi.com/, taken during this revision and converted to WebP. The other covers are original SVG illustrations; neither is presented as a product screenshot. The financial cover is a conceptual illustration, not an internal deployment diagram.
- Static, visible capabilities and experience. Architecture outlines on case studies are static.
- Motion is limited to short navigation, card, and button feedback; reduced-motion disables transforms and transitions. Native modal navigation, copy-email feedback, and real PDF viewing/downloading remain.

No additional dependencies or hosting services were introduced. Legacy explorer components and their content were removed. The main visual tokens and responsive rules live in src/app/globals.css.

The contact page now pairs direct contact information with a three-field enquiry form. Layout and validation remain accessible on small screens. FormSubmit handles forwarding; recipient email confirmation is still required before live delivery can be verified.

## Typography, mark, and submission feedback

Montserrat headings/content/CTAs and Inter navigation/form controls replace the system Arial treatment. Headings use medium/semibold weights and restrained tracking; paragraph line height remains generous. Local variable fonts and metric-adjusted fallbacks keep font delivery independent of third-party requests.

The current logo is the two-tone woven em concept (05), not the previous plain uppercase EM. Its shared junction connects an open loop and two arches. It is a standalone original drawing, inspired by the reference's simplicity and two-tone contrast rather than copying its CO rings.

A stable feedback area acknowledges sending before the provider responds, with a friendly confirmation only after acceptance. There are no artificial success delays or premature delivery claims. The live region remains outside aria-busy so assistive technology can announce pending feedback immediately.

The latest reference measurements are in typography-reference.md. The final hierarchy uses semibold 600 headings, regular 400 paragraphs, medium 500 CTAs, normal paragraph tracking, and heading tracking -0.025em. This corrects the earlier, tighter heading tracking and Inter hero paragraph.

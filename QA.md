# Validation — simplified portfolio, 23 October 2026

The current revision replaces the previous atlas/filter experience. Earlier interaction timing samples and explorer-specific tests do not apply to this version.

- ESLint: passed without warnings.
- Strict TypeScript: passed; production build also completed its TypeScript validation.
- Production static build: passed with all requested content routes exported.
- Export audit: 13 HTML files and 397 local asset/link references passed, with language, title/description metadata, and the real PDF signature checked.
- Playwright: 5 tests passed; one duplicate mobile instance of the desktop viewport matrix was intentionally skipped.
- Responsive matrix: all ten content routes checked at 320, 375, 390, 430, 768, 1024, 1440, and 1920px. All 80 combinations passed without content extending outside the viewport.
- Visual review: current mobile and desktop homepage screenshots inspected. Mobile, tablet, desktop, and dark-mobile captures retained in design/previews.
- Accessibility: axe-core reported zero violations on the homepage in light and dark themes, on all content routes in dark theme, and in the open mobile menu. Checks ran in desktop and mobile Chromium. Automated checks are not a full manual accessibility certification.
- Navigation: the work anchor, project card navigation, keyboard link activation, skip link focus, mobile menu Escape dismissal, focus return, keyboard reopening, and About navigation passed.
- Resume: actual supplied PDF served with HTTP 200 and a valid PDF signature. Browser download completed with the professional filename. The inline PDF object and external-open fallback are present; native rendering is browser-dependent.
- Copy email: success feedback and actual clipboard contents checked in both browser projects.
- Theme: switching and persistence across navigation passed.
- Reduced motion: smooth scrolling disabled as expected; animation and hover transforms are disabled in CSS.
- Browser console: no console errors or JavaScript pageerror events during the content and interaction tests.
- Assets: Carswafi uses a captured public homepage optimized to WebP; the lab and banking covers are original SVG illustrations, not fabricated screenshots. No portrait or reference-site artwork was copied.
- Content: verified resume and case-study facts retained. No new role, achievement, confidential banking implementation detail, or external profile link invented.

No public deployment, Lighthouse score, Firefox test, or Safari test is claimed. Mobile testing uses Chromium with touch/viewport emulation plus the explicit width matrix. Set the final NEXT_PUBLIC_SITE_URL before publication; without it the export remains intentionally noindex with an empty sitemap.

Navbar refinement: production build and lint passed. All 3 browser tests passed again, including desktop/mobile assertions that the header stays at viewport top after scrolling and the work heading clears the header. Decorative link/button arrows were removed; architecture flow arrows remain meaningful diagram content.

## Symbol-only identity and contact form

The navbar and footer now show an original vector EM mark without the visible name; both home links retain accessible labels. The favicon and social image use the same geometry.

Production build, strict TypeScript compilation, ESLint, and export audit passed. The expanded browser suite passed 5 tests (one duplicate matrix instance skipped). New tests cover empty fields, whitespace-only input, request contents, pending state and disabled fields, accepted responses, failed requests with message preservation, and provider activation messages. External requests were intercepted in every submission test; no real email was sent. A final focused run passed both desktop/mobile form tests after a mobile heading-spacing fix.

Desktop/mobile contact screenshots were visually reviewed and copied to design/previews/contact-desktop.png and contact-mobile.png. All route/viewport combinations continue to pass the overflow matrix.

**Live forwarding is pending recipient activation and real delivery verification.** The verified profile recipient must submit once, confirm FormSubmit's email, and submit again. No inbox-delivery claim is made. The provider dependency and privacy disclosure are documented.

## Reference typography, woven logo, and immediate feedback

Reference CSS measured at 1440px/390px: Montserrat 600 headings, Montserrat 400 hero paragraph, Montserrat 500 CTA, and Inter 400 navigation. Desktop hero is 72px/79.2px with -1.8px tracking; paragraph is 20px/32.5px. The portfolio now follows this hierarchy, with documented adaptations for longer mobile project titles. See design/typography-reference.md.

Native font metadata confirmed Montserrat supports weights 100–900. Both local variable WOFF2 files loaded successfully in Chromium (document.fonts.check returned true); both font-resource URLs were on the local site. No Google Fonts runtime request is required. License files are retained.

Production build, strict TypeScript compilation, and ESLint passed. Export audit passed 423 local references across 13 HTML files. Browser suite passed 5 tests, with one intentional duplicate matrix skip. New assertions check actual font-family declarations and 600/400/500 weights. All 80 route/viewport combinations passed. Desktop and mobile screenshots were visually reviewed and refreshed in design/previews.

The final two-tone woven em mark replaces the plain uppercase initials and is consistent across navbar, footer, favicon, and social image. Submission tests hold the network response and verify sending feedback appears before confirmation; no thank-you is shown while pending. Friendly success feedback appears only after provider acceptance. Failures preserve the message. These tests intercept all submissions and send no real email. Inbox delivery remains pending FormSubmit recipient confirmation and a real end-to-end check.

## Top-of-form success notification

Confirmed submission feedback now appears before the form heading and fields, using a brand-blue success panel, checkmark, the requested thank-you wording, and a dismiss action. Confirmation moves keyboard focus and brings the panel into view; reduced-motion users receive immediate scrolling and no entrance animation. Dismissal restores focus to the name field. Pending/error notices stay distinct and never get success styling.

Production build (including strict TypeScript) and lint passed. Both focused desktop/mobile browser tests passed, checking first-child placement, automatic visibility below the sticky header, focus, dismissal, preserved failure content, and light/dark accessibility. Success screenshots were visually reviewed and saved in design/previews/contact-success-*.png. Responses were intercepted in tests; no real email was sent.

## Reference contact view and technology-tag hover

The reference's actual Contact view was opened in Chromium and inspected on desktop and mobile. The local contact page now uses a centred introduction, equal white cards, icon-led contact information, a response-time divider, vertically stacked full-width fields, matching typography, a full-width blue submit control, and a compact footer without a repeated contact CTA. Own contact details and functional copy/LinkedIn utilities are retained.

Production build, strict TypeScript, lint, and export audit (423 references) passed. Three general navigation/accessibility/responsive tests passed in the initial full run; after adapting selectors for visible required-field markers, both focused contact-form tests passed. These include equal-card alignment, stacked fields, centred introduction, success/dismissal behavior, light/dark accessibility, and intercepted provider responses. Current desktop/mobile contact screenshots were reviewed and saved. No real email was sent.

Technology tags now have a light brand-blue fill, blue border/text, soft shadow, and a 2px hover lift. A browser check verified hover changes, dark-theme styling, no overflow at 320/390/768px, and reduced-motion disabling the lift. Tags remain static content rather than pretending to be buttons.

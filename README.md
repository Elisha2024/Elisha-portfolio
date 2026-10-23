# Elisha Awiti Matanga — Engineering Portfolio

A local, deployment-ready Next.js App Router / strict TypeScript / Tailwind portfolio. Static export, server-rendered content, minimal interactive JavaScript, Lucide icons, light/dark themes, and no backend or required secrets. No deployment has been performed.

## Run

Use Node 20.9+ and npm:

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Production:

```sh
npm run lint
npm run typecheck
npm run build
npm test
npx playwright test
```

The build writes `out/`. Playwright uses a local Python 3 HTTP server. Install Chromium with `npx playwright install chromium` if needed. Screenshots are written to `test-results/`. No Lighthouse score is claimed.

## Content and verification

- `src/content/profile.ts`: identity, education, email and verified social URLs.
- `src/content/experience.ts`: roles, dates, professional contributions.
- `src/content/projects.ts`: case studies, scope boundaries, architecture flows.
- `src/content/skills.ts`: capabilities and technologies.
- `src/lib/resume.ts`: centralized document configuration and build-time availability.

Professional facts come from the supplied task brief. The supplied Turing Machine Learning Engineer resume PDF was reviewed and copied into the documents directory. Transaction Intelligence Lab details were checked against the adjacent project's README. It is a local synthetic-data release candidate, not a deployed fraud product. Architecture flows for Carswafi and banking are explicitly illustrative. Lab authorship and contributions are supported by the supplied resume. No private source, repository URL, internal banking detail, or unverified metric is published. Kenya and remote arrangements are included where supplied; unspecified arrangements are omitted.

## Resume and contact integration

Place your verified current PDF at:

`public/documents/elisha-awiti-matanga-resume.pdf`

Rebuild. The resume page automatically enables View Resume, Download PDF, a browser PDF object, and an external-open fallback. Navigation/homepage point to that page. With no PDF, the site offers an HTML summary and an honest availability message; no missing PDF links are emitted. Do not publish a placeholder as final. The supplied real PDF is integrated; browser validation checks its delivery and download filename. Native inline rendering depends on browser PDF support.

The supplied resume email and LinkedIn are configured. Update the email, LinkedIn, and optional GitHub URLs in `profile.ts`. Email enables mailto and copy actions. Blank values render an explicit availability message and no fake links.

## Deployment

Netlify is the selected hosting target. See [deployment and easy update instructions](DEPLOYMENT.md). The site has not yet been deployed. Before sharing, set the final site origin and review the integrated professional content.

1. Push this folder as a GitHub repository (do not include `node_modules`, `.env`, `.next`, or `out`).
2. Import into Vercel, choose Next.js, and use `npm run build`. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin in project environment settings. No secret is required.
3. Deploy only after authorization. GitHub pushes to the production branch can then trigger automatic deployment.
4. Add a custom domain in Vercel, apply its DNS instructions, update `NEXT_PUBLIC_SITE_URL`, and rebuild.

Netlify / Cloudflare Pages alternative: build `npm run build`, publish directory `out`, Node 20.9+. Routes use trailing slash directories; use static hosting with index.html directory support and a 404.html fallback. No SPA rewrite is necessary.

Without a configured origin, robots disallows crawling and page metadata is noindex. With an origin, canonical URLs, the sitemap and robots sitemap URL are generated consistently. Person structured data is included. The OG SVG is the editable source asset; a generated PNG is used for broad social crawler support.

## Design and accessibility

A restrained, reference-informed portfolio: dark navigation, spacious sans-serif introduction, three direct project cards, a short personal note, and a compact contact footer. Carswafi blue #0078ff is the palette inspiration. Readable contrast variants, standalone geometric EM mark, light/dark themes, visible keyboard focus, a native mobile navigation dialog, reduced-motion support, and print styling remain.

The Carswafi project cover uses an actual capture of its public homepage, optimized to WebP. The lab and banking covers are original SVG illustrations, not product screenshots. Banking artwork is expressly illustrative. No portrait or external portfolio artwork is copied.

The homepage deliberately has no project filters, capability tabs, animated atlas, or interactive diagrams. Dedicated project pages retain a simple static architecture outline and the verified case-study details.

## Remaining publication inputs

Final domain and an optional verified GitHub URL. The supplied resume verifies the professional email, LinkedIn, experience, and project contribution scope. These are documented integration points, not fabricated content. No production deployment or Lighthouse performance score is claimed.

## Design review

- [Current design notes](design/README.md)
- [Preserved SVG identity concepts](design/brand/concepts.svg) and [selection rationale](design/brand/README.md)
- Rendered screenshots: [mobile](design/previews/mobile.png), [tablet](design/previews/tablet.png), [desktop](design/previews/desktop.png), [dark mobile](design/previews/mobile-dark.png)
- [Actual validation results](QA.md)

Work is accessible directly; no preview selection is required. Experience and engineering pages remain reachable through About and the footer. No new runtime dependencies were added.

## Contact form

The contact page has name, email, and message fields with native validation, whitespace validation, duplicate-submit prevention, a honeypot, a 10-second request timeout, and success/failure feedback. Failure preserves the message. Direct email is always available.

Messages are forwarded using [FormSubmit](https://formsubmit.co/), with its documented AJAX endpoint. It requires no site backend, API key, or paid infrastructure. The recipient is the verified profile email. Configuration lives in `src/content/contact.ts`; provider setup is documented here; the form uses a full-width submit button. Without JavaScript the form posts to the provider's standard endpoint.

**One-time activation remains necessary.** Submit the form once yourself, open the FormSubmit confirmation email sent to matangaelisha@gmail.com (check spam), and confirm it. Then submit again and verify arrival. This email confirmation cannot be completed by source changes. Automated tests intercept requests; no real test email was sent and inbox delivery has not been verified. No account was created. Provider availability and filtering apply.

Changing `profile.email` changes the recipient; the new address must be confirmed through FormSubmit. To use a different service later, update the contact adapter and configuration.

## Typography and interaction refinement

Montserrat 600 for headings, 400 for content, and 500 for CTAs; Inter 400 for navigation and form controls. Both are locally bundled Latin variable WOFF2 files (83,940 bytes combined), loaded using next/font/local with swap and adjusted fallbacks. Their open-source licenses and source URLs are retained in src/styles/fonts/. No Google Fonts access is required at build time or in the visitor browser.

The current logo is a custom path-based EM symbol, with geometry in `src/content/brand.json`, exports in `public/brand`, and alternatives retained in `design/brand/concept-2`. A soft light crosses the header mark every nine seconds; reduced-motion settings disable the effect. Submission acknowledgement appears immediately while the network request is pending. A thank-you appears only after provider acceptance; errors and activation prompts preserve the message. No live inbox delivery has been verified.

The latest typography pass follows measured reference styles: Montserrat 600 headings, Montserrat 400 content, Montserrat 500 CTAs, and Inter 400 navigation. Exact measurements and responsive adaptations are recorded in design/typography-reference.md.

Theme default: new visitors start in light mode regardless of device preference. The toggle saves the explicit light/dark choice in localStorage. Previously saved dark preferences are retained. If storage is unavailable, the page starts in light mode.

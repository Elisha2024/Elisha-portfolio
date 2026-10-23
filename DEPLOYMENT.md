# Netlify deployment and updates

This portfolio exports static files. No server, database, or site secrets are required.

## Recommended: GitHub connected to Netlify

1. Create a personal GitHub repository for this folder and push the source. The existing `.gitignore` excludes dependencies, local environment files, build output, and test artifacts. Review files before publishing.
2. In Netlify, choose **Add new project → Import an existing project** and select that repository.
3. Use the repository root as the base directory, `npm run build` as the build command, and `out` as the publish directory. `netlify.toml` supplies these settings, Node 22, and the static-export adapter setting.
4. Choose an available project name, for example `elisha-matanga` (availability is not verified). Netlify supplies its `https://<project-name>.netlify.app` address.
5. Set `NEXT_PUBLIC_SITE_URL` in Netlify environment variables to the actual HTTPS production origin, then rebuild. This enables indexing, canonical URLs, and sitemap URLs. Until an origin is configured, this portfolio deliberately emits noindex.
6. Check the deployed homepage, direct project URLs, mobile menu, light/dark themes, contact form, resume preview, and PDF download. Activate FormSubmit using the recipient's confirmation email and verify an actual message arrives.

After linking, pushes to the production branch trigger deployments. Use a pull request/deploy preview to review changes before merging. Keep the same project when updating so previously shared links remain valid.

## Manual alternative

Run `npm run build` and `npm test`, then upload the **out folder** at https://app.netlify.com/drop. Never upload the source folder or `.next`. Manual deployments do not run a build: rebuild locally for each update and upload the new `out` folder to the existing Netlify project. For SEO, set `NEXT_PUBLIC_SITE_URL` locally before rebuilding; Netlify environment settings do not change an already-built upload.

## Replace the main resume

Replace `public/documents/elisha-awiti-matanga-resume.pdf` with the approved new PDF, keeping the exact filename. Commit and push. After deployment, every View Resume and Download PDF action uses the new document. The configuration is centralized in `src/lib/resume.ts`.

The HTML resume summary is separate content: update relevant typed content files if facts or positioning change. Replacing the PDF does not rewrite the HTML.

## Tailor for a job

- Positioning, summary, and contact details: `src/content/profile.ts`.
- Project emphasis and verified contributions: `src/content/projects.ts`.
- Experience: `src/content/experience.ts`.
- Technical capabilities: `src/content/skills.ts`.

Keep the public portfolio broadly relevant. For an individual application, attach a tailored PDF directly; this avoids changing the document behind a link already sent to other recruiters. If separate public versions are needed, add explicitly named PDFs and dedicated links rather than replacing the shared resume for every application. Only the primary resume is wired up currently.

Before pushing changes: `npm run lint`, `npm run typecheck`, `npm run build`, and `npm test`. Use `npx playwright test` for UI changes. Keep professional claims accurate.

## Current connection state

No Netlify deployment has been performed from this workspace. The local Git repository targets `https://github.com/Elisha2024/Elisha-portfolio.git`. No Netlify CLI is installed. Connect this repository through your Netlify account to deploy; never put authentication tokens in source files or chat.

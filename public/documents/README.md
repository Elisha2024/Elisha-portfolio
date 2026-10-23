# Replacing the resume

1. Export the tailored resume as a PDF.
2. Replace elisha-awiti-matanga-resume.pdf in this directory, keeping that exact filename.
3. Refresh the local preview. For the hosted website, rebuild and redeploy.

The homepage, resume page, PDF viewer, and download actions use the single configuration in src/lib/resume.ts. The HTML resume summary lives in src/content/profile.ts and src/content/experience.ts; replacing the PDF does not rewrite those facts.

The current site has one shared resume: replacing it changes the version everyone sees. Keep job-specific originals outside the public directory and choose the intended public version before deployment. No resume editor or account is required.

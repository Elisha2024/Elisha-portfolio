import { existsSync } from 'node:fs';
import path from 'node:path';
export const resume = { href: '/documents/elisha-awiti-matanga-resume.pdf', filename: 'elisha-awiti-matanga-resume.pdf', available: existsSync(path.join(process.cwd(), 'public/documents/elisha-awiti-matanga-resume.pdf')) };

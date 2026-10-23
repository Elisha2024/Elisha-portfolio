import type { MetadataRoute } from 'next';
import { projects } from '@/content/projects';
import { siteUrl } from '@/lib/site';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap { return siteUrl ? ['', '/about', '/projects', '/experience', '/engineering', '/resume', '/contact', ...projects.map(p=>`/projects/${p.slug}`)].map(p=>({url:`${siteUrl}${p}/`})) : []; }

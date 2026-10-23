const configured = process.env.NEXT_PUBLIC_SITE_URL;
export const siteUrl = configured ? new URL(configured).origin : undefined;
export const pageMeta = (title: string, description: string, pathname: string) => ({ title, description, alternates: siteUrl ? { canonical: pathname } : undefined, openGraph: { title, description, type: 'website' as const, ...(siteUrl ? { url: pathname } : {}), ...(siteUrl ? { images: [{ url: '/opengraph.png', width: 1200, height: 630, alt: 'Elisha Awiti Matanga — Software Engineer' }] } : {}) } });

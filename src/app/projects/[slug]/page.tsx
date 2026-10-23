import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects } from '@/content/projects';
import { Flow, PageIntro } from '@/components/shared';
import { pageMeta } from '@/lib/site';
export const dynamicParams = false;
export function generateStaticParams() { return projects.map(p => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{slug: string}> }) { const {slug} = await params; const p = projects.find(p=>p.slug===slug); return p ? pageMeta(p.title,p.description,`/projects/${slug}/`) : {}; }
export default async function CaseStudy({params}: { params: Promise<{slug:string}> }) { const {slug} = await params; const p=projects.find(p=>p.slug===slug); if(!p) notFound(); return <article className="wrap case-study"><Link className="text-link back-link" href="/projects/">← All projects</Link><PageIntro eyebrow={p.category} title={p.title}><p>{p.description}</p></PageIntro><div className="case-meta"><span>{p.status}</span><div className="tags">{p.stack.map(t=><span key={t}>{t}</span>)}</div></div><Flow project={p}/><div className="case-sections">{p.sections.map((s,i)=><section key={s.title}><span className="eyebrow">0{i+1}</span><h2>{s.title}</h2><p>{s.text}</p></section>)}</div><Link className="button" href="/contact/">Discuss the engineering</Link></article>; }

import Link from 'next/link';
import { ArrowRight, FileText } from 'lucide-react';
import { projects, type Project } from '@/content/projects';
import { ProjectCover } from '@/components/project-cover';
import { resume } from '@/lib/resume';
export function ResumeAction() { return <Link className="button secondary" href="/resume/"><FileText size={16}/>{resume.available ? 'View resume' : 'Resume summary'}</Link>; }
export function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) { return <div className="page-intro"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1>{children && <div className="intro-copy">{children}</div>}</div>; }
export function Flow({ project }: { project: Project; compact?: boolean }) { return <div className="flow"><p className="eyebrow">{project.slug === 'transaction-intelligence-lab' ? 'TRANSACTION PIPELINE' : 'ILLUSTRATIVE RESPONSIBILITY MAP'}</p><ol className="flow-steps">{project.flow.map((step, i) => <li key={step}><span>0{i + 1}</span>{step}{i < project.flow.length - 1 && <ArrowRight size={16} aria-hidden="true"/>}</li>)}</ol></div>; }
export function ProjectCards({ headingLevel = 3 }: { featured?: boolean; headingLevel?: 2 | 3 }) { const Heading = headingLevel === 2 ? 'h2' : 'h3'; return <div className="project-grid">{projects.map(project => <article className="project-card" key={project.slug}><ProjectCover slug={project.slug}/><div className="project-card-copy"><p className="project-category">{project.category}</p><Heading><Link className="project-card-link" href={`/projects/${project.slug}/`}>{project.title}</Link></Heading><p>{project.description}</p><span className="project-status">{project.status}</span></div></article>)}</div>; }

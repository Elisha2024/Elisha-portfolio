import { PageIntro, ProjectCards } from '@/components/shared';
import { pageMeta } from '@/lib/site';
export const metadata = pageMeta('Selected work', 'Engineering case studies across financial integrations, operational systems, and applied machine learning.', '/projects/');
export default function Projects() { return <div className="wrap"><PageIntro eyebrow="SELECTED WORK / SYSTEMS IN PRACTICE" title="The decisions behind the systems."><p>Project depth over a long list of tools. Explore context, architecture, reliability, and the boundaries of what each system demonstrates.</p></PageIntro><ProjectCards featured headingLevel={2}/></div>; }

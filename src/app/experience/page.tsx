import { PageIntro } from '@/components/shared';
import { ExperienceTimeline } from '@/components/experience-timeline';
import { pageMeta } from '@/lib/site';
export const metadata=pageMeta('Experience','Professional experience in backend engineering, software delivery, and technology operations.','/experience/');
export default function Experience(){return <div className="wrap"><PageIntro eyebrow="EXPERIENCE / A PROFESSIONAL TIMELINE" title="Depth built through delivery."><p>Approximately seven years across engineering, technical delivery, and technology operations. Concurrent roles are shown with their supplied dates; operations experience is identified separately.</p></PageIntro><ExperienceTimeline/></div>}

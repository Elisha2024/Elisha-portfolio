import Link from 'next/link';
import { ProjectCards, ResumeAction } from '@/components/shared';
import { profile } from '@/content/profile';
import { pageMeta } from '@/lib/site';
export const metadata = pageMeta('Software Engineer · Backend Systems & Applied AI', profile.summary, '/');
export default function Home() {
  return <>
    <section className="hero wrap">
      <p className="hero-name">Hi, I’m Elisha Awiti Matanga.</p>
      <h1>Software engineer.<br/><span>Systems thinker.</span></h1>
      <p className="hero-description">I build reliable backend systems and bring applied intelligence to real-world problems. My work spans financial technology, service platforms, and data-intensive software.</p>
      <div className="hero-cta"><a className="button" href="#work">View my work </a><ResumeAction/></div>
      <p className="hero-location">Based in Nairobi, Kenya <span>·</span> Backend systems & applied AI/ML</p>
    </section>
    <section className="selected-work" id="work"><div className="wrap"><div className="section-heading"><p className="eyebrow">SELECTED WORK</p><h2>A few things I’ve worked on.</h2></div><ProjectCards/></div></section>
    <section className="wrap home-about"><h2>Good engineering<br/>starts with understanding.</h2><div><p>My experience connects software development, technical delivery, and technology operations. I’m also pursuing an MSc in Data Science at the University of Nairobi.</p><Link className="text-link" href="/about/">A little more about me </Link></div></section>
  </>;
}

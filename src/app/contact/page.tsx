import { BriefcaseBusiness, Mail, MapPin, Linkedin } from 'lucide-react';
import { CopyEmail } from '@/components/controls';
import { ContactForm } from '@/components/contact-form';
import { profile } from '@/content/profile';
import { contact } from '@/content/contact';
import { pageMeta } from '@/lib/site';
export const metadata = pageMeta('Contact', 'Connect with Elisha Awiti Matanga about backend engineering and applied AI/ML opportunities.', '/contact/');
export default function Contact() {
  return <div className="wrap contact-page">
    <section className="contact-intro"><h1>Let’s Work Together</h1><p>Have a project in mind? I’d love to help bring your ideas to life.</p></section>
    <div className="contact-layout">
      <aside className="contact-details">
        <h2>Get In Touch</h2>
        <dl className="contact-info-list">
          <div><dt><span className="contact-detail-icon" aria-hidden="true"><Mail size={19} strokeWidth={1.5}/></span>Email</dt><dd><a href={`mailto:${profile.email}`}>{profile.email}</a></dd></div>
          <div><dt><span className="contact-detail-icon" aria-hidden="true"><MapPin size={20} strokeWidth={1.5}/></span>Location</dt><dd>{contact.details.location}</dd></div>
          <div><dt><span className="contact-detail-icon" aria-hidden="true"><BriefcaseBusiness size={19} strokeWidth={1.5}/></span>Available for</dt><dd>{contact.details.availability}</dd></div>
          <div className="contact-response"><dt>Response Time</dt><dd>{contact.details.responseTime}</dd></div>
        </dl>
        <div className="contact-card-actions"><CopyEmail email={profile.email} compact/>{profile.linkedin && <a className="icon-button" href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" title="LinkedIn"><Linkedin size={19}/></a>}</div>
      </aside>
      <ContactForm/>
    </div>
  </div>;
}

'use client';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Check, Send, Info, X } from 'lucide-react';
import { contact } from '@/content/contact';
export function ContactForm() {
  const [state, setState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');
  const inFlight = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!feedback || (state !== 'success' && state !== 'error')) return;
    feedbackRef.current?.focus({ preventScroll: true });
    feedbackRef.current?.scrollIntoView({ block: 'center', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }, [feedback, state]);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    const form = event.currentTarget;
    const fields = new FormData(form);
    const name = String(fields.get('name') ?? '').trim();
    const email = String(fields.get('email') ?? '').trim();
    const message = String(fields.get('message') ?? '').trim();
    if (!name || !email || !message) {
      setState('error');
      setFeedback('Please complete your name, email, and message.');
      return;
    }
    // Silently discard bot-filled honeypots; never claim delivery.
    if (String(fields.get('_honey') ?? '')) return;
    inFlight.current = true;
    setState('sending');
    setFeedback('Please keep this page open for a moment.');
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 10000);
    try {
      const response = await fetch(contact.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, message, _subject: contact.subject, _honey: '' }),
        signal: controller.signal,
      });
      const result: { success?: boolean | string; message?: string } = await response.json();
      if (/activat|confirm.*email/i.test(result.message ?? '')) {
        setState('error');
        setFeedback('This form is awaiting email confirmation. Please use the direct email link for now.');
      } else {
        if (!response.ok || (result.success !== true && result.success !== 'true')) throw new Error('Submission rejected');
        setState('success');
        setFeedback('Your message was submitted. I’ll reply to the email you provided.');
        form.reset();
      }
    } catch {
      setState('error');
      setFeedback('Submission could not be confirmed. Please try again or email me directly. Your message is still here.');
    } finally {
      window.clearTimeout(timeout);
      inFlight.current = false;
    }
  }
  return <form ref={formRef} className="contact-form" aria-labelledby="contact-form-title" action={contact.fallbackEndpoint} method="POST" onSubmit={submit}>
    <div ref={feedbackRef} className={`form-feedback form-feedback-${state}`} role="status" aria-live="polite" aria-atomic="true" tabIndex={-1}>{feedback && <div className="feedback-content" key={state}><span className="feedback-icon" aria-hidden="true">{state === 'success' ? <Check size={21} strokeWidth={2.5}/> : state === 'sending' ? <Send size={17}/> : <Info size={20}/>}</span><span className="feedback-copy"><strong>{state === 'sending' ? 'Sending your message' : state === 'success' ? 'Thanks for reaching out.' : 'Let’s get this through.'}</strong><span>{feedback}</span></span>{state !== 'sending' && <button className="feedback-dismiss" type="button" aria-label="Dismiss notification" onClick={() => { setFeedback(''); setState('idle'); formRef.current?.querySelector<HTMLInputElement>('#contact-name')?.focus({ preventScroll: true }); }}><X size={17} aria-hidden="true"/></button>}</div>}</div>
    <h2 id="contact-form-title">Send a Message</h2>
    <div className="form-row"><div className="form-field"><label htmlFor="contact-name">Full Name <span className="required-mark" aria-hidden="true">*</span></label><input id="contact-name" name="name" disabled={state === 'sending'} autoComplete="name" required minLength={2} maxLength={100} placeholder="Your name"/></div><div className="form-field"><label htmlFor="contact-email">Email <span className="required-mark" aria-hidden="true">*</span></label><input id="contact-email" name="email" disabled={state === 'sending'} type="email" autoComplete="email" required maxLength={254} placeholder="your.email@example.com"/></div></div>
    <div className="form-field"><label htmlFor="contact-message">Message <span className="required-mark" aria-hidden="true">*</span></label><textarea id="contact-message" name="message" disabled={state === 'sending'} rows={6} required minLength={10} maxLength={5000} placeholder="Tell me about your project..."/></div>
    <input type="hidden" name="_subject" value={contact.subject}/>
    <div hidden aria-hidden="true"><label htmlFor="contact-website">Leave this field empty</label><input id="contact-website" name="_honey" tabIndex={-1} autoComplete="off"/></div>
    <div className="form-submit-row"><button className="button" type="submit" disabled={state === 'sending'} aria-busy={state === 'sending'}><Send size={16} aria-hidden="true"/>{state === 'sending' ? 'Sending…' : 'Send Message'}</button></div>

  </form>;
}

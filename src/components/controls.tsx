'use client';
import { useState } from 'react';
import { Copy, Check, Download } from 'lucide-react';
export function CopyEmail({ email, compact = false }: { email: string; compact?: boolean }) {
  const [status, setStatus] = useState('');
  return <div className="copy-control"><button className={`${compact ? 'icon-button compact-copy' : 'button secondary'} ${status === 'Email copied' ? 'is-copied' : ''}`} aria-label={compact ? 'Copy email' : undefined} title={compact ? 'Copy email' : undefined} onClick={async () => { try { await navigator.clipboard.writeText(email); setStatus('Email copied'); } catch { setStatus('Copy unavailable. Use the email link.'); } }}>{status === 'Email copied' ? <Check size={17} aria-hidden="true"/> : <Copy size={17} aria-hidden="true"/>}{!compact && (status === 'Email copied' ? 'Email copied' : 'Copy email')}</button><span role="status" className="copy-status">{status}</span></div>;
}
export function ResumeDownloads({ href, filename }: { href: string; filename: string }) {
  const [requested, setRequested] = useState(false);
  return <div className="document-actions"><a className="button" href={href} target="_blank" rel="noopener noreferrer">View resume </a><a className="button secondary" href={href} download={filename} onClick={() => setRequested(true)}>Download PDF {requested ? <Check size={17} aria-hidden="true"/> : <Download size={17} aria-hidden="true"/>}</a><span className="document-status" role="status">{requested ? 'Download requested. Thanks for taking a closer look.' : 'PDF · Opens in your browser · No sign-in'}</span></div>;
}

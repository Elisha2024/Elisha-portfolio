'use client';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { BrandMark } from './brand';
const navigation = [['Work', '/#work'], ['About', '/about/'], ['Resume', '/resume/'], ['Contact', '/contact/']];
export function Navigation() {
  const pathname = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(min-width: 900px)');
    const closeOnDesktop = () => { if (query.matches) dialog.current?.close(); };
    query.addEventListener('change', closeOnDesktop);
    return () => query.removeEventListener('change', closeOnDesktop);
  }, []);
  function toggleTheme() {
    const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('theme', theme); } catch {}
  }
  return <div className="header-shell"><header className="header wrap">
    <Link href="/" className="brand brand-symbol" aria-label="Elisha Matanga home"><BrandMark id="header-em" reveal/></Link>
    <nav className="desktop-nav" aria-label="Main">{navigation.map(([label, href]) => <Link key={href} href={href} aria-current={(href === '/#work' ? pathname === '/' || pathname.startsWith('/projects/') : pathname.startsWith(href)) ? 'page' : undefined}>{label}</Link>)}</nav>
    <div className="header-actions"><button className="icon-button theme-toggle" aria-label="Switch color theme" onClick={toggleTheme}><Sun className="theme-sun" size={19}/><Moon className="theme-moon" size={19}/></button><button className="icon-button mobile-toggle" aria-label="Open navigation" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => { dialog.current?.showModal(); setOpen(true); }}><Menu size={23}/></button></div>
    <dialog aria-label="Navigation menu" ref={dialog} id="mobile-navigation" className="mobile-dialog" onClose={() => setOpen(false)} onClick={e => { if (e.target === e.currentTarget) dialog.current?.close(); }}>
      <div className="mobile-sheet"><div className="mobile-sheet-heading"><Link href="/" className="brand" aria-label="Elisha Matanga home" onClick={() => dialog.current?.close()}><BrandMark id="mobile-em"/></Link><button className="icon-button" aria-label="Close navigation" onClick={() => dialog.current?.close()}><X size={23}/></button></div><nav aria-label="Mobile">{navigation.map(([label, href]) => <Link key={href} href={href} aria-current={(href === '/#work' ? pathname === '/' || pathname.startsWith('/projects/') : pathname.startsWith(href)) ? 'page' : undefined} onClick={() => dialog.current?.close()}>{label}</Link>)}</nav><p className="menu-footnote">From Nairobi, with intention.</p></div>
    </dialog>
  </header></div>;
}

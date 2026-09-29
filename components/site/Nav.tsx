'use client';

import { useEffect, useState } from 'react';
import { NAV, PROFILE } from '@/lib/data';

const LinkedIn = <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.2c0-1.24-.02-2.84-1.73-2.84-1.73 0-2 1.35-2 2.75V21h-4z" /></svg>;
const GitHub = <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.3 1.9 1.3 1.1 1.9 2.9 1.3 3.6 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5z" /></svg>;
const Moon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>;

/** Sticky top navigation with scroll-aware highlighting and a theme toggle. */
export default function Nav() {
  const [active, setActive] = useState('');
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: '-40% 0px -55% 0px' });
    NAV.forEach(([id]) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    let saved: string | null = null;
    try { saved = localStorage.getItem('theme'); } catch { /* storage unavailable */ }
    if (saved) document.documentElement.setAttribute('data-theme', saved);
    setDark(saved ? saved === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches);
  }, []);

  const toggleTheme = () => {
    const next = dark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch { /* storage unavailable */ }
    setDark(!dark);
  };

  return (
    <header className="nav">
      <div className="wrap">
        <a href="#top" className="logo"><span className="mark" aria-hidden="true">a</span>{PROFILE.name}</a>
        <nav className="navlinks" aria-label="Sections">
          {NAV.map(([id, label]) => (
            <a key={id} href={'#' + id} className={active === id ? 'on' : ''} aria-current={active === id ? 'true' : undefined}>{label}</a>
          ))}
        </nav>
        <div className="nav-right">
          <a className="icon-btn hide-sm" href={PROFILE.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn">{LinkedIn}</a>
          {PROFILE.github && <a className="icon-btn hide-sm" href={PROFILE.github} target="_blank" rel="noopener" aria-label="GitHub">{GitHub}</a>}
          <button className="icon-btn" type="button" onClick={toggleTheme} aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}>{Moon}</button>
          {PROFILE.resume && <a className="btn sm hide-sm" href={PROFILE.resume} target="_blank" rel="noopener">Resume</a>}
          <a className="btn primary sm" href="#contact">Say hi</a>
        </div>
      </div>
    </header>
  );
}

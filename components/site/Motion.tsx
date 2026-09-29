'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Scroll reveal for anything marked [data-reveal]: elements fade and rise into place
 * once as they enter the viewport. Content stays fully visible without JavaScript
 * and for people who prefer reduced motion.
 */
export function RevealRoot() {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = document.documentElement;
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    // Anything already on screen is revealed immediately; the rest waits for scroll.
    els.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < innerHeight * 0.95) el.classList.add('in'); else io.observe(el);
    });
    root.classList.add('reveal-ready');
    return () => io.disconnect();
  }, []);
  return null;
}

/** Sets --mx/--my (-0.5…0.5) on its wrapper from the pointer, for gentle parallax on floating chips. */
export function Parallax({ className, children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        ref.current?.style.setProperty('--mx', (e.clientX / innerWidth - 0.5).toFixed(3));
        ref.current?.style.setProperty('--my', (e.clientY / innerHeight - 0.5).toFixed(3));
      });
    };
    addEventListener('pointermove', move, { passive: true });
    return () => { removeEventListener('pointermove', move); cancelAnimationFrame(raf); };
  }, []);
  return <div ref={ref} className={className}>{children}</div>;
}

/** Counts every number inside `text` up from zero the first time it scrolls into view. */
export function CountUp({ text }: { text: string }) {
  const ref = useRef<HTMLElement>(null);
  const [p, setP] = useState(1);
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = ref.current;
    if (!el) return;
    setP(0);
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (now: number) => {
        const k = Math.min((now - t0) / 1100, 1);
        setP(1 - Math.pow(1 - k, 3));
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const shown = text.replace(/\d+/g, (n) => String(Math.round(Number(n) * p)));
  return <b ref={ref}>{shown}</b>;
}

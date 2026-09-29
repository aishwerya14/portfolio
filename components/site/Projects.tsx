'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import { MOCKS } from '@/components/mocks/Mocks';
import { PROJECTS, WORK_FILTERS } from '@/lib/data';

export const FOCUS_PROJECT = 'focus-project';
const EXT = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>;

/** Project cards with a skill filter. Other sections can focus a card via the FOCUS_PROJECT event. */
export default function Projects() {
  const [filter, setFilter] = useState<string>('All');
  const [flash, setFlash] = useState<string | null>(null);

  useEffect(() => {
    const focus = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      setFilter('All');
      requestAnimationFrame(() => {
        document.getElementById('p-' + id)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setFlash(id);
        setTimeout(() => setFlash(null), 1800);
      });
    };
    addEventListener(FOCUS_PROJECT, focus);
    return () => removeEventListener(FOCUS_PROJECT, focus);
  }, []);

  const count = (f: string) => (f === 'All' ? PROJECTS.length : PROJECTS.filter((p) => p.tags.includes(f)).length);

  return (
    <>
      <div className="wfilters" role="group" aria-label="Filter projects by skill" data-reveal="">
        {WORK_FILTERS.map((f) => (
          <button key={f} type="button" aria-pressed={filter === f} onClick={() => setFilter(f)}>
            {f}<span>{count(f)}</span>
          </button>
        ))}
      </div>
      <div className="cards">
        {PROJECTS.map((p, i) => {
          const show = filter === 'All' || p.tags.includes(filter);
          return (
            <article
              className={'pcard' + (flash === p.id ? ' flash' : '')} key={p.id} id={'p-' + p.id} hidden={!show}
              data-reveal="" style={{ '--d': `${(i % 3) * 90}ms` } as CSSProperties}
            >
              <div className="pthumb" aria-hidden="true">{MOCKS[p.id]}</div>
              <div className="pbody">
                <span className="pmeta">{p.company}</span>
                <h3>{p.title}</h3>
                <p>{p.line}</p>
                <span className="pimpact">{p.impact}</span>
                <div className="chips">{p.chips.map((c) => <span key={c} className="chip">{c}</span>)}</div>
                {p.links && (
                  <div className="live-links">
                    {p.links.map((l) => <a key={l.href} className="live-link" href={l.href} target="_blank" rel="noopener">{l.label} {EXT}</a>)}
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}

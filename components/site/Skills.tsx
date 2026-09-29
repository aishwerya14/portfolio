'use client';

import type { CSSProperties } from 'react';
import { PROJECTS, SPECIALTIES, TOOLBOX } from '@/lib/data';
import { FOCUS_PROJECT } from './Projects';
import { OPEN_DEMO } from './Playground';

type Chip = string | { label: string; to: string };

/** Specialties first (the rare, senior strengths), then the full toolbox. ▶ chips open a live demo. */
export default function Skills() {
  const open = (to: string) => {
    if (to === 'system') { document.getElementById('system')?.scrollIntoView({ behavior: 'smooth' }); return; }
    dispatchEvent(new CustomEvent(OPEN_DEMO, { detail: to }));
    document.getElementById('playground')?.scrollIntoView({ behavior: 'smooth' });
  };
  const chip = (it: Chip) => typeof it === 'string'
    ? <span className="chip" key={it}>{it}</span>
    : <button key={it.label} type="button" className="chip live" onClick={() => open(it.to)}>{it.label}</button>;

  return (
    <>
      <div className="spec">
        {SPECIALTIES.map((s, i) => (
          <div className="spec-card" key={s.title} data-reveal="" style={{ '--d': `${(i % 3) * 80}ms` } as CSSProperties}>
            <span className="spec-n">{String(i + 1).padStart(2, '0')}</span>
            <h3>{s.title}</h3>
            <p>{s.proof}</p>
            <div className="chips">{s.items.map(chip)}</div>
            <div className="seen">
              <span>Seen in</span>
              {s.seen.map((id) => (
                <button key={id} type="button" onClick={() => dispatchEvent(new CustomEvent(FOCUS_PROJECT, { detail: id }))}>
                  {PROJECTS.find((p) => p.id === id)?.title} →
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <h3 className="tb-title" data-reveal="">Full toolbox</h3>
      <div className="tgrid">
        {TOOLBOX.map((g) => (
          <div className="tgp" key={g.title} data-reveal="">
            <h4><i style={{ '--c': g.color }} />{g.title}</h4>
            <div className="chips">{g.items.map(chip)}</div>
          </div>
        ))}
      </div>
    </>
  );
}

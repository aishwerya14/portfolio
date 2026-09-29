'use client';

import { useState } from 'react';
import Stage from './Stage';

type Opt = 'split' | 'img' | 'css' | 'lazy';
const OPTS: [Opt, string, string][] = [
  ['split', 'Split code by route', 'Ship only what this page needs'],
  ['img', 'Optimize images', 'Right size, modern formats, fixed dimensions'],
  ['css', 'Inline critical CSS', 'Paint what’s above the fold first'],
  ['lazy', 'Lazy-load the rest', 'Defer what nobody can see yet'],
];
const VITALS: [string, string, Opt[]][] = [
  ['LCP', 'loading', ['img', 'css']],
  ['INP', 'responsiveness', ['split', 'lazy']],
  ['CLS', 'visual stability', ['img', 'lazy']],
];
const STATUS = [['poor', 'Poor', 92, '#E5484D'], ['mid', 'Needs work', 56, '#F5B301'], ['good', 'Good', 22, '#12B981']] as const;

/** Toggle real-world optimizations and watch Core Web Vitals respond. */
export default function PerfDemo() {
  const [on, setOn] = useState<Record<Opt, boolean>>({ split: true, img: false, css: true, lazy: false });
  const count = Object.values(on).filter(Boolean).length;
  const firstPaint = 5 - count;

  return (
    <Stage className="perfd">
      <div className="popts">
        <span className="mini-lbl">Optimizations</span>
        {OPTS.map(([k, title, sub]) => (
          <button key={k} className="popt" type="button" aria-pressed={on[k]} onClick={() => setOn((o) => ({ ...o, [k]: !o[k] }))}>
            <span className="box" /><span><b>{title}</b><small>{sub}</small></span>
          </button>
        ))}
      </div>
      <div className="vitals">
        <div className="vhd"><span className="mini-lbl">Core Web Vitals</span><span className="mini-lbl">shorter bar is better</span></div>
        {VITALS.map(([name, sub, deps]) => {
          const [cls, label, width, color] = STATUS[deps.filter((d) => on[d]).length];
          return (
            <div className="vital" key={name}>
              <div className="top"><span>{name}<small>{sub}</small></span><span className={'pill ' + cls}>{label}</span></div>
              <div className="vbar"><i style={{ width: `${width}%`, background: color }} /></div>
            </div>
          );
        })}
        <span className="mini-lbl">Page load, frame by frame</span>
        <div className="film">
          {Array.from({ length: 6 }, (_, i) => <div key={i} className={i >= firstPaint ? 'on' : ''}><i /><i /><i /></div>)}
        </div>
      </div>
    </Stage>
  );
}

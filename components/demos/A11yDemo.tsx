'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import Stage from './Stage';

const TABS = [
  ['Overview', 'Everything important is reachable with a keyboard, announced correctly, and visible when focused.'],
  ['Keyboard', 'Arrow keys move between tabs. Home and End jump to either end. The focus ring is always visible.'],
  ['Screen readers', 'Roles, names and states come from real ARIA, so assistive tech describes this exactly as you see it.'],
  ['Contrast', 'Text and controls meet WCAG 2.1 AA contrast in both the light and the dark theme.'],
];

/** A real ARIA tab list with roving tabindex, next to a simulated screen-reader log. */
export default function A11yDemo() {
  const [sel, setSel] = useState(0);
  const [log, setLog] = useState(['"Accessibility principles", tab list', '"Overview", tab, 1 of 4, selected']);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (i: number, focus: boolean) => {
    setSel(i);
    if (focus) refs.current[i]?.focus({ preventScroll: true });
    setLog((l) => [...l, `"${TABS[i][0]}", tab, ${i + 1} of ${TABS.length}, selected`].slice(-7));
  };
  const onKey = (e: KeyboardEvent, i: number) => {
    const n = TABS.length;
    const j = e.key === 'ArrowRight' ? (i + 1) % n : e.key === 'ArrowLeft' ? (i - 1 + n) % n : e.key === 'Home' ? 0 : e.key === 'End' ? n - 1 : null;
    if (j !== null) { e.preventDefault(); select(j, true); }
  };

  return (
    <Stage className="ally">
      <div className="tabsd">
        <div className="tlist" role="tablist" aria-label="Accessibility principles">
          {TABS.map(([name], i) => (
            <button
              key={name} id={`at-${i}`} ref={(el) => { refs.current[i] = el; }} role="tab" type="button"
              aria-selected={sel === i} aria-controls="at-panel" tabIndex={sel === i ? 0 : -1}
              onClick={() => select(i, false)} onKeyDown={(e) => onKey(e, i)}
            >{name}</button>
          ))}
        </div>
        <div className="tpanel" role="tabpanel" id="at-panel" aria-labelledby={`at-${sel}`} tabIndex={0}>
          <h4>{TABS[sel][0]}</h4>{TABS[sel][1]}
        </div>
      </div>
      <div className="sr" aria-hidden="true">
        <div className="h">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5 6 9H2v6h4l5 4z" /><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14" /></svg>
          Screen reader output
        </div>
        <ol>{log.map((l, i) => <li key={i + l}>{l}</li>)}</ol>
      </div>
    </Stage>
  );
}

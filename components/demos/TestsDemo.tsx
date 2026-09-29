'use client';

import { useRef, useState } from 'react';
import Stage from './Stage';

const GROUPS: [string, [string, boolean][]][] = [
  ['Jest · unit', [['formats prices for every locale', false], ['useDebounce waits before firing', false]]],
  ['Vitest · components', [['Button shows a visible focus ring', false], ['Modal traps focus and closes on Esc', false]]],
  ['Playwright · end to end', [['guest adds a gift to the registry', true], ['checkout works with only a keyboard', true]]],
];
const ALL = GROUPS.flatMap(([, tests]) => tests);
type Status = '' | 'run' | 'pass';

/** A test runner that ticks through unit, component and end-to-end suites. */
export default function TestsDemo() {
  const [status, setStatus] = useState<Status[]>(ALL.map(() => 'pass'));
  const [running, setRunning] = useState(false);
  const [e2e, setE2e] = useState<'' | 'go' | 'go ok'>('');
  const ran = useRef(false);

  const run = () => {
    if (running) return;
    ran.current = true;
    setRunning(true);
    setE2e('');
    setStatus(ALL.map(() => ''));
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let i = 0;
    const next = () => {
      if (i >= ALL.length) { setRunning(false); return; }
      const isE2e = ALL[i][1];
      setStatus((s) => s.map((x, j) => (j === i ? 'run' : x)));
      if (isE2e) setE2e('go');
      setTimeout(() => {
        setStatus((s) => s.map((x, j) => (j === i ? 'pass' : x)));
        i++;
        if (i === ALL.length) setE2e('go ok');
        next();
      }, reduce ? 40 : isE2e ? 900 : 420);
    };
    next();
  };

  const passed = status.filter((s) => s === 'pass').length;
  let idx = -1;
  return (
    <Stage className="testd">
      <div className="runner">
        <div className="rhead"><span>$ npm test</span><button type="button" onClick={run}>{running ? 'Running…' : ran.current ? 'Run again' : 'Run tests'}</button></div>
        {GROUPS.map(([group, tests]) => (
          <div key={group} style={{ display: 'contents' }}>
            <div className="tgroup">{group}</div>
            {tests.map(([name]) => { idx++; return <div key={name} className={'tl2 ' + status[idx]}><span className="st" />{name}</div>; })}
          </div>
        ))}
        <div className="rprog"><i style={{ width: `${(passed / ALL.length) * 100}%` }} /></div>
        <div className="rsum">{!running && passed === ALL.length ? `✓ ${ALL.length} passed · 0 failed` : ''}</div>
      </div>
      <div className={'e2e ' + e2e} aria-hidden="true">
        <div className="mock">
          <div className="mbar"><i /><i /><i /><span>localhost:3000</span></div>
          <div className="pg"><div className="pimg2" /><div className="ln" /><span className="addb">Add to registry</span></div>
          <svg className="ecur" viewBox="0 0 16 16"><path d="M1 1l5 14 2-6 6-2z" fill="currentColor" stroke="#fff" strokeWidth="1.2" /></svg>
          <div className="done">✓ Test passed</div>
        </div>
      </div>
    </Stage>
  );
}

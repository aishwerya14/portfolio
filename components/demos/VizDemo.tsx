'use client';

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import Stage from './Stage';

type Range = 'Weekly' | 'Monthly';
type Series = { web: number[]; mob: number[] };
const DATA: Record<Range, Series & { lab: string[] }> = {
  Weekly: {
    lab: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10', 'W11', 'W12'],
    web: [2.1, 2.4, 2.3, 2.9, 3.2, 3.0, 3.6, 3.9, 3.7, 4.3, 4.6, 5.0],
    mob: [1.2, 1.3, 1.5, 1.4, 1.8, 2.0, 2.1, 2.4, 2.6, 2.5, 2.9, 3.2],
  },
  Monthly: {
    lab: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    web: [8, 9.5, 10, 11.8, 12.4, 14, 15.2, 15.9, 17.3, 18.1, 19.6, 21],
    mob: [4, 4.4, 5.1, 5.9, 6.2, 7.5, 8.1, 8.8, 9.9, 10.4, 11.6, 12.8],
  },
};
const PAD = { L: 40, R: 14, T: 40, B: 24 };
const f1 = (v: number) => String(Math.round(v * 10) / 10);
function niceScale(max: number) {
  const raw = max / 4, p = Math.pow(10, Math.floor(Math.log10(raw))), f = raw / p;
  const step = (f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10) * p;
  return { step, top: Math.ceil(max / step - 1e-9) * step };
}

/** Interactive, keyboard-accessible SVG chart with animated range changes. */
export default function VizDemo() {
  const box = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [range, setRange] = useState<Range>('Weekly');
  const [show, setShow] = useState({ web: true, mob: true });
  const [cur, setCur] = useState<Series>({ web: DATA.Weekly.web, mob: DATA.Weekly.mob });
  const [hov, setHov] = useState(8);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setSize({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Morph between ranges.
  const morph = (to: Range) => {
    const from = cur, target = DATA[to], t0 = performance.now();
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { setCur(target); return; }
    const st = (now: number) => {
      const p = Math.min((now - t0) / 500, 1), e = 1 - Math.pow(1 - p, 3);
      setCur({ web: from.web.map((v, i) => v + (target.web[i] - v) * e), mob: from.mob.map((v, i) => v + (target.mob[i] - v) * e) });
      if (p < 1) requestAnimationFrame(st);
    };
    requestAnimationFrame(st);
  };

  const d = DATA[range], n = d.lab.length, { w: W, h: H } = size;
  const iw = W - PAD.L - PAD.R, ih = H - PAD.T - PAD.B;
  const vals = [...(show.web ? d.web : []), ...(show.mob ? d.mob : [])];
  const scale = niceScale(Math.max(...vals));
  const x = (i: number) => PAD.L + (iw * i) / (n - 1);
  const y = (v: number) => PAD.T + ih * (1 - v / scale.top);
  const path = (a: number[]) => a.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(' ');
  const ticks: number[] = [];
  for (let v = 0; v <= scale.top + 1e-9; v += scale.step) ticks.push(v);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const r = box.current!.getBoundingClientRect();
    const lx = (e.clientX - r.left) * (W / r.width);
    setHov(Math.max(0, Math.min(n - 1, Math.round(((lx - PAD.L) / iw) * (n - 1)))));
  };
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); setHov((h) => (h < 0 ? 0 : Math.min(n - 1, h + 1))); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); setHov((h) => (h < 0 ? n - 1 : Math.max(0, h - 1))); }
  };
  const toggle = (k: 'web' | 'mob') => {
    const other = k === 'web' ? 'mob' : 'web';
    if (show[k] && !show[other]) return; // keep at least one series visible
    setShow((s) => ({ ...s, [k]: !s[k] }));
  };

  const ready = W > 0 && H > 0;
  return (
    <Stage className="vizd">
      <div className="vtop">
        <div className="legend">
          <button type="button" aria-pressed={show.web} onClick={() => toggle('web')}><i style={{ background: 'var(--sel)' }} />Web</button>
          <button type="button" aria-pressed={show.mob} onClick={() => toggle('mob')}><i style={{ background: 'var(--coral)' }} />Mobile</button>
        </div>
        <div className="rt">
          <span className="mini-lbl">Active users · sample data</span>
          <div className="seg">
            {(['Weekly', 'Monthly'] as Range[]).map((r) => (
              <button key={r} type="button" aria-pressed={range === r} onClick={() => { if (r !== range) { setRange(r); morph(r); } }}>{r}</button>
            ))}
          </div>
        </div>
      </div>
      <div
        className="chartbox" ref={box} tabIndex={0} role="group"
        aria-label="Active users chart. Use the left and right arrow keys to read each point."
        onPointerMove={onMove} onPointerLeave={() => { if (document.activeElement !== box.current) setHov(-1); }}
        onKeyDown={onKey} onFocus={() => setHov((h) => (h < 0 ? 0 : h))}
      >
        {ready && (
          <svg viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
            <defs>
              <linearGradient id="vgrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" style={{ stopColor: 'var(--sel)', stopOpacity: 0.26 }} />
                <stop offset="1" style={{ stopColor: 'var(--sel)', stopOpacity: 0 }} />
              </linearGradient>
            </defs>
            {ticks.map((v) => (
              <g key={v}>
                <line className="cgrid" x1={PAD.L} x2={W - PAD.R} y1={y(v)} y2={y(v)} />
                <text className="clab" x={PAD.L - 8} y={y(v) + 3.5} textAnchor="end">{v ? f1(v) + 'k' : '0'}</text>
              </g>
            ))}
            {d.lab.map((l, i) => (i % 2 === 0 || iw > 560) && (
              <text key={l} className="clab" x={x(i)} y={H - 6} textAnchor="middle">{l}</text>
            ))}
            {show.web && <>
              <path className="cwebA" d={`${path(cur.web)} L${x(n - 1)} ${y(0)} L${x(0)} ${y(0)} Z`} />
              <path className="cweb" d={path(cur.web)} />
            </>}
            {show.mob && <path className="cmob" d={path(cur.mob)} />}
            {hov >= 0 && <>
              <line className="cx" x1={x(hov)} x2={x(hov)} y1={PAD.T} y2={PAD.T + ih} />
              {show.web && <circle className="dotw" cx={x(hov)} cy={y(cur.web[hov])} r={5} />}
              {show.mob && <circle className="dotm" cx={x(hov)} cy={y(cur.mob[hov])} r={5} />}
            </>}
          </svg>
        )}
        {ready && hov >= 0 && (
          <div className="ctip" aria-live="polite" style={{ left: Math.min(Math.max(x(hov), 80), W - 80) }}>
            <b>{d.lab[hov]}</b>
            {show.web && `Web ${f1(d.web[hov])}k`}{show.web && show.mob && ' · '}{show.mob && `Mobile ${f1(d.mob[hov])}k`}
          </div>
        )}
      </div>
    </Stage>
  );
}

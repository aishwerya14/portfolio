'use client';

import { useEffect, useRef, useState, type PointerEvent } from 'react';
import Stage from './Stage';

const PRESETS = { Phone: 320, Tablet: 480, Desktop: Infinity } as const;
type Bp = keyof typeof PRESETS;
const bpOf = (w: number): Bp => (w > 560 ? 'Desktop' : w > 380 ? 'Tablet' : 'Phone');

/** Drag to resize a mini site; container queries reflow it from desktop to phone. */
export default function ResponsiveDemo() {
  const wrap = useRef<HTMLDivElement>(null);
  const frac = useRef(0.74);
  const drag = useRef<{ x: number; w: number } | null>(null);
  const [width, setWidth] = useState(0);

  const setW = (w: number) => {
    const max = wrap.current?.offsetWidth ?? 0;
    if (!max) return;
    const clamped = Math.max(Math.min(200, max), Math.min(max, w));
    frac.current = clamped / max;
    setWidth(clamped);
  };

  // Re-fit when the frame changes size (canvas view vs page view, window resizes).
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setWidth(Math.max(Math.min(200, el.offsetWidth), el.offsetWidth * frac.current)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const down = (e: PointerEvent<HTMLButtonElement>) => {
    drag.current = { x: e.clientX, w: width };
    e.currentTarget.setPointerCapture(e.pointerId);
    e.stopPropagation();
  };
  const move = (e: PointerEvent<HTMLButtonElement>) => {
    if (drag.current) setW(drag.current.w + (e.clientX - drag.current.x) );
  };

  const bp = bpOf(width);
  return (
    <Stage className="respd">
      <div className="rbar">
        <div className="seg" role="group" aria-label="Preview size">
          {(Object.keys(PRESETS) as Bp[]).map((k) => (
            <button key={k} type="button" aria-pressed={bp === k} onClick={() => setW(PRESETS[k])}>{k}</button>
          ))}
        </div>
        <span className="rread"><b>{Math.round(width)}px</b> · {bp}</span>
      </div>
      <div className="devwrap" ref={wrap}>
        <div className="dev" style={{ width: width || '100%' }}>
          <div className="devin">
            <div className="snav"><span className="lg">bloom</span><span className="lk"><span>Shop</span><span>Stories</span><span>Visit</span></span><span className="bgr" aria-hidden="true" /></div>
            <div className="shero"><div className="t"><b>Flowers for slow Sundays</b><i /><i /></div><div className="im" /></div>
            <div className="scards"><div /><div /><div /></div>
          </div>
          <button
            className="rhandle" type="button" aria-label="Resize preview. Use the left and right arrow keys."
            onPointerDown={down} onPointerMove={move} onPointerUp={() => { drag.current = null; }} onPointerCancel={() => { drag.current = null; }}
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft') { e.preventDefault(); setW(width - 24); }
              if (e.key === 'ArrowRight') { e.preventDefault(); setW(width + 24); }
            }}
          />
        </div>
      </div>
    </Stage>
  );
}

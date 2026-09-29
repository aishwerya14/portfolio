'use client';

import { useState } from 'react';
import Stage from './Stage';

const BRANDS = [['#6B4EFF', 'Violet'], ['#FF5C39', 'Coral'], ['#12B981', 'Green'], ['#2F9BFF', 'Blue']] as const;
const MODES = {
  Light: { bg: '#FFFFFF', fg: '#15161C', mu: '#646875', ln: '#E4E5EA' },
  Dark: { bg: '#17181D', fg: '#F2F2F5', mu: '#A4A7B1', ln: '#2E3037' },
};
type Mode = keyof typeof MODES;

/** One component, re-themed live through design tokens (CSS custom properties). */
export default function ThemeDemo() {
  const [brand, setBrand] = useState('#6B4EFF');
  const [radius, setRadius] = useState(12);
  const [space, setSpace] = useState(12);
  const [mode, setMode] = useState<Mode>('Light');
  const m = MODES[mode];

  const seg = <T extends string | number>(opts: [T, string][], val: T, set: (v: T) => void) => (
    <div className="seg">{opts.map(([v, l]) => <button key={l} type="button" aria-pressed={val === v} onClick={() => set(v)}>{l}</button>)}</div>
  );

  return (
    <Stage className="themed">
      <div className="tprev">
        <div className="kit" style={{ '--b': brand, '--r': radius + 'px', '--s': space + 'px', '--bg': m.bg, '--fg': m.fg, '--mu': m.mu, '--ln': m.ln }}>
          <div className="kh"><span className="ka">MC</span><span className="kn"><b>Mia Chen</b><span>Product designer</span></span><span className="kb">Pro</span></div>
          <p>Invited you to edit the Spring campaign board.</p>
          <div className="kp"><i /></div>
          <div className="kbtns"><span>Accept</span><span>Later</span></div>
          <div className="kt">Notify me about changes<span className="ks" /></div>
        </div>
      </div>
      <div className="tctl">
        <div className="g"><span className="mini-lbl">Brand</span>
          <div className="bsw">{BRANDS.map(([c, n]) => <button key={c} type="button" aria-label={n} aria-pressed={brand === c} style={{ background: c }} onClick={() => setBrand(c)} />)}</div>
        </div>
        <div className="g"><span className="mini-lbl">Corners</span>{seg<number>([[2, 'Sharp'], [12, 'Soft'], [22, 'Round']], radius, setRadius)}</div>
        <div className="g"><span className="mini-lbl">Density</span>{seg<number>([[8, 'Compact'], [12, 'Cozy'], [16, 'Roomy']], space, setSpace)}</div>
        <div className="g"><span className="mini-lbl">Mode</span>{seg<Mode>([['Light', 'Light'], ['Dark', 'Dark']], mode, setMode)}</div>
        <pre className="tokens">
          {'--brand:   '}<span className="v">{brand}</span>{';\n--radius:  '}<span className="v">{radius}px</span>{';\n--space:   '}<span className="v">{space}px</span>{';\n--surface: '}<span className="v">{m.bg}</span>;
        </pre>
      </div>
    </Stage>
  );
}

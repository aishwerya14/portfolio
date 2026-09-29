'use client';

import { useRef, useState } from 'react';
import Stage from './Stage';

type Tab = 'A' | 'B';
type Doc = { color: string; likes: number };
const COLORS = [['#6B4EFF', 'Violet'], ['#FF5C39', 'Coral'], ['#F5B301', 'Sun'], ['#12B981', 'Mint'], ['#111216', 'Ink']] as const;
const HEART = <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z" /></svg>;

/** Two "tabs" share one document; edits travel over a simulated WebSocket. */
export default function SyncDemo() {
  const [docs, setDocs] = useState<Record<Tab, Doc>>({ A: { color: '#6B4EFF', likes: 3 }, B: { color: '#6B4EFF', likes: 3 } });
  const [pkt, setPkt] = useState<{ dir: string; n: number } | null>(null);
  const [synced, setSynced] = useState(false);
  const wire = useRef<HTMLDivElement>(null);

  const send = (from: Tab, patch: Partial<Doc>) => {
    const to: Tab = from === 'A' ? 'B' : 'A';
    setDocs((d) => ({ ...d, [from]: { ...d[from], ...patch } }));
    const w = wire.current;
    const horizontal = !w || w.offsetWidth > w.offsetHeight;
    setPkt((p) => ({ dir: horizontal ? (from === 'A' ? 'r' : 'l') : (from === 'A' ? 'd' : 'u'), n: (p?.n ?? 0) + 1 }));
    setSynced(false);
    const delay = matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 450;
    setTimeout(() => { setDocs((d) => ({ ...d, [to]: { ...d[to], ...patch } })); setSynced(true); }, delay);
  };

  const tabWin = (t: Tab) => (
    <div className="tabwin">
      <div className="mbar"><i /><i /><i /><span>Tab {t} · /poster</span></div>
      <div className="tw-body">
        <div className="pv" style={{ '--c': docs[t].color }}>Spring poster</div>
        <div className="tw-row">
          <div className="sws" role="group" aria-label={`Poster color, tab ${t}`}>
            {COLORS.map(([c, n]) => (
              <button key={c} type="button" aria-label={n} aria-pressed={docs[t].color === c} style={{ background: c }} onClick={() => send(t, { color: c })} />
            ))}
          </div>
          <button className="like" type="button" aria-label={`Like, tab ${t}`} onClick={() => send(t, { likes: docs[t].likes + 1 })}>
            {HEART}<span>{docs[t].likes}</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <Stage className="sync">
      {tabWin('A')}
      <div className="wire" ref={wire}>
        <em>WebSocket</em>
        {pkt && <span key={pkt.n} className={'pkt ' + pkt.dir} />}
        <span className={'ok' + (synced ? ' show' : '')}>✓ synced</span>
      </div>
      {tabWin('B')}
    </Stage>
  );
}

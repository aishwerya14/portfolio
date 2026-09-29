'use client';

import { useEffect, useRef, useState } from 'react';
import Stage from './Stage';

const PROMPTS = [
  { chip: 'Tagline for a coffee shop', q: 'Write a tagline for a neighborhood coffee shop', a: 'Your morning, made slowly. Small-batch coffee roasted down the street and poured by people who remember your order.' },
  { chip: 'Summarize a release note', q: 'Summarize this release note in two sentences', a: 'Exports are faster, comments now support mentions, and dark mode follows your system setting. Nothing breaks and there is nothing you need to do.', src: ['release-notes.md', 'changelog'] },
  { chip: 'Alt text for a photo', q: 'Suggest alt text for this product photo', a: 'A matte sage-green ceramic pour-over dripper on a wooden counter beside a glass carafe, lit by soft morning light from the left.', src: ['product-photo.jpg'] },
];
type Msg = { id: number; role: 'u' | 'a'; text: string; streaming?: boolean; src?: string[] };

/** Token-by-token streaming UI with stop and regenerate (responses are pre-written). */
export default function AiStreamDemo() {
  const [msgs, setMsgs] = useState<Msg[]>([
    { id: 1, role: 'u', text: PROMPTS[0].q },
    { id: 2, role: 'a', text: PROMPTS[0].a },
  ]);
  const [status, setStatus] = useState<'Done' | 'Streaming…' | 'Stopped'>('Done');
  const timer = useRef<number | null>(null);
  const last = useRef(0);
  const nextId = useRef(3);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => { box.current?.scrollTo({ top: box.current.scrollHeight }); }, [msgs]);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const stop = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    setMsgs((m) => m.map((x) => (x.streaming ? { ...x, streaming: false } : x)));
    setStatus('Stopped');
  };

  const start = (i: number) => {
    if (timer.current) stop();
    last.current = i;
    const p = PROMPTS[i];
    const aid = nextId.current + 1;
    nextId.current += 2;
    setMsgs((m) => [...m, { id: aid - 1, role: 'u' as const, text: p.q }, { id: aid, role: 'a' as const, text: '', streaming: true }].slice(-8));
    setStatus('Streaming…');
    const words = p.a.split(' ');
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let k = 0;
    const tick = () => {
      k++;
      const done = k >= words.length;
      setMsgs((m) => m.map((x) => (x.id === aid ? { ...x, text: words.slice(0, k).join(' '), streaming: !done, src: done ? p.src : undefined } : x)));
      if (done) { timer.current = null; setStatus('Done'); }
      else timer.current = window.setTimeout(tick, reduce ? 0 : 45 + Math.random() * 85);
    };
    timer.current = window.setTimeout(tick, 60);
  };

  const streaming = status === 'Streaming…';
  return (
    <Stage className="aichat">
      <div className="prompts">
        {PROMPTS.map((p, i) => <button key={p.chip} type="button" onClick={() => start(i)}>{p.chip}</button>)}
      </div>
      <div className="msgs" ref={box} data-scroll="" aria-live="polite">
        {msgs.map((m) => (
          <div key={m.id} className={'msg ' + m.role}>
            {m.text}
            {m.streaming && <span className="caret" />}
            {m.src && <div className="srcs">{m.src.map((s) => <span key={s} className="src">{s}</span>)}</div>}
          </div>
        ))}
      </div>
      <div className="abar">
        <span>{status}</span>
        <button type="button" onClick={() => (streaming ? stop() : start(last.current))}>{streaming ? 'Stop' : 'Regenerate'}</button>
      </div>
    </Stage>
  );
}

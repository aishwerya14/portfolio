'use client';

import { useEffect, useRef, useState } from 'react';
import Stage from './Stage';

const CAP = 10;

/** Token-bucket rate limiter: bursts get a polite 429 instead of taking the API down. */
export default function RateLimitDemo() {
  const tokens = useRef(CAP);
  const [, force] = useState(0);
  const [log, setLog] = useState<boolean[]>([]);
  const [last, setLast] = useState('');
  const counts = useRef({ ok: 0, no: 0 });

  const request = () => {
    const pass = tokens.current >= 1;
    if (pass) { tokens.current -= 1; counts.current.ok++; } else counts.current.no++;
    setLog((l) => [...l, pass].slice(-72));
    setLast(pass ? '200 OK · one token spent' : '429 Too Many Requests · retry after a moment');
    force((n) => n + 1);
  };

  useEffect(() => {
    for (let k = 0; k < 14; k++) request();
    tokens.current = CAP - 3;
    const refill = window.setInterval(() => {
      if (tokens.current < CAP) { tokens.current = Math.min(CAP, tokens.current + 0.2); force((n) => n + 1); }
    }, 100);
    return () => clearInterval(refill);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const burst = () => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let n = 0;
    const f = () => { request(); if (++n < 20) setTimeout(f, reduce ? 0 : 55); };
    f();
  };

  const full = Math.floor(tokens.current + 1e-9);
  return (
    <Stage className="limd">
      <div className="bucket">
        <span className="mini-lbl">Token bucket · 10 max · refills 2/sec</span>
        <div className="tank" aria-hidden="true">
          {Array.from({ length: CAP }, (_, i) => <i key={i} className={i >= full ? 'gone' : ''} />)}
        </div>
        <p>Every request spends a token. Tokens refill steadily, so normal traffic flows and a burst gets a polite 429 instead of taking the API down.</p>
        <div className="lbtns">
          <button className="qbtn" type="button" onClick={request}>Send 1 request</button>
          <button className="qbtn warn" type="button" onClick={burst}>Burst 20 at once</button>
        </div>
      </div>
      <div className="reqs">
        <span className="mini-lbl">Incoming requests</span>
        <div className="rcount">
          <span className="ra">200 accepted · {counts.current.ok}</span>
          <span className="rr">429 limited · {counts.current.no}</span>
        </div>
        <div className="grid429">{log.map((ok, i) => <i key={i} className={ok ? 'ok' : 'no'} />)}</div>
        <div className="rlog" aria-live="polite">{last}</div>
      </div>
    </Stage>
  );
}

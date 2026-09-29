'use client';

import { useEffect, useRef, useState } from 'react';
import Stage from './Stage';

type Job = { id: number; p: number; r: number };
type Worker = { job: Job | null; up: boolean };
type State = { queue: Job[]; workers: Worker[]; done: number; retried: number; next: number };

/** A job queue with three workers; crash one and its job is retried elsewhere. */
export default function QueueDemo() {
  const [s, setS] = useState<State>({ queue: [], workers: [0, 1, 2].map(() => ({ job: null, up: true })), done: 12, retried: 1, next: 113 });
  const busy = useRef(false);

  const enqueue = (n: number) => setS((st) => {
    const jobs = Array.from({ length: n }, (_, i) => ({ id: st.next + i, p: 0, r: 0 }));
    return { ...st, queue: [...st.queue, ...jobs], next: st.next + n };
  });

  // Worker loop.
  useEffect(() => {
    const tick = window.setInterval(() => setS((st) => {
      const queue = [...st.queue];
      let done = st.done;
      const workers = st.workers.map((w) => {
        if (!w.up) return w;
        let job = w.job ?? queue.shift() ?? null;
        if (job) { job = { ...job, p: job.p + 4 + Math.random() * 7 }; if (job.p >= 100) { done++; job = null; } }
        return { ...w, job };
      });
      busy.current = queue.length > 0 || workers.some((w) => w.job);
      return { ...st, queue, workers, done };
    }), 120);
    return () => clearInterval(tick);
  }, []);

  const crash = () => {
    let crashed = -1;
    setS((st) => {
      const i = st.workers.findIndex((w) => w.up && w.job);
      const idx = i >= 0 ? i : st.workers.findIndex((w) => w.up);
      if (idx < 0) return st;
      crashed = idx;
      const w = st.workers[idx];
      const queue = w.job ? [{ ...w.job, p: 0, r: w.job.r + 1 }, ...st.queue] : st.queue;
      const workers = st.workers.map((x, j) => (j === idx ? { job: null, up: false } : x));
      return { ...st, queue, workers, retried: st.retried + (w.job ? 1 : 0) };
    });
    setTimeout(() => {
      if (crashed < 0) return;
      setS((st) => ({ ...st, workers: st.workers.map((x, j) => (j === crashed ? { ...x, up: true } : x)) }));
    }, 3200);
  };

  return (
    <Stage className="queued">
      <div className="qbar">
        <div className="qbtns">
          <button className="qbtn" type="button" onClick={() => enqueue(5)}>+ Add 5 jobs</button>
          <button className="qbtn warn" type="button" onClick={crash}>Crash a worker</button>
        </div>
        <div className="qstats">
          <span>queued <b>{s.queue.length}</b></span><span>done <b>{s.done}</b></span><span>retried <b>{s.retried}</b></span>
        </div>
      </div>
      <div className="lane">
        <span className="mini-lbl">Queue</span>
        <div className="jobs">
          {s.queue.length === 0 && <span className="mini-lbl">empty, all caught up</span>}
          {s.queue.slice(0, 8).map((j) => <span key={j.id} className={'job' + (j.r ? ' retry' : '')}>#{j.id}{j.r ? ' ↻ retry' : ''}</span>)}
          {s.queue.length > 8 && <span className="mini-lbl">+{s.queue.length - 8} more</span>}
        </div>
      </div>
      <div className="workers">
        {s.workers.map((w, i) => (
          <div key={i} className={'wk' + (w.up ? '' : ' down')}>
            <div className="wh"><span><span className="dot2" />Worker {i + 1}</span></div>
            <div className="cur">{!w.up ? 'crashed' : w.job ? `job #${w.job.id}` : 'idle'}</div>
            <div className="pb"><i style={{ width: `${w.up && w.job ? Math.min(100, w.job.p) : 0}%` }} /></div>
            <div className="state">{!w.up ? 'restarting…' : w.job ? 'processing' : 'waiting for work'}</div>
          </div>
        ))}
      </div>
    </Stage>
  );
}

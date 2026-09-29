'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type NodeId = 'client' | 'cdn' | 'api' | 'auth' | 'cache' | 'svc' | 'ai' | 'db' | 'queue' | 'work';
const NODES: Record<NodeId, [number, number, number, number, string, string]> = {
  client: [20, 215, 190, 90, 'Client', 'React · Next.js · Vue'],
  cdn: [300, 60, 190, 80, 'CDN + S3', 'static assets'],
  api: [300, 215, 190, 90, 'API layer', 'GraphQL · REST · Node'],
  auth: [300, 390, 190, 80, 'Auth', 'OAuth 2.0 · JWT'],
  cache: [590, 60, 190, 80, 'Cache', 'hot reads'],
  svc: [590, 215, 190, 90, 'Services', 'Spring Boot · Express'],
  ai: [590, 390, 190, 80, 'AI service', 'RAG · LLM APIs'],
  db: [880, 130, 200, 80, 'Databases', 'SQL · MongoDB · pgvector'],
  queue: [880, 270, 200, 70, 'Queue', 'async jobs'],
  work: [880, 390, 200, 80, 'Workers', 'Lambda → Redshift'],
};
const EDGES: [NodeId, NodeId][] = [
  ['client', 'cdn'], ['client', 'api'], ['api', 'auth'], ['api', 'svc'], ['svc', 'cache'],
  ['svc', 'db'], ['svc', 'queue'], ['queue', 'work'], ['api', 'ai'], ['ai', 'db'],
];
type Step = [NodeId, NodeId, string];
const SCENARIOS: { label: string; steps: Step[] }[] = [
  { label: 'Load a registry', steps: [
    ['client', 'api', 'Client sends one GraphQL query for the whole registry page'],
    ['api', 'auth', 'Session token is verified (JWT) before anything runs'],
    ['api', 'svc', 'Resolver calls the registry service'],
    ['svc', 'cache', 'Popular gifts come straight from the cache'],
    ['svc', 'db', 'Everything else is read from SQL and MongoDB'],
    ['svc', 'api', 'The service returns one shaped response'],
    ['api', 'client', 'UI renders fast, with nothing over-fetched'],
  ] },
  { label: 'Generate a caption', steps: [
    ['client', 'api', 'Prompt goes to the API with the user’s context'],
    ['api', 'auth', 'Session checked, usage limits applied'],
    ['api', 'ai', 'AI service builds a grounded prompt'],
    ['ai', 'db', 'Vector search in pgvector finds on-brand examples'],
    ['ai', 'api', 'The LLM response streams back token by token'],
    ['api', 'client', 'UI renders each token the moment it arrives'],
  ] },
  { label: 'Check out', steps: [
    ['client', 'cdn', 'Page shell and product images load from the CDN'],
    ['client', 'api', 'Order is submitted as a GraphQL mutation'],
    ['api', 'auth', 'User session is verified'],
    ['api', 'svc', 'Order service validates the cart and prices'],
    ['svc', 'db', 'Order is written in a single transaction'],
    ['svc', 'queue', 'Receipt and analytics jobs are queued'],
    ['queue', 'work', 'Workers send the receipt and load analytics into Redshift'],
    ['svc', 'api', 'Confirmation returns right away'],
    ['api', 'client', 'Customer sees “Order placed” instantly'],
  ] },
];

const box = (n: NodeId) => { const [x, y, w, h] = NODES[n]; return { x, y, w, h }; };
function edgePath(a: NodeId, b: NodeId) {
  const A = box(a), B = box(b);
  if (B.x > A.x + A.w) {
    const x1 = A.x + A.w, y1 = A.y + A.h / 2, x2 = B.x, y2 = B.y + B.h / 2, m = (x1 + x2) / 2;
    return `M${x1} ${y1} C${m} ${y1} ${m} ${y2} ${x2} ${y2}`;
  }
  const cx = A.x + A.w / 2, bx = B.x + B.w / 2;
  return B.y > A.y ? `M${cx} ${A.y + A.h} L${bx} ${B.y}` : `M${cx} ${A.y} L${bx} ${B.y + B.h}`;
}
const edgeIndex = (a: NodeId, b: NodeId) => {
  const i = EDGES.findIndex(([x, y]) => (x === a && y === b) || (x === b && y === a));
  return { i, rev: EDGES[i][0] !== a };
};

/** Interactive architecture walkthrough: follow a request through every layer. */
export default function SystemDesign() {
  const [sc, setSc] = useState(0);
  const [stepIdx, setStepIdx] = useState<number>(SCENARIOS[0].steps.length); // "done" at rest
  const [packet, setPacket] = useState<{ x: number; y: number } | null>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const run = useRef(0);

  const play = useCallback((s: number) => {
    const my = ++run.current;
    setSc(s);
    const steps = SCENARIOS[s].steps;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { setStepIdx(steps.length); return; }
    let i = 0;
    const next = () => {
      if (my !== run.current) return;
      if (i >= steps.length) { setPacket(null); setStepIdx(steps.length); return; }
      setStepIdx(i);
      const [a, b] = steps[i];
      const { i: ei, rev } = edgeIndex(a, b);
      const path = pathRefs.current[ei];
      if (!path) return;
      const L = path.getTotalLength(), t0 = performance.now();
      const mv = (now: number) => {
        if (my !== run.current) return;
        const p = Math.min((now - t0) / 380, 1), q = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
        const pt = path.getPointAtLength((rev ? 1 - q : q) * L);
        setPacket({ x: pt.x, y: pt.y });
        if (p < 1) requestAnimationFrame(mv); else { i++; setTimeout(next, 120); }
      };
      requestAnimationFrame(mv);
    };
    next();
  }, []);

  // Play the first walkthrough once, the first time the diagram scrolls into view.
  const boxRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { io.disconnect(); play(0); } }, { threshold: 0.45 });
    io.observe(el);
    return () => io.disconnect();
  }, [play]);

  const steps = SCENARIOS[sc].steps;
  const shown = steps.slice(0, Math.min(stepIdx + 1, steps.length));
  const onNodes = new Set<NodeId>(shown.flatMap(([a, b]) => [a, b]));
  const onEdges = new Set(shown.map(([a, b]) => edgeIndex(a, b).i));

  return (
    <div className="sysbox" data-reveal="" ref={boxRef}>
        <div className="seg scn" role="group" aria-label="Pick a request">
          {SCENARIOS.map((s, i) => (
            <button key={s.label} type="button" aria-pressed={sc === i} onClick={() => play(i)}>{s.label}</button>
          ))}
        </div>
        <div className="sys-body" data-nopan="" data-keys="">
          <div className="diag">
            <svg viewBox="0 0 1100 520" role="img" aria-label="Architecture diagram: client, CDN, API layer, auth, cache, services, AI service, databases, queue and workers">
              <defs><filter id="pkglow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="5" /></filter></defs>
              {[['CLIENT', 115], ['EDGE & API', 395], ['SERVICES', 685], ['DATA & ASYNC', 980]].map(([t, x]) => (
                <text key={t as string} className="colh" x={x} y={30} textAnchor="middle">{t}</text>
              ))}
              {EDGES.map(([a, b], i) => (
                <path key={a + b} ref={(el) => { pathRefs.current[i] = el; }} className={'eg' + (onEdges.has(i) ? ' on' : '')} d={edgePath(a, b)} />
              ))}
              {(Object.keys(NODES) as NodeId[]).map((k) => {
                const [x, y, w, h, t, s] = NODES[k];
                return (
                  <g key={k} className={'nd' + (onNodes.has(k) ? ' on' : '')}>
                    <rect x={x} y={y} width={w} height={h} rx={14} />
                    <text className="t" x={x + 18} y={y + h / 2 - 3}>{t}</text>
                    <text className="s" x={x + 18} y={y + h / 2 + 19}>{s}</text>
                  </g>
                );
              })}
              {packet && <>
                <circle className="pkh" r={15} cx={packet.x} cy={packet.y} filter="url(#pkglow)" style={{ opacity: 0.55 }} />
                <circle className="pk" r={7} cx={packet.x} cy={packet.y} style={{ opacity: 1 }} />
              </>}
            </svg>
          </div>
          <ol className="steps" aria-live="polite">
            {steps.map(([, , text], i) => (
              <li key={text} className={i < stepIdx ? 'done' : i === stepIdx ? 'now' : ''}>
                <span>{i + 1}</span><span>{text}</span>
              </li>
            ))}
          </ol>
        </div>
    </div>
  );
}

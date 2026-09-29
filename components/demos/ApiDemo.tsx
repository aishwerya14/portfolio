'use client';

import { useEffect, useState } from 'react';
import Stage from './Stage';

type QueryKey = 'registry' | 'products' | 'order';
const QUERIES: Record<QueryKey, { label: string; cache: boolean; q: string; r: string }> = {
  registry: {
    label: 'registry', cache: true,
    q: 'query Registry {\n  registry(id: "emma-noah") {\n    couple\n    items(first: 2) {\n      name\n      price\n    }\n  }\n}',
    r: '{\n  "data": {\n    "registry": {\n      "couple": "Emma & Noah",\n      "items": [\n        { "name": "Dutch oven", "price": 129 },\n        { "name": "Linen sheets", "price": 180 }\n      ]\n    }\n  }\n}',
  },
  products: {
    label: 'products', cache: true,
    q: 'query Products {\n  products(first: 3) {\n    name\n    inStock\n  }\n}',
    r: '{\n  "data": {\n    "products": [\n      { "name": "Pour-over set", "inStock": true },\n      { "name": "Stoneware mugs", "inStock": true },\n      { "name": "Glass carafe", "inStock": false }\n    ]\n  }\n}',
  },
  order: {
    label: 'placeOrder', cache: false,
    q: 'mutation PlaceOrder {\n  placeOrder(cart: "c_29") {\n    id\n    status\n  }\n}',
    r: '{\n  "data": {\n    "placeOrder": {\n      "id": "ord_8812",\n      "status": "CONFIRMED"\n    }\n  }\n}',
  },
};
type Span = [string, number, number];
type Result = { total: number; cache: 'HIT' | 'MISS' | 'BYPASS'; spans: Span[]; body: string; kind: string };

const esc = (t: string) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const highlightQuery = (t: string) =>
  esc(t).replace(/"[^"]*"/g, (m) => `<span class="s">${m}</span>`).replace(/\b(query|mutation)\b/g, '<span class="k">$1</span>');
const highlightJson = (t: string) =>
  esc(t).replace(/"([^"]+)":/g, '<span class="f">"$1"</span>:').replace(/: "([^"]*)"/g, ': <span class="s">"$1"</span>').replace(/: (\d+|true|false)/g, ': <span class="k">$1</span>');

/** Simulated GraphQL API with a per-request trace and a response cache. */
export default function ApiDemo() {
  const [sel, setSel] = useState<QueryKey>('registry');
  const [warm, setWarm] = useState<Set<QueryKey>>(new Set());
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState<Result | null>(null);

  const send = (key: QueryKey = sel, warmSet = warm) => {
    const d = QUERIES[key];
    const hit = d.cache && warmSet.has(key);
    const spans: Span[] = !d.cache
      ? [['auth', 0, 3], ['validate', 3, 4], ['db write', 7, 21], ['enqueue', 28, 2]]
      : hit ? [['auth', 0, 3], ['cache', 3, 1], ['serialize', 4, 1]]
        : [['auth', 0, 3], ['cache', 3, 1], ['db', 4, 29], ['resolve', 33, 6], ['serialize', 39, 2]];
    const total = Math.max(...spans.map(([, s, l]) => s + l)) + Math.round(Math.random() * 3);
    setLoading(true);
    const delay = matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : Math.min(650, total * 9 + 140);
    setTimeout(() => {
      setLoading(false);
      setRes({ total, cache: d.cache ? (hit ? 'HIT' : 'MISS') : 'BYPASS', spans, body: d.r, kind: d.cache ? 'query' : 'mutation' });
      if (d.cache) setWarm((w) => new Set(w).add(key));
    }, delay);
  };

  useEffect(() => { send('registry', new Set()); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Stage className="apid">
      <div className="ed">
        <div className="row">
          <div className="seg" role="group" aria-label="Pick a query">
            {(Object.keys(QUERIES) as QueryKey[]).map((k) => (
              <button key={k} type="button" aria-pressed={sel === k} onClick={() => setSel(k)}>{QUERIES[k].label}</button>
            ))}
          </div>
          <button className="send" type="button" disabled={loading} onClick={() => send()}>Send ▶</button>
        </div>
        <pre dangerouslySetInnerHTML={{ __html: highlightQuery(QUERIES[sel].q) }} />
      </div>
      <div className={'resp' + (loading ? ' loading' : '')} aria-live="polite">
        <div className="rstat">
          {res && <>
            <span className="ok2">200 OK</span>
            <span>{res.total} ms</span>
            <span className={res.cache === 'HIT' ? 'hit' : ''}>cache {res.cache}</span>
            <span>{res.kind}</span>
          </>}
        </div>
        <div className="trace">
          {res?.spans.map(([name, start, len]) => (
            <div key={name}>
              <span>{name}</span>
              <span className="tk"><i style={{ marginLeft: `${(start / 45) * 100}%`, width: `${Math.max(2.5, (len / 45) * 100)}%` }} /></span>
              <em>{len} ms</em>
            </div>
          ))}
        </div>
        <pre dangerouslySetInnerHTML={{ __html: res ? highlightJson(res.body) : '' }} />
      </div>
    </Stage>
  );
}

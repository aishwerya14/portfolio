'use client';

import { useEffect, useState, type ComponentType } from 'react';
import { DEMOS } from '@/lib/data';
import ApiDemo from '@/components/demos/ApiDemo';
import QueueDemo from '@/components/demos/QueueDemo';
import RateLimitDemo from '@/components/demos/RateLimitDemo';
import SyncDemo from '@/components/demos/SyncDemo';
import AiStreamDemo from '@/components/demos/AiStreamDemo';
import PerfDemo from '@/components/demos/PerfDemo';
import A11yDemo from '@/components/demos/A11yDemo';
import ResponsiveDemo from '@/components/demos/ResponsiveDemo';
import ThemeDemo from '@/components/demos/ThemeDemo';
import FormsDemo from '@/components/demos/FormsDemo';
import TestsDemo from '@/components/demos/TestsDemo';
import VizDemo from '@/components/demos/VizDemo';

const STAGES: Record<string, ComponentType> = {
  'd-api': ApiDemo, 'd-queue': QueueDemo, 'd-limit': RateLimitDemo, 'd-sync': SyncDemo,
  'd-ai': AiStreamDemo, 'd-perf': PerfDemo, 'd-a11y': A11yDemo, 'd-resp': ResponsiveDemo,
  'd-theme': ThemeDemo, 'd-forms': FormsDemo, 'd-tests': TestsDemo, 'd-viz': VizDemo,
};
const GROUPS: [string, string[]][] = [
  ['Backend', ['d-api', 'd-queue', 'd-limit']],
  ['Frontend & UX', ['d-sync', 'd-ai', 'd-perf', 'd-a11y', 'd-resp', 'd-theme', 'd-forms', 'd-tests', 'd-viz']],
];
export const OPEN_DEMO = 'open-demo';

/** One live demo at a time, picked from a tab list. Only the open demo is mounted. */
export default function Playground() {
  const [active, setActive] = useState('d-api');
  useEffect(() => {
    const open = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (STAGES[id]) setActive(id);
    };
    addEventListener(OPEN_DEMO, open);
    return () => removeEventListener(OPEN_DEMO, open);
  }, []);

  const d = DEMOS.find((x) => x.id === active)!;
  const Stage = STAGES[active];
  return (
    <div className="pg" data-reveal="">
      <div className="pg-tabs" role="tablist" aria-label="Demos">
        {GROUPS.map(([group, ids]) => (
          <div key={group} style={{ display: 'contents' }}>
            <span className="pg-group">{group}</span>
            {ids.map((id) => (
              <button key={id} type="button" role="tab" aria-selected={active === id} aria-controls="demo-panel" onClick={() => setActive(id)}>
                {DEMOS.find((x) => x.id === id)!.name}
              </button>
            ))}
          </div>
        ))}
      </div>
      <div className="panel" id="demo-panel" role="tabpanel" aria-label={d.name}>
        <div className="dhead">
          <div><span className="kind">{d.kind}</span><h3>{d.title}</h3></div>
          <div className="chips">{d.chips.map((c) => <span key={c} className="chip">{c}</span>)}</div>
        </div>
        <Stage key={active} />
        <div className="try"><b>Try it</b> {d.tryIt}</div>
      </div>
    </div>
  );
}

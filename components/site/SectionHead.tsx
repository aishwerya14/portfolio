import type { ReactNode } from 'react';

export default function SectionHead({ eyebrow, title, blurb }: { eyebrow: string; title: ReactNode; blurb?: ReactNode }) {
  return (
    <div className="sec-head" data-reveal="">
      <div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div>
      {blurb && <p>{blurb}</p>}
    </div>
  );
}

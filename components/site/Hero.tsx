import type { CSSProperties } from 'react';
import { FOCUS, IMPACT, PROFILE } from '@/lib/data';
import { CountUp, Parallax } from './Motion';

const S = ({ c }: { c: string }) => <span className="cs">&apos;{c}&apos;</span>;
const list = (items: string[]) => items.map((c, i) => <span key={c}>{i ? ', ' : ''}<S c={c} /></span>);

/** Code-card lines, typed in one after another on load. */
const LINES = [
  <><span className="ck">const</span> <span className="cv">aish</span> = {'{'}</>,
  <>{'  '}<span className="cp">role</span>: <S c="Senior Full-Stack Engineer" />,</>,
  <>{'  '}<span className="cp">experience</span>: <S c="6+ years" />,</>,
  <>{'  '}<span className="cp">frontend</span>: [{list(['React', 'Next.js', 'TypeScript'])}],</>,
  <>{'  '}<span className="cp">backend</span>: [{list(['Node.js', 'GraphQL', 'Spring Boot'])}],</>,
  <>{'  '}<span className="cp">data</span>: [{list(['PostgreSQL', 'MongoDB', 'Redis'])}],</>,
  <>{'  '}<span className="cp">cloud</span>: [{list(['AWS', 'Kubernetes', 'Terraform'])}],</>,
  <>{'  '}<span className="cp">ai</span>: [{list(['RAG', 'LangGraph', 'pgvector'])}],</>,
  <>{'  '}<span className="cp">quality</span>: [{list(['Playwright', 'Jest', 'CI/CD'])}],</>,
  <>{'}'};<span className="ccaret" /></>,
];

const HEADLINE = ['I', 'build', 'products', 'that', 'scale,'];

/** First screen: a senior thesis, the core stack, proof, and focus areas. */
export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap">
        <div>
          <span className="status rise" style={{ '--i': 0 } as CSSProperties}><i />Open to senior full-stack and frontend roles</span>
          <h1>
            {HEADLINE.map((w, i) => <span key={i}><span className="w" style={{ '--i': i + 1 } as CSSProperties}>{w}</span>{' '}</span>)}
            <em className="w" style={{ '--i': 6 } as CSSProperties}>front to back.</em>
          </h1>
          <p className="role rise" style={{ '--i': 7 } as CSSProperties}>{PROFILE.name} · {PROFILE.title} · 6+ years</p>
          <p className="pitch rise" style={{ '--i': 8 } as CSSProperties}>
            I design and ship full-stack product systems end to end: typed React and Next.js front ends, GraphQL and REST
            APIs on Node and Spring Boot, and the data, caching and async layers underneath. Lately that includes
            production LLM features built on RAG, streaming and agentic workflows.
          </p>
          <div className="ctas rise" style={{ '--i': 9 } as CSSProperties}>
            <a className="btn primary" href="#work">See my work</a>
            {PROFILE.resume && <a className="btn" href={PROFILE.resume} target="_blank" rel="noopener">Resume</a>}
            <a className="btn" href={PROFILE.linkedin} target="_blank" rel="noopener">LinkedIn ↗</a>
          </div>
        </div>

        <Parallax className="code-stage">
          <pre className="codecard" aria-label="Core stack: React, Next.js, TypeScript, Node.js, GraphQL, Spring Boot, PostgreSQL, MongoDB, Redis, pgvector, AWS, Docker, Kubernetes, Terraform, RAG, LangGraph, OpenAI, Claude, Playwright, Jest, CI/CD">
            {LINES.map((l, i) => <span className="cl" key={i} style={{ '--i': i } as CSSProperties}>{l}</span>)}
          </pre>
          <div className="chip-float f1" aria-hidden="true"><div className="fcard apif"><span className="t">POST /graphql</span><div className="ar2"><span className="fok">200 OK</span><span className="t">38 ms · cache hit</span></div></div></div>
          <div className="chip-float f2" aria-hidden="true"><span className="gen"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.2 6.3L20.5 10l-6.3 2.2L12 18.5l-2.2-6.3L3.5 10l6.3-1.7z" /></svg>Streaming</span></div>
          <div className="chip-float f3" aria-hidden="true"><div className="fcard lh"><span className="t">Lighthouse</span><b>95+</b></div></div>
        </Parallax>
      </div>

      <div className="wrap wrap-block">
        <div className="impact" data-reveal="">
          {IMPACT.map(([n, t]) => <div key={n}><CountUp text={n} /><span>{t}</span></div>)}
        </div>
        <div className="focus4">
          {FOCUS.map((f, i) => (
            <div className="fa" key={f.title} data-reveal="" style={{ '--d': `${i * 80}ms` } as CSSProperties}>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
              <span className="kw">{f.kw}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { PROFILE } from '@/lib/data';
import CopyEmail from './CopyEmail';

export default function Contact() {
  return (
    <div className="contactbox" data-reveal="">
      <div>
        <span className="eyebrow">Contact</span>
        <h2>Open to senior full-stack and frontend roles. <em>Say hi.</em></h2>
        <CopyEmail email={PROFILE.email} />
        <div className="links">
          <a className="btn" href={PROFILE.linkedin} target="_blank" rel="noopener">LinkedIn ↗</a>
          {PROFILE.github && <a className="btn" href={PROFILE.github} target="_blank" rel="noopener">GitHub ↗</a>}
          {PROFILE.resume && <a className="btn" href={PROFILE.resume} target="_blank" rel="noopener">Resume ↗</a>}
        </div>
      </div>
      <svg className="badge" viewBox="0 0 300 300" aria-hidden="true">
        <defs><path id="circ" d="M150,150 m-116,0 a116,116 0 1,1 232,0 a116,116 0 1,1 -232,0" /></defs>
        <circle className="ring" cx="150" cy="150" r="148" />
        <text className="bt"><textPath href="#circ" textLength="725" lengthAdjust="spacing">OPEN TO SENIOR ROLES ✦ FULL-STACK ✦ FRONTEND ✦ AI ✦ </textPath></text>
        <circle className="core" cx="150" cy="150" r="84" />
        <text className="hi" x="150" y="172" textAnchor="middle">hi!</text>
      </svg>
    </div>
  );
}

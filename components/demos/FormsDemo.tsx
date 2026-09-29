'use client';

import { useState, type FormEvent } from 'react';
import Stage from './Stage';

const slug = (v: string) => v.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 32);
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Live validation with accessible, helpful errors and a preview that updates as you type. */
export default function FormsDemo() {
  const [name, setName] = useState('Moonlight Studio');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'Editor' | 'Viewer'>('Editor');
  const [touched, setTouched] = useState(false);
  const [toast, setToast] = useState(false);

  const n = name.trim(), e = email.trim();
  const nameOk = n.length >= 3, emailOk = EMAIL.test(e);
  const showEmailErr = !emailOk && e.length > 0 && (touched || (e.includes('@') && e.length > 5));
  const initials = (n.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('') || '?').toUpperCase();

  const nameHint = !n ? ['', 'Give it a name. You can change it later.'] : !nameOk ? ['err', 'Use at least 3 characters.'] : ['ok', `✓ Your URL: ${slug(n)}.team.app`];
  const emailHint = !e ? ['', 'They’ll get an invite link.'] : showEmailErr ? ['err', 'That doesn’t look like an email address yet.'] : emailOk ? ['ok', '✓ Looks good'] : ['', 'Keep going…'];

  const submit = (ev: FormEvent) => {
    ev.preventDefault();
    if (!(nameOk && emailOk)) return;
    setToast(true);
    setTimeout(() => setToast(false), 2600);
  };

  return (
    <Stage className="formd">
      <form noValidate onSubmit={submit}>
        <div className="fld">
          <label htmlFor="f-name">Workspace name</label>
          <input id="f-name" type="text" value={name} onChange={(ev) => setName(ev.target.value)} autoComplete="off" spellCheck={false} aria-describedby="f-name-h" aria-invalid={n.length > 0 && !nameOk} />
          <span className={'hint ' + nameHint[0]} id="f-name-h">{nameHint[1]}</span>
        </div>
        <div className="fld">
          <label htmlFor="f-email">Invite a teammate</label>
          <input id="f-email" type="email" value={email} placeholder="name@company.com" onChange={(ev) => setEmail(ev.target.value)} onBlur={() => setTouched(true)} autoComplete="off" spellCheck={false} aria-describedby="f-email-h" aria-invalid={showEmailErr} />
          <span className={'hint ' + emailHint[0]} id="f-email-h">{emailHint[1]}</span>
        </div>
        <div className="fld">
          <span className="lb" id="f-role-l">Their role</span>
          <div className="seg" role="group" aria-labelledby="f-role-l">
            {(['Editor', 'Viewer'] as const).map((r) => <button key={r} type="button" aria-pressed={role === r} onClick={() => setRole(r)}>{r}</button>)}
          </div>
        </div>
        <button className="submit" type="submit" disabled={!(nameOk && emailOk)}>Create workspace</button>
      </form>
      <div className="fprev">
        <span className="mini-lbl">Live preview</span>
        <div className="wscard">
          <span className="wa">{initials}</span>
          <div><b>{n || 'Your workspace'}</b><span className="url">{(slug(n) || 'your-workspace') + '.team.app'}</span></div>
          <div className="inv"><i /><span>{emailOk ? `${e} · ${role}` : 'No invites yet'}</span></div>
        </div>
      </div>
      <div className={'toast' + (toast ? ' show' : '')} role="status" aria-live="polite">{toast ? 'Workspace created. (Demo only, nothing was sent.)' : ''}</div>
    </Stage>
  );
}

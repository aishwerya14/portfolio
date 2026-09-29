'use client';

import { useRef, useState } from 'react';

export default function CopyEmail({ email }: { email: string }) {
  const [label, setLabel] = useState('Copy email');
  const ref = useRef<HTMLSpanElement>(null);

  const selectText = () => {
    const el = ref.current;
    if (!el) return;
    const range = document.createRange();
    range.selectNodeContents(el);
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
    setLabel('Press ⌘/Ctrl C');
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setLabel('Copied!');
      setTimeout(() => setLabel('Copy email'), 1800);
    } catch {
      selectText();
    }
  };

  return (
    <div className="mailrow">
      <span className="mail" ref={ref} data-nopan="">{email}</span>
      <button className="btn primary" type="button" onClick={copy}>{label}</button>
    </div>
  );
}

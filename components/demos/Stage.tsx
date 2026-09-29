import type { ReactNode } from 'react';

/** Interactive area of a demo. Pointer and keys here belong to the demo, not the canvas. */
export default function Stage({ className, children }: { className: string; children: ReactNode }) {
  return <div className={'dstage ' + className} data-nopan="" data-keys="">{children}</div>;
}

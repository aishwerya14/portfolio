import 'react';

// Allow CSS custom properties (e.g. style={{ '--r': '-4deg' }}) in inline styles.
declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
  }
}

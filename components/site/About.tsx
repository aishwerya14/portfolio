/** Short personal intro. Replace the illustration with a photo in /public when ready. */
export default function About() {
  return (
    <div className="aboutg" data-reveal="">
      <div>
        <figure className="portrait" style={{ margin: 0 }}>
          <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Illustrated monogram" style={{ width: '100%', height: '100%', display: 'block' }}>
            <defs>
              <linearGradient id="pbg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#3A2F8F" /><stop offset=".6" stopColor="#6B4EFF" /><stop offset="1" stopColor="#FF8FB8" /></linearGradient>
            </defs>
            <rect width="400" height="500" fill="url(#pbg)" />
            <circle cx="300" cy="120" r="54" fill="#FFD84D" />
            <path d="M-20 420 C 80 330, 180 360, 260 300 S 420 260, 440 240 L 440 520 L -20 520 Z" fill="#111216" fillOpacity=".28" />
            <text x="200" y="330" textAnchor="middle" fontFamily="Instrument Serif, Georgia, serif" fontStyle="italic" fontSize="260" fill="#FFFFFF">A</text>
          </svg>
        </figure>
      </div>
      <div className="about-text">
        <p>I’ve spent 6+ years building software that has to hold up under real traffic: collaborative design canvases, high-volume retail and registry platforms, analytics dashboards, and AI features running in production.</p>
        <p>I own features end to end. I shape the API contract, model the data, build the UI, write the tests and watch it in production. I lean on system design fundamentals (caching, queues, rate limiting, clear service boundaries) and I measure outcomes with Core Web Vitals, latency and error rates, not opinions.</p>
        <p>I also raise the bar around me: I’ve led technical design reviews, driven a testing strategy adopted across six teams, and mentored engineers in React and TypeScript.</p>
        <div className="notes">
          <div className="sticky">Fast is a feature.</div>
          <div className="sticky pink">Boring backends are the best backends.</div>
          <div className="sticky mint">AI should feel like a teammate, not a popup.</div>
        </div>
      </div>
    </div>
  );
}

import Nav from '@/components/site/Nav';
import Hero from '@/components/site/Hero';
import SectionHead from '@/components/site/SectionHead';
import Projects from '@/components/site/Projects';
import Playground from '@/components/site/Playground';
import SystemDesign from '@/components/site/SystemDesign';
import Skills from '@/components/site/Skills';
import About from '@/components/site/About';
import Contact from '@/components/site/Contact';
import { PROFILE } from '@/lib/data';
import { RevealRoot } from '@/components/site/Motion';

export default function Home() {
  return (
    <>
      <RevealRoot />
      <Nav />
      <main>
        <Hero />

        <section className="sec" id="work">
          <div className="wrap">
            <SectionHead eyebrow="Work" title={<>Selected <em>work</em></>} blurb="From real-time collaboration and AI features to e-commerce at scale. Live links where they exist." />
            <Projects />
          </div>
        </section>

        <section className="sec" id="playground">
          <div className="wrap">
            <SectionHead eyebrow="Playground" title={<>Skills you can <em>click</em></>} blurb="Twelve live demos, backend and frontend. Pick one and try it." />
            <Playground />
          </div>
        </section>

        <section className="sec" id="system">
          <div className="wrap">
            <SectionHead eyebrow="System design" title={<>How I build, <em>front to back</em></>} blurb="Pick a request and follow it through the stack: UI, APIs, auth, cache, services, data, queues and AI." />
            <SystemDesign />
          </div>
        </section>

        <section className="sec" id="skills">
          <div className="wrap">
            <SectionHead eyebrow="Skills" title={<>Where I go <em>deep</em></>} blurb="Specialties first, then the full toolbox. Skills marked ▶ open a live demo." />
            <Skills />
          </div>
        </section>

        <section className="sec" id="about">
          <div className="wrap">
            <SectionHead eyebrow="About" title={<>From the pixel to the <em>database</em></>} />
            <About />
          </div>
        </section>

        <section className="sec" id="contact">
          <div className="wrap"><Contact /></div>
        </section>
      </main>
      <footer className="foot">
        <div className="wrap"><span>© 2026 {PROFILE.name}</span><span>Built with Next.js, React and TypeScript</span></div>
      </footer>
    </>
  );
}

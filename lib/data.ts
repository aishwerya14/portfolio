/** All portfolio content lives here. Edit this file to update the site. */

export const PROFILE = {
  name: 'Aishwerya',
  short: 'Aish',
  title: 'Senior Full-Stack Engineer',
  email: 'aishwerya7@gmail.com',
  linkedin: 'https://linkedin.com/in/aishwerya',
  /** Add your GitHub profile URL to show a GitHub button. */
  github: '',
  /** Put your resume PDF in /public (e.g. public/resume.pdf) and set '/resume.pdf' here to show a Resume button. */
  resume: '',
};

export const NAV = [
  ['work', 'Work'], ['playground', 'Playground'], ['system', 'System design'],
  ['skills', 'Skills'], ['about', 'About'], ['contact', 'Contact'],
] as const;

export const IMPACT = [
  ['40–60×', 'faster app load after I redesigned the architecture'],
  ['60s → 95+', 'Lighthouse performance score on customer-facing pages'],
  ['+40%', 'automated test coverage across 6 product teams'],
  ['35%', 'less manual content creation with AI features I shipped'],
] as const;

/** Senior focus areas shown under the hero: what I own, and the tools I do it with. */
export const FOCUS = [
  { title: 'System design & APIs', text: 'Service boundaries, GraphQL and REST contracts, caching, rate limiting and async queues for high-traffic apps.', kw: 'Node.js · GraphQL · Spring Boot · Microservices' },
  { title: 'Frontend architecture', text: 'Typed React at scale: component libraries, micro-frontends, real-time state sync and accessible UI.', kw: 'React · Next.js · TypeScript · WebSockets' },
  { title: 'Performance & quality', text: 'Core Web Vitals, code splitting and SSR, plus test strategy and CI/CD that whole teams adopt.', kw: 'Lighthouse · Playwright · Jest · CI/CD' },
  { title: 'AI engineering', text: 'Production LLM features: RAG pipelines, vector search, streaming responses and agentic workflows.', kw: 'OpenAI · Claude API · LangGraph · pgvector' },
] as const;

export type Project = {
  id: string; company: string; title: string; line: string; impact: string;
  chips: string[]; tags: string[]; links?: { label: string; href: string }[];
};

/** Filters shown above the project grid. Each project lists the tags it matches. */
export const WORK_FILTERS = ['All', 'React', 'Vue', 'Next.js', 'Node.js', 'GraphQL', 'AI', 'Real-time', 'E-commerce', 'Dashboards'] as const;

export const PROJECTS: Project[] = [
  { id: 'express', company: 'Adobe', title: 'Express Canvas', line: 'Real-time canvas editing in Adobe Express, where several people edit the same design at once.', impact: 'Page load cut from 20s to 5s · +40% test coverage across 6 teams',
    chips: ['React', 'TypeScript', 'WebSockets', 'CRDTs (Yjs)', 'Web Workers', 'Storybook', 'Playwright', 'OpenTelemetry'], tags: ['React', 'Real-time', 'Node.js'] },
  { id: 'ai', company: 'Adobe', title: 'Generative AI in the editor', line: 'AI content generation that streams into the UI and is grounded in each brand’s own content (RAG).', impact: '35% less manual content creation for users',
    chips: ['OpenAI', 'Claude API', 'Vercel AI SDK', 'RAG', 'PostgreSQL + pgvector', 'Tool calling', 'Zod structured outputs', 'LLM evals & guardrails'], tags: ['AI', 'React', 'Node.js'] },
  { id: 'registry', company: 'Macy’s & Bloomingdale’s', title: 'Wedding Registry', line: 'Create, find and shop wedding registries online or in store. I built full-stack purchasing and subscription flows.', impact: '30% faster page interactions · 40% lower read latency',
    chips: ['React', 'Next.js', 'TanStack Query', 'GraphQL', 'Apollo Federation', 'Redis', 'MongoDB', 'Module Federation'], tags: ['React', 'Next.js', 'GraphQL', 'Node.js', 'E-commerce'],
    links: [{ label: 'macys.com', href: 'https://www.macys.com/registry/wedding' }] },
  { id: 'a11y', company: 'Keywordio', title: 'Accessible analytics', line: 'Analytics dashboards rebuilt to WCAG 2.1 AA: semantic HTML, ARIA and full keyboard support.', impact: '90% fewer accessibility violations',
    chips: ['React', 'Next.js', 'Redux', 'MobX', 'ARIA', 'WCAG 2.1', 'Jest', 'Cypress'], tags: ['React', 'Next.js', 'Dashboards'] },
  { id: 'vuely', company: 'Iron Network', title: 'Vuely', line: 'Vue.js admin template that product teams license and build on, with a built-in store and search.', impact: '7 dashboards · 100+ screens · 12 languages with RTL',
    chips: ['Vue.js', 'Vuetify', 'Vuex', 'vue-i18n', 'Auth0', 'Algolia search', 'ECharts'], tags: ['Vue', 'Dashboards', 'E-commerce'],
    links: [{ label: 'Live demo', href: 'https://vuely.theironnetwork.org/' }] },
  { id: 'adminify', company: 'Iron Network', title: 'Adminify', line: 'Vue.js admin theme for internal tools, with CRM and crypto dashboards.', impact: 'Live theme customizer · 10 languages · social sign-in',
    chips: ['Vue.js', 'BootstrapVue', 'Vuex', 'vue-i18n', 'OAuth social login', 'ECharts'], tags: ['Vue', 'Dashboards'],
    links: [{ label: 'Live demo', href: 'https://adminify.theironnetwork.org/' }] },
  { id: 'embryo-react', company: 'Iron Network', title: 'Embryo · React', line: 'Complete React e-commerce store on Firebase, from catalog to checkout, with an admin panel.', impact: 'Lazy-loaded nested routes · multi-currency · Firebase auth',
    chips: ['React', 'Redux', 'Redux Thunk', 'Material UI', 'Firebase', 'Code splitting'], tags: ['React', 'E-commerce'],
    links: [{ label: 'Live demo', href: 'https://embryo-react.theironnetwork.org/' }] },
  { id: 'embryo-vue', company: 'Iron Network', title: 'Embryo · Vue', line: 'The same store in Vue, with an admin panel for reports, invoices and products.', impact: 'Order history, saved cards · 5 languages · RTL',
    chips: ['Vue.js', 'Vuetify', 'Vuex', 'vue-i18n', 'Firebase'], tags: ['Vue', 'E-commerce', 'Dashboards'],
    links: [{ label: 'Live demo', href: 'https://embryo-vue.theironnetwork.org/' }] },
  { id: 'reactify', company: 'Iron Network', title: 'Reactify', line: 'React and Redux admin template with a Laravel API: CRM, SaaS and e-commerce dashboards plus mail, chat and calendar apps.', impact: '300+ UI elements · 5 dashboards · RTL and translations',
    chips: ['React', 'Redux-Saga', 'Redux Thunk', 'Material UI', 'Bootstrap 4', 'Laravel API', 'Auth0', 'Algolia search'], tags: ['React', 'Dashboards', 'E-commerce'],
    links: [{ label: 'Live demo', href: 'https://reactify.theironnetwork.org/' }] },
];

export type DemoMeta = { id: string; name: string; kind: string; title: string; chips: string[]; tryIt: string };

export const DEMOS: DemoMeta[] = [
  { id: 'd-api', name: 'API playground', kind: 'Backend · APIs', title: 'A GraphQL API, traced', chips: ['GraphQL', 'Node.js', 'Caching'], tryIt: 'pick a query and send it twice to see the cache kick in' },
  { id: 'd-queue', name: 'Queues & workers', kind: 'Backend · Async', title: 'Jobs that never get lost', chips: ['Message queues', 'Async workers', 'Fault tolerance'], tryIt: 'add jobs, then crash a worker mid-job' },
  { id: 'd-limit', name: 'Rate limiting', kind: 'Backend · Resilience', title: 'APIs that stay up', chips: ['Rate limiting', 'REST APIs', 'Resilience'], tryIt: 'burst 20 requests at once' },
  { id: 'd-sync', name: 'Real-time sync', kind: 'Real-time', title: 'Two tabs, one state', chips: ['WebSockets', 'React Hooks', 'State sync'], tryIt: 'pick a color or tap the heart in either tab' },
  { id: 'd-ai', name: 'AI streaming', kind: 'AI on the frontend', title: 'Streaming, not spinning', chips: ['OpenAI SDK', 'Claude API', 'Streaming UI'], tryIt: 'pick a prompt, then stop it mid-sentence (responses are simulated)' },
  { id: 'd-perf', name: 'Performance', kind: 'Performance', title: 'Fast by default', chips: ['Core Web Vitals', 'Lighthouse', 'Code splitting'], tryIt: 'switch the optimizations on and off' },
  { id: 'd-a11y', name: 'Accessibility', kind: 'Accessibility', title: 'Works with a keyboard', chips: ['WCAG 2.1', 'ARIA', 'Semantic HTML'], tryIt: 'click a tab, then use ← → Home End' },
  { id: 'd-resp', name: 'Responsive layout', kind: 'Responsive', title: 'Layouts that bend', chips: ['Responsive design', 'Adaptive layouts', 'CSS3'], tryIt: 'drag the purple handle, or pick a size' },
  { id: 'd-theme', name: 'Theming', kind: 'Design systems', title: 'One component, any brand', chips: ['Component libraries', 'Theming', 'UI/UX'], tryIt: 'change brand, corners, density and mode' },
  { id: 'd-forms', name: 'Forms', kind: 'Forms', title: 'Forms that help', chips: ['TypeScript', 'Validation', 'Accessible errors'], tryIt: 'rename the workspace and invite someone' },
  { id: 'd-tests', name: 'Testing', kind: 'Testing', title: 'Tests that catch it first', chips: ['Jest', 'Vitest', 'Playwright'], tryIt: 'run the suite' },
  { id: 'd-viz', name: 'Data viz', kind: 'Data visualization', title: 'Charts you can read', chips: ['Data visualization', 'Dashboards', 'Keyboard access'], tryIt: 'hover or focus the chart, then use ← →' },
];

type Chip = string | { label: string; to: string };

/** The rare, senior-level strengths, shown first, each tied to the projects that prove it. */
export const SPECIALTIES: { title: string; proof: string; items: Chip[]; seen: string[] }[] = [
  { title: 'Real-time collaboration', proof: 'Multi-user canvas editing at scale', seen: ['express'],
    items: [{ label: 'WebSockets', to: 'd-sync' }, 'CRDTs (Yjs)', 'Event-driven state sync', 'Web Workers', 'Canvas API', 'Optimistic UI'] },
  { title: 'Production LLM features', proof: 'RAG and streaming shipped to real users', seen: ['ai'],
    items: [{ label: 'Streaming token UIs', to: 'd-ai' }, 'RAG pipelines', 'Vercel AI SDK', 'Tool calling', 'Structured outputs (Zod)', 'LLM evals & guardrails', 'LangGraph agents', 'MCP'] },
  { title: 'Distributed backend design', proof: 'Services built for peak load', seen: ['registry', 'ai'],
    items: [{ label: 'Rate limiting', to: 'd-limit' }, { label: 'Message queues', to: 'd-queue' }, 'Kafka', 'Redis caching', 'Apollo Federation', 'Sharding', 'Fault-tolerant design'] },
  { title: 'Frontend performance at scale', proof: '40–60× faster loads, Lighthouse 95+', seen: ['express', 'registry', 'embryo-react'],
    items: [{ label: 'Core Web Vitals', to: 'd-perf' }, 'SSR with Next.js', 'Code splitting and lazy routes', 'Web Workers', 'TanStack Query caching', 'Critical CSS'] },
  { title: 'Frontend platform & DX', proof: 'Shared foundations across teams', seen: ['express', 'registry', 'vuely', 'reactify'],
    items: [{ label: 'Component libraries', to: 'd-theme' }, 'Storybook', 'Module Federation', 'Micro-frontends', 'Nx and Turborepo', 'Tailwind CSS', 'Feature flags (LaunchDarkly)'] },
  { title: 'Quality & observability', proof: '+40% coverage across 6 teams', seen: ['express', 'a11y'],
    items: [{ label: 'Playwright E2E', to: 'd-tests' }, 'Contract testing', 'OpenTelemetry', 'Datadog', 'CI/CD with automated rollbacks'] },
];

export const TOOLBOX: { title: string; color: string; items: Chip[] }[] = [
  { title: 'Languages', color: '#6B4EFF', items: ['TypeScript', 'JavaScript (ES2023)', 'Java', 'SQL', 'PHP (Laravel APIs)', 'HTML5', 'CSS3'] },
  { title: 'Frontend', color: '#FF5C39', items: ['React 19', 'Next.js App Router', 'React Server Components', 'Vue.js', 'Angular', 'React Router', 'Web Workers', 'Module Federation'] },
  { title: 'State & data fetching', color: '#12B981', items: ['TanStack Query', 'Redux', 'Redux-Saga', 'Redux Thunk', 'MobX', 'Vuex', 'RxJS', 'Zod'] },
  { title: 'UI & design systems', color: '#2F9BFF', items: [{ label: 'Component libraries', to: 'd-theme' }, 'Storybook', 'Tailwind CSS', 'Material UI', 'Vuetify', 'BootstrapVue', { label: 'Responsive design', to: 'd-resp' }, 'i18n & RTL'] },
  { title: 'Backend & APIs', color: '#F5B301', items: [{ label: 'GraphQL', to: 'd-api' }, 'Apollo Federation', 'tRPC', 'REST', 'Node.js', 'Express', 'Spring Boot', 'Laravel APIs'] },
  { title: 'Architecture', color: '#6B4EFF', items: [{ label: 'System design', to: 'system' }, 'Microservices', 'Event-driven architecture', 'Kafka', 'Caching', 'Load balancing', 'Sharding', { label: 'Rate limiting', to: 'd-limit' }] },
  { title: 'Data & search', color: '#FF5C39', items: ['PostgreSQL', 'MongoDB', 'Redis', 'Firebase', 'pgvector', 'Pinecone', 'Redshift', 'Algolia', 'Indexing strategies'] },
  { title: 'AI engineering', color: '#12B981', items: [{ label: 'Streaming LLM responses', to: 'd-ai' }, 'OpenAI SDK', 'Claude API', 'Vercel AI SDK', 'LangChain', 'LangGraph', 'RAG', 'Tool calling', 'Structured outputs', 'LLM evals & guardrails', 'MCP', 'Embeddings & semantic search'] },
  { title: 'Real-time & collaboration', color: '#2F9BFF', items: [{ label: 'WebSockets', to: 'd-sync' }, 'CRDTs (Yjs)', 'Canvas API', 'Optimistic UI', 'Event-driven UI'] },
  { title: 'Cloud & infrastructure', color: '#F5B301', items: ['AWS (EC2, S3, Lambda, Redshift)', 'Terraform', 'Docker', 'Kubernetes', 'CI/CD (Jenkins)'] },
  { title: 'Observability', color: '#6B4EFF', items: ['OpenTelemetry', 'Datadog', 'Distributed tracing', 'Structured logging', 'Metrics-driven monitoring'] },
  { title: 'Delivery & experimentation', color: '#FF5C39', items: ['Feature flags (LaunchDarkly)', 'A/B testing', 'Nx', 'Turborepo', 'Vite', 'Webpack', 'Git'] },
  { title: 'Testing', color: '#12B981', items: [{ label: 'Playwright', to: 'd-tests' }, 'Jest', 'Vitest', 'Cypress', 'Storybook tests', 'Contract tests', 'TDD'] },
  { title: 'Security & auth', color: '#2F9BFF', items: ['OAuth 2.0 / JWT', 'Auth0', 'Firebase Auth', 'OWASP Top 10', 'Content Security Policy', 'XSS/CSRF mitigation'] },
  { title: 'Performance', color: '#F5B301', items: [{ label: 'Core Web Vitals', to: 'd-perf' }, 'Lighthouse', 'Code splitting', 'SSR', 'Image optimization'] },
  { title: 'Accessibility & data viz', color: '#6B4EFF', items: [{ label: 'WCAG 2.1 AA', to: 'd-a11y' }, 'ARIA', 'Keyboard navigation', { label: 'Interactive charts', to: 'd-viz' }, 'ECharts', 'Recharts'] },
];

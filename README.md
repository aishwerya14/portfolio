# Aishwerya · Portfolio

My full-stack portfolio: a fast, one-page site with a sticky nav (Work, Playground, System design, Skills, About, Contact), built so a recruiter gets the picture in 30 seconds and an engineer can dig into live demos.

**Built with:** Next.js 16 (App Router, static export) · React 19 · TypeScript · hand-written CSS (no UI kit)

## What's inside

| Area | What it shows |
| --- | --- |
| **Work** | Nine compact project cards: what it is, the impact, the stack, and a live link |
| **System design** | An interactive system-design walkthrough: follow a request through client, API, auth, cache, services, AI, databases, queue and workers |
| **Playground** | Twelve live demos in one tabbed panel: GraphQL API with tracing and caching, job queue with worker failover, rate limiter, real-time sync, AI streaming, Core Web Vitals, accessible tabs, responsive layout, theming, forms, testing, data viz |
| **Toolbox** | Every skill, grouped, with links to the demo that proves it |

## Run it locally

```bash
npm install
npm run dev        # http://localhost:3000
```

## Build

```bash
npm run build      # writes a static site to /out
npm start          # serves /out locally
```

## Deploy (free), pick one

**Vercel (recommended, about 2 minutes)**
1. Push this folder to a GitHub repo.
2. Go to vercel.com → *Add New Project* → import the repo → *Deploy*.
3. You get a URL like `aish-portfolio.vercel.app`. Add a custom domain in *Settings → Domains*.

**Netlify:** drag the `out/` folder onto app.netlify.com/drop after `npm run build`.

**GitHub Pages:** run `npm run build` and publish the `out/` folder.

## Project structure

```
app/
  layout.tsx          fonts, metadata
  page.tsx            the page: nav + sections
  globals.css         design tokens (light and dark) and all styles
components/
  site/               Nav, Hero, Projects, Playground, SystemDesign, Skills, About, Contact
  demos/              the twelve interactive demos, one component each
  mocks/              product thumbnails (animate on hover only)
lib/data.ts           all content: profile, projects, demos, skills
```

Set your GitHub URL and resume path in `PROFILE` inside `lib/data.ts` to show those buttons.

To edit content, start with `lib/data.ts`.

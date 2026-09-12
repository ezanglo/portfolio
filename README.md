# Portfolio Website

Personal portfolio for Ezra Anglo, built with Next.js 16 (App Router), TypeScript, and Tailwind CSS.

Content is **static TypeScript** in `content/` — there is no CMS and no database. A `git clone` plus
`npm install` is enough to run the whole site.

## Structure

```
app/
├── (site)/          The live site. Owns "/".
├── (legacy)/        The archived portfolio, at /legacy/*. noindex.
│   └── legacy/
│       ├── classic/     The original single-page portfolio
│       └── (views)/     The gallery + 7 alternate views
└── api/ai-chat/     Chat endpoint for the archived ai-chat view

content/             All site content as typed data (projects, experience, skills, site)
components/
├── ui/              shadcn/ui primitives
├── legacy/          Frozen components for the archived classic portfolio
├── views/           Shared components for the archived alternate views
└── seo/             JSON-LD and OG image rendering
lib/
├── portfolio/       Normalizes content/ into the PortfolioData shape every surface reads
├── legacy/          Compatibility shim: static content -> the shapes archived components expect
└── views/           Logic for the terminal, IDE, and ai-chat views
docs/                Planning documents (gitignored)
```

## Setup

```bash
npm install
npm run dev
```

### Environment variables

Create `.env.local`:

```bash
# Canonical origin, used for metadata, sitemap, and JSON-LD
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# Contact form (https://resend.com)
RESEND_API_KEY=your-resend-api-key

# Archived /legacy/ai-chat view only — omit and that one view degrades
OPENROUTER_API_KEY=your-openrouter-key
OPENROUTER_MODEL=your-model-id
```

None are needed to build; the site prerenders without any external service.

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm test` | Vitest |
| `npm run email:dev` | Preview the contact-form email template |

## Editing content

Everything lives in `content/`:

| File | Holds |
|---|---|
| `content/site.ts` | Name, role, bio, links, stats, portrait, CV |
| `content/projects.ts` | Projects — title, description, type, tags, links |
| `content/experience.ts` | Roles and education |
| `content/skills.ts` | Skills, grouped by category |
| `content/types.ts` | The shapes for all of the above |

Edit, commit, deploy. Assets go in `public/`.

## History

This site previously ran on Payload CMS backed by Neon Postgres, with uploads in Vercel Blob. That was
removed in favour of static content — the database held ~525 lines of text, the media collection was empty,
and the only editor is the author. The old portfolio and its seven alternate presentations are preserved
at `/legacy`.

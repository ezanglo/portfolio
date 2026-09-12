# Portfolio Website

Personal portfolio for Ezra Anglo — a one-page site positioned around senior React Native and
full-stack development, built with Next.js 16 (App Router), TypeScript, and Tailwind CSS v4.

Content is **static TypeScript** in `content/` — there is no CMS and no database. A `git clone` plus
`npm install` is enough to run the whole site.

## Structure

```
app/
├── (site)/
│   ├── layout.tsx                   Root layout: fonts, theme, header/footer, Person/WebSite JSON-LD
│   ├── page.tsx                     Homepage: Hero, About, Why Hire Me, Skills, Experience, Projects, Contact
│   ├── opengraph-image.tsx          Shared OG image (rendered via next/og)
│   ├── work/                        Project index, filterable by category
│   │   └── [slug]/                  Case studies, driven by content/case-studies.ts
│   ├── insights/                    Article index
│   │   └── [slug]/                  Article pages
│   ├── react-native-developer/      SEO landing page ("hire a React Native developer")
│   └── react-native-maintenance/    SEO landing page (existing-codebase takeover/debugging)
├── robots.ts
└── sitemap.ts

content/             All site content as typed data (site copy, projects, case studies, experience,
                     skills, services, what-i-build, FAQ, insights, nav) — see "Editing content" below
components/
├── ui/              shadcn/ui primitives, plus a few vendored Aceternity components
│                    (background-beams-with-collision, bento-grid, timeline, glowing-effect)
├── site/            Header, footer, homepage sections (components/site/sections/), and shared
│                    building blocks (project card, section heading, tech badges, contact form)
└── seo/             Person/WebSite JSON-LD and the OG image renderer
lib/
├── schemas/         Zod schemas (contact form)
├── site.ts          SITE_URL / SITE_NAME
├── rate-limit.ts    In-memory rate limiting for the contact form
├── utils.ts         `cn()` and other small helpers
└── use-reduced-motion.ts
actions/             Server actions — the contact form's send path
email/               React Email template for the contact-form notification (preview with `npm run email:dev`)
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
```

Neither is needed to build; the site prerenders without any external service.

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
| `content/site.ts` | Name, role, hero copy, links, stats, CV |
| `content/projects.ts` | All projects — title, description, categories, platform, links |
| `content/case-studies.ts` | The deeper `/work/[slug]` write-up for a subset of projects |
| `content/experience.ts` | Work history and education |
| `content/skills.ts` | Skills, grouped by category, tab-organized on the homepage |
| `content/services.ts` | Service lines shown in Why Hire Me / Contact |
| `content/what-i-build.ts` | Product categories shown alongside Projects |
| `content/faq.ts` | FAQ content (not currently rendered on the homepage) |
| `content/insights.ts` | `/insights` articles |
| `content/navigation.ts` | Homepage nav links (all `/#section` anchors) |
| `content/types.ts` | The shapes for all of the above |

Edit, commit, deploy. Assets go in `public/`.

## History

This site previously ran on Payload CMS backed by Neon Postgres, with uploads in Vercel Blob, and
served eight different presentations of the same portfolio (a classic single-page site plus seven
alternate "view" experiments — corporate, runtime, field-notes, blockwork, terminal, ide, ai-chat) at
the root URL. The CMS was removed in favor of static content — the database held ~525 lines of text,
the media collection was empty, and the only editor is the author. The old surfaces were archived at
`/legacy`, then, once the current design was confirmed final, deleted outright.

The site today is rebuilt from scratch as a single, deliberately positioned page (React Native +
full-stack, not a portfolio of alternate presentations), plus a handful of supporting routes:
project case studies (`/work`), articles (`/insights`), and two SEO landing pages
(`/react-native-developer`, `/react-native-maintenance`). `next.config.ts` 301-redirects the old
public view URLs (`/classic`, `/corporate`, …) to `/` to preserve their inbound-link value.

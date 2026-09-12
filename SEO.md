# SEO — Ezra Anglo Portfolio

Verified against the codebase on 2026-09-13 (Next.js 16.3.4, App Router, fully static, no CMS).
Every row below was checked by reading the actual file, not carried over from an older doc.

Routes: `/`, `/work`, `/work/[slug]` (4 case studies), `/insights`, `/insights/[slug]` (2 articles),
`/react-native-developer`, `/react-native-maintenance`. Plus `app/sitemap.ts`, `app/robots.ts`,
`app/(site)/opengraph-image.tsx`. Nothing else exists — see "Deliberately absent" below before
assuming something is a gap.

## Current state

| Area | Status | Where |
|---|---|---|
| Metadata API (not next-seo) | Used on every route | every `layout.tsx` / `page.tsx` |
| `metadataBase` | Set once on the root layout | [app/(site)/layout.tsx](app/(site)/layout.tsx) |
| Per-route `title` / `description` | Every route sets its own (home inherits the layout's) | `app/(site)/**/page.tsx` |
| `alternates.canonical` | Set on every route incl. both dynamic `[slug]` routes | `app/(site)/**/page.tsx` |
| `viewport` export | Separate export, correct pattern (no `themeColor` — see gaps) | [app/(site)/layout.tsx](app/(site)/layout.tsx) |
| `robots.ts` | Allows `/`, no disallow rules (no `/api` route exists to disallow) | [app/robots.ts](app/robots.ts) |
| `sitemap.ts` | Covers all static routes + every case study/article slug, each with a real per-item `lastModified` (not a single `new Date()`) | [app/sitemap.ts](app/sitemap.ts) |
| Open Graph / Twitter | `title`/`description`/`type`/`locale`/`card` set; case studies + articles set `type: "article"` | root + per-route metadata |
| OG image | One shared 1200×630 image via `next/og` `ImageResponse`, identical on every route | [app/(site)/opengraph-image.tsx](app/(site)/opengraph-image.tsx), [components/seo/og-image.tsx](components/seo/og-image.tsx) |
| JSON-LD: Person + WebSite | `@graph` rendered once in the root layout | [components/seo/person-json-ld.tsx](components/seo/person-json-ld.tsx) |
| JSON-LD: BreadcrumbList | Case studies (`/work/[slug]`) and articles (`/insights/[slug]`) | [work/[slug]/page.tsx](app/(site)/work/[slug]/page.tsx), [insights/[slug]/page.tsx](app/(site)/insights/[slug]/page.tsx) |
| JSON-LD: BlogPosting | Articles only — headline, description, datePublished, dateModified, author → `#person` | [app/(site)/insights/[slug]/page.tsx](app/(site)/insights/[slug]/page.tsx) |
| `next/image` | Used everywhere images appear (projects, about portrait, hero panel, case-study logo) | grep-verified, no bare `<img>` in content-bearing components |
| Favicon / touch icon | `app/favicon.ico`, `app/(site)/icon.png`, `app/(site)/apple-icon.png` | file convention |
| Rendering | Fully static (`force-static` on most routes, or implicit via `generateStaticParams`); `/work` is the one dynamically-rendered route (reads `searchParams` for the category filter, but its canonical stays `/work` regardless of filter — correct) | — |

## Deliberately absent — do not "fix" these without a product decision first

The site was rewritten from a CMS-backed architecture, and along the way some real content and
some old URLs were cut rather than carried forward. These aren't oversights:

- **No FAQ, no Services section/route.** `content/faq.ts` and `content/services.ts` existed as
  unused, unrendered content and were deleted outright (2026-09-13) rather than surfaced — the
  call was to keep the site to exactly what's rendered, not grow it back. If FAQ/Services content
  is wanted again, it needs to be written and reviewed as new content, not resurrected from the
  deleted files.
- **No Education entry, no `icon` field on work experience.** Same reasoning — the one CMS
  "education" row and the unused `icon`/`ExperienceIcon` field on `Experience` were dead data
  nothing rendered; removed rather than wired up. The Computer Science degree fact still exists in
  `SITE.bio`.
- **No redirects for old URLs.** `next.config.ts` previously 301'd the archived pre-rewrite
  surfaces (`/classic`, `/corporate`, `/services`, `/react-native-app-development`, etc.) to `/` or
  a homepage section. Those redirects were removed by deliberate choice (2026-09-13) — old URLs now
  404. This is a real, accepted SEO tradeoff: any link equity or indexed pages at those old URLs is
  given up rather than preserved. Don't quietly re-add redirects to "fix" this without checking
  that's actually wanted again — it was a considered decision, not an accident.

## Gaps, ranked by impact ÷ effort

### 1. No per-case-study OG image, but 3 of 4 case studies now have a real logo

Every route shares one identical OG image. `reseebo`/`opic-nightlife-app` have no logo (`logoUrl:
null`), while `finn-ai-ops` (`finn-icon.png`) and `stratos-command` (`stratos-icon.png`) do, so a
partial win is available: a per-case-study `opengraph-image.tsx` that falls back to the shared
design when `logoUrl` is `null`. Full screenshot-based cards remain blocked on real design assets
(`images: []` everywhere in `content/projects.ts`).

**Fix:** low priority until either (a) all four have logos, or (b) real screenshots exist — doing
it for 2 of 4 now would make link shares inconsistent in a more visible way than today's "all
identical" state.

### 2. No `CreativeWork`/`SoftwareApplication` JSON-LD on `/work/[slug]`

Case studies carry `BreadcrumbList` but nothing describing the project itself (name, description,
applicationCategory, operatingSystem for the mobile ones).

**Fix:** lower priority — these rich-result types are less commonly surfaced than `FAQPage`/
`BlogPosting` would have been. Optional.

### 3. No AI-crawler-specific `robots.ts` rules

The wildcard `*` group (`allow: '/'`) already permits every crawler, GPTBot/OAI-SearchBot/ClaudeBot/
PerplexityBot included — nothing is blocked today. There's just no `llms.txt` and no deliberate
stance on AI search (GEO/AEO), which matters for a hire-a-developer portfolio given how often "find
me a React Native developer" style queries now route through AI answer engines.

**Fix:** optional; see the `nextjs-seo` skill's `references/ai-search.md` before adding anything —
the risk in this category is a named bot group that forgets to repeat the wildcard's rules, since
named groups don't inherit `*` (narrowing access by accident).

### 4. No `app/manifest.ts`

Not a PWA, no ranking effect. Skip unless the site becomes installable.

## Process: keep this from going stale

The version of this doc from before the rewrite quietly rotted — it described a Payload-CMS
architecture that no longer existed. Run this checklist at the moments SEO surface actually
changes, not on a calendar:

**Adding a new case study or article:**
- [ ] Set `alternates.canonical` in its `generateMetadata`
- [ ] Set `updatedAt` (articles also `publishedAt`) — these feed `sitemap.ts` and, for articles,
      `BlogPosting` JSON-LD; bump `updatedAt` again on every future edit to that entry
- [ ] Confirm it's picked up by `app/sitemap.ts` automatically (via `CASE_STUDIES`/`ARTICLES` — a
      new content array instead of extending an existing one needs a new spread in `sitemap.ts` too)
- [ ] Case study: `BreadcrumbList` (matching the existing pattern); does it have a `logoUrl` worth
      a per-project OG image once gap #1 is addressed?
- [ ] Article: `BreadcrumbList` + `BlogPosting`, matching `app/(site)/insights/[slug]/page.tsx`

**Adding a new route:**
- [ ] `title` + `description` in metadata (object or `generateMetadata`, never both in the same segment)
- [ ] `alternates.canonical`
- [ ] Add it to `STATIC_ROUTES` (with an `updatedAt`) in `app/sitemap.ts`, or to the array it spreads from — sitemap entries are not automatic for anything outside `CASE_STUDIES`/`ARTICLES`
- [ ] Decide `force-static` vs dynamic deliberately

**Retiring a route:** this project's current convention is to let it 404 rather than add a
redirect (see "Deliberately absent" above) — remove it from `sitemap.ts` and stop linking to it.
If that convention changes, revisit this section.

**Before any deploy that touches metadata, robots, or sitemap:**
- [ ] `npx tsc --noEmit`, `npm run lint`, `npm run build` — the only automated checks available here (per project convention: no browser/e2e verification is run by the agent; see below)
- [ ] Re-read this file's gap list — if a gap was closed, delete its entry; if a new one was introduced, add it

**Quarterly (or after a design/content pass touches multiple pages at once):**
- [ ] Re-run the full audit this doc is built from: read every route's metadata export, `robots.ts`, `sitemap.ts`, and every `*-json-ld.tsx` component directly from source
- [ ] Check Search Console for new "Discovered/Crawled – currently not indexed" pages or coverage drops

## What to verify yourself after deploying

Per project convention, none of this was verified with a browser, dev server, or curl — `npx tsc
--noEmit`, `npm run lint`, `npm run build`, and `npx knip` (dead-code check) are the checks
available here. To confirm by hand:

- **Social preview**: paste `/`, `/work/reseebo`, and `/insights/<a-slug>` into the
  [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) or
  [Twitter Card Validator](https://cards-dev.twitter.com/validator) — all three should show the one
  shared OG image today, and distinct per-page images once gap #1 is addressed.
- **Rich Results Test**: run `/`, a `/work/[slug]` URL, and an `/insights/[slug]` URL through
  Google's [Rich Results Test](https://search.google.com/test/rich-results) — expect `Person`/
  `WebSite` on every page, `BreadcrumbList` on case studies and articles, and `BlogPosting` on
  articles.
- **`robots.txt` / `sitemap.xml`**: load `/robots.txt` and `/sitemap.xml` directly, confirm every
  case study and article slug is present with a sensible `lastmod`.
- **Old URLs now 404**: hit `/classic`, `/services`, `/react-native-app-development` — these should
  404, not redirect (redirects were removed 2026-09-13; see "Deliberately absent"). If any of these
  still shows meaningful Search Console traffic post-deploy, that's a signal to reconsider, not a bug.
- **Bot-rendered metadata**: `curl -A "Googlebot" https://ezraanglo.com/ | grep -E '<title>|canonical'`
  — confirms what a crawler actually receives, not just what the browser shows.
- **Search Console**: resubmit `/sitemap.xml` after any structural change and request re-indexing
  for affected URLs.

# SEO — Ezra Anglo Portfolio

Current state of the site's SEO surface, as a reference for what's implemented and what isn't.
The site is Next.js 16 (App Router), fully static (`force-static` / static generation throughout,
no CMS), with six routes: `/`, `/work`, `/work/[slug]`, `/insights`, `/insights/[slug]`,
`/react-native-developer`, `/react-native-maintenance`.

> This replaces an earlier version of this doc written against the previous architecture (a
> Payload-CMS-backed site with eight parallel "view" presentations at the root URL). That
> structure — and every issue it caused — no longer exists; the site was rebuilt from scratch.

## What's implemented

| Area | Status | Where |
|---|---|---|
| Metadata API (not next-seo) | Used consistently on every route | every `layout.tsx` / `page.tsx` |
| `metadataBase` | Set once, root layout | `app/(site)/layout.tsx` |
| Per-route `title` / `description` | Every route sets its own | `app/(site)/**/page.tsx` |
| `alternates.canonical` | Set on every route, including dynamic `[slug]` pages | `app/(site)/**/page.tsx` |
| `viewport` export | Set on the root layout | `app/(site)/layout.tsx` |
| `robots.ts` | Exists, allows `/`, disallows `/api` | `app/robots.ts` |
| `sitemap.ts` | Exists, covers all static routes plus every case study and article slug | `app/sitemap.ts` |
| Open Graph / Twitter | `title`/`description`/`siteName`/`type`/`locale`/`card` set on every route; case studies and articles set `type: "article"` | root + per-route metadata |
| OG image | One shared 1200×630 image via `next/og` `ImageResponse`, same on every route | `app/(site)/opengraph-image.tsx`, `components/seo/og-image.tsx` |
| JSON-LD: Person + WebSite | `@graph` of both, rendered once in the root layout from `content/site.ts` | `components/seo/person-json-ld.tsx` |
| JSON-LD: BreadcrumbList | Rendered per case study (Work → project) | `app/(site)/work/[slug]/page.tsx` |
| `next/image` | Used for the project logo on case-study pages | `app/(site)/work/[slug]/page.tsx` |
| Redirects for old URLs | The eight archived view URLs (`/classic`, `/corporate`, …) 301 to `/`; old section URLs (`/services`, `/about`, `/contact`) 301 to the matching `/#section` anchor | `next.config.ts` |
| Favicon / touch icon | `app/favicon.ico`, `app/(site)/icon.png`, `app/(site)/apple-icon.png` | file-convention, auto-picked up by Next |

## Known gaps

These are real absences, not oversights being tracked as bugs — listed so nobody assumes they're
covered:

1. **No per-page OG image.** Every route — homepage, every case study, every article — shares one
   OG image. A shared link to `/work/reseebo` and a shared link to `/` render the same card. If
   case studies get real screenshots, a per-project `opengraph-image.tsx` (reading
   `project.logoUrl` / a hero screenshot) would be the natural next step.
2. **No `Article` JSON-LD on `/insights/[slug]`.** Only the site-wide `Person`/`WebSite` graph and
   the case study's `BreadcrumbList` exist; individual articles have no `Article`/`BlogPosting`
   structured data (headline, datePublished, author).
3. **No `CreativeWork`/`SoftwareApplication` JSON-LD on `/work/[slug]`.** Case studies only get the
   `BreadcrumbList`; there's no structured data describing the project itself.
4. **`sitemap.ts`'s `lastModified` is always "now."** It's computed fresh on every request/build
   (`new Date()`), same as before content moved out of the CMS — except now there's no per-record
   timestamp to use instead, since content is static TS with no `updatedAt`. Deliberate rather than
   forgotten (see the comment in `app/sitemap.ts`), but Google will still discount a `lastmod` that
   never varies, so it's not doing useful recrawl-prioritization work.
5. **`robots.ts` disallows `/api`, but no `/api` route exists** (the AI-chat API route was removed
   with the old architecture). Harmless, but stale — safe to drop whenever this file is next
   touched, or safe to leave as a no-op.
6. **No `app/manifest.ts`.** Not a PWA, so low priority, but there's currently no
   `manifest.webmanifest` for "Add to Home Screen" metadata.
7. **`content/faq.ts` is unused.** It's real Q&A content but isn't rendered anywhere (dropped from
   the homepage in a redesign pass) and has no dedicated `/faq` route, so it earns no FAQPage rich
   results despite existing as data.

None of these are wrong so much as not-yet-done — worth a look if/when case studies get real
screenshots, articles become a more active channel, or another SEO pass happens.

## What to verify yourself after deploying

Per project convention, this wasn't verified with a browser or dev server — `npx tsc --noEmit`,
`npm run lint`, and `npm run build` are the automated checks available here. To confirm the above by
hand:

- **Social preview**: paste `/`, `/work/reseebo`, and `/insights/<a-slug>` into the
  [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) or
  [Twitter Card Validator](https://cards-dev.twitter.com/validator) — all three should show the one
  shared OG image and the route's own title/description.
- **Rich Results Test**: run `/` and a `/work/[slug]` URL through Google's
  [Rich Results Test](https://search.google.com/test/rich-results) — expect `Person`/`WebSite` to
  validate on every page, and `BreadcrumbList` to additionally validate on case studies only.
- **`robots.txt` / `sitemap.xml`**: load `/robots.txt` and `/sitemap.xml` directly, confirm every
  case study and article slug is present in the sitemap.
- **Redirects**: hit `/classic`, `/services`, and `/react-native-app-development` — should land on
  `/`, `/#services`, and `/#services` respectively (the last one is a 302, everything else is a
  permanent 301 — see `next.config.ts`).
- **Search Console**: after deploy, resubmit `/sitemap.xml` and request re-indexing for `/`, since
  the whole site's URL structure changed from the previous architecture.

# SEO Audit — Ezra Anglo Portfolio

> **Status: all 10 issues below have been fixed.** This document is kept as a record of what was wrong and why, and as the checklist for what to verify in Search Console after deploy (see the bottom of this file).

Next.js 16.3.4, App Router. The site has one dataset (identity/experience/skills/projects from Payload CMS) rendered through **eight different "views"** (`classic`, `corporate`, `runtime`, `field-notes`, `blockwork`, `ai-chat`, `terminal`, `ide`) plus a gallery page that links to all of them. That structure — one story, many URLs — is the source of most of the findings below.

Audited: `app/robots.ts`, `app/sitemap.ts`, `app/(frontend)/layout.tsx`, `app/(views)/layout.tsx`, `app/(views)/page.tsx`, `app/(views)/*/layout.tsx`, `app/(views)/welcome/page.tsx`, `app/(views)/views/page.tsx`, `lib/views.ts`, view console/hero components, `next.config.ts`.

---

## What we currently have

| Area | Status | Where |
|---|---|---|
| Metadata API (not next-seo) | ✅ Used consistently, no mixing | every `layout.tsx` / `page.tsx` |
| `metadataBase` | ✅ Set per route group | `app/(frontend)/layout.tsx:19`, `app/(views)/layout.tsx:6` |
| Per-view unique `title` / `description` | ✅ Each of the 8 views has its own copy | `app/(views)/*/layout.tsx` |
| `viewport` as separate export | ✅ Correct in all `(views)/*/layout.tsx` | e.g. `app/(views)/terminal/layout.tsx:21` |
| `robots.ts` | ✅ Exists, blocks `/admin` and `/api` | `app/robots.ts` |
| `sitemap.ts` | ⚠️ Exists but incomplete/stale (see Issue 4) | `app/sitemap.ts` |
| `alternates.canonical` | ⚠️ Present everywhere, but inconsistent (see Issue 2) | `app/(views)/*/layout.tsx` |
| Open Graph / Twitter card fields | ⚠️ `title`/`description`/`siteName`/`type`/`locale` set, no images | `app/(views)/layout.tsx`, per-view layouts |
| `next/image` for photos | ⚠️ Used in the `classic` view; not used in `field-notes` (see Issue 8) | `components/hero-section.tsx`, `components/featured-project-card.tsx` |
| `keywords` meta tag | ✅ Not present (correctly omitted — Google ignores it) | — |
| JSON-LD structured data | ❌ None found anywhere in the codebase | — |
| OG/Twitter image files (`opengraph-image.*`) | ❌ None | — |
| `app/manifest.ts`, `icon.tsx`, `apple-icon.tsx` | ❌ Only `app/favicon.ico` exists | — |
| `sitemap.xml` image entries | ❌ None | `app/sitemap.ts` |

---

## Issues, ranked by impact — all fixed

### 1. ✅ Fixed — The homepage (`/`) does a client-side random redirect
`app/(views)/page.tsx:24-34` injects an inline script that, on every load, picks a **random** view (`corporate`, `runtime`, `field-notes`, `blockwork`, `ai-chat`, `terminal`, `ide`) and does `location.replace(...)`, unless the URL has `?pick=1`. The page's own metadata claims `alternates.canonical: "/"` (`app/(views)/page.tsx:14-16`).

Why it matters: Googlebot executes JavaScript and will follow that redirect. Because the destination changes on every crawl, Google gets a different "final" page for `/` each time it re-crawls, which:
- makes it impossible for Google to settle on stable indexed content for your root URL,
- contradicts the page's own canonical claim (it says "/" is canonical, then immediately leaves "/"),
- risks being interpreted as a soft-redirect / cloaking-adjacent pattern, since server-rendered HTML (gallery grid) and post-JS behavior (redirect elsewhere) diverge.

**Fix:** Don't randomize for the crawl-critical root URL. Either:
- Serve the `ViewsGallery` content at `/` permanently (no redirect) and let humans opt into a random view via a button (`/api/random` style, or `?surprise=1`), or
- Server-side (not client-script) redirect `/` to one fixed, intentional default view (e.g. `/classic`) with a real `Link`/CTA on that page to "see other versions" (→ `/welcome`).
Either way, whatever Google fetches at `/` should be the same thing every time.

### 2. ✅ Fixed — Canonical URL and Open Graph URL disagree, per view
In `corporate`, `runtime`, `blockwork`, and `field-notes` layouts, `alternates.canonical` points to `/classic`, but `openGraph.url` points to the view's own path:

```ts
// app/(views)/corporate/layout.tsx:5-16
alternates: { canonical: "/classic" },
openGraph: { ..., url: "/corporate" },
```
Same pattern in `app/(views)/runtime/layout.tsx:8-16`, `app/(views)/blockwork/layout.tsx:6-16`, `app/(views)/field-notes/layout.tsx:6-16`.

Meanwhile `ide`, `terminal`, and `ai-chat` self-canonicalize (canonical == their own URL == OG url), which is internally consistent.

Why it matters: `og:url` should match the canonical URL. Right now a share of `/corporate` tells Facebook/LinkedIn/Slack "this is `/corporate`" while telling Google "this is really `/classic`" — inconsistent signals, and social scrapers may cache the wrong canonical.

**Fix:** Decide, per view, whether it's a *duplicate presentation of the classic content* (canonicalize to `/classic`, and then also set `openGraph.url: "/classic"` to match) or a *distinct crawlable page* (self-canonicalize, keep its own OG url, and add it to the sitemap — see Issue 4).

### 3. ✅ Fixed — `/terminal` and `/ai-chat` are indexable but ship almost no text to crawlers
Both routes are `force-static`, listed in `sitemap.ts`, and self-canonicalized — i.e. you're asking Google to index them as real pages. But their content components are `"use client"` and start empty:
- `app/(views)/terminal/_components/console.tsx:11-13` — `history` starts as `[]`; the resume/experience/skills/project text only appears after a visitor types commands.
- `app/(views)/ai-chat/_components/console.tsx` — `messages` starts as just one greeting bubble; the actual portfolio facts only surface after the visitor asks a question and the assistant responds.

Why it matters: Google indexes rendered DOM, but it doesn't type into a terminal or chat with your bot. What it sees at these two URLs is a shell with a prompt/greeting — essentially thin content — even though the underlying `knowledge`/`program` data (all your experience, skills, projects) is present in the page's JS bundle, just not painted into the DOM.

**Fix:** Server-render a visible summary into the initial HTML for both — e.g. render the same `knowledge`/`program` content as a `<noscript>`-independent, visually-hidden (not `display:none`, use an accessible visually-hidden pattern) text block, or default the terminal to auto-run `help`/`about` and the chat to show 2-3 pre-answered Q&As on load. This also improves first-visit UX, not just crawlability.

### 4. ✅ Fixed — `sitemap.ts` is incomplete and its `lastModified` is always "now"
```ts
// app/sitemap.ts:5
const canonicalPaths = ["/", "/classic", "/welcome", "/terminal", "/ide", "/ai-chat"];
...
lastModified: new Date(),
```
- `/corporate`, `/runtime`, `/blockwork`, `/field-notes` are omitted. That's *defensible* if Issue 2 is resolved by making them non-canonical duplicates of `/classic` — non-canonical pages shouldn't be in the sitemap. But right now they're omitted while still being self-linked (view switcher) and independently crawlable, which is an inconsistent policy, not a deliberate one.
- `lastModified: new Date()` is computed fresh on every sitemap request/build, so every URL always looks "just changed." Google explicitly discounts `lastmod` once it notices this pattern, so it stops being useful for recrawl prioritization.

**Fix:**
- After resolving Issue 2, sitemap should contain exactly the set of self-canonical URLs: `/`, `/classic`, `/welcome`, `/terminal`, `/ide`, `/ai-chat`, and (if you choose to self-canonicalize them) `/corporate`, `/runtime`, `/blockwork`, `/field-notes`.
- Replace `new Date()` with a real content timestamp — e.g. the `updatedAt` of the Payload `SiteConfig`/`Experiences`/`Projects` documents that feed each page (`getSiteConfig`, `getProjectsData`, etc. in `lib/queries.ts`), or omit `lastModified` entirely if there's no reliable source (omitting is better than a fake value).

### 5. ✅ Fixed — No Open Graph / Twitter images
`app/(views)/layout.tsx:7-14` sets `openGraph.siteName/type/locale` and `twitter.card`, and each view layout adds `title`/`description`, but no layout sets `openGraph.images` or `twitter.images`, and there's no `opengraph-image.*` file in any route segment.

Why it matters: shared links (LinkedIn, X, Slack, iMessage) will show no preview image, or a low-quality auto-scrape, which measurably hurts click-through on a portfolio site meant to be shared.

**Fix:** Add `app/(views)/opengraph-image.tsx` (root-level, shared unless overridden) using `ImageResponse`, or a static `opengraph-image.png` per view if you want each view's share card to reflect its theme (e.g. the `swatch` colors already defined in `lib/views.ts`). A single good root-level image is enough to start.

### 6. ✅ Fixed — No structured data (JSON-LD)
No `application/ld+json` anywhere in the codebase.

**Fix:** Add a `Person` schema (name, jobTitle, url, sameAs → GitHub/LinkedIn) and a `WebSite` schema to the `(views)` root layout or the `classic` layout, sourced from the same `getSiteConfig`/`identity` data already fetched via `getPortfolioData()`. This is what makes personal-brand knowledge-panel and rich-result eligibility possible. See the skill's `references/json-ld.md` for the supported schema shapes and the `@graph` pattern for combining `Person` + `WebSite` in one script tag.

### 7. ✅ Fixed — `field-notes` portrait image has no alt text and isn't optimized
`app/(views)/field-notes/_components/portrait-band.tsx:1-16` renders the photo as a CSS `background-image` on a plain `<div>` (`public/images/landscape.png`), with a text fallback only when the URL is empty.

Why it matters: a background-image is invisible to Google Images, has no `alt` text for accessibility/SEO, isn't responsive (no `srcset`), and skips Next's automatic AVIF/WebP negotiation — worse for both image search and LCP on that view.

**Fix:** Swap to `next/image` with a real `alt` (e.g. `"${name} — workspace photo"`), `fill` + `sizes` for the responsive band layout, and `priority` if it's above the fold.

### 8. ✅ Fixed — `/` and `/welcome` render near-duplicate content, no canonical relationship declared between them
`app/(views)/page.tsx` and `app/(views)/welcome/page.tsx` both render `<ViewsGallery identity={data.identity} />` with only cosmetic copy differences ("A different way to browse..." vs "Every version..."), but each self-canonicalizes to its own URL rather than pointing at one of the two as authoritative.

**Fix:** Once Issue 1 is resolved and `/` has a stable purpose, decide which of `/` or `/welcome` is the "real" gallery page and have the other either redirect to it or canonicalize to it. Don't keep two independently-indexed URLs with the same content.

### 9. ⚠️ Advisory only — Preview iframes on the gallery pages
`components/views/shared/preview-card.tsx` embeds a live `<iframe src="${view.href}?preview=1">` (1280×800, scaled) for every view marked `previewIframe: true` in `lib/views.ts` — up to 6 full-page iframes on `/` and `/welcome`. They're `loading="lazy"` and `aria-hidden`, which helps, but each one that does load is a full second navigation/render of another route.

**Fix:** Not an indexing problem (already `aria-hidden`/non-crawled), but worth confirming in Search Console's Core Web Vitals report that `/welcome` and `/` aren't taking an LCP/INP hit once several of these iframes load in view. If they do, consider swapping to static screenshot thumbnails (e.g. pre-rendered PNGs per view) instead of live iframes.

### 10. ✅ Fixed — no `viewport` export on the `classic` root layout
`app/(frontend)/layout.tsx` has no `export const viewport`, unlike every `(views)/*/layout.tsx` which sets one explicitly. Next's default is reasonable, but you lose the ability to set `themeColor` per color scheme on that route. Low priority — align it with the `(views)` layouts if you want a consistent themed browser chrome.

---

## What actually changed (2026-09-03)

Two policy calls were needed before implementing, and both went with the recommended option:
- **Issue 1**: the gallery stays permanently at `/` (no redirect). The "different way to browse every time" feature is now a `🎲 Surprise me` button, not an automatic redirect — so Google always sees the same content at `/`, and humans still get the randomizer on click.
- **Issue 2**: `corporate`, `runtime`, `blockwork`, and `field-notes` are now self-canonical, independently indexed pages (not duplicates of `/classic`).

| Issue | Change | Files |
|---|---|---|
| 1. Random redirect at `/` | Removed the redirect script; `/` now always renders `ViewsGallery`; added a client-side "Surprise me" button that only fires on click | `app/(views)/page.tsx`, `components/views/shared/surprise-me-button.tsx`, `components/views/shared/views-gallery.tsx` |
| 2. Canonical/OG mismatch | `alternates.canonical` now matches each view's own path (already matched `openGraph.url`) | `app/(views)/{corporate,runtime,blockwork,field-notes}/layout.tsx` |
| 3. Thin content on `/terminal`, `/ai-chat` | Added a visually-hidden (`sr-only`), crawlable summary — identity, bio, skills, experience, projects, contact — built from the same `PortfolioData` every other view uses; also fixes both pages having no `<h1>` at all | `components/views/shared/seo-fallback-content.tsx`, `app/(views)/terminal/page.tsx`, `app/(views)/ai-chat/page.tsx` |
| 4. Sitemap incomplete/stale | Added `/corporate`, `/runtime`, `/blockwork`, `/field-notes`; removed `/welcome` (now a redirect); `lastModified` now derived from the max `updatedAt` across `SiteConfig`/`Projects`/`Experiences` instead of `new Date()` | `app/sitemap.ts` |
| 5. No OG images | Added `opengraph-image.tsx` (via `next/og` `ImageResponse`) to both route-group roots, sharing one render function | `components/seo/og-image.tsx`, `app/(views)/opengraph-image.tsx`, `app/(frontend)/opengraph-image.tsx` |
| 6. No JSON-LD | Added a `Person` + `WebSite` `@graph` script, rendered in both root layouts from the same portfolio identity data | `components/seo/person-json-ld.tsx`, `app/(views)/layout.tsx`, `app/(frontend)/layout.tsx` |
| 7. field-notes portrait had no alt/optimization | Swapped the CSS `background-image` div for `next/image` with real `alt` text | `app/(views)/field-notes/_components/portrait-band.tsx`, `app/(views)/field-notes/page.tsx` |
| 8. `/` vs `/welcome` duplicate | `/welcome` and `/views` are now permanent (308) redirects to `/`; the view switcher's "back to all views" link points at `/` too | `app/(views)/welcome/page.tsx`, `app/(views)/views/page.tsx`, `components/views/shared/view-switcher.tsx` |
| 9. Preview iframes (CWV) | Not a code change — advisory only, see note below | — |
| 10. Missing `viewport` on classic layout | Added `export const viewport` matching the other route groups | `app/(frontend)/layout.tsx` |

Verified with `npx tsc --noEmit`, `npm run lint`, and `npm run build` (all clean); confirmed the sitemap's `lastmod` values are real timestamps, `robots.txt` output, and that both `opengraph-image` routes render valid 1200×630 PNGs, by inspecting the production build output directly. No dev server or browser was used — per project convention, that verification is left to you. See the checklist below.

## What to verify yourself after deploying

- **Homepage**: load `/` — should show the gallery every time (no flash-redirect). Click "Surprise me" — should jump to a random view.
- **`/welcome` and `/views`**: should redirect straight to `/`.
- **View switcher → "Back to all views"**: should land on `/`, not a redirect chain.
- **`/terminal` and `/ai-chat`**: view page source (or "Inspect" → Elements, not just the visible UI) and confirm the hidden summary text is present in the DOM.
- **Social preview**: paste a page URL (e.g. `/`, `/corporate`) into the [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) or [Twitter Card Validator](https://cards-dev.twitter.com/validator) and confirm the new OG image shows up.
- **Search Console**: after deploy, submit `/sitemap.xml` again, request re-indexing for `/`, `/corporate`, `/runtime`, `/blockwork`, `/field-notes` (their canonical URL just changed), and watch the **Rich Results** report for `Person`/`WebSite` eligibility.
- **Issue 9 (iframes)**: check the Core Web Vitals report for `/` — if LCP/INP looks bad there, consider swapping the live preview iframes for static thumbnails.

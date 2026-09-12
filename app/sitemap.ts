import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { ARTICLES, CASE_STUDIES } from "@/content";

/**
 * The site is a one-page portfolio: Services, About, and Contact are homepage sections
 * (`/#services` etc.), not separate canonical URLs, so they aren't listed here.
 *
 * `lastModified` used to come from CMS row timestamps. Content is now static TypeScript, so
 * each entry states its own real "content last changed" date instead of a single `new Date()`
 * computed fresh on every build — Google discounts a `lastmod` that never varies from "just
 * changed." Case studies and articles carry `updatedAt` (articles also `publishedAt`) fields
 * for this. `STATIC_ROUTES` below has no CMS-style timestamp to draw from, so those get a
 * hand-set date that only moves when someone deliberately bumps it after a real content change.
 */
const STATIC_ROUTES: { path: string; updatedAt: string }[] = [
  { path: "/", updatedAt: "2026-09-12" },
  { path: "/work", updatedAt: "2026-09-12" },
  { path: "/insights", updatedAt: "2026-09-12" },
  { path: "/react-native-developer", updatedAt: "2026-09-12" },
  { path: "/react-native-maintenance", updatedAt: "2026-09-12" },
];

const CANONICAL_ENTRIES = [
  ...STATIC_ROUTES,
  ...CASE_STUDIES.map((c) => ({ path: `/work/${c.projectSlug}`, updatedAt: c.updatedAt })),
  ...ARTICLES.map((a) => ({ path: `/insights/${a.slug}`, updatedAt: a.updatedAt })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return CANONICAL_ENTRIES.map(({ path, updatedAt }) => ({
    url: new URL(path, SITE_URL).toString(),
    lastModified: new Date(updatedAt),
  }));
}

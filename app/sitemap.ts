import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { ARTICLES, CASE_STUDIES } from "@/content";

/**
 * Live site only. Every /legacy/* surface is deliberately absent — those pages carry
 * `robots: noindex` and must not compete with the new site for ranking.
 *
 * The site is a one-page portfolio: Services, About, and Contact are homepage sections
 * (`/#services` etc.), not separate canonical URLs, so they aren't listed here.
 *
 * `lastModified` used to come from CMS row timestamps. Content is now static TypeScript,
 * so the build time is the honest answer: the content changed when the code did.
 */
const CANONICAL_PATHS = [
  "/",
  "/work",
  "/insights",
  "/react-native-developer",
  "/react-native-maintenance",
  ...CASE_STUDIES.map((c) => `/work/${c.projectSlug}`),
  ...ARTICLES.map((a) => `/insights/${a.slug}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return CANONICAL_PATHS.map((path) => ({
    url: new URL(path, SITE_URL).toString(),
    lastModified,
  }));
}

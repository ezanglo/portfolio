import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Live site only. Every /legacy/* surface is deliberately absent — those pages carry
 * `robots: noindex` and must not compete with the new site for ranking.
 *
 * `lastModified` used to come from CMS row timestamps. Content is now static TypeScript,
 * so the build time is the honest answer: the content changed when the code did.
 */
const CANONICAL_PATHS = ["/"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return CANONICAL_PATHS.map((path) => ({
    url: new URL(path, SITE_URL).toString(),
    lastModified,
  }));
}

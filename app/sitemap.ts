import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getSiteConfig, getProjectsData, getExperiencesData } from "@/lib/queries";

const CANONICAL_PATHS = [
  "/",
  "/classic",
  "/corporate",
  "/runtime",
  "/field-notes",
  "/blockwork",
  "/terminal",
  "/ide",
  "/ai-chat",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [siteConfig, projects, experiences] = await Promise.all([
    getSiteConfig(),
    getProjectsData(),
    getExperiencesData(),
  ]);

  const timestamps = [siteConfig?.updatedAt, ...projects.map((p) => p.updatedAt), ...experiences.map((e) => e.updatedAt)]
    .filter((value): value is string => Boolean(value))
    .map((value) => new Date(value).getTime());

  const lastModified = timestamps.length > 0 ? new Date(Math.max(...timestamps)) : undefined;

  return CANONICAL_PATHS.map((path) => ({
    url: new URL(path, SITE_URL).toString(),
    ...(lastModified ? { lastModified } : {}),
  }));
}

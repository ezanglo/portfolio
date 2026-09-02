import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const canonicalPaths = ["/", "/classic", "/welcome", "/terminal", "/ide", "/ai-chat"];

  return canonicalPaths.map((path) => ({
    url: new URL(path, SITE_URL).toString(),
    lastModified: new Date(),
    changeFrequency: "weekly",
  }));
}

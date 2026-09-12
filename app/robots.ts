import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /legacy is intentionally NOT disallowed: it relies on a `noindex` meta tag, and a
      // crawler blocked by robots.txt can never read that tag. Blocking it here would risk
      // the archive being indexed URL-only from any inbound link.
      disallow: ["/api"],
    },
    sitemap: new URL("/sitemap.xml", SITE_URL).toString(),
  };
}

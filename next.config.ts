import type { NextConfig } from "next";

/**
 * The eight portfolio surfaces that used to live at the site root moved to /legacy/*.
 *
 * They redirect to "/" rather than to their own archived copies on purpose: the archive is
 * noindex, so pointing these at it would discard whatever ranking they hold instead of
 * consolidating it onto the live site.
 */
const LEGACY_PUBLIC_PATHS = [
  "/classic",
  "/corporate",
  "/runtime",
  "/field-notes",
  "/blockwork",
  "/terminal",
  "/ide",
  "/ai-chat",
  "/views",
  "/welcome",
];

const nextConfig: NextConfig = {
  serverExternalPackages: ["sharp"],
  images: {
    qualities: [75, 95],
  },
  async redirects() {
    return LEGACY_PUBLIC_PATHS.map((source) => ({
      source,
      destination: "/",
      permanent: true,
    }));
  },
};

export default nextConfig;

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

/**
 * The site is now a one-page portfolio — Services, About, and Contact are homepage sections,
 * not standalone routes. Anything that already links to their old URLs lands on the right
 * section instead of a 404.
 */
const SECTION_REDIRECTS: Record<string, string> = {
  "/services": "/#services",
  "/about": "/#about",
  "/contact": "/#contact",
};

/**
 * §21 lists five SEO landing pages but also forbids thin keyword pages. Two
 * (/react-native-developer, /react-native-maintenance) got genuine, distinct content instead;
 * these three overlap the Services section too heavily to justify a separate thin page, so
 * they redirect there rather than existing as empty routes.
 */
const THIN_LANDING_PAGES = [
  "/react-native-app-development",
  "/expo-developer",
  "/full-stack-mobile-development",
];

const nextConfig: NextConfig = {
  serverExternalPackages: ["sharp"],
  images: {
    qualities: [75, 95],
  },
  async redirects() {
    return [
      ...LEGACY_PUBLIC_PATHS.map((source) => ({
        source,
        destination: "/",
        permanent: true,
      })),
      ...Object.entries(SECTION_REDIRECTS).map(([source, destination]) => ({
        source,
        destination,
        permanent: true,
      })),
      ...THIN_LANDING_PAGES.map((source) => ({
        source,
        destination: "/#services",
        permanent: false,
      })),
    ];
  },
};

export default nextConfig;

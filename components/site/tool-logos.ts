/**
 * Real brand logos for the Skills "logo cloud" tiles, via Simple Icons (cdn.simpleicons.org).
 * Every slug below was checked for a 200 response before being added — anything without a
 * confirmed real logo (AWS's family, C#, WPF, VersionOne, Mantis, SQL Server, REST API, Xamarin,
 * Windows IoT) is left out on purpose rather than guessing, and falls back to a plain initial
 * tile instead of a broken image.
 */
export const TOOL_LOGO_SLUGS: Record<string, string> = {
  ReactJS: "react",
  NextJS: "nextdotjs",
  VueJS: "vuedotjs",
  TypeScript: "typescript",
  Tailwind: "tailwindcss",
  "Framer Motion": "framer",
  "React Native": "react",
  Expo: "expo",
  Redux: "redux",
  Zod: "zod",
  "React-Query": "reactquery",
  Clerk: "clerk",
  "Ionic Framework": "ionic",
  "Quasar Framework": "quasar",
  Laravel: "laravel",
  Symfony: "symfony",
  "Node.js": "nodedotjs",
  "Payload CMS": "payloadcms",
  "Better Auth": "betterauth",
  Stripe: "stripe",
  "ASP.NET": "dotnet",
  CodeIgniter: "codeigniter",
  PostgreSQL: "postgresql",
  MongoDB: "mongodb",
  MySQL: "mysql",
  Firebase: "firebase",
  Firestore: "firebase",
  Prisma: "prisma",
  Drizzle: "drizzle",
  OpenRouter: "openrouter",
  "Google Vertex AI": "googlecloud",
  "Google Generative AI": "googlegemini",
  Git: "git",
  GitHub: "github",
  Turborepo: "turborepo",
  BitBucket: "bitbucket",
  JIRA: "jira",
  "Raspberry Pi": "raspberrypi",
  FCM: "firebase",
}

/** Muted neutral tone so the logo cloud reads as one cohesive gray wall (not a rainbow of brand
 * colors), matching the single-accent rule — brand color is reserved for our own amber. */
export const TOOL_LOGO_COLOR = "8a8a8e"

export function toolLogoUrl(name: string): string | null {
  const slug = TOOL_LOGO_SLUGS[name]
  if (!slug) return null
  return `https://cdn.simpleicons.org/${slug}/${TOOL_LOGO_COLOR}`
}

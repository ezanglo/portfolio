import type { Skill } from './types'

/**
 * Re-grouped 2026-09-13 around functional buckets instead of a per-technology-type split, so
 * each tab answers "where does this sit in the product" rather than "what kind of tech is
 * this": Mobile (the app itself), Interface (the web UI layer), Backend (server frameworks),
 * State & Data (databases/ORMs plus client-side state), Integrations (third-party services and
 * AI platforms wired into the product), Cloud (hosting platforms), and Delivery (version
 * control, CI/CD, and the rest of how work ships). Backend and State & Data started as one
 * combined bucket and were split back out 2026-09-14 once it grew past 20 entries — too many
 * for one tab to stay scannable. Within every bucket, the front of the list is what's really
 * in daily use today; things from older client/employer work (Laravel-era PHP, Xamarin,
 * ASP.NET, MySQL/SQL Server, the legacy hardware projects) are at the back rather than
 * removed, since they're still real, verifiable history.
 */
export const SKILLS: Skill[] = [
  // mobile — React Native + Expo are today's actual mobile stack; Xamarin/Ionic/Quasar are
  // the older cross-platform frameworks from earlier client work.
  { name: "React Native", category: "mobile", featured: true, order: 1 },
  { name: "Expo", category: "mobile", featured: true, order: 2 },
  { name: "Xamarin", category: "mobile", featured: false, order: 3 },
  { name: "Ionic Framework", category: "mobile", featured: false, order: 4 },
  { name: "Quasar Framework", category: "mobile", featured: false, order: 5 },

  // interface — the web UI layer: framework, styling, motion. Client-side state/data libraries
  // (React-Query, Redux, Zod, Clerk) live under "State & Data" instead.
  { name: "TypeScript", category: "interface", featured: true, order: 1 },
  { name: "NextJS", category: "interface", featured: true, order: 2 },
  { name: "ReactJS", category: "interface", featured: true, order: 3 },
  { name: "Tailwind", category: "interface", featured: true, order: 4 },
  { name: "Framer Motion", category: "interface", featured: false, order: 5 },
  { name: "VueJS", category: "interface", featured: false, order: 6 },

  // backend — server frameworks. Payload CMS + Better Auth are the current production stack;
  // the PHP/.NET-era frameworks are earlier client/employer work.
  { name: "Node.js", category: "backend", featured: true, order: 1 },
  { name: "Payload CMS", category: "backend", featured: true, order: 2 },
  { name: "Better Auth", category: "backend", featured: true, order: 3 },
  { name: "Laravel", category: "backend", featured: false, order: 4 },
  { name: "Symfony", category: "backend", featured: false, order: 5 },
  { name: ".NET", category: "backend", featured: false, order: 7 },
  { name: "CodeIgniter", category: "backend", featured: false, order: 8 },

  // data ("State & Data" tab) — databases/ORMs I run myself, plus the client-side state that
  // keeps them in sync. Drizzle + PostgreSQL are the current default; MongoDB/MySQL/SQL Server
  // are from earlier projects. Managed BaaS platforms (Firebase, Supabase) and managed auth
  // (Clerk) live under "Integrations" instead — they're third-party services, not something
  // self-hosted like the rest of this list.
  { name: "PostgreSQL", category: "data", featured: true, order: 1 },
  { name: "Drizzle", category: "data", featured: true, order: 2 },
  { name: "Prisma", category: "data", featured: true, order: 3 },
  { name: "React-Query", category: "data", featured: true, order: 4 },
  { name: "Redux", category: "data", featured: false, order: 5 },
  { name: "Zod", category: "data", featured: false, order: 6 },
  { name: "MongoDB", category: "data", featured: false, order: 7 },
  { name: "Vector Database", category: "data", featured: false, order: 8 },
  { name: "RAG", category: "data", featured: false, order: 9 },

  // integrations — third-party services and AI platforms actually wired into these apps,
  // including managed BaaS/auth platforms (Firebase, Supabase, Clerk) rather than databases
  // and libraries run yourself.
  { name: "Claude", category: "integrations", featured: true, order: 1 },
  { name: "OpenRouter", category: "integrations", featured: true, order: 2 },
  { name: "ChatGPT", category: "integrations", featured: true, order: 3 },
  { name: "Gemini", category: "integrations", featured: true, order: 4 },
  { name: "Grok", category: "integrations", featured: true, order: 5 },
  { name: "Stripe", category: "integrations", featured: true, order: 6 },
  { name: "PostHog", category: "integrations", featured: true, order: 7 },
  { name: "Sentry", category: "integrations", featured: true, order: 8 },
  { name: "Inngest", category: "integrations", featured: true, order: 9 },
  { name: "Firebase", category: "integrations", featured: true, order: 10 },
  { name: "Supabase", category: "integrations", featured: true, order: 12 },
  { name: "Clerk", category: "integrations", featured: false, order: 13 },

  // cloud — hosting/deployment platforms plus the object storage services actually wired into
  // these apps (Vercel Blob, Supabase Storage, Cloudflare R2), most-used first. Google Vertex AI
  // is folded into "Google Cloud" rather than listed separately; the individual AWS sub-services
  // are dropped in favor of "AWS" alone. CI/CD and containerization live under "Delivery" instead.
  { name: "AWS", category: "cloud", featured: true, order: 1 },
  { name: "Google Cloud", category: "cloud", featured: true, order: 2 },
  { name: "Vercel Blob", category: "cloud", featured: true, order: 3 },
  { name: "Supabase Storage", category: "cloud", featured: true, order: 4 },
  { name: "Cloudflare R2", category: "cloud", featured: true, order: 5 },
  { name: "Dokploy", category: "cloud", featured: true, order: 6 },
  { name: "Coolify", category: "cloud", featured: true, order: 7 },
  { name: "Azure", category: "cloud", featured: true, order: 8 },

  // delivery — version control, CI/CD, containerization, and project tracking; Turborepo/pnpm
  // monorepos are how the current projects are actually built. WPF/Windows IoT/Raspberry Pi
  // are platform facts from two old embedded/desktop projects, kept as real history.
  { name: "Git", category: "delivery", featured: true, order: 1 },
  { name: "GitHub", category: "delivery", featured: true, order: 2 },
  { name: "Docker", category: "delivery", featured: true, order: 4 },
  { name: "Turborepo", category: "delivery", featured: true, order: 5 },
  { name: "BitBucket", category: "delivery", featured: false, order: 6 },
  { name: "JIRA", category: "delivery", featured: false, order: 7 },
  { name: "Windows IoT", category: "delivery", featured: false, order: 8 },
  { name: "Raspberry Pi", category: "delivery", featured: false, order: 9 },
]

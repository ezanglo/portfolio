import type { Skill } from './types'

/**
 * Reordered 2026-09-12 against the actual stack across current codebases (OPIC, Finn AI,
 * Resiboo, Stratos Command) — the front of each category is what's really in daily use today;
 * things from older client/employer work (Laravel-era PHP, Xamarin, ASP.NET, MySQL/SQL Server)
 * moved to the back rather than being removed, since they're still real, verifiable history.
 */
export const SKILLS: Skill[] = [
  // frontend — TypeScript/Next.js/React Native+Expo is the daily stack today.
  { name: "TypeScript", category: "frontend", featured: true, order: 1 },
  { name: "NextJS", category: "frontend", featured: true, order: 2 },
  { name: "React Native", category: "frontend", featured: true, order: 3 },
  { name: "Expo", category: "frontend", featured: true, order: 4 },
  { name: "ReactJS", category: "frontend", featured: true, order: 5 },
  { name: "Tailwind", category: "frontend", featured: true, order: 6 },
  { name: "React-Query", category: "frontend", featured: true, order: 7 },
  { name: "Zod", category: "frontend", featured: false, order: 8 },
  { name: "Redux", category: "frontend", featured: false, order: 9 },
  { name: "Clerk", category: "frontend", featured: false, order: 10 },
  { name: "Framer Motion", category: "frontend", featured: false, order: 11 },
  { name: "VueJS", category: "frontend", featured: false, order: 12 },

  // backend — Payload CMS, Better Auth, and Stripe are the current production backend; the
  // PHP-era stack (Laravel/Symfony/CodeIgniter) and ASP.NET are earlier client/employer work.
  { name: "Node.js", category: "backend", featured: true, order: 1 },
  { name: "Payload CMS", category: "backend", featured: true, order: 2 },
  { name: "Better Auth", category: "backend", featured: true, order: 3 },
  { name: "Stripe", category: "backend", featured: true, order: 4 },
  { name: "REST API", category: "backend", featured: true, order: 5 },
  { name: "Laravel", category: "backend", featured: false, order: 6 },
  { name: "Symfony", category: "backend", featured: false, order: 7 },
  { name: "C#", category: "backend", featured: false, order: 8 },
  { name: "ASP.NET", category: "backend", featured: false, order: 9 },
  { name: "CodeIgniter", category: "backend", featured: false, order: 10 },

  // mobile — the older cross-platform frameworks from earlier client work; today's mobile
  // stack is React Native + Expo, filed under Frontend above.
  { name: "Xamarin", category: "mobile", featured: false, order: 1 },
  { name: "Ionic Framework", category: "mobile", featured: false, order: 2 },
  { name: "Quasar Framework", category: "mobile", featured: false, order: 3 },

  // database — Drizzle + PostgreSQL is the current default; MongoDB/MySQL/SQL Server are
  // from earlier projects.
  { name: "PostgreSQL", category: "database", featured: true, order: 1 },
  { name: "Drizzle", category: "database", featured: true, order: 2 },
  { name: "Prisma", category: "database", featured: true, order: 3 },
  { name: "Firebase", category: "database", featured: true, order: 4 },
  { name: "Firestore", category: "database", featured: true, order: 5 },
  { name: "MongoDB", category: "database", featured: false, order: 6 },
  { name: "MySQL", category: "database", featured: false, order: 7 },
  { name: "SQL Server", category: "database", featured: false, order: 8 },

  // cloud — OpenRouter now does the daily AI-routing work; AWS's own primitives and the
  // Google AI platforms come next.
  { name: "OpenRouter", category: "cloud", featured: true, order: 1 },
  { name: "AWS", category: "cloud", featured: true, order: 2 },
  { name: "Google Vertex AI", category: "cloud", featured: true, order: 3 },
  { name: "Google Generative AI", category: "cloud", featured: true, order: 4 },
  { name: "AWS API Gateway", category: "cloud", featured: false, order: 5 },
  { name: "AWS Lambda", category: "cloud", featured: false, order: 6 },
  { name: "AWS Code Commit", category: "cloud", featured: false, order: 7 },

  // tools — Turborepo/pnpm monorepos are how the current projects are actually built.
  { name: "Git", category: "tools", featured: true, order: 1 },
  { name: "GitHub", category: "tools", featured: true, order: 2 },
  { name: "Turborepo", category: "tools", featured: true, order: 3 },
  { name: "BitBucket", category: "tools", featured: false, order: 4 },
  { name: "JIRA", category: "tools", featured: false, order: 5 },
  { name: "VersionOne", category: "tools", featured: false, order: 6 },
  { name: "Mantis", category: "tools", featured: false, order: 7 },
  { name: "WPF", category: "tools", featured: false, order: 8 },
  { name: "Windows IoT", category: "tools", featured: false, order: 9 },
  { name: "Raspberry Pi", category: "tools", featured: false, order: 10 },
  { name: "FCM", category: "tools", featured: false, order: 11 },
]

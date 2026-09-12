import type { Skill } from './types'

/** Exported 1:1 from the Payload `skills` collection on 2026-09-12. 45 entries. */
export const SKILLS: Skill[] = [
  // frontend
  { name: "ReactJS", category: "frontend", featured: true, order: 1 },
  { name: "NextJS", category: "frontend", featured: true, order: 2 },
  { name: "VueJS", category: "frontend", featured: true, order: 3 },
  { name: "TypeScript", category: "frontend", featured: true, order: 4 },
  { name: "Tailwind", category: "frontend", featured: true, order: 5 },
  { name: "Framer Motion", category: "frontend", featured: false, order: 6 },
  { name: "React Native", category: "frontend", featured: true, order: 7 },
  { name: "Redux", category: "frontend", featured: false, order: 8 },
  { name: "Zod", category: "frontend", featured: false, order: 9 },
  { name: "React-Query", category: "frontend", featured: false, order: 10 },
  { name: "Clerk", category: "frontend", featured: false, order: 11 },

  // backend
  { name: "Laravel", category: "backend", featured: true, order: 1 },
  { name: "Symfony", category: "backend", featured: true, order: 2 },
  { name: "Node.js", category: "backend", featured: true, order: 3 },
  { name: "C#", category: "backend", featured: true, order: 4 },
  { name: "ASP.NET", category: "backend", featured: true, order: 5 },
  { name: "REST API", category: "backend", featured: true, order: 6 },
  { name: "CodeIgniter", category: "backend", featured: false, order: 7 },

  // mobile
  { name: "Xamarin", category: "mobile", featured: true, order: 1 },
  { name: "Ionic Framework", category: "mobile", featured: false, order: 2 },
  { name: "Quasar Framework", category: "mobile", featured: false, order: 3 },

  // database
  { name: "PostgreSQL", category: "database", featured: true, order: 1 },
  { name: "MongoDB", category: "database", featured: true, order: 2 },
  { name: "MySQL", category: "database", featured: true, order: 3 },
  { name: "SQL Server", category: "database", featured: true, order: 4 },
  { name: "Firebase", category: "database", featured: true, order: 5 },
  { name: "Firestore", category: "database", featured: true, order: 6 },
  { name: "Prisma", category: "database", featured: true, order: 7 },
  { name: "Drizzle", category: "database", featured: false, order: 8 },

  // cloud
  { name: "AWS", category: "cloud", featured: true, order: 1 },
  { name: "AWS API Gateway", category: "cloud", featured: false, order: 2 },
  { name: "AWS Lambda", category: "cloud", featured: false, order: 3 },
  { name: "AWS Code Commit", category: "cloud", featured: false, order: 4 },
  { name: "Google Vertex AI", category: "cloud", featured: false, order: 5 },
  { name: "Google Generative AI", category: "cloud", featured: false, order: 6 },

  // tools
  { name: "Git", category: "tools", featured: true, order: 1 },
  { name: "GitHub", category: "tools", featured: true, order: 2 },
  { name: "BitBucket", category: "tools", featured: false, order: 3 },
  { name: "JIRA", category: "tools", featured: false, order: 4 },
  { name: "VersionOne", category: "tools", featured: false, order: 5 },
  { name: "Mantis", category: "tools", featured: false, order: 6 },
  { name: "WPF", category: "tools", featured: false, order: 7 },
  { name: "Windows IoT", category: "tools", featured: false, order: 8 },
  { name: "Raspberry Pi", category: "tools", featured: false, order: 9 },
  { name: "FCM", category: "tools", featured: false, order: 10 },
]

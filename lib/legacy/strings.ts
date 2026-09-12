/**
 * Strings and classifications the `/legacy/*` archive must keep rendering exactly as they
 * were exported from Payload — frozen here because `content/site.ts` and `content/projects.ts`
 * have since been rewritten for the new positioning (docs/build-plan.md §2c/§2b). The live
 * site never imports this file.
 */

export const LEGACY_ROLE = "Full Stack Developer"
export const LEGACY_BIO = [
  "Graduating with a degree in Computer Science, I initially worked as a .NET Developer while also accepting freelance projects. Afterward, I started my journey into full-stack web development. Leveraging my experience with .NET and Object Oriented Programming, I easily adapted and learned their tech stack, despite lacking prior work experience in PHP. This opened up learning opportunities with web development for me. I love building applications and learn how to solve complex problems, whether in Desktop, Web or Mobile. As a result, I find myself in a constant state of learning and trying out new things",
  "My main stack is React, Typescript, PostgreSQL and PHP. I am also familiar with TailwindCSS, .NET, Prisma, and React Native to name a few. I am currently looking for a full-time or part-time position as a full-stack developer.",
]

export const LEGACY_TAGLINE =
  "with over 10 years of development experience. I enjoy building applications for Web, Mobile, Desktop. I currently focus on"
export const LEGACY_TAGLINE_HIGHLIGHT = "NextJS and React Native"
export const LEGACY_MAIN_STACK = "React, Typescript, PostgreSQL and PHP"
export const LEGACY_ADDITIONAL_TECH = "TailwindCSS, .NET, Prisma, and React Native"
export const LEGACY_CAREER_STATUS = "full-time position as a full-stack developer"
export const LEGACY_TECH_STACK_DESCRIPTION =
  "Built with Next.js, PayloadCMS, TypeScript, Tailwind CSS, Framer Motion, Shadcn/ui, React Hook Form, Zod, Email & Resend, Vercel hosting."
export const LEGACY_COPYRIGHT = "© 2023 Ezra Anglo. All rights reserved."
export const LEGACY_TOKEN_SAVINGS = "92%"
export const LEGACY_ENGINES_ORCHESTRATED = "4"

/** Per-role description overrides, keyed by `content/experience.ts` slug — for the one entry
 * whose CMS text ("...I'm open to full-time opportunities.") was reworded on the live site
 * after the fact. Everything else in `content/experience.ts` is shared as-is between the live
 * site and the archive since it never needed rewriting. */
export const LEGACY_EXPERIENCE_DESCRIPTIONS: Record<string, string> = {
  "freelance-software-engineer-freelance":
    "I'm now a full-stack developer working as a freelancer. My stack includes React, Next.js, TypeScript, Tailwind, PHP and PostgreSQL. I'm open to full-time opportunities.",
}

export type LegacyProjectType = 'web' | 'mobile' | 'desktop' | 'iot'
export type LegacyEngineKey = 'claude' | 'gemini' | 'vertex' | 'native' | 'web'

/**
 * The exact `type` / `engine` / array-position every project had in the CMS, before the
 * §2b re-classification corrected several mislabeled entries (Xamarin/WPF/Raspberry Pi
 * projects that rendered as "React Native" or "Mobile"). Keyed by slug, which is stable
 * across both the old and new `content/projects.ts`.
 */
export const LEGACY_PROJECT_CLASSIFICATION: Record<
  string,
  { type: LegacyProjectType; engine: LegacyEngineKey | null; order: number }
> = {
  "yuvee": { type: "web", engine: "web", order: 1 },
  "reseebo": { type: "mobile", engine: "native", order: 1 },
  "win-win-ai": { type: "mobile", engine: "claude", order: 1 },
  "finn-ai-ops": { type: "web", engine: "claude", order: 1 },
  "opic-nightlife-app": { type: "mobile", engine: "native", order: 1 },
  "real-time-rfid-registration": { type: "mobile", engine: "native", order: 2 },
  "ai-persona-chat-bot": { type: "mobile", engine: "vertex", order: 3 },
  "saas-platform-mobile-application": { type: "mobile", engine: "native", order: 4 },
  "plokernow": { type: "web", engine: "web", order: 5 },
  "plant-tea-ta": { type: "web", engine: "web", order: 6 },
  "disguised-mari-web": { type: "web", engine: "web", order: 7 },
  "disguised-mari-bot": { type: "web", engine: "web", order: 8 },
  "shop-diggy": { type: "mobile", engine: "native", order: 9 },
  "tara-tracking-and-routing": { type: "mobile", engine: "native", order: 10 },
  "home-vision-face-recognition": { type: "mobile", engine: "native", order: 11 },
  "halomet-voice-command-navigation-system": { type: "mobile", engine: "native", order: 12 },
}

/** The CMS's original array order (its sort was `order`, then id) — the legacy views'
 * grid/gallery order depends on this, not on the new §7-priority `content/projects.ts` order. */
export const LEGACY_PROJECT_SLUG_ORDER = [
  "yuvee",
  "reseebo",
  "win-win-ai",
  "finn-ai-ops",
  "opic-nightlife-app",
  "real-time-rfid-registration",
  "ai-persona-chat-bot",
  "saas-platform-mobile-application",
  "plokernow",
  "plant-tea-ta",
  "disguised-mari-web",
  "disguised-mari-bot",
  "shop-diggy",
  "tara-tracking-and-routing",
  "home-vision-face-recognition",
  "halomet-voice-command-navigation-system",
]

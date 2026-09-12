import type { SiteContent } from './types'

/**
 * Exported 1:1 from the Payload `site-config` global on 2026-09-12.
 *
 * REVIEW NEEDED — this is the content most at odds with the new positioning:
 *   - `role` is "Full Stack Developer"; it feeds the Person JSON-LD jobTitle.
 *   - `tagline` leads with "Web, Mobile, Desktop".
 *   - `bio` closes on looking for a full-time full-stack position.
 *   - `copyright` still says 2023.
 * Nothing has been rewritten for you — these are the CMS values verbatim.
 */
export const SITE: SiteContent = {
  siteName: "Ezra Anglo Portfolio",
  name: "Ezra",
  // REVIEW: drives Person JSON-LD jobTitle.
  role: "Full Stack Developer",
  // REVIEW: "Web, Mobile, Desktop" positioning.
  tagline: "with over 10 years of development experience. I enjoy building applications for Web, Mobile, Desktop. I currently focus on",
  taglineHighlight: "NextJS and React Native",
  email: "dev.ezraanglo@gmail.com",
  linkedinUrl: "https://www.linkedin.com/in/ezraanglo",
  githubUrl: "https://www.github.com/ezanglo",
  // Was /api/files/photo-1788364577989.png (Vercel Blob, 1.75MB, served unoptimized).
  portraitUrl: '/images/ezra-anglo.png',
  // Was /api/files/cv-1763020169597.pdf (Vercel Blob).
  cvUrl: '/cv-ezra-anglo.pdf',
  mainStack: "React, Typescript, PostgreSQL and PHP",
  additionalTech: "TailwindCSS, .NET, Prisma, and React Native",
  // REVIEW: job-seeking language.
  careerStatus: "full-time position as a full-stack developer",
  // REVIEW: last paragraph is job-seeking.
  bio: [
    "Graduating with a degree in Computer Science, I initially worked as a .NET Developer while also accepting freelance projects. Afterward, I started my journey into full-stack web development. Leveraging my experience with .NET and Object Oriented Programming, I easily adapted and learned their tech stack, despite lacking prior work experience in PHP. This opened up learning opportunities with web development for me. I love building applications and learn how to solve complex problems, whether in Desktop, Web or Mobile. As a result, I find myself in a constant state of learning and trying out new things",
    "My main stack is React, Typescript, PostgreSQL and PHP. I am also familiar with TailwindCSS, .NET, Prisma, and React Native to name a few. I am currently looking for a full-time or part-time position as a full-stack developer.",
  ],
  yearsExperience: "10+",
  // REVIEW: unverifiable in a hero; the plan moves these to the workflow page.
  tokenSavings: "92%",
  enginesOrchestrated: "4",
  processIntro: "I work in short, verifiable loops rather than long stretches of unreviewed code: scope a slice small enough to ship in a day, wire it end to end, and let real usage (not speculation) decide what comes next.",
  pitchIntro: "A single person who can take a mobile app from idea to app store, and wire real AI capability into it along the way, not a hand-off between three specialists.",
  aiEngineeringIntro: "I treat AI models as another backend service to integrate, not as a novelty. Every model I bring into a product is there to cut a specific cost or unlock a specific feature, chosen and swapped on evidence.",
  // REVIEW: says 2023.
  copyright: "© 2023 Ezra Anglo. All rights reserved.",
  // REVIEW: mentions PayloadCMS, which is being removed.
  techStack: "Built with Next.js, PayloadCMS, TypeScript, Tailwind CSS, Framer Motion, Shadcn/ui, React Hook Form, Zod, Email & Resend, Vercel hosting.",
}

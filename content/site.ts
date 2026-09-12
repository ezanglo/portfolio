import type { SiteContent } from './types'

/**
 * Site identity and copy, rewritten against the brief (`docs/portfolio-transform.md`) per
 * `docs/build-plan.md` §2c. Every fact — name, links, email, CV, career history — is
 * unchanged from the CMS export. Only the strings the brief explicitly rules out (job-seeking
 * framing, "Web, Mobile, Desktop" positioning, the stale copyright year) were rewritten, and
 * only to the brief's own wording or to facts already present in `content/experience.ts`.
 */
export const SITE: SiteContent = {
  siteName: "Ezra Anglo Portfolio",
  name: "Ezra",
  role: "Senior React Native & Full-Stack Developer",
  // §3 preferred headline, verbatim.
  heroHeadline: "I build production-ready mobile products — from React Native to backend.",
  // §3 supporting copy, verbatim.
  heroCopy:
    "I'm Ezra, a senior React Native and full-stack developer with 10+ years of software engineering experience. I build and ship iOS and Android applications using React Native and Expo, with the full-stack expertise to take a product from mobile interface to API, database, infrastructure, and AI-powered features.",
  email: "dev.ezraanglo@gmail.com",
  linkedinUrl: "https://www.linkedin.com/in/ezraanglo",
  githubUrl: "https://www.github.com/ezanglo",
  portraitUrl: '/images/ezra-anglo.png',
  cvUrl: '/cv-ezra-anglo.pdf',
  // §2 career story: CS degree -> .NET developer + freelance -> full-stack web (PHP, via the
  // .NET/OOP background) -> desktop/web/mobile -> React Native focus today. Only facts already
  // in the CMS bio and content/experience.ts; no new employers, dates, or claims.
  bio: [
    "I graduated with a degree in Computer Science and started out as a .NET developer, taking on freelance projects on the side. That C# and object-oriented background made it straightforward to pick up PHP and move into full-stack web development, and from there into building for desktop, web, and mobile — including the React Native work that first put mobile at the center of my career.",
    "Today I focus on production React Native and Expo applications, backed by 10+ years of full-stack engineering across web, backend, cloud, and mobile. That background means I can own a product beyond the screen — the APIs, databases, infrastructure, and AI-powered features behind it, not just the interface.",
  ],
  yearsExperience: "10+",
  // §4 hero trust row. No unsupported claims — each of these is a fact, not a metric.
  trustIndicators: [
    "10+ Years Experience",
    "React Native + Expo",
    "Full-Stack Engineering",
    "iOS + Android",
    "AI-Powered Products",
    "Production Experience",
  ],
  // AI section only (Phase 8) — never the hero trust row. Both numbers are Finn AI Ops'
  // own published claims about itself, not a personal metric.
  aiStats: [
    {
      value: "92%",
      label: "Lower token costs",
      context: "Finn AI Ops' routing algorithm, per the product's own published description",
    },
    {
      value: "4",
      label: "AI engines orchestrated",
      context: "Claude, Gemini, ChatGPT, and Grok, unified in Finn AI Ops",
    },
  ],
  processIntro: "I work in short, verifiable loops rather than long stretches of unreviewed code: scope a slice small enough to ship in a day, wire it end to end, and let real usage (not speculation) decide what comes next.",
  pitchIntro: "A single person who can take a mobile app from idea to app store, and wire real AI capability into it along the way, not a hand-off between three specialists.",
  aiEngineeringIntro: "I treat AI models as another backend service to integrate, not as a novelty. Every model I bring into a product is there to cut a specific cost or unlock a specific feature, chosen and swapped on evidence.",
  copyright: "© 2026 Ezra Anglo. All rights reserved.",
}

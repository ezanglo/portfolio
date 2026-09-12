import type { CaseStudy } from './types'

/**
 * §9 case studies for the §7 featured shortlist. Every field is either drawn verbatim from
 * `content/projects.ts`'s own description/tags, or — where the CMS export never recorded that
 * level of narrative detail (the underlying problem, architecture specifics, the engineering
 * challenge, the outcome) — a literal `[ADD REAL … HERE]` placeholder per §31/§8. Nothing here
 * is invented to make the story read better.
 */
export const CASE_STUDIES: CaseStudy[] = [
  {
    projectSlug: "win-win-ai",
    overview:
      "WIN(win) AI is an AI chat application available on both mobile and web, used internally at NET(net) with the company's own data as its knowledge base.",
    problem: "[ADD REAL PROBLEM STATEMENT HERE]",
    role: "[ADD REAL ROLE DETAIL HERE]",
    whatIBuilt: [
      "An AI chat interface shipped on both mobile and web",
      "Integration of the company's own data as the assistant's knowledge base",
      "[ADD REAL BACKEND / INFRASTRUCTURE DETAIL HERE]",
    ],
    architecture: "[ADD REAL ARCHITECTURE HERE]",
    challenges: "[ADD REAL ENGINEERING CHALLENGES HERE]",
    solution: "[ADD REAL SOLUTION NARRATIVE HERE]",
    technology: ["Claude", "Mobile", "Web"],
    outcome: null,
  },
  {
    projectSlug: "opic-nightlife-app",
    overview:
      "OPIC brings nightlife events, offers, bars, clubs, and venue discovery into one cinematic mobile-first experience, live at opic-app.com.",
    problem: "[ADD REAL PROBLEM STATEMENT HERE]",
    role: "[ADD REAL ROLE DETAIL HERE]",
    whatIBuilt: [
      "A cinematic, mobile-first React Native app for discovering nightlife events, offers, bars, and clubs",
      "[ADD REAL BACKEND / INFRASTRUCTURE DETAIL HERE]",
    ],
    architecture: "[ADD REAL ARCHITECTURE HERE]",
    challenges: "[ADD REAL ENGINEERING CHALLENGES HERE]",
    solution: "[ADD REAL SOLUTION NARRATIVE HERE]",
    technology: ["React Native", "NextJS"],
    outcome: null,
  },
  {
    projectSlug: "saas-platform-mobile-application",
    overview:
      "The mobile client for an existing SaaS platform, rebuilding its web experience as a dedicated React Native application.",
    problem: "[ADD REAL PROBLEM STATEMENT HERE]",
    role: "Lead front-end developer. Helped plan and design the product, and set up its initial backend.",
    whatIBuilt: [
      "Led front-end development of the mobile client in React Native",
      "Helped plan and design the product alongside the team",
      "Set up the initial backend (PHP, Symfony, API Platform) and data layer (PostgreSQL, MongoDB)",
    ],
    architecture: "[ADD REAL ARCHITECTURE HERE]",
    challenges: "[ADD REAL ENGINEERING CHALLENGES HERE]",
    solution: "[ADD REAL SOLUTION NARRATIVE HERE]",
    technology: ["React Native", "PHP", "Symfony", "api-platform", "PostgreSQL", "MongoDB"],
    outcome: null,
  },
]

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.projectSlug === slug)
}

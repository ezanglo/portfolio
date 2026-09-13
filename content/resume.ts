/** Resume-only fields — not part of `SiteContent`/`Experience`/`Project` because nothing else
 * on the site needs them. Consumed by `app/cv-ezra-anglo.pdf/route.tsx`, which otherwise reuses
 * `SITE` (including `SITE.role` for the resume's job-title line), `WORK_EXPERIENCE`, `SKILLS`,
 * and `PROJECTS` directly so the resume stays in sync with the rest of the portfolio's content. */
export const RESUME = {
  phone: "+63 952 470 2034",
  portfolioUrl: "https://www.ezraanglo.com",
  summary:
    "Senior product engineer with 10+ years of experience building and shipping production mobile and full-stack products, from React Native and Expo interfaces through the APIs, databases, infrastructure, and AI integrations behind them. I own products end to end (architecture, implementation, and production) across multiple languages, frameworks, and cloud platforms.",
  /** `content/experience.ts` slugs to leave off the one-page resume — older/lower-relevance
   * history, kept in `WORK_EXPERIENCE` for the site but not printed here. */
  excludedExperienceSlugs: ["freelance-software-developer-freelance"] as string[],
}

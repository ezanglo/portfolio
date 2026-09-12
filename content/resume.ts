/** Resume-only fields — not part of `SiteContent`/`Experience`/`Project` because nothing else
 * on the site needs them. Consumed by `app/cv-ezra-anglo.pdf/route.tsx`, which otherwise reuses
 * `SITE` (including `SITE.role` for the resume's job-title line), `WORK_EXPERIENCE`, `SKILLS`,
 * and `PROJECTS` directly so the resume stays in sync with the rest of the portfolio's content. */
export const RESUME = {
  phone: "+63 952 470 2034",
  portfolioUrl: "https://www.ezraanglo.com",
  summary:
    "Full-stack developer with 10+ years of experience building web, mobile, and AI-powered applications. I enjoy leading projects, optimizing infrastructure, and creating scalable solutions. My expertise spans multiple languages, frameworks, and cloud platforms, enabling me to adapt quickly and deliver high-quality, user-focused products.",
  /** `content/experience.ts` slugs to leave off the one-page resume — older/lower-relevance
   * history, kept in `WORK_EXPERIENCE` for the site but not printed here. */
  excludedExperienceSlugs: ["freelance-software-developer-freelance"] as string[],
}

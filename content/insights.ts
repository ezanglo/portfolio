/**
 * §22 Insights. Only two articles ship — both built entirely from facts already
 * established elsewhere in this repo (`lib/portfolio/narrative.ts`, `content/projects.ts`,
 * `content/experience.ts`), never generic AI-generated SEO filler. If a future topic can't
 * be grounded the same way, it doesn't get published rather than being written thin.
 */
export interface Article {
  slug: string
  title: string
  description: string
  body: string[]
  /** ISO date. Feeds `BlogPosting.datePublished`/`dateModified` (see
   * `app/(site)/insights/[slug]/page.tsx`) and `sitemap.ts`'s `lastModified` — bump `updatedAt`
   * whenever this entry's content actually changes. */
  publishedAt: string
  updatedAt: string
}

export const ARTICLES: Article[] = [
  {
    slug: "how-i-use-claude-code-as-a-senior-full-stack-developer",
    title: "How I Use Claude Code as a Senior Full-Stack Developer",
    description:
      "AI accelerates development. Experience guides the engineering decisions — what that actually looks like day to day.",
    publishedAt: "2026-09-12",
    updatedAt: "2026-09-12",
    body: [
      "I treat Claude Code the way I'd treat a very fast, very literal junior engineer who never gets tired: genuinely useful for the mechanical work, and never the one making the calls that matter.",
      "The loop I run is the same one I'd run without it — understand the problem, plan the change, implement, review, test, ship — with one difference: the implementation step is now AI-assisted rather than something I type end to end myself. I still scope the slice small enough to ship in a day. I still decide what \"done\" means before opening an editor.",
      "Where it actually earns its keep is the mechanical work: scaffolding a new screen or endpoint from an existing pattern, refactoring a component after a data-model change ripples through a dozen call sites, hunting down where a regression was introduced, or mapping an unfamiliar part of a codebase before I touch it. That's real time back — hours that used to go to typing and searching now go to the decisions that actually need judgment.",
      "What doesn't move is architecture, security, and what ships to production. I review every diff the same way I'd review a pull request from a teammate — not a rubber stamp because \"the AI wrote it.\" If I can't explain why a change is correct, it doesn't ship, regardless of who or what typed it.",
      "This site itself was built this way — in the same small, reviewable slices, held to the same bar. AI accelerated the build. It didn't make the calls about what the site should say or how it should be structured. That distinction is the whole point.",
    ],
  },
  {
    slug: "what-full-stack-experience-changes-about-mobile-development",
    title: "What Full-Stack Experience Changes About Mobile Development",
    description:
      "A mobile app rarely exists on its own. Here's what owning the backend too actually changes about how I build the app.",
    publishedAt: "2026-09-12",
    updatedAt: "2026-09-12",
    body: [
      "A lot of React Native work stops at the screen: consume the API someone else built, render the data, handle the loading and error states, ship. That's a legitimate way to work, and plenty of good mobile engineers do exactly that. It's not how I got here, though, and it's not how I build now.",
      "Before I specialized in React Native, I spent years as a full-stack web developer — sole backend developer on YuVee (Laravel, MySQL, and the Docker deployment to AWS behind it), full-stack on the Real-time RFID Registration system, building APIs on AWS Lambda and API Gateway for Disguised Mari Web. On the SaaS Platform Mobile Application, I wasn't just the lead front-end developer for the React Native client — I helped plan and design the product, and set up its initial backend on PHP, Symfony, and API Platform, with PostgreSQL and MongoDB underneath.",
      "That background changes concrete decisions on the mobile side. When an API is slow, I can tell whether the fix belongs in the client's caching strategy or in the query on the other end, instead of guessing. When auth breaks in a weird way, I know what a session or token actually looks like server-side, not just what the SDK's error message says. When a product needs offline support, or a new integration, or a change to how data is structured, I can reason about the whole system, not just the screen in front of me.",
      "It also changes what I can offer a client. \"I can own the mobile app and the backend it depends on\" is a different, stronger proposition than \"I can build the screens if someone else builds the API.\" It's fewer people in the loop, fewer integration surprises, and one person who understands the product end to end.",
      "None of this replaces deep React Native expertise — it sits underneath it. The mobile work is still the specialization. The full-stack background is what makes the mobile work more likely to hold up once it meets a real backend, real infrastructure, and real users.",
    ],
  },
]

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug)
}

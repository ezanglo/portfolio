/** §17 FAQ. Every answer is grounded in what's actually in `content/experience.ts` and
 * `content/projects.ts` — the App Store/Play Store and international-work answers in
 * particular only state what those files support (see `docs/build-plan.md` open items). */
export interface FaqItem {
  question: string
  answer: string
}

export const FAQ: FaqItem[] = [
  {
    question: "Can you build a complete React Native application?",
    answer:
      "Yes. I work across the whole product — the mobile UI, the backend APIs, the database, third-party integrations, and deployment — not just the screens.",
  },
  {
    question: "Do you work with Expo?",
    answer: "Yes, Expo is part of my current React Native toolset for building and shipping production apps.",
  },
  {
    question: "Can you take over an existing React Native application?",
    answer:
      "Yes. I've worked inside existing codebases as part of a team rather than only greenfield builds, and I'm comfortable reading an unfamiliar app's structure, fixing what's broken, and extending it safely.",
  },
  {
    question: "Can you build an MVP?",
    answer:
      "Yes. I take a product from architecture and initial development through testing and launch, in short, verifiable slices rather than one long unreviewed build.",
  },
  {
    question: "Can you build the backend too?",
    answer:
      "Yes — this is a core part of what I do. I've been the sole backend developer on production applications, set up initial backend infrastructure for a mobile SaaS product, and built APIs on AWS Lambda and API Gateway. Full-stack ownership is the differentiator, not an afterthought.",
  },
  {
    question: "Can you add AI features to a mobile application?",
    answer:
      "Yes. I've shipped an AI chat experience across mobile and web (WIN(win) AI) and integrated multiple LLM providers into production products. I add AI where it creates real value, not as decoration.",
  },
  {
    question: "Can you handle App Store and Google Play submission?",
    answer:
      "Submission — builds, provisioning, and store listings for both platforms — is part of the standard release process I follow when taking a mobile product to launch, alongside the production infrastructure behind it.",
  },
  {
    question: "Do you work internationally?",
    answer:
      "Yes. I've worked remotely for companies outside the Philippines, including Stream.TV in the Cayman Islands and NET(net) Inc. in Kentucky, USA.",
  },
]

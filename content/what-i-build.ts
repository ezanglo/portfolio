/** §35 "What I Build" — distinct from `content/services.ts`, which is how the work is
 * engaged; this is the shape of the product itself. */
export interface BuildCategory {
  slug: string
  title: string
  description: string
}

export const WHAT_I_BUILD: BuildCategory[] = [
  {
    slug: "consumer-mobile-apps",
    title: "Consumer Mobile Apps",
    description: "Production iOS and Android experiences.",
  },
  {
    slug: "saas-mobile-applications",
    title: "SaaS Mobile Applications",
    description: "Mobile clients connected to complete SaaS platforms and backend systems.",
  },
  {
    slug: "ai-powered-applications",
    title: "AI-Powered Applications",
    description: "Mobile experiences enhanced with LLM and AI functionality.",
  },
  {
    slug: "business-applications",
    title: "Business Applications",
    description: "Internal tools, operational applications, registration systems, and specialized business software.",
  },
  {
    slug: "full-stack-products",
    title: "Full-Stack Products",
    description: "Mobile applications with APIs, authentication, databases, integrations, and infrastructure.",
  },
]

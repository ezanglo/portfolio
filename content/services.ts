/** §6 service lines. React Native stays visually first; full-stack is the deeper capability
 * behind it; AI is a supporting line, not the headline. */
export interface Service {
  slug: string
  title: string
  description: string
}

export const SERVICES: Service[] = [
  {
    slug: "react-native-app-development",
    title: "React Native App Development",
    description:
      "Build production-ready iOS and Android applications using React Native, Expo, and TypeScript.",
  },
  {
    slug: "mobile-mvp-development",
    title: "Mobile MVP Development",
    description:
      "Take a product idea from architecture and initial development through testing and App Store / Google Play launch.",
  },
  {
    slug: "existing-react-native-applications",
    title: "Existing React Native Applications",
    description:
      "Take over, maintain, modernize, debug, refactor, or extend existing React Native applications.",
  },
  {
    slug: "full-stack-mobile-development",
    title: "Full-Stack Mobile Development",
    description:
      "Build the mobile application together with the APIs, authentication, database, integrations, backend systems, and infrastructure behind it.",
  },
  {
    slug: "ai-features-for-mobile-products",
    title: "AI Features for Mobile Products",
    description:
      "Integrate AI-powered experiences including conversational interfaces, LLM-powered workflows, intelligent search, recommendations, and other AI functionality where appropriate.",
  },
]

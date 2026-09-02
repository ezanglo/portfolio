import type { PortfolioData } from "@/lib/portfolio/types";
import type { KnowledgeEntry } from "./matcher";

export const CHAT_FALLBACK =
  "The AI backend is unreachable right now, so here's a scripted answer instead. Try asking about his React Native work, AI projects, skills, experience, or how to contact him.";

export function buildKnowledge(data: PortfolioData): KnowledgeEntry[] {
  const { identity, bio, skills, projects, experience } = data;

  const nativeProjects = projects.filter((p) => p.grid.includes("React Native"));
  const aiProjects = projects.filter((p) => p.engine && ["claude", "gemini", "vertex"].includes(p.engine));

  const entries: KnowledgeEntry[] = [
    {
      id: "react-native",
      priority: 5,
      phrases: ["react native"],
      words: ["mobile", "ios", "android", "native", "xamarin"],
      text:
        nativeProjects.length > 0
          ? `${identity.name.split(" ")[0]} has shipped React Native apps like ${nativeProjects
              .slice(0, 3)
              .map((p) => p.title)
              .join(", ")}. He's ${identity.yearsExperience} years into full-stack work, with mobile a growing focus.`
          : `${identity.name.split(" ")[0]} builds mobile apps with React Native and Xamarin.`,
    },
    {
      id: "ai",
      priority: 4,
      phrases: ["artificial intelligence", "generative ai", "vertex ai"],
      words: ["ai", "chatbot", "gpt", "llm", "vertex", "generative"],
      text:
        aiProjects.length > 0
          ? `He's built AI-integrated products including ${aiProjects
              .slice(0, 3)
              .map((p) => p.title)
              .join(", ")}, orchestrating Claude, Gemini, and Vertex AI.`
          : `${identity.name.split(" ")[0]} builds AI-integrated products across Claude, Gemini, and Vertex AI.`,
    },
    {
      id: "skills",
      priority: 2,
      phrases: [],
      words: ["skill", "skills", "stack", "tech", "language", "framework"],
      text: `Main stack: ${skills.flat.slice(0, 10).join(", ")}, and roughly ${Math.max(
        skills.flat.length - 10,
        0
      )} other tools.`,
    },
    {
      id: "experience",
      priority: 3,
      phrases: ["work history", "how many years"],
      words: ["experience", "career", "years", "job"],
      text: `${identity.yearsExperience} years of experience. Most recently: ${experience
        .slice(0, 2)
        .map((e) => `${e.title} @ ${e.company}`)
        .join("; ")}.`,
    },
    {
      id: "projects",
      priority: 1,
      phrases: ["built", "work on"],
      words: ["project", "projects", "portfolio"],
      text: `${projects.length} projects total, spanning Web, Mobile, Desktop, and AI-integrated builds.`,
    },
    {
      id: "contact",
      priority: 6,
      phrases: ["get in touch", "reach him", "how do i reach"],
      words: ["contact", "hire", "email", "reach", "available"],
      text: `You can reach him at ${identity.email}.`,
    },
    {
      id: "cv",
      priority: 1,
      phrases: [],
      words: ["cv", "resume"],
      text: identity.cvUrl ? `Here's his CV: ${identity.cvUrl}` : `A CV link isn't configured yet. Try the contact form.`,
    },
    {
      id: "about",
      priority: 1,
      phrases: ["who are you", "who is ezra", "who is he"],
      words: ["about", "background"],
      text: bio.thirdPerson.join(" "),
    },
    {
      id: "linkedin",
      priority: 1,
      phrases: [],
      words: ["linkedin"],
      text: `LinkedIn: ${identity.linkedinUrl}`,
    },
    {
      id: "github",
      priority: 1,
      phrases: [],
      words: ["github"],
      text: `GitHub: ${identity.githubUrl}`,
    },
  ];

  return entries;
}

export function buildQuickReplies(): string[] {
  return ["React Native work", "AI projects", "Experience", "Contact him"];
}

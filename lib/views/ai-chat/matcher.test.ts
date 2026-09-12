import { describe, expect, it } from "vitest";
import { buildKnowledge, CHAT_FALLBACK } from "./knowledge";
import { matchAnswer } from "./matcher";
import { buildPortfolioData } from "@/lib/portfolio/derive";

const data = buildPortfolioData({
  experiences: [
    {
      slug: "senior-full-stack-developer-net-net-inc",
      title: "Senior Full Stack Developer",
      company: "NET(net) Inc.",
      yearRange: "2019 - 2023",
      dateRange: "January 2019 - July 2023",
      location: "Remote",
      description: "",
      responsibilities: [],
      icon: "code",
      order: 1,
    },
  ],
  projects: [
    {
      slug: "finn-ai-ops",
      title: "Finn AI Ops",
      description: "",
      type: "web",
      tags: ["ai"],
      liveUrl: null,
      githubUrl: null,
      order: 1,
      featured: false,
      engine: "claude",
      personal: false,
    },
    {
      slug: "opic-nightlife-app",
      title: "OPIC - Nightlife App",
      description: "",
      type: "mobile",
      tags: ["react native"],
      liveUrl: null,
      githubUrl: null,
      order: 2,
      featured: false,
      engine: "native",
      personal: false,
    },
  ],
  skills: [{ name: "React", category: "frontend", order: 1, featured: false }],
  site: {
    siteName: "Ezra Anglo Portfolio",
    name: "Ezra",
    role: "Senior React Native Developer",
    tagline: "tagline",
    taglineHighlight: "React Native",
    email: "dev.ezraanglo@gmail.com",
    linkedinUrl: "https://www.linkedin.com/in/ezraanglo",
    githubUrl: "https://www.github.com/ezanglo",
    portraitUrl: "/images/ezra-anglo.png",
    cvUrl: "/cv-ezra-anglo.pdf",
    mainStack: "React, TypeScript",
    additionalTech: "Expo",
    careerStatus: "contract work",
    bio: [],
    yearsExperience: "10+",
    tokenSavings: "92%",
    enginesOrchestrated: "4",
    processIntro: "process",
    pitchIntro: "pitch",
    aiEngineeringIntro: "ai",
    copyright: "© 2026 Ezra Anglo.",
    techStack: "Next.js",
  },
});

const knowledge = buildKnowledge(data);

function answerId(question: string) {
  return matchAnswer(knowledge, question, CHAT_FALLBACK).entryId;
}

describe("ai-chat matcher — reference bug fix", () => {
  it.each([
    ["email", "contact"],
    ["available", "contact"],
    ["how do I reach him", "contact"],
    ["ai projects", "ai"],
    ["tell me about his react native work", "react-native"],
    ["what's your stack", "skills"],
    ["chatbot", "ai"],
    ["mobile", "react-native"],
    ["how many years", "experience"],
  ])("%s -> %s", (question, expected) => {
    expect(answerId(question)).toBe(expected);
  });

  it("falls back on nonsense input", () => {
    const result = matchAnswer(knowledge, "asdfgh", CHAT_FALLBACK);
    expect(result.entryId).toBeNull();
    expect(result.text).toBe(CHAT_FALLBACK);
  });
});

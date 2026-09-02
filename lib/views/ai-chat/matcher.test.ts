import { describe, expect, it } from "vitest";
import { buildKnowledge, CHAT_FALLBACK } from "./knowledge";
import { matchAnswer } from "./matcher";
import { buildPortfolioData } from "@/lib/portfolio/derive";

const data = buildPortfolioData({
  experiences: [
    {
      id: 1,
      title: "Senior Full Stack Developer",
      company: "NET(net) Inc.",
      year: "2019 - 2023",
      date: "",
      location: "Remote",
      description: "",
      responsibilities: [],
      icon: "code",
      order: 1,
      updatedAt: "",
      createdAt: "",
    },
  ],
  projects: [
    {
      id: 1,
      title: "Finn AI Ops",
      description: "",
      type: "web",
      tags: [{ tag: "ai" }],
      imageUrl: null,
      liveUrl: null,
      githubUrl: null,
      order: 1,
      featured: false,
      aiEngine: "claude",
      personal: false,
      updatedAt: "",
      createdAt: "",
    },
    {
      id: 2,
      title: "OPIC - Nightlife App",
      description: "",
      type: "mobile",
      tags: [{ tag: "react native" }],
      imageUrl: null,
      liveUrl: null,
      githubUrl: null,
      order: 2,
      featured: false,
      aiEngine: "native",
      personal: false,
      updatedAt: "",
      createdAt: "",
    },
  ],
  skills: [{ id: 1, name: "React", category: "frontend", order: 1, featured: false, updatedAt: "", createdAt: "" }],
  siteConfig: null,
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

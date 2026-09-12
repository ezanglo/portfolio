import { describe, expect, it } from "vitest";
import { completeCommand, recallHistory, runCommand, buildTerminalProgram, formatProjects } from "./commands";
import { buildPortfolioData } from "@/lib/portfolio/derive";

const data = buildPortfolioData({
  experiences: [],
  projects: [
    {
      slug: "finn-ai-ops",
      title: "Finn AI Ops",
      description: "desc",
      type: "web",
      tags: ["ai"],
      liveUrl: null,
      githubUrl: null,
      order: 1,
      featured: false,
      engine: "claude",
      personal: false,
    },
  ],
  skills: [],
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

const program = buildTerminalProgram(data);

describe("runCommand", () => {
  it("handles help", () => {
    const result = runCommand(program, "help");
    expect(result).toEqual({ type: "output", text: program.outputs.help });
  });

  it("reports unknown commands", () => {
    const result = runCommand(program, "frobnicate");
    expect(result).toEqual({
      type: "output",
      text: 'Command not found: "frobnicate". Type "help" for a list of commands.',
    });
  });

  it("clears on clear", () => {
    expect(runCommand(program, "clear")).toEqual({ type: "clear" });
  });

  it("no-ops on empty input", () => {
    expect(runCommand(program, "   ")).toEqual({ type: "noop" });
  });
});

describe("formatProjects", () => {
  it("filters by tag", () => {
    expect(formatProjects(program, "ai")).toContain("Finn AI Ops");
    expect(formatProjects(program, "mobile")).toContain("No projects tagged");
  });
});

describe("completeCommand", () => {
  it("completes an unambiguous prefix", () => {
    expect(completeCommand(program, "pro").completion).toBe("projects");
  });

  it("returns all candidates for an empty partial", () => {
    expect(completeCommand(program, "").candidates.length).toBe(program.commands.length);
  });
});

describe("recallHistory", () => {
  const submitted = ["help", "skills"];

  it("steps back on ArrowUp", () => {
    expect(recallHistory(submitted, 0, -1)).toEqual({ value: "skills", cursor: 1 });
    expect(recallHistory(submitted, 1, -1)).toEqual({ value: "help", cursor: 2 });
  });

  it("clamps at the oldest entry", () => {
    expect(recallHistory(submitted, 2, -1)).toEqual({ value: "help", cursor: 2 });
  });

  it("returns to an empty draft at cursor 0", () => {
    expect(recallHistory(submitted, 1, 1)).toEqual({ value: "", cursor: 0 });
  });
});

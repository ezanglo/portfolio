import { describe, expect, it } from "vitest";
import { completeCommand, recallHistory, runCommand, buildTerminalProgram, formatProjects } from "./commands";
import { buildPortfolioData } from "@/lib/portfolio/derive";

const data = buildPortfolioData({
  experiences: [],
  projects: [
    {
      id: 1,
      title: "Finn AI Ops",
      description: "desc",
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
  ],
  skills: [],
  siteConfig: null,
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

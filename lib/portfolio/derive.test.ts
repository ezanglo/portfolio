import { describe, expect, it } from "vitest";
import { buildPortfolioData, slugify, initials } from "./derive";
import type { Experience, Project, Skill } from "@/payload-types";

function makeProject(overrides: Partial<Project> = {}): Project {
  return {
    id: 1,
    title: "Finn AI Ops",
    description: "An AI ops tool.",
    type: "web",
    tags: [{ tag: "ai" }],
    imageUrl: null,
    liveUrl: null,
    githubUrl: null,
    order: 1,
    featured: false,
    aiEngine: null,
    personal: false,
    updatedAt: "",
    createdAt: "",
    ...overrides,
  };
}

function makeExperience(overrides: Partial<Experience> = {}): Experience {
  return {
    id: 1,
    title: "Senior Full Stack Developer",
    company: "NET(net) Inc.",
    year: "2019 - 2023",
    date: "January 2019 - December 2023",
    location: "Remote",
    description: "Built things.",
    responsibilities: [],
    icon: "code",
    order: 1,
    updatedAt: "",
    createdAt: "",
    ...overrides,
  };
}

function makeSkill(overrides: Partial<Skill> = {}): Skill {
  return {
    id: 1,
    name: "React",
    category: "frontend",
    order: 1,
    featured: false,
    updatedAt: "",
    createdAt: "",
    ...overrides,
  };
}

describe("buildPortfolioData", () => {
  it("gives every project a non-empty grid", () => {
    const data = buildPortfolioData({
      experiences: [makeExperience()],
      projects: [
        makeProject({ id: 1, type: "web" }),
        makeProject({ id: 2, type: "mobile", tags: [{ tag: "react native" }] }),
        makeProject({ id: 3, type: "desktop", personal: true }),
      ],
      skills: [makeSkill()],
      siteConfig: null,
    });

    for (const project of data.projects) {
      expect(project.grid.length).toBeGreaterThan(0);
    }
  });

  it("produces a stable iconBg across repeated calls", () => {
    const input = {
      experiences: [makeExperience()],
      projects: [makeProject({ id: 1 }), makeProject({ id: 2, title: "WIN(win) AI" })],
      skills: [makeSkill()],
      siteConfig: null,
    };
    const first = buildPortfolioData(input);
    const second = buildPortfolioData(input);
    expect(first.projects.map((p) => p.store.iconBg)).toEqual(second.projects.map((p) => p.store.iconBg));
  });

  it("adds Mobile alongside React Native", () => {
    const data = buildPortfolioData({
      experiences: [],
      projects: [makeProject({ type: "mobile", tags: [{ tag: "react native" }] })],
      skills: [],
      siteConfig: null,
    });
    expect(data.projects[0].grid).toContain("React Native");
    expect(data.projects[0].grid).toContain("Mobile");
  });

  it("derives PROJECTS SHIPPED from the actual project count, never hardcoded", () => {
    const data = buildPortfolioData({
      experiences: [],
      projects: [makeProject({ id: 1 }), makeProject({ id: 2 })],
      skills: [],
      siteConfig: null,
    });
    const stat = data.stats.find((s) => s.key === "projects");
    expect(stat?.value).toBe("2");
  });
});

describe("slugify", () => {
  it("lowercases and hyphenates", () => {
    expect(slugify("Finn AI Ops")).toBe("finn-ai-ops");
    expect(slugify("HALOMET: Voice Command Navigation")).toBe("halomet-voice-command-navigation");
  });
});

describe("initials", () => {
  it("takes first letters of the first two words", () => {
    expect(initials("Finn AI Ops")).toBe("FA");
  });
  it("falls back to first two chars for single-word titles", () => {
    expect(initials("YuVee")).toBe("YU");
  });
});

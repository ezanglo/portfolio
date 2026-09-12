import { describe, expect, it } from "vitest";
import { buildPortfolioData, slugify, initials } from "./derive";
import type { Experience, Project, SiteContent, Skill } from "@/content/types";

function makeProject(overrides: Partial<Project> = {}): Project {
  return {
    slug: "finn-ai-ops",
    title: "Finn AI Ops",
    description: "An AI ops tool.",
    type: "web",
    tags: ["ai"],
    featured: false,
    personal: false,
    engine: null,
    liveUrl: null,
    githubUrl: null,
    order: 1,
    ...overrides,
  };
}

function makeExperience(overrides: Partial<Experience> = {}): Experience {
  return {
    slug: "senior-full-stack-developer-net-net-inc",
    title: "Senior Full Stack Developer",
    company: "NET(net) Inc.",
    yearRange: "2019 - 2023",
    dateRange: "January 2019 - December 2023",
    location: "Remote",
    description: "Built things.",
    icon: "code",
    responsibilities: [],
    order: 1,
    ...overrides,
  };
}

function makeSkill(overrides: Partial<Skill> = {}): Skill {
  return { name: "React", category: "frontend", featured: false, order: 1, ...overrides };
}

function makeSite(overrides: Partial<SiteContent> = {}): SiteContent {
  return {
    siteName: "Ezra Anglo Portfolio",
    name: "Ezra",
    role: "Senior React Native Developer",
    tagline: "tagline",
    taglineHighlight: "React Native",
    email: "test@example.com",
    linkedinUrl: "https://linkedin.test",
    githubUrl: "https://github.test",
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
    copyright: "© 2026",
    techStack: "Next.js",
    ...overrides,
  };
}

describe("buildPortfolioData", () => {
  it("gives every project a non-empty grid", () => {
    const data = buildPortfolioData({
      experiences: [makeExperience()],
      projects: [
        makeProject({ slug: "a", type: "web" }),
        makeProject({ slug: "b", type: "mobile", tags: ["react native"] }),
        makeProject({ slug: "c", type: "desktop", personal: true }),
      ],
      skills: [makeSkill()],
      site: makeSite(),
    });

    for (const project of data.projects) {
      expect(project.grid.length).toBeGreaterThan(0);
    }
  });

  it("produces a stable iconBg across repeated calls", () => {
    const input = {
      experiences: [makeExperience()],
      projects: [makeProject({ slug: "a" }), makeProject({ slug: "b", title: "WIN(win) AI" })],
      skills: [makeSkill()],
      site: makeSite(),
    };
    const first = buildPortfolioData(input);
    const second = buildPortfolioData(input);
    expect(first.projects.map((p) => p.store.iconBg)).toEqual(second.projects.map((p) => p.store.iconBg));
  });

  it("adds Mobile alongside React Native", () => {
    const data = buildPortfolioData({
      experiences: [],
      projects: [makeProject({ type: "mobile", tags: ["react native"] })],
      skills: [],
      site: makeSite(),
    });
    expect(data.projects[0].grid).toContain("React Native");
    expect(data.projects[0].grid).toContain("Mobile");
  });

  it("derives PROJECTS SHIPPED from the actual project count, never hardcoded", () => {
    const data = buildPortfolioData({
      experiences: [],
      projects: [makeProject({ slug: "a" }), makeProject({ slug: "b" })],
      skills: [],
      site: makeSite(),
    });
    const stat = data.stats.find((s) => s.key === "projects");
    expect(stat?.value).toBe("2");
  });

  it("falls back to the generated bio when content ships an empty one", () => {
    const data = buildPortfolioData({
      experiences: [],
      projects: [],
      skills: [],
      site: makeSite({ bio: [] }),
    });
    expect(data.bio.long.length).toBeGreaterThan(0);
  });

  it("uses authored bio paragraphs when present", () => {
    const data = buildPortfolioData({
      experiences: [],
      projects: [],
      skills: [],
      site: makeSite({ bio: ["First.", "Second."] }),
    });
    expect(data.bio.long).toEqual(["First.", "Second."]);
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

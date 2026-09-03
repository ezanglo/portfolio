import type { NormalizedProject, PortfolioData } from "@/lib/portfolio/types";
import type { IdeFileKind } from "./filesystem";

export interface IdeFileContent {
  kind: IdeFileKind;
  text: string;
  wrap: "pre" | "pre-wrap";
}

export function renderAboutMd(data: PortfolioData): string {
  const { identity, bio } = data;
  return [
    "// about.md",
    "",
    `Name: ${identity.name}`,
    `Role: ${identity.role}`,
    `Experience: ${identity.yearsExperience} years`,
    `Location: available on request`,
    "",
    "Bio:",
    ...bio.thirdPerson,
  ].join("\n");
}

export function renderProcessMd(data: PortfolioData): string {
  const { process } = data;
  return [
    "// how-i-work.md",
    "",
    process.intro,
    "",
    ...process.steps.flatMap((step, i) => {
      const lines = [`${String(i + 1).padStart(2, "0")}. ${step.label}`, `    ${step.description}`];
      if (step.tools.length > 0) lines.push(`    tools: ${step.tools.map((t) => t.name).join(", ")}`);
      return [...lines, ""];
    }),
    `## ${process.note.title}`,
    "",
    process.note.body,
  ]
    .join("\n")
    .trimEnd();
}

export function renderWhyMd(data: PortfolioData): string {
  const { pitch, stats } = data;
  return [
    "// why-hire-me.md",
    "",
    pitch.intro,
    "",
    ...pitch.points.flatMap((p) => [`- ${p.title}`, `  ${p.description}`, ""]),
    "Stats:",
    ...stats.map((s) => `  ${s.value.padEnd(6)} ${s.label.toLowerCase()}`),
  ]
    .join("\n")
    .trimEnd();
}

export function renderSkillsJson(data: PortfolioData): string {
  const groups = data.skills.grouped;
  const nonEmpty = Object.fromEntries(Object.entries(groups).filter(([, v]) => v.length > 0));
  return JSON.stringify(nonEmpty, null, 2);
}

export function renderExperienceLog(data: PortfolioData): string {
  return data.experience
    .map((e) => {
      const range = e.dateEnd === "Present" ? `${e.dateStart}-Present` : `${e.dateStart}-${e.dateEnd}`;
      return `[${range}] ${e.title}\n    @ ${e.company}, ${e.location}\n    ${e.description}`;
    })
    .join("\n\n");
}

export function renderContactTxt(data: PortfolioData): string {
  const { identity } = data;
  return [
    `email:    ${identity.email}`,
    `linkedin: ${identity.linkedinUrl}`,
    `github:   ${identity.githubUrl}`,
    `resume:   ${identity.cvUrl || "(not configured)"}`,
    `Status:   Open to full-time roles`,
  ].join("\n");
}

export function renderProjectMd(p: NormalizedProject): string {
  return [`// projects/${p.slug}.md`, "", p.description, "", `tags: ${p.tags.join(", ") || p.grid.join(", ")}`].join(
    "\n"
  );
}

export function buildIdeContent(data: PortfolioData): Record<string, IdeFileContent> {
  const content: Record<string, IdeFileContent> = {
    about: { kind: "md", text: renderAboutMd(data), wrap: "pre-wrap" },
    process: { kind: "md", text: renderProcessMd(data), wrap: "pre-wrap" },
    why: { kind: "md", text: renderWhyMd(data), wrap: "pre-wrap" },
    skills: { kind: "json", text: renderSkillsJson(data), wrap: "pre" },
    experience: { kind: "log", text: renderExperienceLog(data), wrap: "pre-wrap" },
    contact: { kind: "txt", text: renderContactTxt(data), wrap: "pre-wrap" },
  };

  for (const p of data.projects) {
    content[`projects/${p.slug}`] = { kind: "md", text: renderProjectMd(p), wrap: "pre-wrap" };
  }

  return content;
}

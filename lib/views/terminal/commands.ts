import type { PortfolioData } from "@/lib/portfolio/types";

export interface TerminalLine {
  kind: "input" | "output";
  text: string;
}

export interface TerminalCommandSpec {
  name: string;
  summary: string;
  args?: string[];
}

export interface TerminalProjectEntry {
  name: string;
  tags: string[];
  desc: string;
}

export interface TerminalProgram {
  banner: string;
  commands: TerminalCommandSpec[];
  outputs: Record<string, string>;
  projects: TerminalProjectEntry[];
  resumeUrl: string | null;
}

const PROJECT_FILTER_KEYS = ["ai", "mobile", "web"] as const;
type ProjectFilterKey = (typeof PROJECT_FILTER_KEYS)[number];

function projectMatchesFilter(p: TerminalProjectEntry, filter: ProjectFilterKey): boolean {
  const tags = p.tags.map((t) => t.toLowerCase());
  if (filter === "ai") return tags.includes("ai");
  if (filter === "mobile") return tags.includes("mobile") || tags.includes("react native");
  return tags.includes("web");
}

export function buildTerminalProgram(data: PortfolioData): TerminalProgram {
  const { identity, bio, skills, projects, experience, process, pitch, stats } = data;

  const commands: TerminalCommandSpec[] = [
    { name: "about", summary: "who is " + identity.name.split(" ")[0] },
    { name: "how", summary: "how he works, step by step" },
    { name: "why", summary: "why hire him" },
    { name: "skills", summary: "tech stack" },
    { name: "projects", summary: "list of work (try: projects ai / projects mobile)" },
    { name: "experience", summary: "career history" },
    { name: "contact", summary: "how to reach him" },
    { name: "resume", summary: "CV link" },
    { name: "clear", summary: "clear the screen" },
  ];

  const helpBody = commands.map((c) => `  ${c.name.padEnd(12)} ${c.summary}`).join("\n");

  const aboutText = bio.thirdPerson.join("\n\n");

  const skillsText = `Main stack: ${skills.flat.slice(0, 12).join(", ")}\n...and ~${Math.max(
    skills.flat.length - 12,
    0
  )} other tools.`;

  const experienceText = experience
    .map((e) => `[${e.dateStart}-${e.dateEnd}] ${e.title} @ ${e.company}`)
    .join("\n");

  const contactText = `email:    ${identity.email}\nlinkedin: ${identity.linkedinUrl}\ngithub:   ${identity.githubUrl}`;

  const processText = [
    process.intro,
    "",
    ...process.steps.map((step, i) => {
      const tools = step.tools.length > 0 ? `\n      tools: ${step.tools.map((t) => t.name).join(", ")}` : "";
      return `  ${String(i + 1).padStart(2, "0")}. ${step.label} — ${step.description}${tools}`;
    }),
    "",
    `${process.note.title}:`,
    `  ${process.note.body}`,
  ].join("\n");

  const whyText = [
    pitch.intro,
    "",
    ...pitch.points.map((p) => `  * ${p.title}\n      ${p.description}`),
    "",
    ...stats.map((s) => `  ${s.value.padEnd(5)} ${s.label.toLowerCase()}`),
  ].join("\n");

  const outputs: Record<string, string> = {
    help: `Available commands:\n${helpBody}`,
    about: aboutText,
    how: processText,
    why: whyText,
    skills: skillsText,
    experience: experienceText,
    contact: contactText,
    resume: identity.cvUrl ? `Opening resume: ${identity.cvUrl}` : "No resume URL configured.",
  };

  return {
    banner: `${identity.name}, interactive terminal portfolio. Type "help" to see available commands.`,
    commands,
    outputs,
    projects: projects.map((p) => ({ name: p.title, tags: p.grid, desc: p.description })),
    resumeUrl: identity.cvUrl || null,
  };
}

export function formatProjects(program: TerminalProgram, filter: string | null): string {
  const normalized = filter?.toLowerCase() ?? null;

  if (normalized && !PROJECT_FILTER_KEYS.includes(normalized as ProjectFilterKey)) {
    return `No projects tagged "${filter}". Try: projects ai / projects mobile / projects web`;
  }

  const matches = normalized
    ? program.projects.filter((p) => projectMatchesFilter(p, normalized as ProjectFilterKey))
    : program.projects;

  if (matches.length === 0) {
    return normalized
      ? `No projects tagged "${filter}". Try: projects ai / projects mobile / projects web`
      : "No projects found.";
  }

  return matches.map((p) => `${p.name}\n  ${p.desc}`).join("\n\n");
}

export type TerminalResult =
  | { type: "output"; text: string }
  | { type: "clear" }
  | { type: "noop" }
  | { type: "navigate"; href: string };

export function runCommand(program: TerminalProgram, raw: string): TerminalResult {
  const trimmed = raw.trim();
  if (trimmed === "") return { type: "noop" };

  const lower = trimmed.toLowerCase();

  if (lower === "clear") return { type: "clear" };

  if (lower === "resume" || lower.startsWith("resume ")) {
    if (program.resumeUrl) return { type: "navigate", href: program.resumeUrl };
    return { type: "output", text: program.outputs.resume };
  }

  if (lower === "projects" || lower.startsWith("projects ")) {
    const arg = lower.startsWith("projects ") ? lower.slice("projects ".length).trim() : "";
    return { type: "output", text: formatProjects(program, arg || null) };
  }

  if (lower in program.outputs) {
    return { type: "output", text: program.outputs[lower] };
  }

  return {
    type: "output",
    text: `Command not found: "${trimmed}". Type "help" for a list of commands.`,
  };
}

export function completeCommand(
  program: TerminalProgram,
  partial: string
): { completion: string | null; candidates: string[] } {
  const names = program.commands.map((c) => c.name);

  if (partial.startsWith("projects ")) {
    const sub = partial.slice("projects ".length);
    const matches = PROJECT_FILTER_KEYS.filter((k) => k.startsWith(sub));
    if (matches.length === 1) return { completion: `projects ${matches[0]}`, candidates: matches as unknown as string[] };
    return { completion: null, candidates: matches as unknown as string[] };
  }

  if (partial === "") {
    return { completion: null, candidates: names };
  }

  const matches = names.filter((n) => n.startsWith(partial));
  if (matches.length === 1) return { completion: matches[0], candidates: matches };
  return { completion: null, candidates: matches };
}

export function recallHistory(
  submitted: string[],
  cursor: number,
  dir: -1 | 1
): { value: string; cursor: number } {
  if (submitted.length === 0) return { value: "", cursor: 0 };

  let nextCursor = cursor + (dir === -1 ? 1 : -1);
  nextCursor = Math.max(0, Math.min(nextCursor, submitted.length));

  if (nextCursor === 0) return { value: "", cursor: 0 };

  const value = submitted[submitted.length - nextCursor];
  return { value, cursor: nextCursor };
}

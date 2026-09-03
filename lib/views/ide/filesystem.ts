import type { PortfolioData } from "@/lib/portfolio/types";
import { slugify } from "@/lib/portfolio/derive";

export type IdeFileKind = "md" | "json" | "log" | "txt";

export type IdeNode =
  | { type: "file"; key: string; name: string; kind: IdeFileKind; dotColor?: string }
  | { type: "dir"; key: string; name: string; children: IdeNode[]; defaultExpanded: boolean; dotColor?: string };

export function buildIdeTree(data: PortfolioData): IdeNode[] {
  const projectChildren: IdeNode[] = data.projects.map((p) => ({
    type: "file",
    key: `projects/${p.slug}`,
    name: `${slugify(p.title)}.md`,
    kind: "md",
  }));

  return [
    { type: "file", key: "about", name: "about.md", kind: "md" },
    { type: "file", key: "process", name: "how-i-work.md", kind: "md" },
    { type: "file", key: "why", name: "why-hire-me.md", kind: "md" },
    { type: "file", key: "skills", name: "skills.json", kind: "json" },
    {
      type: "dir",
      key: "projects",
      name: "projects/",
      children: projectChildren,
      defaultExpanded: true,
      dotColor: "#47B777",
    },
    { type: "file", key: "experience", name: "experience.log", kind: "log" },
    { type: "file", key: "contact", name: "contact.txt", kind: "txt" },
  ];
}

export interface FlatRow {
  key: string;
  depth: number;
  type: "file" | "dir";
  parentKey: string | null;
}

export function flattenVisible(tree: IdeNode[], expanded: Record<string, boolean>): FlatRow[] {
  const rows: FlatRow[] = [];

  function walk(nodes: IdeNode[], depth: number, parentKey: string | null) {
    for (const node of nodes) {
      rows.push({ key: node.key, depth, type: node.type, parentKey });
      if (node.type === "dir") {
        const isOpen = expanded[node.key] ?? node.defaultExpanded;
        if (isOpen) walk(node.children, depth + 1, node.key);
      }
    }
  }

  walk(tree, 0, null);
  return rows;
}

export function findNode(tree: IdeNode[], key: string): IdeNode | null {
  for (const node of tree) {
    if (node.key === key) return node;
    if (node.type === "dir") {
      const found = findNode(node.children, key);
      if (found) return found;
    }
  }
  return null;
}

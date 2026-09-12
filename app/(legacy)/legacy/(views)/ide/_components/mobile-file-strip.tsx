import type { IdeNode } from "@/lib/views/ide/filesystem";

function flattenFiles(nodes: IdeNode[], prefix = ""): { key: string; label: string }[] {
  const out: { key: string; label: string }[] = [];
  for (const node of nodes) {
    if (node.type === "file") {
      out.push({ key: node.key, label: prefix ? `${prefix}${node.name}` : node.name });
    } else {
      out.push(...flattenFiles(node.children, node.name));
    }
  }
  return out;
}

export default function MobileFileStrip({
  tree,
  activeKey,
  onSelect,
}: {
  tree: IdeNode[];
  activeKey: string;
  onSelect: (key: string) => void;
}) {
  const files = flattenFiles(tree);
  return (
    <div className="flex shrink-0 gap-1.5 overflow-x-auto border-b border-view-border bg-view-surface px-3 py-2">
      {files.map((f) => (
        <button
          key={f.key}
          type="button"
          onClick={() => onSelect(f.key)}
          className={`shrink-0 rounded px-2.5 py-1.5 font-mono text-xs ${
            f.key === activeKey ? "bg-view-surface-2 text-[var(--view-fg-active)]" : "text-view-fg-muted"
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}

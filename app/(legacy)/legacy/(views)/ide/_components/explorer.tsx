"use client";

import { useRef } from "react";
import type { IdeNode } from "@/lib/views/ide/filesystem";
import { flattenVisible } from "@/lib/views/ide/filesystem";
import TreeRow from "./tree-row";

export default function Explorer({
  tree,
  activeKey,
  expanded,
  focusedKey,
  onSelect,
  onToggle,
  onFocus,
  className,
}: {
  tree: IdeNode[];
  activeKey: string;
  expanded: Record<string, boolean>;
  focusedKey: string | null;
  onSelect: (key: string) => void;
  onToggle: (key: string) => void;
  onFocus: (key: string) => void;
  className?: string;
}) {
  const rowRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  function registerRef(key: string, el: HTMLDivElement | null) {
    if (el) rowRefs.current.set(key, el);
    else rowRefs.current.delete(key);
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    const rows = flattenVisible(tree, expanded);
    const currentIndex = rows.findIndex((r) => r.key === focusedKey);
    if (currentIndex === -1) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      const next = rows[Math.min(currentIndex + 1, rows.length - 1)];
      onFocus(next.key);
      rowRefs.current.get(next.key)?.focus();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      const prev = rows[Math.max(currentIndex - 1, 0)];
      onFocus(prev.key);
      rowRefs.current.get(prev.key)?.focus();
    } else if (event.key === "ArrowRight") {
      const row = rows[currentIndex];
      if (row.type === "dir" && !(expanded[row.key] ?? true)) {
        event.preventDefault();
        onToggle(row.key);
      }
    } else if (event.key === "ArrowLeft") {
      const row = rows[currentIndex];
      if (row.type === "dir" && (expanded[row.key] ?? true)) {
        event.preventDefault();
        onToggle(row.key);
      } else if (row.parentKey) {
        event.preventDefault();
        onFocus(row.parentKey);
        rowRefs.current.get(row.parentKey)?.focus();
      }
    } else if (event.key === "Enter" || event.key === " ") {
      const row = rows[currentIndex];
      event.preventDefault();
      if (row.type === "dir") onToggle(row.key);
      else onSelect(row.key);
    }
  }

  return (
    <nav className={className} aria-label="File explorer">
      <p className="px-[18px] pb-2 pt-4 font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--view-explorer-label)]">
        Explorer
      </p>
      <div role="tree" aria-label="Portfolio files" onKeyDown={handleKeyDown}>
        {tree.map((node) => (
          <TreeRow
            key={node.key}
            node={node}
            depth={0}
            activeKey={activeKey}
            expanded={expanded}
            focusedKey={focusedKey}
            onSelect={onSelect}
            onToggle={onToggle}
            onFocus={onFocus}
            registerRef={registerRef}
          />
        ))}
      </div>
    </nav>
  );
}

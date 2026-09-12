"use client";

import { useState } from "react";
import type { IdeNode } from "@/lib/views/ide/filesystem";
import { findNode } from "@/lib/views/ide/filesystem";
import type { IdeFileContent } from "@/lib/views/ide/content";
import Explorer from "./explorer";
import MobileFileStrip from "./mobile-file-strip";
import TabStrip from "./tab-strip";
import Editor from "./editor";

export default function Workspace({
  tree,
  content,
}: {
  tree: IdeNode[];
  content: Record<string, IdeFileContent>;
}) {
  const [activeKey, setActiveKey] = useState("about");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [focusedKey, setFocusedKey] = useState<string | null>("about");

  function toggle(key: string) {
    setExpanded((prev) => {
      const node = findNode(tree, key);
      const current = prev[key] ?? (node?.type === "dir" ? node.defaultExpanded : false);
      return { ...prev, [key]: !current };
    });
  }

  const activeNode = findNode(tree, activeKey);
  const activeLabel = activeNode?.type === "file" ? activeNode.name : activeKey;
  const activeContent = content[activeKey];

  return (
    <div className="flex min-h-0 flex-1">
      <Explorer
        tree={tree}
        activeKey={activeKey}
        expanded={expanded}
        focusedKey={focusedKey}
        onSelect={setActiveKey}
        onToggle={toggle}
        onFocus={setFocusedKey}
        className="hidden w-[230px] shrink-0 overflow-y-auto border-r border-view-border bg-[var(--view-surface)] min-[900px]:block"
      />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <div className="min-[900px]:hidden">
          <MobileFileStrip tree={tree} activeKey={activeKey} onSelect={setActiveKey} />
        </div>
        <TabStrip label={activeLabel} />
        {activeContent && <Editor content={activeContent} />}
      </div>
    </div>
  );
}

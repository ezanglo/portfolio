import type { IdeNode } from "@/lib/views/ide/filesystem";

export default function TreeRow({
  node,
  depth,
  activeKey,
  expanded,
  focusedKey,
  onSelect,
  onToggle,
  onFocus,
  registerRef,
}: {
  node: IdeNode;
  depth: number;
  activeKey: string;
  expanded: Record<string, boolean>;
  focusedKey: string | null;
  onSelect: (key: string) => void;
  onToggle: (key: string) => void;
  onFocus: (key: string) => void;
  registerRef: (key: string, el: HTMLDivElement | null) => void;
}) {
  const isDir = node.type === "dir";
  const isOpen = isDir ? expanded[node.key] ?? node.defaultExpanded : false;
  const isActive = node.key === activeKey;
  const isTabbable = node.key === (focusedKey ?? "about");

  function handleClick() {
    if (isDir) onToggle(node.key);
    else onSelect(node.key);
  }

  return (
    <>
      <div
        ref={(el) => registerRef(node.key, el)}
        role="treeitem"
        aria-expanded={isDir ? isOpen : undefined}
        aria-selected={isActive}
        tabIndex={isTabbable ? 0 : -1}
        onFocus={() => onFocus(node.key)}
        onClick={handleClick}
        style={{ paddingLeft: depth === 0 ? 18 : 18 + depth * 22 }}
        className={`flex cursor-pointer items-center gap-2 py-2 pr-4 font-mono text-[13.5px] outline-none focus-visible:bg-view-surface-2 ${
          isActive ? "bg-view-surface-2 text-[var(--view-fg-active)]" : "text-view-fg-muted hover:bg-view-surface-2/60"
        }`}
      >
        {node.dotColor && <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ background: node.dotColor }} />}
        <span>{node.name}</span>
      </div>
      {isDir && isOpen &&
        node.children.map((child) => (
          <TreeRow
            key={child.key}
            node={child}
            depth={depth + 1}
            activeKey={activeKey}
            expanded={expanded}
            focusedKey={focusedKey}
            onSelect={onSelect}
            onToggle={onToggle}
            onFocus={onFocus}
            registerRef={registerRef}
          />
        ))}
    </>
  );
}

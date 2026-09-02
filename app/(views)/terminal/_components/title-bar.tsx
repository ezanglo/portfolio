export default function TerminalTitleBar() {
  return (
    <div className="flex shrink-0 items-center gap-2 border-b border-view-border px-4 py-2.5">
      <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#E85A48" }} />
      <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#D3A813" }} />
      <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#54B85B" }} />
      <span className="ml-3 text-[13px] text-view-fg-subtle">ezra@portfolio: ~</span>
    </div>
  );
}

export default function TabStrip({ label }: { label: string }) {
  return (
    <div className="flex shrink-0 items-center border-b border-view-border bg-view-page">
      <span className="border-r border-view-border bg-view-surface-2 px-4 py-2 text-[13px] text-[var(--view-fg-active)]">
        {label}
      </span>
    </div>
  );
}

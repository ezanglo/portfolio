"use client";

export default function EngineChip({
  label,
  color,
  active,
  onSelect,
}: {
  label: string;
  color: string;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={onSelect}
      className={`flex items-center gap-2 rounded-full border px-3.5 py-2 text-[13px] font-medium transition ${
        active
          ? "border-view-accent bg-view-accent-soft text-view-fg"
          : "border-view-border text-view-fg-muted hover:border-view-fg-subtle"
      }`}
    >
      <span aria-hidden className="h-2 w-2 rounded-full" style={{ background: color }} />
      {label}
    </button>
  );
}

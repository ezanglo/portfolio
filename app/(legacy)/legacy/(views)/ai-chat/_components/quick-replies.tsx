export default function QuickReplies({
  replies,
  onSelect,
  disabled = false,
}: {
  replies: string[];
  onSelect: (text: string) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex shrink-0 flex-wrap gap-2 border-t border-view-border px-5 py-3 sm:px-7">
      {replies.map((reply) => (
        <button
          key={reply}
          type="button"
          onClick={() => onSelect(reply)}
          disabled={disabled}
          className="rounded-full bg-view-surface-2 px-3.5 py-2 font-mono text-[12.5px] text-view-fg-muted hover:text-view-fg disabled:opacity-60"
        >
          {reply}
        </button>
      ))}
    </div>
  );
}

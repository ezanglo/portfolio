export default function Composer({
  value,
  onChange,
  onSubmit,
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="flex shrink-0 gap-2 border-t border-view-border px-5 py-4 [padding-bottom:max(16px,env(safe-area-inset-bottom))] sm:px-7"
    >
      <label htmlFor="chat-input" className="sr-only">
        Ask a question
      </label>
      <input
        id="chat-input"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Ask about React Native, AI projects, experience..."
        className="flex-1 rounded-[10px] border border-view-border bg-view-surface px-3.5 py-2.5 text-[15px] text-view-fg outline-none focus-visible:border-view-accent"
      />
      <button
        type="submit"
        className="rounded-[10px] bg-view-accent px-4 py-2.5 text-sm font-semibold text-view-accent-fg"
      >
        Send
      </button>
    </form>
  );
}

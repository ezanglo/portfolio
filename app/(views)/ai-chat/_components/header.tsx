export default function AiChatHeader({ initials }: { initials: string }) {
  return (
    <header className="flex shrink-0 items-center gap-3 border-b border-view-border px-5 py-3.5 sm:px-7">
      <span className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-view-accent text-sm font-bold text-view-accent-fg">
        {initials}
      </span>
      <div className="flex-1">
        <p className="text-[15px] font-semibold text-view-fg">Ask about my work</p>
        <p className="flex items-center gap-1.5 text-[12.5px] text-view-fg-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
          online, ask me anything
        </p>
      </div>
      <p className="hidden font-mono text-[11px] text-view-fg-subtle sm:block">scripted demo · no data leaves this page</p>
    </header>
  );
}

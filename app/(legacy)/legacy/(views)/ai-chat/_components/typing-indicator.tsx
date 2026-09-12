export default function TypingIndicator() {
  return (
    <div className="flex justify-start" aria-hidden>
      <div className="flex items-center gap-1 rounded-[14px] bg-view-surface-2 px-[17px] py-[13px]">
        <span className="h-1.5 w-1.5 animate-[dotpulse_1.2s_ease-in-out_infinite] rounded-full bg-view-fg-subtle [animation-delay:0s]" />
        <span className="h-1.5 w-1.5 animate-[dotpulse_1.2s_ease-in-out_infinite] rounded-full bg-view-fg-subtle [animation-delay:.15s]" />
        <span className="h-1.5 w-1.5 animate-[dotpulse_1.2s_ease-in-out_infinite] rounded-full bg-view-fg-subtle [animation-delay:.3s]" />
      </div>
    </div>
  );
}

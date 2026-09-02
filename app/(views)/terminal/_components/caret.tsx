export default function Caret() {
  return (
    <span
      aria-hidden
      className="animate-blink inline-block h-[1.1em] w-[0.55em] translate-y-[2px] bg-[var(--view-caret)]"
    />
  );
}

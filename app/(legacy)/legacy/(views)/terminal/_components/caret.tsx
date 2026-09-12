export default function Caret({ style }: { style?: React.CSSProperties }) {
  return (
    <span
      aria-hidden
      style={style}
      className="animate-blink inline-block h-[1.2em] w-[0.55em] translate-y-[3px] bg-[var(--view-caret)]"
    />
  );
}

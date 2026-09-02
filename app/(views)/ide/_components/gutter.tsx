export default function Gutter({ lineCount }: { lineCount: number }) {
  return (
    <div
      aria-hidden="true"
      className="select-none pr-4 text-right text-[var(--view-gutter)] max-[480px]:hidden"
      style={{ minWidth: "3ch" }}
    >
      {Array.from({ length: lineCount }, (_, i) => (
        <div key={i}>{i + 1}</div>
      ))}
    </div>
  );
}

import type { TerminalLine } from "@/lib/views/terminal/commands";

export default function HistoryLine({ line }: { line: TerminalLine }) {
  if (line.kind === "input") {
    return (
      <p className="my-1.5">
        <span className="text-[var(--view-prompt)]">guest@ezraanglo.com &gt;</span> {line.text}
      </p>
    );
  }
  return <p className="my-1.5 whitespace-pre-wrap">{line.text}</p>;
}

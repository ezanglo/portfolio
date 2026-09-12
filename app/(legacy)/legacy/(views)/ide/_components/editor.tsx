import { highlight } from "@/lib/views/ide/highlight";
import type { IdeFileContent } from "@/lib/views/ide/content";
import Gutter from "./gutter";
import CodeLine from "./code-line";

export default function Editor({ content }: { content: IdeFileContent }) {
  const lines = highlight(content.text, content.kind);

  return (
    <div className="flex min-h-0 flex-1 overflow-auto px-6 py-5 font-mono text-[14.5px] leading-[1.85] max-[768px]:text-[13px] max-[768px]:leading-[1.7]">
      <Gutter lineCount={lines.length} />
      <div className="min-w-0 flex-1 overflow-x-auto">
        {lines.map((tokens, i) => (
          <CodeLine key={i} tokens={tokens} wrap={content.wrap} />
        ))}
      </div>
    </div>
  );
}

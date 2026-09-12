import type { Token, TokenType } from "@/lib/views/ide/highlight";

const TOKEN_COLOR: Record<TokenType, string> = {
  plain: "inherit",
  comment: "#6A9955",
  key: "#9CDCFE",
  string: "#CE9178",
  number: "#B5CEA8",
  punct: "var(--view-fg-muted)",
  bool: "#569CD6",
  heading: "var(--view-accent)",
  date: "var(--view-accent)",
  label: "#4EC9B0",
  url: "#569CD6",
};

export default function CodeLine({ tokens, wrap }: { tokens: Token[]; wrap: "pre" | "pre-wrap" }) {
  return (
    <div style={{ whiteSpace: wrap }}>
      {tokens.length === 0
        ? " "
        : tokens.map((tok, i) => (
            <span key={i} style={{ color: TOKEN_COLOR[tok.t] }}>
              {tok.v}
            </span>
          ))}
    </div>
  );
}

import type { IdeFileKind } from "./filesystem";

export type TokenType =
  | "plain"
  | "comment"
  | "key"
  | "string"
  | "number"
  | "punct"
  | "bool"
  | "heading"
  | "date"
  | "label"
  | "url";

export interface Token {
  t: TokenType;
  v: string;
}

const URL_RE = /(https?:\/\/[^\s]+)/g;

function tokenizeUrls(text: string, baseType: TokenType = "plain"): Token[] {
  const tokens: Token[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  URL_RE.lastIndex = 0;
  while ((match = URL_RE.exec(text)) !== null) {
    if (match.index > lastIndex) tokens.push({ t: baseType, v: text.slice(lastIndex, match.index) });
    tokens.push({ t: "url", v: match[0] });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) tokens.push({ t: baseType, v: text.slice(lastIndex) });
  return tokens;
}

function tokenizeJsonLine(line: string): Token[] {
  const tokens: Token[] = [];
  const re = /("(?:[^"\\]|\\.)*")(\s*:)?|(-?\d+(?:\.\d+)?)|(true|false|null)|([{}[\],:])|(\s+)|([^\s{}[\],:"]+)/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(line)) !== null) {
    const [, str, colonAfter, num, bool, punct, ws, other] = match;
    if (str !== undefined) {
      tokens.push({ t: colonAfter ? "key" : "string", v: str + (colonAfter ?? "") });
    } else if (num !== undefined) {
      tokens.push({ t: "number", v: num });
    } else if (bool !== undefined) {
      tokens.push({ t: "bool", v: bool });
    } else if (punct !== undefined) {
      tokens.push({ t: "punct", v: punct });
    } else if (ws !== undefined) {
      tokens.push({ t: "plain", v: ws });
    } else if (other !== undefined) {
      tokens.push({ t: "plain", v: other });
    }
  }
  return tokens;
}

function tokenizeMdLine(line: string): Token[] {
  if (line.startsWith("//")) return [{ t: "comment", v: line }];

  const heading = line.match(/^(#{1,6}\s.*)$/);
  if (heading) return [{ t: "heading", v: heading[1] }];

  const label = line.match(/^(\w[\w -]*:)(\s*)/);
  if (label) {
    const rest = line.slice(label[0].length);
    return [{ t: "label", v: label[1] }, { t: "plain", v: label[2] }, ...tokenizeUrls(rest)];
  }

  return tokenizeUrls(line);
}

function tokenizeLogLine(line: string): Token[] {
  const date = line.match(/^(\[[^\]]+\])(.*)$/);
  if (date) return [{ t: "date", v: date[1] }, { t: "plain", v: date[2] }];
  return [{ t: "plain", v: line }];
}

function tokenizeTxtLine(line: string): Token[] {
  const label = line.match(/^(\w[\w -]*:)(\s*)/);
  if (label) {
    const rest = line.slice(label[0].length);
    return [{ t: "label", v: label[1] }, { t: "plain", v: label[2] }, ...tokenizeUrls(rest)];
  }
  return tokenizeUrls(line);
}

export function tokenizeLine(line: string, kind: IdeFileKind): Token[] {
  if (line === "") return [{ t: "plain", v: "" }];
  switch (kind) {
    case "json":
      return tokenizeJsonLine(line);
    case "md":
      return tokenizeMdLine(line);
    case "log":
      return tokenizeLogLine(line);
    case "txt":
      return tokenizeTxtLine(line);
    default:
      return [{ t: "plain", v: line }];
  }
}

export function highlight(text: string, kind: IdeFileKind): Token[][] {
  return text.split("\n").map((line) => tokenizeLine(line, kind));
}

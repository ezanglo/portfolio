export interface KnowledgeEntry {
  id: string;
  phrases: string[];
  words: string[];
  text: string;
  priority?: number;
}

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9+#.]+/)
    .filter(Boolean);
}

/** Trailing 's' only — "projects" -> "project". Deliberately not a full stemmer. */
export function stem(token: string): string {
  if (token.length > 3 && token.endsWith("s") && !token.endsWith("ss")) {
    return token.slice(0, -1);
  }
  return token;
}

function phraseTokens(phrase: string): string[] {
  return tokenize(phrase).map(stem);
}

function containsSubsequence(haystack: string[], needle: string[]): boolean {
  if (needle.length === 0) return false;
  for (let i = 0; i <= haystack.length - needle.length; i++) {
    let matched = true;
    for (let j = 0; j < needle.length; j++) {
      if (haystack[i + j] !== needle[j]) {
        matched = false;
        break;
      }
    }
    if (matched) return true;
  }
  return false;
}

export function scoreEntry(entry: KnowledgeEntry, tokens: string[]): number {
  const stemmedTokens = tokens.map(stem);
  let score = 0;

  for (const phrase of entry.phrases) {
    const needle = phraseTokens(phrase);
    if (containsSubsequence(stemmedTokens, needle)) {
      score += 3 * needle.length;
    }
  }

  const stemmedWords = new Set(entry.words.map(stem));
  for (const token of stemmedTokens) {
    if (stemmedWords.has(token)) score += 2;
  }

  return score;
}

export function matchAnswer(
  knowledge: KnowledgeEntry[],
  question: string,
  fallback: string
): { entryId: string | null; text: string; score: number } {
  const tokens = tokenize(question);

  let best: { entry: KnowledgeEntry; score: number } | null = null;
  for (const entry of knowledge) {
    const score = scoreEntry(entry, tokens);
    if (score <= 0) continue;
    if (
      !best ||
      score > best.score ||
      (score === best.score && (entry.priority ?? 0) > (best.entry.priority ?? 0))
    ) {
      best = { entry, score };
    }
  }

  if (!best) return { entryId: null, text: fallback, score: 0 };
  return { entryId: best.entry.id, text: best.entry.text, score: best.score };
}

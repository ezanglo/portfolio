import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { streamText, convertToModelMessages, smoothStream, type UIMessage } from "ai";
import { getPortfolioData } from "@/lib/portfolio/data";
import { buildSystemPrompt } from "@/lib/views/ai-chat/system-prompt";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const DEFAULT_MODEL = "nvidia/nemotron-3.5-lightning:free";

// Per-visitor and shared caps to keep a bot loop from burning through OpenRouter's
// account-wide free-tier rate limit (which is shared across every visitor, not per IP).
const IP_LIMIT = 8;
const IP_WINDOW_MS = 60_000;
const GLOBAL_LIMIT = 20;
const GLOBAL_WINDOW_MS = 60_000;

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return new Response("AI backend not configured", { status: 503 });
  }

  const ip = getClientIp(request);
  const globalCheck = rateLimit("global", GLOBAL_LIMIT, GLOBAL_WINDOW_MS);
  const ipCheck = rateLimit(`ip:${ip}`, IP_LIMIT, IP_WINDOW_MS);

  if (!globalCheck.ok || !ipCheck.ok) {
    const retryAfterMs = Math.max(globalCheck.retryAfterMs, ipCheck.retryAfterMs);
    return new Response("Too many requests", {
      status: 429,
      headers: { "Retry-After": String(Math.ceil(retryAfterMs / 1000)) },
    });
  }

  const { messages }: { messages: UIMessage[] } = await request.json();
  const data = await getPortfolioData();

  const openrouter = createOpenRouter({
    apiKey,
    headers: {
      "HTTP-Referer": process.env.NEXT_PUBLIC_SERVER_URL ?? "https://ezraanglo.com",
      "X-Title": "Ezra Anglo Portfolio - AI Chat",
    },
  });

  const result = streamText({
    model: openrouter(process.env.OPENROUTER_MODEL || DEFAULT_MODEL),
    system: buildSystemPrompt(data),
    messages: await convertToModelMessages(messages),
    experimental_transform: smoothStream({ delayInMs: 20, chunking: "word" }),
  });

  return result.toUIMessageStreamResponse();
}

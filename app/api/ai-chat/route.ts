import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { getPortfolioData } from "@/lib/portfolio/data";
import { buildSystemPrompt } from "@/lib/views/ai-chat/system-prompt";

export const runtime = "nodejs";

const DEFAULT_MODEL = "deepseek/deepseek-chat-v3.1:free";

export async function POST(request: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return new Response("AI backend not configured", { status: 503 });
  }

  const { messages }: { messages: UIMessage[] } = await request.json();
  const data = await getPortfolioData();

  const openrouter = createOpenRouter({
    apiKey,
    headers: {
      "HTTP-Referer": process.env.NEXT_PUBLIC_SERVER_URL ?? "https://ezraanglo.com",
      "X-Title": "Ezra Anglo Portfolio — AI Chat",
    },
  });

  const result = streamText({
    model: openrouter(process.env.OPENROUTER_MODEL || DEFAULT_MODEL),
    system: buildSystemPrompt(data),
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}

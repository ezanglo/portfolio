"use client";

import { useEffect, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import type { KnowledgeEntry } from "@/lib/views/ai-chat/matcher";
import { matchAnswer } from "@/lib/views/ai-chat/matcher";
import { useScrollToBottom } from "@/hooks/use-scroll-to-bottom";
import SurpriseMeButton from "@/components/views/shared/surprise-me-button";
import ViewSwitcher from "@/components/views/shared/view-switcher";
import Bubble from "./bubble";
import TypingIndicator from "./typing-indicator";
import QuickReplies from "./quick-replies";
import Composer from "./composer";

function textOf(message: UIMessage): string {
  return message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("");
}

const GREETING: UIMessage = {
  id: "greeting",
  role: "assistant",
  parts: [
    {
      type: "text",
      text: "Hi! Ask me anything about Ezra's work, like React Native, AI projects, experience, or how to get in touch.",
    },
  ],
};

export default function AiChatConsole({
  knowledge,
  fallback,
  quickReplies,
}: {
  knowledge: KnowledgeEntry[];
  fallback: string;
  quickReplies: string[];
}) {
  const [input, setInput] = useState("");
  const { ref: scrollRef, scrollToBottom } = useScrollToBottom<HTMLDivElement>();

  const { messages, sendMessage, status, setMessages } = useChat({
    messages: [GREETING],
    transport: new DefaultChatTransport({ api: "/api/ai-chat" }),
    onError: () => {
      setMessages((msgs) => {
        const lastUser = [...msgs].reverse().find((m) => m.role === "user");
        const { text: answer } = matchAnswer(knowledge, lastUser ? textOf(lastUser) : "", fallback);
        return [...msgs, { id: crypto.randomUUID(), role: "assistant", parts: [{ type: "text", text: answer }] }];
      });
    },
  });

  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    scrollToBottom();
  }, [messages, busy, scrollToBottom]);

  function submit(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    sendMessage({ text: trimmed });
    setInput("");
  }

  return (
    <>
      <div
        ref={scrollRef}
        role="log"
        aria-live="polite"
        className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-5 py-5 sm:px-7"
      >
        {messages.map((m) => (
          <Bubble key={m.id} role={m.role === "user" ? "user" : "assistant"} text={textOf(m)} />
        ))}
        {status === "submitted" && <TypingIndicator />}
      </div>
      <QuickReplies replies={quickReplies} onSelect={submit} disabled={busy} />
      <Composer value={input} onChange={setInput} onSubmit={() => submit(input)} disabled={busy} />
      <div className="flex shrink-0 justify-center border-t border-view-border px-5 py-3 pb-[max(12px,env(safe-area-inset-bottom))] sm:px-7">
        <ViewSwitcher
          current="ai-chat"
          inline
          extraActions={
            <SurpriseMeButton
              current="ai-chat"
              className="bg-white/95 py-2.5 text-neutral-800 shadow-[0_6px_20px_rgba(0,0,0,.25)] backdrop-blur hover:bg-white"
            />
          }
        />
      </div>
    </>
  );
}

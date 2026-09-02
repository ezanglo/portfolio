"use client";

import { useEffect, useState } from "react";
import type { KnowledgeEntry } from "@/lib/views/ai-chat/matcher";
import { matchAnswer } from "@/lib/views/ai-chat/matcher";
import { useScrollToBottom } from "@/hooks/use-scroll-to-bottom";
import Bubble from "./bubble";
import TypingIndicator from "./typing-indicator";
import QuickReplies from "./quick-replies";
import Composer from "./composer";

interface Message {
  role: "user" | "assistant";
  text: string;
}

export default function AiChatConsole({
  knowledge,
  fallback,
  quickReplies,
}: {
  knowledge: KnowledgeEntry[];
  fallback: string;
  quickReplies: string[];
}) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: "Hi! Ask me anything about Ezra's work, like React Native, AI projects, experience, or how to get in touch." },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const { ref: scrollRef, scrollToBottom } = useScrollToBottom<HTMLDivElement>();

  useEffect(() => {
    scrollToBottom();
  }, [messages, typing, scrollToBottom]);

  function pushUserAndReply(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((m) => [...m, { role: "user", text: trimmed }]);
    setInput("");
    setTyping(true);

    const delay = 500 + Math.random() * 500;
    setTimeout(() => {
      const { text: answer } = matchAnswer(knowledge, trimmed, fallback);
      setMessages((m) => [...m, { role: "assistant", text: answer }]);
      setTyping(false);
    }, delay);
  }

  return (
    <>
      <div
        ref={scrollRef}
        role="log"
        aria-live="polite"
        className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-5 py-5 sm:px-7"
      >
        {messages.map((m, i) => (
          <Bubble key={i} role={m.role} text={m.text} />
        ))}
        {typing && <TypingIndicator />}
      </div>
      <QuickReplies replies={quickReplies} onSelect={pushUserAndReply} />
      <Composer value={input} onChange={setInput} onSubmit={() => pushUserAndReply(input)} />
    </>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import type { TerminalLine, TerminalProgram } from "@/lib/views/terminal/commands";
import { completeCommand, recallHistory, runCommand } from "@/lib/views/terminal/commands";
import { useScrollToBottom } from "@/hooks/use-scroll-to-bottom";
import HistoryLine from "./history-line";
import Caret from "./caret";

export default function TerminalConsole({ program }: { program: TerminalProgram }) {
  const [history, setHistory] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState("");
  const [submitted, setSubmitted] = useState<string[]>([]);
  const [cursor, setCursor] = useState(0);
  const [draft, setDraft] = useState("");
  const [autoFocusEnabled, setAutoFocusEnabled] = useState(false);
  const [hasFocused, setHasFocused] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const { ref: scrollRef, scrollToBottom } = useScrollToBottom<HTMLDivElement>();

  useEffect(() => {
    const isPreview = new URLSearchParams(window.location.search).get("preview") === "1";
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    const shouldAutoFocus = isDesktop && !isPreview;
    setAutoFocusEnabled(shouldAutoFocus);
    if (shouldAutoFocus) {
      inputRef.current?.focus();
      setHasFocused(true);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [history, scrollToBottom]);

  function focusInput() {
    inputRef.current?.focus();
    setHasFocused(true);
  }

  function handleContainerClick(event: React.MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.closest("button, a, input, [role='button']")) return;
    if (window.getSelection()?.toString()) return;
    focusInput();
  }

  function submit(raw: string) {
    setHistory((h) => [...h, { kind: "input", text: raw }]);
    setSubmitted((s) => [...s, raw]);
    setCursor(0);
    setDraft("");

    const result = runCommand(program, raw);
    if (result.type === "clear") {
      setHistory([]);
    } else if (result.type === "output") {
      setHistory((h) => [...h, { kind: "output", text: result.text }]);
    } else if (result.type === "navigate") {
      setHistory((h) => [...h, { kind: "output", text: program.outputs.resume }]);
      window.open(result.href, "_blank", "noopener,noreferrer");
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      submit(input);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (cursor === 0) setDraft(input);
      const recalled = recallHistory(submitted, cursor, -1);
      setCursor(recalled.cursor);
      setInput(recalled.cursor === 0 ? draft : recalled.value);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      const recalled = recallHistory(submitted, cursor, 1);
      setCursor(recalled.cursor);
      setInput(recalled.cursor === 0 ? draft : recalled.value);
    } else if (event.key === "Tab") {
      event.preventDefault();
      const { completion, candidates } = completeCommand(program, input);
      if (completion) {
        setInput(completion);
      } else if (candidates.length > 0) {
        setHistory((h) => [...h, { kind: "output", text: candidates.join("  ") }]);
      }
    }
  }

  return (
    <div
      onClick={handleContainerClick}
      className="flex min-h-0 flex-1 flex-col overflow-y-auto px-6 py-6 max-[768px]:px-3.5 max-[768px]:py-3.5 max-[768px]:text-[13.5px]"
      ref={scrollRef}
      role="log"
      aria-live="polite"
      aria-atomic={false}
    >
      <p className="whitespace-pre-wrap">{program.banner}</p>

      {history.map((line, i) => (
        <HistoryLine key={i} line={line} />
      ))}

      <div className="flex items-center gap-2">
        <label htmlFor="terminal-input" className="sr-only">
          Terminal input
        </label>
        <span className="text-[var(--view-prompt)] max-[768px]:hidden">guest@ezraanglo.com &gt;</span>
        <span className="text-[var(--view-prompt)] sm:hidden">&gt;</span>
        <input
          ref={inputRef}
          id="terminal-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus={autoFocusEnabled}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          inputMode="text"
          onFocus={() => inputRef.current?.scrollIntoView({ block: "nearest" })}
          className="flex-1 bg-transparent text-[var(--view-input)] outline-none"
        />
        <Caret />
      </div>

      {!hasFocused && !autoFocusEnabled && (
        <button
          type="button"
          onClick={focusInput}
          className="mt-3 w-fit rounded border border-view-border px-3 py-1.5 text-xs text-view-fg-subtle"
        >
          tap anywhere to type
        </button>
      )}
    </div>
  );
}

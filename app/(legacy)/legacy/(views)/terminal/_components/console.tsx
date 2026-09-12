"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
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
  const [caretIndex, setCaretIndex] = useState(0);
  const [caretLeft, setCaretLeft] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const mirrorRef = useRef<HTMLSpanElement>(null);
  const { ref: scrollRef, scrollToBottom } = useScrollToBottom<HTMLDivElement>();

  useLayoutEffect(() => {
    const el = mirrorRef.current;
    if (!el) return;
    const syncCaretLeft = () => setCaretLeft(el.offsetWidth);
    syncCaretLeft();
    const observer = new ResizeObserver(syncCaretLeft);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const isPreview = new URLSearchParams(window.location.search).get("preview") === "1";
    const shouldAutoFocus = !isPreview;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- window.location is only available post-mount; this syncs state from that external read, not derived render state
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

  function syncCaretIndex(event: React.SyntheticEvent<HTMLInputElement>) {
    const el = event.currentTarget;
    setCaretIndex(el.selectionStart ?? el.value.length);
  }

  useEffect(() => {
    function handleDocumentClick(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (target.closest("button, a, input, [role='button']")) return;
      if (window.getSelection()?.toString()) return;
      focusInput();
    }
    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, []);

  function submit(raw: string) {
    setHistory((h) => [...h, { kind: "input", text: raw }]);
    setSubmitted((s) => [...s, raw]);
    setCursor(0);
    setDraft("");
    setInput("");
    setCaretIndex(0);

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
      const value = recalled.cursor === 0 ? draft : recalled.value;
      setCursor(recalled.cursor);
      setInput(value);
      setCaretIndex(value.length);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      const recalled = recallHistory(submitted, cursor, 1);
      const value = recalled.cursor === 0 ? draft : recalled.value;
      setCursor(recalled.cursor);
      setInput(value);
      setCaretIndex(value.length);
    } else if (event.key === "Tab") {
      event.preventDefault();
      const { completion, candidates } = completeCommand(program, input);
      if (completion) {
        setInput(completion);
        setCaretIndex(completion.length);
      } else if (candidates.length > 0) {
        setHistory((h) => [...h, { kind: "output", text: candidates.join("  ") }]);
      }
    }
  }

  return (
    <div
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

      <div className="flex min-w-0 flex-1 items-start gap-2">
        <label htmlFor="terminal-input" className="sr-only">
          Terminal input
        </label>
        <span className="text-[var(--view-prompt)] max-[768px]:hidden">guest@ezraanglo.com &gt;</span>
        <span className="text-[var(--view-prompt)] sm:hidden">&gt;</span>
        <div className="relative flex min-w-0 flex-1 items-start">
          <input
            ref={inputRef}
            id="terminal-input"
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              syncCaretIndex(e);
            }}
            onKeyDown={handleKeyDown}
            onKeyUp={syncCaretIndex}
            onClick={syncCaretIndex}
            onSelect={syncCaretIndex}
            autoFocus={autoFocusEnabled}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            inputMode="text"
            onFocus={() => inputRef.current?.scrollIntoView({ block: "nearest" })}
            className="min-w-0 flex-1 bg-transparent text-[var(--view-input)] caret-transparent outline-none"
          />
          <span
            aria-hidden
            ref={mirrorRef}
            className="pointer-events-none invisible absolute top-0 left-0 whitespace-pre"
          >
            {input.slice(0, caretIndex)}
          </span>
          <Caret style={{ position: "absolute", top: 0, left: caretLeft }} />
        </div>
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

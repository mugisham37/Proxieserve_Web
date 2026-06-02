"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface MessageInputProps {
  onSend: (text: string) => void;
  onAttach?: () => void;
  isSending?: boolean;
}

export function MessageInput({ onSend, onAttach, isSending = false }: MessageInputProps) {
  const [text, setText] = React.useState("");
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function handleSend() {
    const trimmed = text.trim();
    if (!trimmed || isSending) return;
    onSend(trimmed);
    setText("");
    textareaRef.current?.focus();
  }

  return (
    <div className="flex items-end gap-2 pt-4 mt-4 border-t border-[var(--rule)]">
      {/* Textarea */}
      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={2}
        placeholder="Type a message… (Enter to send)"
        aria-label="Message your agent"
        className={cn(
          "flex-1 resize-none min-h-[60px]",
          "px-4 py-3 font-sans text-[14px] text-[var(--ink)]",
          "bg-[var(--cream)] border border-[var(--rule-strong)] rounded-[var(--r-md)]",
          "placeholder:text-[var(--ink-subtle)]",
          "focus:outline-none focus:border-[var(--ink)] focus:[box-shadow:var(--focus-ring)]",
          "transition-colors duration-[var(--m-fast)]"
        )}
      />

      {/* Attach */}
      <button
        type="button"
        onClick={onAttach}
        className={cn(
          "w-11 h-11 shrink-0 rounded-full",
          "border border-[var(--rule-strong)] bg-[var(--paper)]",
          "flex items-center justify-center",
          "text-[var(--ink-muted)] hover:text-[var(--ink)] hover:border-[var(--ink)]",
          "transition-colors duration-[var(--m-fast)]",
          "focus-visible:outline-none focus-visible:[box-shadow:var(--focus-ring)]"
        )}
        aria-label="Attach a file"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M13.5 7.5L7 14a4 4 0 0 1-5.66-5.66l6.5-6.5a2.5 2.5 0 0 1 3.54 3.54L5.5 11.5a1 1 0 0 1-1.42-1.42L9 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Send */}
      <button
        type="button"
        onClick={handleSend}
        disabled={!text.trim() || isSending}
        aria-busy={isSending}
        aria-label="Send message"
        className={cn(
          "w-11 h-11 shrink-0 rounded-full",
          "bg-[var(--ink)] text-[var(--paper)]",
          "flex items-center justify-center",
          "transition-colors duration-[var(--m-fast)]",
          "hover:bg-[var(--ink-2)]",
          "focus-visible:outline-none focus-visible:[box-shadow:var(--focus-ring)]",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
      >
        {isSending ? (
          <span className="w-4 h-4 border-2 border-[var(--paper)] border-t-transparent rounded-full [animation:spin_0.8s_linear_infinite]" aria-hidden="true" />
        ) : (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M14 2L2 7l5 2 2 5 5-12Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
        )}
      </button>
    </div>
  );
}

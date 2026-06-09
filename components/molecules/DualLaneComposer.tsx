"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Paperclip, AlertTriangle, Send } from "lucide-react";
import { cn } from "@/lib/utils";

type Lane = "reply" | "note";

interface DualLaneComposerProps {
  placeholder?: string;
  onSend?: (body: string, lane: Lane) => void;
  className?: string;
}

export function DualLaneComposer({
  placeholder,
  onSend,
  className,
}: DualLaneComposerProps) {
  const prefersReduced = useReducedMotion();
  const [lane, setLane] = React.useState<Lane>("reply");
  const [body, setBody] = React.useState("");
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const isNote = lane === "note";

  const handleSend = () => {
    if (!body.trim()) return;
    onSend?.(body, lane);
    setBody("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  const switchLane = (next: Lane) => {
    setLane(next);
    // Announce to screen readers
    textareaRef.current?.setAttribute(
      "aria-label",
      next === "note" ? "Write an internal note (only agents see this)" : "Write a reply to the client"
    );
    textareaRef.current?.focus();
  };

  return (
    <motion.div
      animate={
        prefersReduced
          ? {}
          : { backgroundColor: isNote ? "var(--warn-soft)" : "var(--paper)" }
      }
      transition={{ duration: 0.12 }}
      className={cn(
        "rounded-[var(--r-lg)] border overflow-hidden",
        isNote
          ? "border-[var(--warn)]/40 bg-[var(--warn-soft)]"
          : "border-[var(--rule)] bg-[var(--paper)]",
        className
      )}
    >
      {/* Lane tabs */}
      <div
        role="tablist"
        aria-label="Message type"
        className="flex border-b border-[var(--rule)]/60"
      >
        {(["reply", "note"] as Lane[]).map((l) => {
          const isActive = lane === l;
          const label = l === "reply" ? "Reply to client" : "Internal note";
          return (
            <button
              key={l}
              role="tab"
              aria-selected={isActive}
              type="button"
              onClick={() => switchLane(l)}
              className={cn(
                "relative px-[14px] h-[38px]",
                "font-sans text-[12px] font-medium",
                "transition-colors duration-[var(--m-fast)]",
                "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]",
                isActive
                  ? "text-[var(--ink)]"
                  : "text-[var(--ink-muted)] hover:text-[var(--ink)]"
              )}
            >
              {label}
              {isActive && (
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute bottom-0 left-0 right-0 h-[2px] rounded-t-full",
                    l === "note" ? "bg-[var(--warn)]" : "bg-[var(--brand)]"
                  )}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={4}
        aria-label={
          isNote
            ? "Write an internal note (only agents see this)"
            : "Write a reply to the client"
        }
        aria-live={isNote ? "polite" : undefined}
        placeholder={
          isNote
            ? "Write an internal note… (only agents see this)"
            : placeholder ?? "Write a reply…"
        }
        className={cn(
          "w-full px-[14px] py-[12px] resize-none",
          "bg-transparent border-none outline-none",
          "font-sans text-[13.5px] text-[var(--ink)]",
          "placeholder:text-[var(--ink-subtle)]",
          "leading-[1.5]"
        )}
      />

      {/* Action bar */}
      <div
        className={cn(
          "flex items-center justify-between gap-[8px]",
          "px-[12px] py-[10px]",
          "border-t border-[var(--rule)]/60"
        )}
      >
        <div className="flex items-center gap-[8px]">
          <button
            type="button"
            aria-label="Attach file"
            className={cn(
              "flex items-center justify-center w-[32px] h-[32px]",
              "rounded-[var(--r-md)] text-[var(--ink-muted)]",
              "transition-colors duration-[var(--m-fast)]",
              "hover:bg-[var(--cream)] hover:text-[var(--ink)]",
              "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
            )}
          >
            <Paperclip size={15} />
          </button>

          {isNote && (
            <span className="flex items-center gap-[5px]">
              <AlertTriangle
                size={12}
                className="text-[var(--warn)] shrink-0"
                aria-hidden="true"
              />
              <span
                role="status"
                aria-live="polite"
                className="font-mono text-[10px] tracking-[0.1em] uppercase text-[var(--warn)]"
              >
                Only agents see this
              </span>
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleSend}
          disabled={!body.trim()}
          aria-label={isNote ? "Save note" : "Send reply"}
          className={cn(
            "flex items-center gap-[6px]",
            "px-[14px] h-[32px] rounded-[var(--r-pill)]",
            "font-sans text-[12px] font-medium",
            "transition-colors duration-[var(--m-fast)]",
            "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]",
            "disabled:opacity-40 disabled:cursor-not-allowed",
            isNote
              ? "bg-[var(--warn)] text-white hover:opacity-90"
              : "bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--ink-2)]"
          )}
        >
          {isNote ? "Save note" : (
            <>
              Send <Send size={12} aria-hidden="true" />
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}

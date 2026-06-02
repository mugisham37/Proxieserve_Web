"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Message } from "@/lib/dashboard-data";

interface MessageBubbleProps {
  message: Message;
}

function formatTime(iso: string): string {
  try {
    return new Date(iso).toLocaleTimeString("en-RW", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  } catch {
    return iso;
  }
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const { sender, senderName, senderInitials, body, sentAt, status } = message;

  if (sender === "system") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="flex justify-center my-2"
      >
        <span className="font-mono text-[11px] text-[var(--ink-muted)] border border-dashed border-[var(--rule)] rounded-[999px] px-4 py-[5px]">
          {body}
        </span>
      </motion.div>
    );
  }

  const isClient = sender === "client";
  const initials = (senderInitials ?? senderName?.slice(0, 2) ?? "??").toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, x: isClient ? 8 : -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
      className={cn(
        "flex items-end gap-2 my-1",
        isClient && "flex-row-reverse"
      )}
    >
      {/* Avatar */}
      <span
        className={cn(
          "inline-flex items-center justify-center shrink-0",
          "w-9 h-9 rounded-full font-serif text-[13px] font-medium",
          isClient
            ? "bg-[var(--brand)] text-white"
            : "bg-[var(--ink)] text-[var(--paper)]"
        )}
        aria-hidden="true"
      >
        {initials}
      </span>

      {/* Bubble */}
      <div className={cn("flex flex-col gap-1 max-w-[72%]", isClient && "items-end")}>
        {!isClient && senderName && (
          <span className="font-mono text-[10px] text-[var(--ink-muted)] tracking-[0.05em] px-[2px]">
            {senderName}
          </span>
        )}
        <div
          className={cn(
            "px-4 py-3 font-sans text-[14px] leading-[1.55]",
            isClient
              ? "bg-[var(--brand-soft)] text-[var(--ink)] rounded-[14px_14px_4px_14px]"
              : "bg-[var(--paper)] text-[var(--ink)] border border-[var(--rule)] rounded-[14px_14px_14px_4px]"
          )}
        >
          {body}
          {isClient && status === "sending" && (
            <span className="ml-2 inline-block w-3 h-3 border-2 border-[var(--ink-muted)] border-t-transparent rounded-full [animation:spin_0.8s_linear_infinite]" aria-label="Sending" />
          )}
        </div>
        <time
          dateTime={sentAt}
          className="font-mono text-[10px] text-[var(--ink-subtle)] px-[2px]"
        >
          {formatTime(sentAt)}
        </time>
      </div>
    </motion.div>
  );
}

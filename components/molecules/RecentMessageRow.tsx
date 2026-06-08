"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { DashboardMessage } from "@/lib/types/dashboard";

interface RecentMessageRowProps {
  message: DashboardMessage;
  onClick?: () => void;
  className?: string;
}

export function RecentMessageRow({
  message,
  onClick,
  className,
}: RecentMessageRowProps) {
  const prefersReduced = useReducedMotion();
  const isUnread = !message.isRead;
  const isSystem = message.senderType === "system";

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full grid grid-cols-[36px_1fr_auto] items-start gap-[12px]",
        "px-[16px] py-[14px]",
        "border-b border-[var(--rule)] last:border-b-0",
        "text-left transition-colors duration-[var(--m-fast)]",
        "hover:bg-[var(--cream)] focus-visible:outline-none focus-visible:bg-[var(--cream)]",
        isUnread && "bg-[var(--brand-soft)]/20",
        className
      )}
    >
      {/* Avatar */}
      <span
        aria-hidden="true"
        className={cn(
          "inline-flex items-center justify-center w-9 h-9 rounded-full shrink-0",
          "font-serif font-medium text-[13px]",
          message.avatarVariant === "brand" && "bg-[var(--brand)] text-white",
          message.avatarVariant === "ink" && "bg-[var(--ink)] text-[var(--paper)]",
          message.avatarVariant === "system" &&
            "bg-[var(--cream-2)] text-[var(--ink-muted)] border border-[var(--rule)]"
        )}
      >
        {message.senderInitials}
      </span>

      {/* Content */}
      <div className="min-w-0">
        {/* Meta: name · timeAgo · APPLICATION */}
        <p className="font-sans text-[13px] mb-[2px] leading-tight truncate">
          <strong className="font-semibold text-[var(--ink)]">{message.senderName}</strong>
          {!isSystem && (
            <>
              <span className="text-[var(--ink-muted)] mx-[4px]">·</span>
              <span className="text-[var(--ink-muted)]">{message.timeAgo}</span>
              {message.applicationLabel && message.applicationLabel !== "SYSTEM" && (
                <>
                  <span className="text-[var(--ink-muted)] mx-[4px]">·</span>
                  <span className="font-mono text-[10px] tracking-[0.06em] uppercase text-[var(--ink-muted)]">
                    {message.applicationLabel}
                  </span>
                </>
              )}
            </>
          )}
          {isSystem && (
            <>
              <span className="text-[var(--ink-muted)] mx-[4px]">·</span>
              <span className="text-[var(--ink-muted)]">{message.timeAgo}</span>
            </>
          )}
        </p>
        {/* Preview */}
        <p className="font-sans text-[12.5px] text-[var(--ink-muted)] line-clamp-1">
          {message.body}
        </p>
      </div>

      {/* Unread dot */}
      {isUnread ? (
        <motion.span
          initial={prefersReduced ? undefined : { scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
          aria-hidden="true"
          className="w-[8px] h-[8px] rounded-full bg-[var(--brand)] shrink-0 mt-[4px]"
        />
      ) : (
        <span className="w-[8px]" />
      )}
      {isUnread && <span className="sr-only">Unread</span>}
    </button>
  );
}

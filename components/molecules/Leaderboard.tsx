import * as React from "react";
import { cn } from "@/lib/utils";
import type { LeaderboardEntry } from "@/lib/types/agent";

interface LeaderboardProps {
  entries: LeaderboardEntry[];
}

export function Leaderboard({ entries }: LeaderboardProps) {
  return (
    <div>
      <div className="flex flex-col gap-[0]">
        {entries.map((entry, idx) => (
          <div
            key={entry.initials}
            className={cn(
              "flex items-center gap-[12px]",
              "px-[14px] py-[10px]",
              "border-b border-[var(--rule)] last:border-0",
              "rounded-[var(--r-sm)]",
              entry.isMe && "bg-[var(--brand-soft)]"
            )}
          >
            {/* Rank */}
            <span
              aria-label={`Rank ${idx + 1}`}
              className="font-mono text-[12px] text-[var(--ink-muted)] w-[16px] text-center shrink-0"
            >
              {idx + 1}
            </span>

            {/* Avatar */}
            <span
              aria-hidden="true"
              className={cn(
                "inline-flex items-center justify-center",
                "w-[30px] h-[30px] rounded-full shrink-0",
                "font-sans text-[11px] font-semibold",
                entry.isMe
                  ? "bg-[var(--brand)] text-white"
                  : "bg-[var(--cream-2)] text-[var(--ink)]"
              )}
            >
              {entry.initials}
            </span>

            {/* Name */}
            <span
              className={cn(
                "flex-1 font-sans text-[13px]",
                entry.isMe ? "text-[var(--brand-ink)] font-semibold" : "text-[var(--ink)]"
              )}
            >
              {entry.isMe ? "You" : entry.name}
            </span>

            {/* Count */}
            <span className="font-mono text-[13px] font-medium text-[var(--ink)]">
              {entry.count}
            </span>
          </div>
        ))}
      </div>
      <p className="font-sans text-[11px] text-[var(--ink-subtle)] mt-[12px] leading-[1.5]">
        Leaderboard is for motivation, not ranking-based pay. Quality &gt; volume.
      </p>
    </div>
  );
}

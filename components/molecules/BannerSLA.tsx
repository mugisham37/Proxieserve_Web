"use client";

import * as React from "react";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface BannerSLAProps {
  count: number;
  oldestCode?: string;
  onJump?: () => void;
  className?: string;
}

export function BannerSLA({ count, oldestCode, onJump, className }: BannerSLAProps) {
  return (
    <div
      role="alert"
      aria-live="polite"
      className={cn(
        "flex items-center gap-[12px]",
        "px-[20px] min-[980px]:px-[32px] py-[10px]",
        "bg-[var(--danger-soft)] border-b border-[var(--danger)]/30",
        className
      )}
    >
      <AlertTriangle
        size={16}
        className="shrink-0 text-[var(--danger)]"
        aria-hidden="true"
      />
      <p className="flex-1 font-sans text-[13px] text-[var(--danger)] leading-[1.4]">
        <strong className="font-semibold">
          {count} {count === 1 ? "case" : "cases"} over SLA.
        </strong>{" "}
        {oldestCode && (
          <>
            {oldestCode} has exceeded the turnaround target. Pinned to the top of your queue.
          </>
        )}
      </p>
      {onJump && (
        <button
          type="button"
          onClick={onJump}
          className={cn(
            "shrink-0 px-[12px] h-[28px] rounded-[var(--r-pill)]",
            "bg-[var(--danger)] text-white",
            "font-sans text-[12px] font-medium",
            "transition-colors duration-[var(--m-fast)]",
            "hover:opacity-90",
            "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
          )}
        >
          Jump to oldest
        </button>
      )}
    </div>
  );
}

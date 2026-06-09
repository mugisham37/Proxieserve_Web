"use client";

import * as React from "react";
import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface BannerAdminViewingProps {
  agentName: string;
  onOversightTools?: () => void;
  className?: string;
}

export function BannerAdminViewing({
  agentName,
  onOversightTools,
  className,
}: BannerAdminViewingProps) {
  return (
    <div
      role="alert"
      aria-live="polite"
      className={cn(
        "flex items-center gap-[12px]",
        "px-[20px] min-[980px]:px-[32px] py-[10px]",
        "bg-[var(--ink)] border-b border-[var(--ink-2)]",
        className
      )}
    >
      <Eye
        size={16}
        className="shrink-0 text-[var(--paper)]"
        aria-hidden="true"
      />
      <p className="flex-1 font-sans text-[13px] text-[var(--paper)] leading-[1.4]">
        <strong className="font-semibold">Viewing as admin (read-only).</strong>{" "}
        This is {agentName}&apos;s case. Actions are disabled — switch to
        oversight tools to reassign or intervene. Your view is logged.
      </p>
      {onOversightTools && (
        <button
          type="button"
          onClick={onOversightTools}
          className={cn(
            "shrink-0 px-[12px] h-[28px] rounded-[var(--r-pill)]",
            "bg-[var(--paper)] text-[var(--ink)]",
            "font-sans text-[12px] font-medium",
            "transition-colors duration-[var(--m-fast)]",
            "hover:bg-[var(--paper-2)]",
            "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
          )}
        >
          Oversight tools
        </button>
      )}
    </div>
  );
}

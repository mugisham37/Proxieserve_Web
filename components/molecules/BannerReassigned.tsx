"use client";

import * as React from "react";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface BannerReassignedProps {
  reassignedTo: string;
  onBack?: () => void;
  className?: string;
}

export function BannerReassigned({
  reassignedTo,
  onBack,
  className,
}: BannerReassignedProps) {
  return (
    <div
      role="alert"
      aria-live="polite"
      className={cn(
        "flex items-center gap-[12px]",
        "px-[20px] min-[980px]:px-[32px] py-[10px]",
        "bg-[var(--info-soft)] border-b border-[var(--info)]/30",
        className
      )}
    >
      <Info
        size={16}
        className="shrink-0 text-[var(--info)]"
        aria-hidden="true"
      />
      <p className="flex-1 font-sans text-[13px] text-[var(--info)] leading-[1.4]">
        This case was reassigned to{" "}
        <strong className="font-semibold">{reassignedTo}</strong> by the
        dispatcher while you had it open. It&apos;s now read-only for you. Your
        draft reply was saved as an internal note so nothing is lost.
      </p>
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className={cn(
            "shrink-0 px-[12px] h-[28px] rounded-[var(--r-pill)]",
            "bg-[var(--info)] text-white",
            "font-sans text-[12px] font-medium",
            "transition-colors duration-[var(--m-fast)]",
            "hover:opacity-90",
            "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
          )}
        >
          Back to my queue
        </button>
      )}
    </div>
  );
}

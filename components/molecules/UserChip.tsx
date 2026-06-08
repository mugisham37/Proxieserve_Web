import * as React from "react";
import { cn } from "@/lib/utils";

interface UserChipProps {
  initials: string;
  fullName: string;
  role: string;
  city?: string;
  className?: string;
}

export function UserChip({ initials, fullName, role, city, className }: UserChipProps) {
  return (
    <div
      className={cn(
        "grid items-center gap-[10px] px-[10px] py-[10px]",
        "rounded-[var(--r-md)] border border-[var(--rule)] bg-[var(--cream)]",
        "grid-cols-[36px_1fr_18px]",
        className
      )}
    >
      {/* Avatar */}
      <span
        aria-hidden="true"
        className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[var(--ink)] text-[var(--paper)] font-serif font-medium text-[13px] shrink-0"
      >
        {initials}
      </span>

      {/* Name + role */}
      <div className="min-w-0">
        <p className="font-sans text-[13px] font-medium text-[var(--ink)] truncate leading-tight">
          {fullName}
        </p>
        <p className="font-mono text-[10px] text-[var(--ink-muted)] tracking-[0.06em] uppercase truncate mt-[1px]">
          {role}{city ? ` · ${city}` : ""}
        </p>
      </div>

      {/* Chevron */}
      <span
        aria-hidden="true"
        className="text-[var(--ink-muted)] text-[16px] font-sans text-right leading-none"
      >
        ›
      </span>
    </div>
  );
}

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { type ServiceCategory, CATEGORY_LABELS } from "@/lib/service-constants";

const CATEGORIES: Array<{ value: ServiceCategory | "all"; label: string }> = [
  { value: "all", label: "All services" },
  { value: "tax", label: CATEGORY_LABELS.tax },
  { value: "identity", label: CATEGORY_LABELS.identity },
  { value: "business", label: CATEGORY_LABELS.business },
  { value: "welfare", label: CATEGORY_LABELS.welfare },
  { value: "permits", label: CATEGORY_LABELS.permits },
];

interface ServiceFilterBarProps {
  activeCategory: ServiceCategory | "all";
  onSelect: (category: ServiceCategory | "all") => void;
  className?: string;
}

export function ServiceFilterBar({ activeCategory, onSelect, className }: ServiceFilterBarProps) {
  return (
    <div
      role="group"
      aria-label="Filter services by category"
      className={cn(
        "flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
        className
      )}
    >
      {CATEGORIES.map(({ value, label }) => {
        const isActive = activeCategory === value;
        return (
          <button
            key={value}
            type="button"
            onClick={() => onSelect(value)}
            aria-pressed={isActive}
            className={cn(
              "shrink-0 font-sans text-[13px] font-medium px-4 py-2 rounded-[var(--r-pill)] border transition-colors duration-[var(--m-fast)] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)]",
              isActive
                ? "bg-[var(--ink)] text-[var(--cream)] border-[var(--ink)]"
                : "bg-transparent text-[var(--ink-muted)] border-[var(--rule)] hover:text-[var(--ink)] hover:border-[var(--rule-strong)]"
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

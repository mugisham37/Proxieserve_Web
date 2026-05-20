"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface EmptySearchProps {
  query?: string;
  onClear?: () => void;
  className?: string;
}

export function EmptySearch({ query, onClear, className }: EmptySearchProps) {
  return (
    <div
      className={cn(
        "col-span-full flex flex-col items-center justify-center gap-4 rounded-[var(--r-lg)] border-2 border-dashed border-[var(--rule)] py-16 px-8 text-center",
        className
      )}
      role="status"
      aria-live="polite"
    >
      <p className="font-serif italic text-[22px] text-[var(--ink-muted)]">
        {query ? `No services match "${query}"` : "No services in this category"}
      </p>
      <p className="font-sans text-[14px] text-[var(--ink-subtle)]">
        Try adjusting your search or filter to find what you need.
      </p>
      {onClear && (
        <button
          type="button"
          onClick={onClear}
          className="font-sans text-[13px] text-[var(--brand)] font-medium underline underline-offset-2 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] rounded-sm"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}

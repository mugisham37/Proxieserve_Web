"use client";

import * as React from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
}

export function SearchInput({
  value,
  onChange,
  onClear,
  placeholder = "Search services…",
  className,
  autoFocus,
}: SearchInputProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  function handleClear() {
    onChange("");
    onClear?.();
    inputRef.current?.focus();
  }

  return (
    <div
      role="search"
      className={cn(
        "relative flex items-center bg-[var(--paper)] border border-[var(--rule)] rounded-[var(--r-lg)] transition-shadow duration-[var(--m-base)] focus-within:border-[var(--focus)] focus-within:shadow-[var(--focus-ring)]",
        className
      )}
    >
      <Search
        size={16}
        className="absolute left-4 text-[var(--ink-muted)] pointer-events-none shrink-0"
        aria-hidden="true"
      />
      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        autoComplete="off"
        spellCheck={false}
        className="w-full bg-transparent font-sans text-[15px] text-[var(--ink)] placeholder:text-[var(--ink-subtle)] pl-10 pr-10 py-3 outline-none rounded-[var(--r-lg)]"
        aria-label={placeholder}
      />
      {value && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          className="absolute right-3 p-1 text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)]"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}

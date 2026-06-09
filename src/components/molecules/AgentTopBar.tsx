"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { KbdHint } from "@/components/atoms/KbdHint";
import { AvailabilityDot } from "@/components/atoms/AvailabilityDot";
import { NotificationBell } from "@/components/atoms/NotificationBell";
import { useAgentState, useToggleAvailability } from "@/lib/agent-context";

export function AgentTopBar() {
  const { availability } = useAgentState();
  const toggleAvailability = useToggleAvailability();

  const handleSearchFocus = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
    },
    []
  );

  const searchRef = React.useRef<HTMLInputElement>(null);

  // "/" shortcut focuses search
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        !(e.target instanceof HTMLInputElement) &&
        !(e.target instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div
      className={cn(
        "flex items-center gap-[12px]",
        "sticky top-0 z-30",
        "h-[56px] px-[20px] min-[980px]:px-[32px]",
        "bg-[var(--cream)] border-b border-[var(--rule)]"
      )}
    >
      {/* Mobile brand (hidden on desktop) */}
      <Link
        href="/agent"
        className={cn(
          "min-[980px]:hidden",
          "font-serif text-[17px] text-[var(--ink)] shrink-0"
        )}
        aria-label="ProxiServe — go to today"
      >
        Proxi<em className="italic font-normal">Serve</em>
      </Link>

      {/* Search */}
      <div className="flex-1 relative max-w-[400px]">
        <input
          ref={searchRef}
          type="search"
          placeholder="Search cases, codes, clients…"
          aria-label="Search agent workspace"
          className={cn(
            "w-full h-[36px] pl-[12px] pr-[36px]",
            "bg-[var(--paper)] border border-[var(--rule)]",
            "rounded-[var(--r-md)] font-sans text-[13px] text-[var(--ink)]",
            "placeholder:text-[var(--ink-subtle)]",
            "focus:outline-none focus:border-[var(--ink)] focus:bg-[var(--paper)]",
            "transition-colors duration-[var(--m-fast)]"
          )}
          onKeyDown={(e) => {
            if (e.key === "Escape") e.currentTarget.blur();
          }}
        />
        <div className="absolute right-[10px] top-1/2 -translate-y-1/2 pointer-events-none">
          <KbdHint>/</KbdHint>
        </div>
      </div>

      <div className="flex-1" />

      {/* Availability toggle */}
      <button
        type="button"
        onClick={toggleAvailability}
        aria-label={`Status: ${availability === "available" ? "Available — click to set Away" : "Away — click to set Available"}`}
        className={cn(
          "hidden min-[980px]:flex items-center gap-[6px]",
          "px-[10px] h-[32px] rounded-[var(--r-pill)]",
          "border border-[var(--rule)]",
          "font-sans text-[12px] font-medium",
          "transition-colors duration-[var(--m-fast)]",
          "hover:bg-[var(--paper-2)]",
          "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]",
          availability === "available"
            ? "text-[var(--ok)]"
            : "text-[var(--warn)]"
        )}
      >
        <AvailabilityDot status={availability} />
        {availability === "available" ? "Available" : "Away"}
      </button>

      {/* Notifications bell */}
      <NotificationBell />
    </div>
  );
}

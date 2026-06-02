"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useScrolled } from "@/hooks/useScrolled";

interface DashTopBarProps {
  title?: string;
  backHref?: string;
  initials: string;
}

export function DashTopBar({ title, backHref, initials }: DashTopBarProps) {
  const router = useRouter();
  const scrolled = useScrolled();

  return (
    <header
      className={cn(
        "lg:hidden sticky top-0 z-40 h-14 px-5 flex items-center justify-between gap-4",
        "bg-[var(--cream)] border-b border-[var(--rule)]",
        "transition-[box-shadow] duration-[var(--m-fast)]",
        scrolled && "[box-shadow:var(--sh-subtle)]"
      )}
    >
      {/* Left: back or brand */}
      {backHref ? (
        <button
          type="button"
          onClick={() => router.back()}
          className={cn(
            "inline-flex items-center gap-2",
            "font-sans text-[14px] font-medium text-[var(--ink)]",
            "focus-visible:outline-none focus-visible:[box-shadow:var(--focus-ring)] rounded-sm"
          )}
          aria-label="Go back"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {title ?? "Back"}
        </button>
      ) : (
        <Link
          href="/dashboard"
          className={cn(
            "inline-flex items-center gap-[8px]",
            "font-serif font-medium text-[18px] text-[var(--ink)]",
            "px-[12px] py-[4px] border border-[var(--ink)] rounded-[999px]",
            "transition-colors duration-[var(--m-fast)] hover:bg-[var(--ink)] hover:text-[var(--paper)]",
            "focus-visible:outline-none focus-visible:[box-shadow:var(--focus-ring)]"
          )}
        >
          <span className="w-[7px] h-[7px] rounded-full bg-[var(--brand)] shrink-0" aria-hidden="true" />
          <span>Proxi<em className="italic">.</em>Serve</span>
        </Link>
      )}

      {/* Page title (centered) */}
      {title && !backHref && (
        <p className="absolute left-1/2 -translate-x-1/2 font-sans text-[14px] font-semibold text-[var(--ink)] pointer-events-none">
          {title}
        </p>
      )}

      {/* Right: avatar → settings */}
      <Link
        href="/dashboard/settings"
        className={cn(
          "inline-flex items-center justify-center",
          "w-9 h-9 rounded-full bg-[var(--brand)] text-white",
          "font-serif text-[14px] font-medium shrink-0",
          "focus-visible:outline-none focus-visible:[box-shadow:var(--focus-ring)]"
        )}
        aria-label="Go to settings"
      >
        {initials}
      </Link>
    </header>
  );
}

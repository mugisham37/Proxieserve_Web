"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Wordmark } from "@/components/atoms/Wordmark";
import { NotificationBell } from "@/components/atoms/NotificationBell";

interface MobileTopBarProps {
  initials: string;
  className?: string;
}

export function MobileTopBar({ initials, className }: MobileTopBarProps) {
  return (
    <header
      className={cn(
        "min-[980px]:hidden",
        "sticky top-0 z-40 flex items-center justify-between",
        "px-[20px] py-[14px]",
        "bg-[var(--paper)] border-b border-[var(--rule)]",
        className
      )}
    >
      <Link
        href="/dashboard"
        className="focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] rounded-[var(--r-sm)]"
        aria-label="ProxiServe — go to dashboard"
      >
        <Wordmark className="h-[18px]" />
      </Link>

      <div className="flex items-center gap-[4px]">
        <NotificationBell />
        <Link
          href="/settings"
          className={cn(
            "inline-flex items-center justify-center w-9 h-9 rounded-full",
            "bg-[var(--ink)] text-[var(--paper)] font-serif font-medium text-[14px]",
            "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
          )}
          aria-label="Your account settings"
        >
          {initials}
        </Link>
      </div>
    </header>
  );
}

"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useScrolled } from "@/hooks/useScrolled";
import { PillButton } from "@/components/atoms/PillButton";

interface TrackerTopBarProps {
  breadcrumb?: string;
  className?: string;
}

export function TrackerTopBar({ breadcrumb, className }: TrackerTopBarProps) {
  const scrolled = useScrolled();

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-[var(--rule)]",
        "transition-[backdrop-filter,background] duration-[var(--m-base)]",
        scrolled
          ? "bg-[rgba(242,235,215,0.96)] backdrop-saturate-[140%] backdrop-blur-[12px]"
          : "bg-[var(--cream)]",
        className
      )}
    >
      <div
        className={cn(
          "container py-[14px]",
          "grid gap-4 items-center",
          breadcrumb
            ? "grid-cols-[auto_1fr_auto] max-[760px]:grid-cols-[auto_auto]"
            : "grid-cols-[auto_1fr_auto] max-[760px]:grid-cols-[auto_auto]"
        )}
      >
        {/* Wordmark pill */}
        <Link
          href="/"
          className={cn(
            "inline-flex items-center gap-[10px]",
            "font-serif font-medium text-[19px] text-[var(--ink)]",
            "px-[14px] py-[5px] border border-[var(--ink)] rounded-[999px]",
            "transition-colors duration-[var(--m-fast)]",
            "hover:bg-[var(--ink)] hover:text-[var(--paper)]",
            "focus-visible:outline-none focus-visible:[box-shadow:var(--focus-ring)]"
          )}
        >
          <span className="w-2 h-2 rounded-full bg-[var(--brand)] shrink-0" aria-hidden="true" />
          <em className="not-italic">Proxi</em>
          <em className="italic">.</em>
          <em className="not-italic">Serve</em>
        </Link>

        {/* Breadcrumb — hidden on mobile */}
        {breadcrumb && (
          <p className="max-[760px]:hidden font-mono text-[11px] text-[var(--ink-muted)] tracking-[0.08em] text-center overflow-hidden text-ellipsis whitespace-nowrap">
            <Link href="/track" className="hover:text-[var(--ink)] transition-colors">
              Track application
            </Link>
            <span className="mx-[6px] text-[var(--ink-subtle)]">/</span>
            <strong className="font-[500] text-[var(--ink)]">{breadcrumb}</strong>
          </p>
        )}
        {!breadcrumb && <div aria-hidden="true" />}

        {/* Actions */}
        <div className="flex items-center gap-2 justify-self-end">
          <PillButton variant="ghost" size="sm" asChild>
            <Link href="/login">Sign in</Link>
          </PillButton>
          <PillButton variant="solid" size="sm" asChild className="max-[500px]:hidden">
            <Link href="/signup">Start application</Link>
          </PillButton>
        </div>
      </div>
    </header>
  );
}

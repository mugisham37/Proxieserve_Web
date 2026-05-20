"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Wordmark } from "@/components/atoms/Wordmark";
import { PillButton } from "@/components/atoms/PillButton";
import { useScrolled } from "@/hooks/useScrolled";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface ServicesTopBarProps {
  breadcrumb?: BreadcrumbItem[];
  className?: string;
}

export function ServicesTopBar({ breadcrumb, className }: ServicesTopBarProps) {
  const scrolled = useScrolled(10);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 h-14 flex items-center transition-all duration-200",
        "bg-[rgba(242,235,215,0.92)] backdrop-blur-[12px] border-b border-[var(--rule)]",
        scrolled ? "shadow-[0_1px_4px_rgba(26,22,18,0.06)]" : "",
        className
      )}
      role="banner"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 w-full flex items-center gap-4">
        {/* Wordmark */}
        <Wordmark size="sm" />

        {/* Breadcrumb */}
        {breadcrumb && breadcrumb.length > 0 && (
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 min-w-0">
            <span className="text-[var(--rule-strong)]" aria-hidden="true">/</span>
            {breadcrumb.map((item, i) => (
              <React.Fragment key={item.href}>
                {i > 0 && <span className="text-[var(--rule-strong)] shrink-0" aria-hidden="true">/</span>}
                {i === breadcrumb.length - 1 ? (
                  <span className="font-sans text-[13px] text-[var(--ink)] font-medium truncate max-w-[200px]" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="font-sans text-[13px] text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] rounded-sm"
                  >
                    {item.label}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        {/* Right CTAs */}
        <div className="ml-auto flex items-center gap-2 shrink-0">
          <PillButton variant="ghost" size="sm" asChild className="hidden sm:inline-flex">
            <Link href="/track">Track</Link>
          </PillButton>
          <PillButton variant="solid" size="sm" asChild>
            <Link href="/contact">Get started</Link>
          </PillButton>
        </div>
      </div>
    </header>
  );
}

"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Wordmark } from "@/components/atoms/Wordmark";
import { PillButton } from "@/components/atoms/PillButton";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface SupportingTopBarProps {
  breadcrumb?: BreadcrumbItem[];
}

export function SupportingTopBar({ breadcrumb }: SupportingTopBarProps) {
  return (
    <header className="sticky top-0 z-50 bg-[rgba(242,235,215,0.92)] backdrop-blur-[12px] border-b border-[var(--rule)]">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 flex items-center justify-between h-14">
        <div className="flex items-center gap-3">
          <Wordmark size="sm" />
          {breadcrumb && breadcrumb.length > 0 && (
            <nav aria-label="Breadcrumb" className="hidden sm:flex items-center gap-1.5">
              {breadcrumb.map((crumb, i) => (
                <React.Fragment key={i}>
                  <span className="text-[var(--ink-subtle)] text-[13px]">/</span>
                  {crumb.href ? (
                    <Link href={crumb.href} className="font-sans text-[13px] text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="font-sans text-[13px] text-[var(--ink)]">{crumb.label}</span>
                  )}
                </React.Fragment>
              ))}
            </nav>
          )}
        </div>
        <div className="flex items-center gap-2">
          <PillButton variant="ghost" size="sm" asChild>
            <Link href="/track">Track</Link>
          </PillButton>
          <PillButton variant="solid" size="sm" asChild>
            <Link href="/">Home</Link>
          </PillButton>
        </div>
      </div>
    </header>
  );
}

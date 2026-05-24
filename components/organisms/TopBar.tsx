"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useScrolled } from "@/hooks/useScrolled";
import { Wordmark } from "@/components/atoms/Wordmark";
import { PillButton } from "@/components/atoms/PillButton";
import { LangSwitcher } from "@/components/atoms/LangSwitcher";

const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

interface TopBarProps {
  onMenuOpen?: () => void;
  menuOpen?: boolean;
}

export function TopBar({ onMenuOpen, menuOpen = false }: TopBarProps) {
  const scrolled = useScrolled(24);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-[200ms] ease-out",
        scrolled
          ? "bg-[rgba(242,235,215,0.92)] backdrop-blur-[12px] border-b border-[var(--rule)]"
          : "bg-transparent"
      )}
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 flex items-center justify-between h-16">
        <Wordmark size="md" />

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6" aria-label="Main navigation">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="font-serif italic text-[16px] text-[var(--ink)] hover:text-[var(--brand)] transition-colors duration-[120ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] rounded-sm"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Lang switcher — hidden on small mobile */}
          <div className="hidden sm:block">
            <LangSwitcher />
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-2">
            <PillButton variant="ghost" size="sm" asChild>
              <Link href="/track">Track</Link>
            </PillButton>
            <PillButton variant="solid" size="sm" asChild>
              <Link href="/signup">Get started</Link>
            </PillButton>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={onMenuOpen}
            aria-expanded={menuOpen}
            aria-controls="mobile-sheet"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className={cn(
              "lg:hidden flex flex-col items-center justify-center gap-1.5",
              "w-10 h-10 rounded-full border border-[var(--rule-strong)]",
              "transition-colors hover:bg-[var(--cream-2)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)]"
            )}
          >
            <span className={cn("block w-4 h-px bg-[var(--ink)] transition-transform duration-[200ms]", menuOpen && "translate-y-[5px] rotate-45")} />
            <span className={cn("block w-4 h-px bg-[var(--ink)] transition-opacity duration-[200ms]", menuOpen && "opacity-0")} />
            <span className={cn("block w-4 h-px bg-[var(--ink)] transition-transform duration-[200ms]", menuOpen && "-translate-y-[5px] -rotate-45")} />
          </button>
        </div>
      </div>
    </header>
  );
}

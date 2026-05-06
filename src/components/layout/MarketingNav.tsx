"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

function SolLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="14" cy="14" r="12" stroke="var(--brand)" strokeWidth="2" />
      <circle cx="14" cy="14" r="5" fill="var(--brand)" />
    </svg>
  );
}

export function MarketingNav() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <nav
      className="sticky top-0 z-[100] border-b border-[var(--border)]"
      style={{ background: "var(--bg)" }}
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 h-14 flex items-center gap-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-[17px] font-bold text-[var(--text)] no-underline hover:no-underline shrink-0"
        >
          <SolLogo />
          SolAI
        </Link>

        {/* Desktop nav links */}
        <nav
          className="hidden md:flex items-center gap-1 ml-8"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3.5 py-1.5 text-[14px] font-medium rounded-[10px] transition-all duration-[120ms] no-underline hover:no-underline hover:text-[var(--text)] hover:bg-[var(--surface-2)]",
                  isActive
                    ? "text-[var(--text)] bg-[var(--surface-2)]"
                    : "text-[var(--text-muted)]"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions — pushed to far right */}
        <div className="ml-auto flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="w-8 h-8 flex items-center justify-center border border-[var(--border)] rounded-[10px] text-[15px] cursor-pointer hover:bg-[var(--surface-2)] transition-all duration-[120ms]"
            aria-label="Toggle theme"
            suppressHydrationWarning
          >
            {mounted ? (theme === "dark" ? "☀" : "☾") : "☾"}
          </button>

          {/* Log in */}
          <Link
            href="/sign-in"
            className="hidden md:block text-[14px] font-medium text-[var(--text-muted)] hover:text-[var(--text)] no-underline hover:no-underline transition-colors duration-[120ms]"
          >
            Log in
          </Link>

          {/* CTA */}
          <Link
            href="/sign-up"
            className="inline-flex items-center gap-1.5 px-[22px] py-[10px] text-[14px] font-semibold bg-[var(--brand)] text-white border border-[var(--brand)] rounded-[10px] no-underline hover:no-underline hover:bg-[#4A6BEE] transition-all duration-150"
          >
            Start free
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px] cursor-pointer border-none bg-transparent"
            aria-label="Menu"
          >
            <span className="block w-[18px] h-[1.5px] bg-[var(--text)] rounded-sm" />
            <span className="block w-[18px] h-[1.5px] bg-[var(--text)] rounded-sm" />
            <span className="block w-[18px] h-[1.5px] bg-[var(--text)] rounded-sm" />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          className="md:hidden absolute top-14 left-0 right-0 bg-[var(--surface)] border-b border-[var(--border)] flex flex-col p-3 z-50"
        >
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "px-4 py-2.5 text-[14px] font-medium rounded-[10px] no-underline hover:no-underline transition-all duration-[120ms]",
                  isActive
                    ? "text-[var(--text)] bg-[var(--surface-2)]"
                    : "text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}

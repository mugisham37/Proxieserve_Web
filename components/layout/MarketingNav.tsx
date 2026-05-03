"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { MkIcon } from "@/components/atoms/MkIcon";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function MarketingNav() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <nav
      className="sticky top-0 z-50 border-b border-border"
      style={{
        background: "color-mix(in srgb, var(--bg) 85%, transparent)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-8 h-14 flex items-center gap-6 md:px-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-[17px] font-bold text-text no-underline hover:no-underline shrink-0"
        >
          <span
            className="w-7 h-7 rounded-md bg-brand flex items-center justify-center text-white text-[13px] font-bold"
            aria-hidden="true"
          >
            S
          </span>
          SolAI
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1 ml-8">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3.5 py-1.5 text-[14px] font-medium rounded-[10px] transition-all duration-[120ms] no-underline hover:no-underline",
                  isActive
                    ? "text-text bg-surface-2"
                    : "text-text-muted hover:text-text hover:bg-surface-2"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Actions */}
        <div className="ml-auto flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="hidden md:flex w-8 h-8 items-center justify-center border border-border rounded-[10px] text-text-muted hover:bg-surface-2 transition-all duration-[120ms] cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <MkIcon name="sun" size={15} />
            ) : (
              <MkIcon name="moon" size={15} />
            )}
          </button>

          {/* Log in */}
          <Link
            href="#"
            className="hidden md:block text-[14px] font-medium text-text-muted hover:text-text no-underline hover:no-underline transition-colors duration-[120ms]"
          >
            Log in
          </Link>

          {/* CTA */}
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 px-[18px] py-[9px] text-[14px] font-semibold bg-brand text-white rounded-[10px] border border-brand no-underline hover:no-underline hover:bg-[#4A6BEE] transition-all duration-150"
          >
            Start free
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px] cursor-pointer"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span
              className={cn(
                "block w-[18px] h-[1.5px] bg-text rounded-sm transition-all duration-200",
                menuOpen && "translate-y-[6.5px] rotate-45"
              )}
            />
            <span
              className={cn(
                "block w-[18px] h-[1.5px] bg-text rounded-sm transition-all duration-200",
                menuOpen && "opacity-0"
              )}
            />
            <span
              className={cn(
                "block w-[18px] h-[1.5px] bg-text rounded-sm transition-all duration-200",
                menuOpen && "-translate-y-[6.5px] -rotate-45"
              )}
            />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden absolute top-14 left-0 right-0 bg-surface border-b border-border flex flex-col p-3 z-50">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "px-4 py-2.5 text-[14px] font-medium rounded-[10px] no-underline hover:no-underline transition-all duration-[120ms]",
                  isActive
                    ? "text-text bg-surface-2"
                    : "text-text-muted hover:text-text hover:bg-surface-2"
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="flex items-center gap-3 mt-2 pt-3 border-t border-border px-2">
            <button
              onClick={toggleTheme}
              className="flex w-8 h-8 items-center justify-center border border-border rounded-[10px] text-text-muted hover:bg-surface-2 transition-all"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <MkIcon name="sun" size={15} />
              ) : (
                <MkIcon name="moon" size={15} />
              )}
            </button>
            <Link
              href="#"
              className="text-[14px] font-medium text-text-muted no-underline hover:no-underline"
            >
              Log in
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

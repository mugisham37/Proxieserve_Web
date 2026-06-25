"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Wordmark } from "@/components/atoms/shared/Wordmark";
import { LangSwitcher } from "@/components/atoms/shared/LangSwitcher";

const FOOTER_COLS = [
  {
    heading: "Hebuza",
    links: [
      { label: "How it works", href: "/how-it-works" },
      { label: "About us", href: "/about" },
      { label: "Pricing", href: "/pricing" },
      { label: "Contact", href: "/contact" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Company Registration", href: "/services/company-registration" },
      { label: "National ID Renewal", href: "/services/national-id" },
      { label: "TIN Registration", href: "/services/tin" },
      { label: "Business Permit", href: "/services/business-permit" },
      { label: "RSSB Enrollment", href: "/services/rssb" },
      { label: "All services →", href: "/services" },
    ],
  },
  {
    heading: "Help & Legal",
    links: [
      { label: "Track application", href: "/track" },
      { label: "Privacy policy", href: "/legal/privacy" },
      { label: "Terms of service", href: "/legal/terms" },
      { label: "Accessibility", href: "/legal/accessibility" },
    ],
  },
];

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="inline-flex items-center gap-1.5 font-sans text-[12px] text-[var(--ink-subtle)] hover:text-[var(--ink)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] rounded-sm"
    >
      <span aria-hidden="true">{isDark ? "☀" : "☾"}</span>
      {isDark ? "Light" : "Dark"}
    </button>
  );
}

function FooterCol({ heading, links }: { heading: string; links: { label: string; href: string }[] }) {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      {/* Mobile accordion toggle */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="md:hidden w-full flex items-center justify-between py-3 border-b border-[var(--rule)]"
      >
        <span className="t-h4 text-[var(--ink-muted)]">{heading}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.15 }}
          className="text-[var(--ink-muted)]"
          aria-hidden="true"
        >
          ↓
        </motion.span>
      </button>

      {/* Desktop always visible; mobile animated */}
      <p className="t-h4 text-[var(--ink-muted)] hidden md:block mb-4">{heading}</p>

      <AnimatePresence initial={false}>
        {(open) && (
          <motion.ul
            key="mobile-links"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden flex flex-col gap-3 pt-3 pb-4"
          >
            {links.map(({ label, href }) => (
              <li key={href}>
                <Link href={href} className="font-sans text-[14px] text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      {/* Desktop links */}
      <ul className="hidden md:flex flex-col gap-2.5">
        {links.map(({ label, href }) => (
          <li key={href}>
            <Link href={href} className="font-sans text-[14px] text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter({ className }: { className?: string }) {
  return (
    <footer className={cn("bg-[var(--cream)] border-t border-[var(--rule)]", className)}>
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-14">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-10 mb-12">
          {/* Brand column */}
          <div className="flex flex-col gap-5">
            <Wordmark size="md" />
            <p className="font-serif italic text-[15px] text-[var(--ink-muted)] leading-relaxed max-w-xs">
              Rwanda&apos;s trusted paperwork and government services expert.
            </p>
            <LangSwitcher />
          </div>

          {FOOTER_COLS.map((col) => (
            <FooterCol key={col.heading} {...col} />
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-6 border-t border-[var(--rule)]">
          <p className="font-sans text-[12px] text-[var(--ink-subtle)]">
            © {new Date().getFullYear()} Hebuza Ltd. Kigali, Rwanda.
          </p>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <p className="font-mono text-[11px] text-[var(--ink-subtle)]">v0.1.0</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

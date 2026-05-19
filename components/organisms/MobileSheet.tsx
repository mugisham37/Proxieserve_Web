"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Wordmark } from "@/components/atoms/Wordmark";
import { PillButton } from "@/components/atoms/PillButton";

const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
];

interface MobileSheetProps {
  open: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

export function MobileSheet({ open, onClose, triggerRef }: MobileSheetProps) {
  const firstFocusRef = React.useRef<HTMLButtonElement>(null);

  // Lock body scroll
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      firstFocusRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Esc to close
  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && open) {
        onClose();
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose, triggerRef]);

  // Focus trap
  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key !== "Tab") return;
    const focusable = e.currentTarget.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const items = Array.from(focusable);
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[var(--ink)]/40 backdrop-blur-[2px] lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Sheet */}
          <motion.div
            key="sheet"
            id="mobile-sheet"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.32, ease: [0.2, 0, 0, 1] }}
            onKeyDown={handleKeyDown}
            className={cn(
              "fixed top-0 right-0 bottom-0 z-50 w-full max-w-[340px]",
              "bg-[var(--paper)] flex flex-col",
              "lg:hidden shadow-[var(--sh-overlay)]"
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--rule)]">
              <Wordmark size="md" />
              <button
                ref={firstFocusRef}
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="flex items-center justify-center w-9 h-9 rounded-full border border-[var(--rule-strong)] text-[var(--ink)] hover:bg-[var(--cream-2)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)]"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M13 1L1 13M1 1l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Nav */}
            <nav className="flex-1 flex flex-col px-5 py-6 gap-1 overflow-y-auto" aria-label="Mobile navigation">
              {NAV_LINKS.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={onClose}
                  className="font-serif italic text-[24px] text-[var(--ink)] py-2 hover:text-[var(--brand)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] rounded-sm"
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Bottom CTAs */}
            <div className="flex flex-col gap-3 px-5 py-6 border-t border-[var(--rule)]" style={{ paddingBottom: "calc(24px + env(safe-area-inset-bottom))" }}>
              <PillButton variant="ghost" size="md" asChild className="w-full justify-center">
                <Link href="/track" onClick={onClose}>Track application</Link>
              </PillButton>
              <PillButton variant="solid" size="md" asChild className="w-full justify-center">
                <Link href="/get-started" onClick={onClose}>Get started →</Link>
              </PillButton>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

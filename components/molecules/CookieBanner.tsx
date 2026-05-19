"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { STORAGE_KEYS, getItem, setItem } from "@/lib/storage";

type ConsentValue = "accepted" | "rejected" | "customised" | null;

export function CookieBanner({ className }: { className?: string }) {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const stored = getItem(STORAGE_KEYS.COOKIE_CONSENT) as ConsentValue;
    if (!stored) setVisible(true);
  }, []);

  function handleChoice(choice: "accepted" | "rejected" | "customised") {
    setItem(STORAGE_KEYS.COOKIE_CONSENT, choice);
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.32, ease: [0.2, 0, 0, 1] }}
          className={cn(
            "fixed bottom-0 left-0 right-0 z-50",
            "bg-[var(--ink-2)] text-[var(--paper)]",
            "border-t border-[rgba(242,235,215,0.12)]",
            "px-5 py-4",
            className
          )}
          role="dialog"
          aria-label="Cookie consent"
        >
          <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="flex-1 font-sans text-[13px] text-[rgba(242,235,215,0.8)] leading-relaxed">
              We use cookies to improve your experience and remember your tracking codes.{" "}
              <a href="/legal/privacy" className="text-[var(--paper)] underline hover:no-underline">
                Privacy policy
              </a>
            </p>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => handleChoice("customised")}
                className="font-sans text-[12px] text-[rgba(242,235,215,0.6)] hover:text-[var(--paper)] underline transition-colors"
              >
                Customise
              </button>
              <button
                type="button"
                onClick={() => handleChoice("rejected")}
                className="font-sans text-[13px] font-medium px-4 py-2 rounded-[999px] border border-[rgba(242,235,215,0.3)] text-[var(--paper)] hover:border-[rgba(242,235,215,0.7)] transition-colors"
              >
                Reject
              </button>
              <button
                type="button"
                onClick={() => handleChoice("accepted")}
                className="font-sans text-[13px] font-medium px-4 py-2 rounded-[999px] bg-[var(--paper)] text-[var(--ink)] hover:bg-[var(--cream)] transition-colors"
              >
                Accept all
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { STORAGE_KEYS, getItem, setItem } from "@/lib/storage";
import Link from "next/link";

export function ReturningBanner({ className }: { className?: string }) {
  const [visible, setVisible] = React.useState(false);
  const [code, setCode] = React.useState<string | null>(null);

  React.useEffect(() => {
    const lastCode = getItem(STORAGE_KEYS.LAST_CODE);
    const dismissed = getItem(STORAGE_KEYS.RETURNING_DISMISSED);
    if (lastCode && !dismissed) {
      setCode(lastCode);
      setVisible(true);
    }
  }, []);

  function handleDismiss() {
    setItem(STORAGE_KEYS.RETURNING_DISMISSED, "true");
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
          className={cn("overflow-hidden", className)}
        >
          <div className="bg-[var(--ink)] text-[var(--paper)] px-5 py-2.5 flex items-center justify-between gap-4">
            <p className="font-sans text-[12px] flex items-center gap-2">
              <span className="text-[var(--brand)]">👋</span>
              Welcome back — your last code was{" "}
              <span className="font-mono text-[var(--paper)]">{code}</span>
            </p>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href={`/track?code=${code}`}
                className="font-sans text-[12px] font-medium text-[var(--brand)] hover:underline"
              >
                Track it →
              </Link>
              <button
                type="button"
                onClick={handleDismiss}
                aria-label="Dismiss"
                className="text-[rgba(242,235,215,0.5)] hover:text-[var(--paper)] transition-colors"
              >
                ×
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

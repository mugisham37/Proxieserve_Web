"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { PillButton } from "@/components/atoms/PillButton";

export function StickyMobileCTA({ className }: { className?: string }) {
  const [visible, setVisible] = React.useState(false);
  const shouldReduceMotion = useReducedMotion();

  React.useEffect(() => {
    const hero = document.querySelector("[data-hero-section]");
    if (!hero) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.1 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="sticky-cta"
          initial={shouldReduceMotion ? { opacity: 0 } : { y: "110%" }}
          animate={shouldReduceMotion ? { opacity: 1 } : { y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { y: "110%" }}
          transition={{ duration: 0.32, ease: [0.2, 0, 0, 1] }}
          className={cn(
            "fixed bottom-0 left-0 right-0 z-40 md:hidden",
            "bg-[var(--paper)] border-t border-[var(--rule)]",
            "flex items-center gap-2 px-4 py-3",
            className
          )}
          style={{ paddingBottom: "calc(12px + env(safe-area-inset-bottom))" }}
        >
          <PillButton variant="ghost" size="sm" asChild className="flex-1 justify-center">
            <Link href="/track">Track</Link>
          </PillButton>
          <PillButton variant="solid" size="sm" asChild className="flex-1 justify-center" arrow>
            <Link href="/get-started">Get started</Link>
          </PillButton>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { PillButton } from "@/components/atoms/shared/PillButton";
import { type UiService } from "@/lib/service-ui-types";

interface StickyServiceBarProps {
  service: UiService;
  className?: string;
}

export function StickyServiceBar({ service, className }: StickyServiceBarProps) {
  const [visible, setVisible] = React.useState(false);
  const shouldReduceMotion = useReducedMotion();

  React.useEffect(() => {
    const hero = document.querySelector("[data-hero-section]") as HTMLElement | null;
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const isDisabled = service.status !== "active";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { y: "110%" }}
          animate={shouldReduceMotion ? { opacity: 1 } : { y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { y: "110%" }}
          transition={{ duration: 0.32, ease: [0.2, 0, 0, 1] as [number, number, number, number] }}
          className={cn(
            "fixed bottom-0 left-0 right-0 z-50 md:hidden",
            "bg-[rgba(242,235,215,0.95)] backdrop-blur-[12px] border-t border-[var(--rule)]",
            "px-5 pb-[calc(12px+env(safe-area-inset-bottom))] pt-3",
            className
          )}
          aria-label="Quick start service"
        >
          <div className="flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <p className="font-sans text-[12px] text-[var(--ink-muted)] uppercase tracking-[0.1em] mb-0.5">Service</p>
              <p className="font-serif text-[15px] text-[var(--ink)] truncate">{service.name}</p>
            </div>
            {!isDisabled && (
              <PillButton variant="brand" size="sm" asChild arrow className="shrink-0">
                <Link href={`/services/${service.slug}/apply`}>Start →</Link>
              </PillButton>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

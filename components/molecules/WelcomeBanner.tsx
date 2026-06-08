"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface WelcomeBannerCTA {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface WelcomeBannerProps {
  visible: boolean;
  headline: React.ReactNode;
  body: string;
  ctas?: WelcomeBannerCTA[];
  variant?: "action" | "absence";
  className?: string;
}

export function WelcomeBanner({
  visible,
  headline,
  body,
  ctas = [],
  variant = "action",
  className,
}: WelcomeBannerProps) {
  const prefersReduced = useReducedMotion();

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={
            prefersReduced
              ? { duration: 0 }
              : { duration: 0.2, ease: [0.2, 0, 0, 1] }
          }
          role="status"
          className={cn(
            "overflow-hidden rounded-[var(--r-md)]",
            variant === "action" ? "bg-[var(--ink)]" : "bg-[var(--ink-2)]",
            className
          )}
        >
          <div className="px-[22px] py-[20px] flex flex-col sm:flex-row sm:items-center gap-[14px]">
            <div className="flex-1 min-w-0">
              <h3 className="font-serif text-[18px] font-normal text-[var(--cream)] leading-[1.3] mb-[4px]">
                {headline}
              </h3>
              <p className="font-sans text-[13.5px] text-[var(--cream)]/75 leading-[1.5]">
                {body}
              </p>
            </div>
            {ctas.length > 0 && (
              <div className="flex flex-col sm:flex-row gap-[8px] shrink-0">
                {ctas.map((cta, i) =>
                  cta.href ? (
                    <Link
                      key={i}
                      href={cta.href}
                      className={cn(
                        "inline-flex items-center justify-center px-[18px] py-[9px]",
                        "rounded-[var(--r-pill)] font-sans text-[13px] font-medium",
                        "transition-colors duration-[var(--m-fast)]",
                        "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]",
                        "whitespace-nowrap",
                        i === 0
                          ? "bg-[var(--paper)] text-[var(--ink)] hover:bg-[var(--cream)]"
                          : "bg-transparent text-[var(--cream)] border border-[var(--cream)]/30 hover:border-[var(--cream)]/60"
                      )}
                    >
                      {cta.label}
                    </Link>
                  ) : (
                    <button
                      key={i}
                      type="button"
                      onClick={cta.onClick}
                      className={cn(
                        "inline-flex items-center justify-center px-[18px] py-[9px]",
                        "rounded-[var(--r-pill)] font-sans text-[13px] font-medium",
                        "transition-colors duration-[var(--m-fast)]",
                        "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]",
                        "whitespace-nowrap",
                        i === 0
                          ? "bg-[var(--paper)] text-[var(--ink)] hover:bg-[var(--cream)]"
                          : "bg-transparent text-[var(--cream)] border border-[var(--cream)]/30 hover:border-[var(--cream)]/60"
                      )}
                    >
                      {cta.label}
                    </button>
                  )
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

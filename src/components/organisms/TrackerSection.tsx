"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/atoms/shared/Eyebrow";
import { TrackerInput } from "@/components/molecules/TrackerInput";

export function TrackerSection({ className }: { className?: string }) {
  return (
    <section
      className={cn("bg-[var(--paper)] py-16 sm:py-20", className)}
      aria-labelledby="tracker-heading"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
          className={cn(
            "border border-[var(--rule)] rounded-[var(--r-2xl)]",
            "grid md:grid-cols-[1fr_1fr] gap-10 lg:gap-16",
            "p-8 sm:p-10 lg:p-12"
          )}
        >
          {/* Left */}
          <div className="flex flex-col gap-4 justify-center">
            <Eyebrow withLine className="text-[var(--ink-muted)]">Track your application</Eyebrow>
            <h2 id="tracker-heading" className="t-h2 text-[var(--ink)]">
              Where are your documents?
            </h2>
            <p className="font-sans text-[15px] text-[var(--ink-muted)] leading-relaxed">
              Enter your ProxiServe code to see real-time status updates, documents, and agent messages.
            </p>
            <p className="font-mono text-[12px] text-[var(--ink-subtle)]">
              Example: <span className="text-[var(--ink-muted)]">PRX-2026-00483</span>
            </p>
          </div>

          {/* Right */}
          <div className="flex items-center">
            <TrackerInput className="w-full" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

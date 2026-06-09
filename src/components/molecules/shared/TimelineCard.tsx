"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { TimelineNode } from "@/components/molecules/shared/TimelineNode";
import type { TimelineStep } from "@/lib/tracker-data";

interface TimelineCardProps {
  steps: TimelineStep[];
}

export function TimelineCard({ steps }: TimelineCardProps) {
  const doneCount = steps.filter((s) => s.status === "done").length;
  const total = steps.length;

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.32, ease: "easeOut" }}
      className="bg-[var(--paper)] border border-[var(--rule)] rounded-[var(--r-lg)] p-7 mb-6"
      aria-labelledby="timeline-heading"
    >
      <h2 id="timeline-heading" className="font-serif font-medium text-[24px] leading-[1.15] m-0 mb-1">
        Application <em className="not-italic font-normal italic">timeline</em>
      </h2>
      <p className="font-sans text-[13.5px] text-[var(--ink-muted)] mt-0 mb-6">
        {doneCount} of {total} steps complete
      </p>

      {/* Vertical connector line via before pseudo-element */}
      <ol
        className="relative m-0 p-0 list-none before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-px before:bg-[var(--rule)]"
        aria-label="Application progress timeline"
      >
        {steps.map((step) => (
          <TimelineNode key={step.id} step={step} />
        ))}
      </ol>
    </motion.section>
  );
}

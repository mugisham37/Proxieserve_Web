"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { PillButton } from "@/components/atoms/shared/PillButton";
import type { OutcomeData } from "@/lib/tracker-data";

interface OutcomeCardProps {
  outcome: OutcomeData;
}

export function OutcomeCard({ outcome }: OutcomeCardProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: "easeOut" }}
      className="bg-[var(--ok-soft)] border border-[var(--ok)] rounded-[var(--r-lg)] px-[22px] py-5 mb-4"
      aria-labelledby="outcome-heading"
    >
      <div className="grid grid-cols-[48px_1fr_auto] max-[600px]:grid-cols-[48px_1fr] gap-4 items-center">
        {/* Checkmark circle */}
        <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--ok)] text-white shrink-0" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path
              d="M5 11l4.5 4.5 7.5-8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="[stroke-dasharray:30] [stroke-dashoffset:30] [animation:stroke-draw_0.4s_0.1s_ease-out_forwards]"
            />
          </svg>
        </span>

        <div>
          <h3 id="outcome-heading" className="font-serif font-medium text-[18px] text-[var(--ok)] m-0">
            {outcome.message}
          </h3>
          <p className="font-sans text-[13px] text-[#265432] mt-1 m-0">{outcome.collectMethod}</p>
          {outcome.address && (
            <p className="font-mono text-[11px] text-[var(--ok)] mt-1 m-0">{outcome.address}</p>
          )}
        </div>

        <PillButton
          size="sm"
          variant="ghost"
          className="max-[600px]:col-span-2 max-[600px]:justify-center bg-[var(--paper)] border-[var(--ok)] text-[var(--ok)] hover:bg-[var(--ok)] hover:text-white text-[13px] px-[18px] py-[10px]"
          aria-label="Download your completion certificate"
        >
          Download certificate
        </PillButton>
      </div>
    </motion.section>
  );
}

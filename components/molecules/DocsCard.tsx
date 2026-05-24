"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { DocRow } from "@/components/molecules/DocRow";
import type { DocFile } from "@/lib/tracker-data";

interface DocsCardProps {
  docs: DocFile[];
  /** true = guest mode: view buttons disabled */
  isGuest?: boolean;
}

export function DocsCard({ docs, isGuest = true }: DocsCardProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.32, ease: "easeOut", delay: 0.12 }}
      className="bg-[var(--paper)] border border-[var(--rule)] rounded-[var(--r-lg)] p-6"
      aria-labelledby="docs-heading"
    >
      <div className="flex justify-between items-baseline gap-3 mb-4">
        <h2 id="docs-heading" className="font-serif font-medium text-[22px] m-0">
          Submitted <em className="not-italic font-normal italic">documents</em>
        </h2>
        <span className="font-mono text-[11px] text-[var(--ink-muted)] tracking-[0.06em] shrink-0">
          {docs.length} file{docs.length !== 1 ? "s" : ""}
        </span>
      </div>

      <ol className="grid gap-[10px] list-none m-0 p-0">
        {docs.map((doc) => (
          <DocRow key={doc.label} doc={doc} canView={!isGuest} />
        ))}
      </ol>

      {isGuest && (
        <p className="flex items-center gap-2 mt-[14px] font-sans text-[12.5px] text-[var(--ink-muted)]">
          {/* Lock icon */}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="text-[var(--ink-subtle)] shrink-0">
            <rect x="2" y="6" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
            <path d="M4.5 6V4a2.5 2.5 0 0 1 5 0v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          Sign in to view and download your documents.
        </p>
      )}
    </motion.section>
  );
}

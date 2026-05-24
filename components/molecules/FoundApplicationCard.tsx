"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface FoundApplicationCardProps {
  serviceName: string;
  submittedDate?: string;
  status?: string;
  className?: string;
}

export function FoundApplicationCard({
  serviceName,
  submittedDate = "19 May 2026 · 14:32",
  status = "In progress",
  className,
}: FoundApplicationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
      className={cn(
        "rounded-[var(--r-md)] bg-[var(--ok-soft)] border border-[var(--ok)] border-opacity-40",
        "px-4 py-3.5 flex items-start gap-3",
        className
      )}
    >
      <CheckCircle2
        size={20}
        strokeWidth={1.8}
        className="text-[var(--ok)] mt-0.5 shrink-0"
      />
      <div className="flex flex-col gap-1">
        <p className="font-sans text-[13px] font-medium text-[var(--ink)]">
          Found —{" "}
          <em className="font-serif not-italic text-[var(--ink)]">{serviceName}</em>
        </p>
        <p className="font-sans text-[12px] text-[var(--ink-muted)] leading-snug">
          Submitted {submittedDate} · current status{" "}
          <span className="font-mono text-[11px] bg-[var(--ok-soft)] text-[var(--ok)] px-1.5 py-0.5 rounded-[var(--r-sm)]">
            {status}
          </span>
        </p>
      </div>
    </motion.div>
  );
}

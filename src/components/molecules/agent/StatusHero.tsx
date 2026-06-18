"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { TrackerApplication, TrackStatus } from "@/lib/tracker-ui-types";

const STATUS_CONFIG: Record<
  TrackStatus,
  {
    bg: string;
    textColor: string;
    mutedColor: string;
    cardBg: string;
    cardBorder: string;
    labColor: string;
    valueColor: string;
    label: string;
    dotColor: string;
  }
> = {
  received: {
    bg: "bg-[var(--info)]",
    textColor: "text-white",
    mutedColor: "text-white/70",
    cardBg: "bg-white/12",
    cardBorder: "border-white/25",
    labColor: "text-white/65",
    valueColor: "text-white",
    label: "Received",
    dotColor: "bg-white",
  },
  "in-progress": {
    bg: "bg-[var(--brand)]",
    textColor: "text-white",
    mutedColor: "text-white/70",
    cardBg: "bg-white/12",
    cardBorder: "border-white/25",
    labColor: "text-white/65",
    valueColor: "text-white",
    label: "In progress",
    dotColor: "bg-white",
  },
  "action-required": {
    bg: "bg-[var(--warn)]",
    textColor: "text-[var(--ink)]",
    mutedColor: "text-[var(--ink)]/65",
    cardBg: "bg-black/5",
    cardBorder: "border-black/15",
    labColor: "text-[var(--ink)]/65",
    valueColor: "text-[var(--ink)]",
    label: "Action required",
    dotColor: "bg-[var(--ink)]",
  },
  "on-hold": {
    bg: "bg-[var(--warn)]",
    textColor: "text-[var(--ink)]",
    mutedColor: "text-[var(--ink)]/65",
    cardBg: "bg-black/5",
    cardBorder: "border-black/15",
    labColor: "text-[var(--ink)]/65",
    valueColor: "text-[var(--ink)]",
    label: "On hold",
    dotColor: "bg-[var(--ink)]",
  },
  completed: {
    bg: "bg-[var(--ok)]",
    textColor: "text-white",
    mutedColor: "text-white/70",
    cardBg: "bg-white/12",
    cardBorder: "border-white/25",
    labColor: "text-white/65",
    valueColor: "text-white",
    label: "Completed",
    dotColor: "bg-white",
  },
  rejected: {
    bg: "bg-[var(--danger)]",
    textColor: "text-white",
    mutedColor: "text-white/70",
    cardBg: "bg-white/12",
    cardBorder: "border-white/25",
    labColor: "text-white/65",
    valueColor: "text-white",
    label: "Rejected",
    dotColor: "bg-white",
  },
};

interface StatusHeroProps {
  application: TrackerApplication;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export function StatusHero({ application, onRefresh = () => {}, isRefreshing = false }: StatusHeroProps) {
  const cfg = STATUS_CONFIG[application.status];

  return (
    <motion.section
      key={application.status}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.48, ease: "easeOut" }}
      aria-live="polite"
      aria-label={`Application status: ${cfg.label}`}
      className={cn(
        cfg.bg,
        "notch-tr-bl",
        "px-8 py-8 sm:px-12 sm:py-10",
        "mb-6"
      )}
    >
      {/* Top row: code + updated */}
      <div className={cn("flex justify-between items-baseline gap-4 flex-wrap mb-6", cfg.mutedColor)}>
        <span className={cn("font-mono text-[clamp(15px,1.8vw,18px)] tracking-[0.06em] font-medium", cfg.textColor)}>
          {application.code}
        </span>
        <span className="font-mono text-[11px] tracking-[0.06em]">
          Updated {application.updatedAt}
        </span>
      </div>

      {/* Service label */}
      <p className={cn("font-mono text-[11px] tracking-[0.08em] uppercase mb-3", cfg.mutedColor)}>
        {application.serviceCategory ?? application.serviceName}
      </p>

      {/* Status chip */}
      <div className="flex items-center gap-2 mb-3">
        <span className={cn("inline-flex items-center gap-[6px] px-[10px] py-[3px] rounded-full font-sans text-[11px] font-medium", cfg.cardBg, `border ${cfg.cardBorder}`, cfg.textColor)}>
          <span className={cn("w-[6px] h-[6px] rounded-full shrink-0", cfg.dotColor)} aria-hidden="true" />
          {cfg.label}
        </span>
        <button
          type="button"
          onClick={onRefresh}
          disabled={isRefreshing}
          aria-label="Refresh status"
          aria-busy={isRefreshing}
          className={cn(
            "ml-2 font-mono text-[11px] tracking-[0.06em] underline underline-offset-2 opacity-70 hover:opacity-100 transition-opacity",
            cfg.textColor,
            isRefreshing && "opacity-40 cursor-wait"
          )}
        >
          {isRefreshing ? "Refreshing…" : "Refresh"}
        </button>
      </div>

      {/* H1 */}
      <h1 className={cn("font-serif font-normal text-[clamp(36px,5.4vw,64px)] leading-[1.02] tracking-[-0.02em] text-balance mb-2", cfg.textColor)}>
        {application.headline ?? cfg.label}
      </h1>

      {/* Sub */}
      <p className={cn("font-serif text-[clamp(17px,1.8vw,20px)] leading-[1.45] max-w-[540px]", cfg.mutedColor)}>
        {application.subheadline ?? application.serviceName}
      </p>

      {/* Inner card */}
      <div className={cn("mt-8 border rounded-[var(--r-md)] px-5 py-[18px] grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4", cfg.cardBg, cfg.cardBorder)}>
        <div>
          <p className={cn("font-mono text-[10px] tracking-[0.08em] uppercase mb-1", cfg.labColor)}>Submitted</p>
          <p className={cn("font-serif text-[18px] font-medium leading-[1.3]", cfg.valueColor)}>{application.submittedAt}</p>
        </div>
        <div>
          <p className={cn("font-mono text-[10px] tracking-[0.08em] uppercase mb-1", cfg.labColor)}>Est. completion</p>
          <p className={cn("font-serif text-[18px] font-medium leading-[1.3]", cfg.valueColor)}>{application.estimatedCompletion}</p>
        </div>
        {application.workingDaysLeft !== undefined && (
          <div>
            <p className={cn("font-mono text-[10px] tracking-[0.08em] uppercase mb-1", cfg.labColor)}>Working days left</p>
            <p className={cn("font-serif text-[18px] font-medium leading-[1.3]", cfg.valueColor)}>{application.workingDaysLeft} days</p>
          </div>
        )}
        <div>
          <p className={cn("font-mono text-[10px] tracking-[0.08em] uppercase mb-1", cfg.labColor)}>Tracking code</p>
          <p className={cn("font-mono text-[15px] font-medium tracking-[0.04em] leading-[1.3]", cfg.valueColor)}>{application.code}</p>
        </div>
      </div>
    </motion.section>
  );
}

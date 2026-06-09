"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { SkeletonBlock } from "@/components/atoms/shared/SkeletonBlock";
import type { AdminMetric } from "@/lib/types/admin";

interface KpiCardProps {
  metric: AdminMetric;
  loading?: boolean;
  index?: number;
  className?: string;
}

const deltaColorClass: Record<string, string> = {
  ok: "text-[var(--ok)]",
  warn: "text-[var(--warn)]",
  danger: "text-[var(--danger)]",
  muted: "text-[var(--ink-muted)]",
};

export function KpiCard({ metric, loading = false, index = 0, className }: KpiCardProps) {
  if (loading) {
    return (
      <div
        className={cn(
          "flex flex-col gap-[10px] px-[20px] py-[18px]",
          "rounded-[var(--r-lg)] border border-[var(--rule)] bg-[var(--paper)]",
          className
        )}
      >
        <SkeletonBlock className="h-[10px] w-[80px] rounded-full" />
        <SkeletonBlock className="h-[40px] w-[120px] rounded-[var(--r-sm)]" />
        <SkeletonBlock className="h-[10px] w-[140px] rounded-full" />
      </div>
    );
  }

  const TrendIcon =
    metric.deltaDir === "up"
      ? TrendingUp
      : metric.deltaDir === "down"
      ? TrendingDown
      : Minus;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, delay: index * 0.06, ease: [0, 0, 0, 1] }}
      className={cn(
        "flex flex-col gap-[6px] px-[20px] py-[18px]",
        "rounded-[var(--r-lg)] border border-[var(--rule)] bg-[var(--paper)]",
        "transition-shadow duration-[var(--m-fast)] hover:shadow-[var(--sh-subtle)]",
        className
      )}
    >
      <p className="font-mono text-[10px] tracking-[0.1em] uppercase text-[var(--ink-muted)]">
        {metric.label}
      </p>
      <p className="font-serif text-[34px] leading-[1] font-normal text-[var(--ink)]">
        {metric.value}
      </p>
      {metric.delta && (
        <div
          className={cn(
            "flex items-center gap-[4px] font-sans text-[11.5px] leading-[1.4]",
            deltaColorClass[metric.deltaColor ?? "muted"]
          )}
        >
          <TrendIcon size={11} strokeWidth={2} />
          <span>{metric.delta}</span>
        </div>
      )}
    </motion.div>
  );
}

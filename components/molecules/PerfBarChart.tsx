"use client";

import * as React from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import type { WeeklyBar } from "@/lib/types/agent";

interface PerfBarChartProps {
  bars: WeeklyBar[];
  maxCount?: number;
}

export function PerfBarChart({ bars, maxCount }: PerfBarChartProps) {
  const prefersReduced = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const max = maxCount ?? Math.max(...bars.map((b) => b.count), 1);

  return (
    <div ref={ref} className="flex items-end justify-between gap-[8px] h-[180px]" aria-label="Weekly cases completed bar chart">
      {bars.map((bar) => {
        const heightPct = (bar.count / max) * 100;

        return (
          <div
            key={bar.week}
            className="flex-1 flex flex-col items-center gap-[8px]"
          >
            {/* Value label */}
            <span className="font-mono text-[12px] text-[var(--ink-muted)]">
              {bar.count}
            </span>

            {/* Bar */}
            <div
              className="w-full rounded-t-[var(--r-sm)] overflow-hidden relative"
              style={{ height: `${Math.max(heightPct, 8)}%` }}
            >
              <motion.div
                initial={{ scaleY: prefersReduced || !inView ? 1 : 0 }}
                animate={{ scaleY: inView ? 1 : 0 }}
                transition={{ duration: 0.48, ease: [0.2, 0, 0, 1] }}
                style={{ transformOrigin: "bottom" }}
                className={cn(
                  "absolute inset-0 rounded-t-[var(--r-sm)]",
                  bar.isCurrent
                    ? "bg-[var(--brand)]"
                    : "bg-[var(--ink-subtle)]"
                )}
                aria-label={`${bar.week}: ${bar.count} cases${bar.isCurrent ? " (current week)" : ""}`}
              />
            </div>

            {/* Week label */}
            <span className="font-mono text-[10px] text-[var(--ink-muted)] tracking-[0.04em]">
              {bar.week}
            </span>
          </div>
        );
      })}
    </div>
  );
}

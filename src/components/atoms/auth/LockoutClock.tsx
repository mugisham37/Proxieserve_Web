"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface LockoutClockProps {
  until: string; // ISO date string
  onExpired?: () => void;
  className?: string;
}

function msRemaining(until: string): number {
  return Math.max(0, new Date(until).getTime() - Date.now());
}

function formatTime(ms: number): string {
  const totalSeconds = Math.ceil(ms / 1000);
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function LockoutClock({ until, onExpired, className }: LockoutClockProps) {
  const [ms, setMs] = React.useState(() => msRemaining(until));

  React.useEffect(() => {
    if (ms <= 0) {
      onExpired?.();
      return;
    }
    const id = setInterval(() => {
      const remaining = msRemaining(until);
      setMs(remaining);
      if (remaining <= 0) {
        clearInterval(id);
        onExpired?.();
      }
    }, 1000);
    return () => clearInterval(id);
  }, [until, ms, onExpired]);

  return (
    <span
      className={cn(
        "font-mono text-[14px] font-medium text-[var(--warn)] tabular-nums",
        className
      )}
      aria-live="off"
      aria-label={`Account unlocks in ${formatTime(ms)}`}
    >
      {formatTime(ms)}
    </span>
  );
}

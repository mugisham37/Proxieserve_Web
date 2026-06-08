"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface CountdownTimerProps {
  initialSeconds?: number;
  onExpire?: () => void;
  onTick?: (secondsLeft: number) => void;
  className?: string;
  paused?: boolean;
}

function formatTime(s: number): string {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

export function CountdownTimer({
  initialSeconds = 120,
  onExpire,
  onTick,
  className,
  paused = false,
}: CountdownTimerProps) {
  const [seconds, setSeconds] = React.useState(initialSeconds);

  // Allow external resets by tracking initialSeconds changes
  React.useEffect(() => {
    setSeconds(initialSeconds);
  }, [initialSeconds]);

  React.useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setSeconds((prev) => {
        const next = prev - 1;
        onTick?.(next);
        if (next <= 0) {
          clearInterval(id);
          onExpire?.();
          return 0;
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [paused, onExpire, onTick]);

  const isUrgent = seconds <= 30;

  return (
    <span
      aria-live="polite"
      aria-label={`${seconds} seconds remaining`}
      className={cn(
        "font-mono text-[22px] font-semibold tabular-nums transition-colors duration-[200ms]",
        isUrgent ? "text-[var(--danger)]" : "text-[var(--ink)]",
        className
      )}
    >
      {formatTime(seconds)}
    </span>
  );
}

// Exported imperative handle for external resets
export interface CountdownTimerHandle {
  reset: (seconds?: number) => void;
}

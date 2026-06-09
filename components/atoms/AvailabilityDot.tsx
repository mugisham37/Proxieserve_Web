import * as React from "react";
import { cn } from "@/lib/utils";
import type { AvailabilityStatus } from "@/lib/types/agent";

interface AvailabilityDotProps {
  status: AvailabilityStatus;
  className?: string;
}

export function AvailabilityDot({ status, className }: AvailabilityDotProps) {
  return (
    <span
      aria-label={status === "available" ? "Available" : "Away"}
      role="img"
      className={cn(
        "relative inline-flex w-[8px] h-[8px] shrink-0",
        className
      )}
    >
      {status === "available" && (
        <span className="absolute inset-0 rounded-full bg-[var(--ok)] animate-availability-pulse" />
      )}
      <span
        className={cn(
          "relative inline-flex w-full h-full rounded-full",
          status === "available" ? "bg-[var(--ok)]" : "bg-[var(--warn)]"
        )}
      />
    </span>
  );
}

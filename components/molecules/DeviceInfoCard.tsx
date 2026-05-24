import * as React from "react";
import { Monitor } from "lucide-react";
import { cn } from "@/lib/utils";

interface DeviceInfoCardProps {
  device?: string;
  location?: string;
  time?: string;
  className?: string;
}

export function DeviceInfoCard({
  device = "Chrome on macOS",
  location = "Kigali, Rwanda",
  time,
  className,
}: DeviceInfoCardProps) {
  const displayTime = time ?? new Date().toLocaleString("en-GB", {
    day: "numeric", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });

  return (
    <div
      className={cn(
        "rounded-[var(--r-md)] bg-[var(--info-soft)] border-l-[3px] border-[var(--info)]",
        "px-4 py-3 flex items-start gap-3",
        className
      )}
    >
      <Monitor size={18} strokeWidth={1.8} className="text-[var(--info)] mt-0.5 shrink-0" />
      <div className="flex flex-col gap-0.5">
        <p className="font-sans text-[13px] font-medium text-[var(--info)]">
          New device detected
        </p>
        <p className="font-sans text-[12px] text-[var(--info)] opacity-80 leading-snug">
          {device} · {location} · {displayTime}
        </p>
        <p className="font-sans text-[12px] text-[var(--info)] opacity-70 leading-snug mt-1">
          Enter the code we sent to verify this is you.
        </p>
      </div>
    </div>
  );
}

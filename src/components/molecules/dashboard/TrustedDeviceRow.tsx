import * as React from "react";
import { Monitor, Smartphone, Tablet } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TrustedDevice } from "@/lib/types/dashboard";

interface TrustedDeviceRowProps {
  device: TrustedDevice;
  onRevoke?: (deviceId: string) => void;
  className?: string;
}

function DeviceIcon({ name, os }: { name: string; os: string }) {
  const lower = `${name} ${os}`.toLowerCase();
  if (lower.includes("phone") || lower.includes("android") || lower.includes("iphone")) {
    return <Smartphone size={16} aria-hidden="true" />;
  }
  if (lower.includes("tablet") || lower.includes("ipad")) {
    return <Tablet size={16} aria-hidden="true" />;
  }
  return <Monitor size={16} aria-hidden="true" />;
}

export function TrustedDeviceRow({
  device,
  onRevoke,
  className,
}: TrustedDeviceRowProps) {
  return (
    <div
      className={cn(
        "px-[28px] py-[14px] border-b border-[var(--rule)] last:border-b-0",
        "flex items-center gap-[12px]",
        className
      )}
    >
      {/* Device icon */}
      <span className="text-[var(--ink-muted)] shrink-0">
        <DeviceIcon name={device.name} os={device.os} />
      </span>

      {/* Device info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-[8px]">
          <p className="font-sans text-[13px] font-medium text-[var(--ink)] truncate">
            {device.name} · {device.browser}
          </p>
          {device.isCurrent && (
            <span className="inline-flex items-center px-[7px] py-[2px] rounded-full bg-[var(--ok-soft)] text-[var(--ok)] font-sans text-[10px] font-medium shrink-0">
              This device
            </span>
          )}
        </div>
        <p className="font-sans text-[12px] text-[var(--ink-muted)]">
          {device.location} · Last used {device.lastUsed}
        </p>
      </div>

      {/* Revoke button */}
      {!device.isCurrent && onRevoke && (
        <button
          type="button"
          onClick={() => onRevoke(device.id)}
          aria-label={`Revoke access for ${device.name} · ${device.browser}`}
          className={cn(
            "font-sans text-[12px] font-medium text-[var(--danger)]",
            "hover:underline underline-offset-2",
            "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] rounded-[var(--r-sm)]",
            "shrink-0"
          )}
        >
          Revoke
        </button>
      )}
    </div>
  );
}

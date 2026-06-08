import * as React from "react";
import { Shield, Lock, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const ITEMS = [
  { icon: Shield, label: "256-bit encryption" },
  { icon: Lock, label: "No card data stored by us" },
  { icon: CheckCircle, label: "Instant confirmation" },
];

interface TrustStripProps {
  className?: string;
}

export function TrustStrip({ className }: TrustStripProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-x-6 gap-y-2",
        className
      )}
    >
      {ITEMS.map(({ icon: Icon, label }) => (
        <div key={label} className="flex items-center gap-1.5">
          <Icon size={13} strokeWidth={1.5} className="text-[var(--ink-subtle)] flex-shrink-0" />
          <span className="font-sans text-[12px] text-[var(--ink-subtle)]">{label}</span>
        </div>
      ))}
    </div>
  );
}

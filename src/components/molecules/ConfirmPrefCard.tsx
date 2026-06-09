"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/atoms/Switch";

interface ConfirmPrefCardProps {
  whatsappEnabled: boolean;
  onToggle: (enabled: boolean) => void;
  phone?: string;
  className?: string;
}

export function ConfirmPrefCard({ whatsappEnabled, onToggle, phone, className }: ConfirmPrefCardProps) {
  return (
    <div
      className={cn(
        "bg-[var(--paper)] border border-[var(--rule)] rounded-[var(--r-lg)] p-5",
        "grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto] sm:items-center",
        className
      )}
    >
      <div className="flex flex-col gap-0.5">
        <h4 className="font-sans text-[13px] font-semibold text-[var(--ink)]">
          WhatsApp updates
        </h4>
        <p className="font-sans text-[12px] text-[var(--ink-muted)] leading-relaxed">
          Receive real-time application status updates via WhatsApp
          {phone && <span className="font-mono ml-1">{phone}</span>}
        </p>
      </div>

      <Switch
        checked={whatsappEnabled}
        onChange={onToggle}
        label="Enable WhatsApp notifications"
        name="whatsapp-pref"
      />
    </div>
  );
}

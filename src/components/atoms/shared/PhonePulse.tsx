"use client";

import * as React from "react";
import { Smartphone } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PhonePulseProps {
  active?: boolean;
  className?: string;
}

export function PhonePulse({ active = true, className }: PhonePulseProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className={cn("relative flex items-center justify-center w-[120px] h-[120px]", className)}
      aria-hidden="true"
    >
      {/* Rings — hidden for reduced motion */}
      {active && !shouldReduceMotion && (
        <>
          <span
            className="absolute inset-0 rounded-full border-2 border-[var(--ink)] opacity-0"
            style={{
              animation: "phone-ring 1.8s ease-out infinite",
            }}
          />
          <span
            className="absolute inset-0 rounded-full border-2 border-[var(--ink)] opacity-0"
            style={{
              animation: "phone-ring 1.8s ease-out 0.6s infinite",
            }}
          />
        </>
      )}
      {/* Static ring for reduced motion */}
      {shouldReduceMotion && (
        <span className="absolute inset-0 rounded-full border-2 border-[var(--ink)] opacity-20" />
      )}
      {/* Icon */}
      <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-[var(--paper)] border border-[var(--rule)]">
        <Smartphone
          size={28}
          strokeWidth={1.5}
          className="text-[var(--ink)]"
        />
      </div>
    </div>
  );
}

"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SettingsSectionProps {
  title: string;
  subtitle?: string;
  isDanger?: boolean;
  children: React.ReactNode;
}

export function SettingsSection({ title, subtitle, isDanger = false, children }: SettingsSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className={cn(
        "bg-[var(--paper)] rounded-[var(--r-lg)] px-7 py-6",
        isDanger
          ? "border border-[var(--danger)]"
          : "border border-[var(--rule)]"
      )}
      aria-labelledby={`settings-${title.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <h2
        id={`settings-${title.toLowerCase().replace(/\s+/g, "-")}`}
        className={cn(
          "font-serif font-medium text-[22px] m-0",
          isDanger ? "text-[var(--danger)]" : "text-[var(--ink)]"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="font-sans text-[13.5px] text-[var(--ink-muted)] mt-1 mb-0">
          {subtitle}
        </p>
      )}
      <div className={cn("mt-5", isDanger && "mt-4")}>
        {children}
      </div>
    </motion.section>
  );
}

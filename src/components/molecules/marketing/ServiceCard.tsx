"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type ColorVariant = "marigold" | "pink" | "green" | "blue" | "red" | "cream";

interface ServiceCardProps {
  category: string;
  name: string;
  fee: string;
  eta: string;
  href?: string;
  colorVariant?: ColorVariant;
  offline?: boolean;
  className?: string;
}

const colorMap: Record<ColorVariant, { bg: string; pill: string; pillHover: string; text: string }> = {
  marigold: {
    bg: "bg-[var(--b-marigold)]",
    pill: "bg-[var(--ink)] text-[var(--paper)]",
    pillHover: "group-hover:bg-[var(--paper)] group-hover:text-[var(--ink)]",
    text: "text-[var(--ink)]",
  },
  pink: {
    bg: "bg-[var(--b-pink)]",
    pill: "bg-[var(--ink)] text-[var(--paper)]",
    pillHover: "group-hover:bg-[var(--paper)] group-hover:text-[var(--ink)]",
    text: "text-[var(--ink)]",
  },
  green: {
    bg: "bg-[var(--b-green)]",
    pill: "bg-[var(--paper)] text-[var(--ink)]",
    pillHover: "group-hover:bg-[var(--ink)] group-hover:text-[var(--paper)]",
    text: "text-[var(--paper)]",
  },
  blue: {
    bg: "bg-[var(--b-blue)]",
    pill: "bg-[var(--paper)] text-[var(--ink)]",
    pillHover: "group-hover:bg-[var(--ink)] group-hover:text-[var(--paper)]",
    text: "text-[var(--paper)]",
  },
  red: {
    bg: "bg-[var(--b-red)]",
    pill: "bg-[var(--paper)] text-[var(--ink)]",
    pillHover: "group-hover:bg-[var(--ink)] group-hover:text-[var(--paper)]",
    text: "text-[var(--paper)]",
  },
  cream: {
    bg: "bg-[var(--b-cream)]",
    pill: "bg-[var(--ink)] text-[var(--paper)]",
    pillHover: "group-hover:bg-[var(--paper)] group-hover:text-[var(--ink)]",
    text: "text-[var(--ink)]",
  },
};

export function ServiceCard({
  category,
  name,
  fee,
  eta,
  href = "#",
  colorVariant = "cream",
  offline = false,
  className,
}: ServiceCardProps) {
  const colors = colorMap[colorVariant];

  const inner = (
    <div
      className={cn(
        "group relative flex flex-col h-full p-6 gap-4",
        colors.bg,
        colors.text,
        offline ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      )}
    >
      <p className="eyebrow text-current opacity-70">{category}</p>

      <p
        className={cn(
          "font-serif italic text-[19px] leading-snug self-start",
          "rounded-[999px] border border-current px-4 py-2",
          "transition-all duration-[120ms]",
          colors.pill,
          !offline && colors.pillHover,
          "border-transparent"
        )}
      >
        {name}
      </p>

      <div className="mt-auto flex items-center justify-between gap-2">
        <span className="font-mono text-[13px] opacity-80">{fee}</span>
        <span className="font-mono text-[11px] opacity-60">{eta}</span>
      </div>

      {offline && (
        <div className="absolute inset-0 flex items-center justify-center bg-[var(--cream)]/60">
          <span className="font-sans text-[12px] font-medium text-[var(--ink-muted)]">Temporarily unavailable</span>
        </div>
      )}
    </div>
  );

  if (offline) {
    return (
      <div className={cn("block", className)} aria-disabled="true">
        {inner}
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.12, ease: [0.2, 0, 0, 1] }}
      className={cn("block", className)}
    >
      <Link href={href} className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-inset">
        {inner}
      </Link>
    </motion.div>
  );
}

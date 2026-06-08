import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { DashboardStatus } from "@/lib/types/dashboard";

interface HeroCTA {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}

interface InAppStatusHeroProps {
  status: DashboardStatus;
  category: string;
  code: string;
  headline: string;
  body: string;
  updatedAt: string;
  ctas?: HeroCTA[];
  className?: string;
}

const STATUS_CONFIG: Record<
  DashboardStatus,
  {
    bg: string;
    textColor: string;
    mutedColor: string;
    pillBg: string;
    pillBorder: string;
    dotColor: string;
    label: string;
  }
> = {
  "action-required": {
    bg: "bg-[var(--warn)]",
    textColor: "text-[var(--ink)]",
    mutedColor: "text-[var(--ink)]/65",
    pillBg: "bg-black/5",
    pillBorder: "border-black/15",
    dotColor: "bg-[var(--ink)]",
    label: "Action required",
  },
  "in-progress": {
    bg: "bg-[var(--brand)]",
    textColor: "text-white",
    mutedColor: "text-white/70",
    pillBg: "bg-white/12",
    pillBorder: "border-white/25",
    dotColor: "bg-white",
    label: "In progress",
  },
  completed: {
    bg: "bg-[var(--ok)]",
    textColor: "text-white",
    mutedColor: "text-white/70",
    pillBg: "bg-white/12",
    pillBorder: "border-white/25",
    dotColor: "bg-white",
    label: "Completed",
  },
  discontinued: {
    bg: "bg-[var(--cream-2)]",
    textColor: "text-[var(--ink)]",
    mutedColor: "text-[var(--ink-muted)]",
    pillBg: "bg-black/5",
    pillBorder: "border-black/10",
    dotColor: "bg-[var(--ink-muted)]",
    label: "Discontinued",
  },
  "on-hold": {
    bg: "bg-[var(--warn)]",
    textColor: "text-[var(--ink)]",
    mutedColor: "text-[var(--ink)]/65",
    pillBg: "bg-black/5",
    pillBorder: "border-black/15",
    dotColor: "bg-[var(--ink)]",
    label: "On hold",
  },
};

export function InAppStatusHero({
  status,
  category,
  code,
  headline,
  body,
  updatedAt,
  ctas = [],
  className,
}: InAppStatusHeroProps) {
  const cfg = STATUS_CONFIG[status];

  return (
    <section
      role="status"
      aria-label={`Application status: ${cfg.label}`}
      className={cn(
        cfg.bg,
        "notch-tr-bl",
        "px-[24px] py-[28px] sm:px-[32px] sm:py-[32px]",
        className
      )}
    >
      {/* Top meta row */}
      <div className={cn("flex items-center justify-between gap-4 flex-wrap mb-[16px]", cfg.mutedColor)}>
        <div className="flex items-center gap-[10px]">
          <p className="font-mono text-[10px] tracking-[0.08em] uppercase">{category}</p>
          <span className="font-mono text-[10px] opacity-40">·</span>
          <p className="font-mono text-[12px] tracking-[0.06em] font-medium">{code}</p>
        </div>
        <span className="font-mono text-[10px] tracking-[0.04em]">
          Updated {updatedAt}
        </span>
      </div>

      {/* Status pill */}
      <span
        className={cn(
          "inline-flex items-center gap-[6px] px-[10px] py-[4px] rounded-full mb-[12px]",
          "font-sans text-[11px] font-medium",
          cfg.pillBg, `border ${cfg.pillBorder}`, cfg.textColor
        )}
      >
        <span className={cn("w-[6px] h-[6px] rounded-full shrink-0", cfg.dotColor)} aria-hidden="true" />
        {cfg.label}
      </span>

      {/* Headline */}
      <h1 className={cn("font-serif text-[clamp(28px,4vw,44px)] font-normal leading-[1.1] tracking-[-0.02em] text-balance mb-[10px]", cfg.textColor)}>
        {headline}
      </h1>

      {/* Body */}
      <p className={cn("font-serif text-[clamp(15px,1.6vw,17px)] leading-[1.5] max-w-[520px] mb-[20px]", cfg.mutedColor)}>
        {body}
      </p>

      {/* CTAs */}
      {ctas.length > 0 && (
        <div className="flex flex-wrap gap-[8px]">
          {ctas.map((cta, i) => {
            const isPrimary = i === 0;
            const btnClass = cn(
              "inline-flex items-center justify-center px-[18px] py-[9px]",
              "rounded-[var(--r-pill)] font-sans text-[13px] font-medium",
              "transition-colors duration-[var(--m-fast)]",
              "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]",
              isPrimary
                ? "bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--ink-2)]"
                : cn("bg-transparent border", cfg.pillBorder, cfg.textColor, "hover:opacity-80")
            );

            if (cta.href) {
              return (
                <Link key={i} href={cta.href} className={btnClass}>
                  {cta.label}
                </Link>
              );
            }
            return (
              <button key={i} type="button" onClick={cta.onClick} className={btnClass}>
                {cta.label}
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}

import * as React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface PricingRowProps extends React.HTMLAttributes<HTMLDivElement> {
  service: string;
  category: string;
  fee: string;
  eta: string;
  href?: string;
  isHeader?: boolean;
}

export function PricingRow({
  service,
  category,
  fee,
  eta,
  href,
  isHeader = false,
  className,
  ...props
}: PricingRowProps) {
  if (isHeader) {
    return (
      <div
        className={cn(
          "hidden md:grid grid-cols-[2fr_1.2fr_1fr_1fr_auto] gap-4 items-center",
          "px-5 py-3 border-b border-[var(--rule)] bg-[var(--cream-2)]",
          className
        )}
        {...props}
      >
        {["Service", "Category", "Fee", "Est. Time", ""].map((h, i) => (
          <span key={i} className="eyebrow text-[var(--ink-muted)]">{h}</span>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "border-b border-[var(--rule)] last:border-0",
        "px-5 py-4 transition-colors hover:bg-[var(--cream-2)]",
        className
      )}
      {...props}
    >
      {/* Desktop layout */}
      <div className="hidden md:grid grid-cols-[2fr_1.2fr_1fr_1fr_auto] gap-4 items-center">
        <span className="font-serif text-[16px] text-[var(--ink)]">{service}</span>
        <span className="eyebrow text-[var(--ink-muted)]">{category}</span>
        <span className="font-mono text-[14px] text-[var(--ink)]">{fee}</span>
        <span className="font-mono text-[12px] text-[var(--ink-muted)]">{eta}</span>
        {href && (
          <Link href={href} className="eyebrow text-[var(--brand)] hover:underline whitespace-nowrap">
            Request →
          </Link>
        )}
      </div>

      {/* Mobile card layout */}
      <div className="md:hidden flex flex-col gap-2">
        <p className="font-serif text-[16px] text-[var(--ink)]">{service}</p>
        <div className="flex items-center gap-4">
          <span className="eyebrow text-[var(--ink-muted)]">{category}</span>
          <span className="font-mono text-[14px] text-[var(--ink)] font-semibold">{fee}</span>
          <span className="font-mono text-[11px] text-[var(--ink-muted)]">{eta}</span>
        </div>
        {href && (
          <Link href={href} className="eyebrow text-[var(--brand)] hover:underline self-start mt-1">
            Request →
          </Link>
        )}
      </div>
    </div>
  );
}

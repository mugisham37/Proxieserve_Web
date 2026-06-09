import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PillButton } from "@/components/atoms/shared/PillButton";

export function Service404Card({ slug, className }: { slug?: string; className?: string }) {
  return (
    <div
      className={cn(
        "notch-lg flex flex-col items-center justify-center gap-6 bg-[var(--ink)] text-[var(--cream)] px-10 py-16 text-center max-w-lg mx-auto",
        className
      )}
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-muted)] [color:rgba(242,235,215,0.45)]">
        404 — Service not found
      </p>
      <h1 className="t-h2 text-[var(--cream)] leading-tight">
        We couldn&apos;t find {slug ? <>&ldquo;{slug}&rdquo;</> : "that service"}.
      </h1>
      <p className="font-serif italic text-[var(--ink-muted)] [color:rgba(242,235,215,0.65)] text-[16px] leading-relaxed max-w-sm">
        The service may have been renamed, archived, or never existed. Browse all services or contact us.
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <PillButton variant="default" size="md" asChild arrow>
          <Link href="/services">Browse all services</Link>
        </PillButton>
        <PillButton
          variant="ghost"
          size="md"
          asChild
          className="border-[rgba(242,235,215,0.3)] text-[var(--cream)] hover:bg-[rgba(242,235,215,0.1)]"
        >
          <Link href="/contact">Contact us</Link>
        </PillButton>
      </div>
    </div>
  );
}

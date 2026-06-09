import * as React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { PillButton } from "@/components/atoms/shared/PillButton";

interface GeoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  countryName?: string;
  onDismiss?: () => void;
}

export function GeoCard({ countryName = "your region", onDismiss, className, ...props }: GeoCardProps) {
  return (
    <div
      className={cn("notch bg-[var(--warn-soft)] p-8 flex flex-col gap-5", className)}
      role="alertdialog"
      aria-label="Service availability notice"
      {...props}
    >
      <div>
        <p className="eyebrow text-[var(--warn)] mb-3">Availability Notice</p>
        <h3 className="t-h2 text-[var(--ink)] mb-2">
          ProxiServe may not be available in {countryName}
        </h3>
        <p className="font-sans text-[15px] text-[var(--ink-muted)] leading-relaxed">
          Our services are currently focused on Rwanda. You can still browse pricing and
          legal information, or contact us to discuss availability.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <PillButton variant="solid" size="sm" asChild>
          <Link href="/contact">Contact us</Link>
        </PillButton>
        <Link href="/legal/terms" className="font-sans text-[13px] text-[var(--ink-muted)] underline hover:no-underline">
          View legal pages
        </Link>
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className="font-sans text-[13px] text-[var(--ink-muted)] hover:text-[var(--ink)] ml-auto"
          >
            Dismiss ×
          </button>
        )}
      </div>
    </div>
  );
}

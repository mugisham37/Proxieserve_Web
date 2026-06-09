import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PillButton } from "@/components/atoms/PillButton";
import { type Service } from "@/lib/services-data";

interface ActionCardProps {
  service: Service;
  className?: string;
}

export function ActionCard({ service, className }: ActionCardProps) {
  const isDisabled = service.status !== "active";

  return (
    <div
      className={cn(
        "notch bg-[var(--brand-soft)] border border-[var(--rule-soft)] p-6 flex flex-col gap-5",
        className
      )}
      style={{ "--n": "20px" } as React.CSSProperties}
      aria-label="Start this service"
    >
      {/* Fee summary */}
      <div className="flex flex-col gap-1">
        <span className="eyebrow text-[var(--ink-muted)]">Standard fee</span>
        <div className="flex items-end gap-3 flex-wrap">
          <span className="font-mono text-[30px] font-medium text-[var(--ink)] leading-none">
            RWF {service.fee.toLocaleString()}
          </span>
        </div>
        {service.urgentFee && (
          <span className="font-sans text-[12px] text-[var(--ink-muted)]">
            Urgent: RWF {service.urgentFee.toLocaleString()}
          </span>
        )}
      </div>

      {/* Turnaround */}
      <div className="flex items-center justify-between text-[13px] font-sans border-t border-[var(--rule-soft)] pt-3">
        <span className="text-[var(--ink-muted)]">Turnaround</span>
        <span className="font-medium text-[var(--ink)]">{service.eta}</span>
      </div>

      {/* CTAs */}
      <div className="flex flex-col gap-2.5">
        <PillButton
          variant="brand"
          size="md"
          asChild
          arrow
          className="justify-center"
          disabled={isDisabled}
        >
          <Link href={isDisabled ? "#" : `/services/${service.slug}/apply`}>
            Start application
          </Link>
        </PillButton>
        <PillButton
          variant="ghost"
          size="md"
          asChild
          className="justify-center"
        >
          <Link href="/contact">WhatsApp first ↗</Link>
        </PillButton>
      </div>

      <p className="font-sans text-[11px] text-[var(--ink-subtle)] leading-relaxed text-center">
        Free to start — you pay once we confirm your application.
      </p>
    </div>
  );
}

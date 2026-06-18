import type { UiService } from "@/lib/service-ui-types";

interface FeeSummaryProps {
  service: UiService;
  className?: string;
}

export function FeeSummary({ service, className }: FeeSummaryProps) {
  const standardTier = service.pricingTiers.find((t) => t.tier === "standard") ?? service.pricingTiers[0];
  const serviceFee = standardTier?.fee ?? service.fee;
  const govFee = standardTier?.governmentFee ?? 0;
  const total = serviceFee + govFee;

  return (
    <div className={`bg-[var(--paper)] border border-[var(--rule)] rounded-[var(--r-lg)] p-5 flex flex-col gap-3 ${className ?? ""}`}>
      <span className="eyebrow text-[var(--ink-subtle)]">Fee summary</span>

      <div className="flex flex-col gap-2.5 border-t border-[var(--rule-soft)] pt-3">
        <div className="flex items-center justify-between gap-2">
          <span className="font-sans text-[13px] text-[var(--ink-muted)]">Service fee</span>
          <span className="font-mono text-[13px] text-[var(--ink)]">
            RWF {serviceFee.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <span className="font-sans text-[13px] text-[var(--ink-muted)]">Government processing</span>
          <span className="font-mono text-[13px] text-[var(--ink)]">
            RWF {govFee.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 border-t border-[var(--rule)] pt-3">
        <span className="font-sans text-[14px] font-semibold text-[var(--ink)]">Estimated total</span>
        <span className="font-mono text-[16px] font-semibold text-[var(--ink)]">
          RWF {total.toLocaleString()}
        </span>
      </div>
    </div>
  );
}

import * as React from "react";
import type { AppMeta } from "@/lib/tracker-data";

interface AppMetaSideCardProps {
  meta: AppMeta;
}

function Row({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex justify-between items-baseline py-[6px] border-b border-[var(--rule-soft)] last:border-b-0 text-[13.5px] gap-2">
      <span className="text-[var(--ink-muted)] shrink-0">{label}</span>
      <span className={mono ? "font-mono text-[13px] font-medium text-[var(--ink)]" : "font-medium text-[var(--ink)] text-right"}>
        {value}
      </span>
    </div>
  );
}

export function AppMetaSideCard({ meta }: AppMetaSideCardProps) {
  return (
    <section
      className="bg-[var(--paper)] border border-[var(--rule)] rounded-[var(--r-lg)] px-6 py-5 mt-4"
      aria-labelledby="meta-heading"
    >
      <h4
        id="meta-heading"
        className="font-sans font-semibold text-[11px] uppercase tracking-[0.1em] text-[var(--ink-muted)] m-0 mb-3"
      >
        Application details
      </h4>
      <dl className="m-0">
        <Row label="Service" value={meta.serviceType} />
        <Row label="Tier" value={meta.tier} />
        <Row label="Submitted" value={meta.submittedAt} />
        <Row label="Service fee" value={`RWF ${meta.serviceFee.toLocaleString()}`} mono />
        <Row label="Government fee" value={`RWF ${meta.governmentFee.toLocaleString()}`} mono />
      </dl>
    </section>
  );
}

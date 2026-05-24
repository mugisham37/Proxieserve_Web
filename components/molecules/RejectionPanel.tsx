"use client";

import * as React from "react";
import Link from "next/link";
import { PillButton } from "@/components/atoms/PillButton";
import type { RejectionData, AgentData } from "@/lib/tracker-data";

interface RejectionPanelProps {
  rejection: RejectionData;
  agent: AgentData;
}

export function RejectionPanel({ rejection, agent }: RejectionPanelProps) {
  return (
    <section
      className="bg-[var(--danger-soft)] border border-[var(--danger)] rounded-[var(--r-lg)] p-7 mb-4"
      aria-labelledby="rejection-heading"
    >
      <h2 id="rejection-heading" className="font-serif font-medium text-[20px] text-[var(--danger)] m-0 mb-4">
        Rejection reason
      </h2>

      {/* Quoted reason */}
      <blockquote className="font-serif italic text-[17px] text-[var(--ink)] leading-[1.55] border-l-2 border-[var(--danger)] pl-5 my-0 mb-5">
        &ldquo;{rejection.reason}&rdquo;
      </blockquote>

      {/* What now explanation */}
      <h3 className="font-sans font-semibold text-[11px] uppercase tracking-[0.1em] text-[var(--ink-muted)] mb-2">
        What now?
      </h3>
      <p className="font-sans text-[14px] text-[var(--ink-2)] leading-[1.6] mb-6 m-0">
        {rejection.whatNow}
      </p>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3">
        <PillButton variant="solid" size="sm" asChild>
          <Link href="/services">Retry application →</Link>
        </PillButton>
        <PillButton variant="ghost" size="sm" asChild>
          <a href={agent.whatsappUrl} target="_blank" rel="noopener noreferrer">
            Talk to agent
          </a>
        </PillButton>
        <PillButton variant="ghost" size="sm">
          Request refund
        </PillButton>
      </div>
    </section>
  );
}

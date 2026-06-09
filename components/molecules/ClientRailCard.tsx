import * as React from "react";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CaseDetail } from "@/lib/types/agent";

interface ClientRailCardProps {
  detail: Pick<
    CaseDetail,
    | "clientName"
    | "clientInitials"
    | "clientPhone"
    | "clientNationalId"
    | "clientLanguage"
    | "clientMemberSince"
    | "clientOtherCases"
  >;
  whatsappUrl?: string;
}

function RailLine({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-[8px] py-[8px] border-b border-[var(--rule)] last:border-0">
      <span className="font-mono text-[11px] tracking-[0.06em] uppercase text-[var(--ink-muted)] shrink-0">
        {label}
      </span>
      <span className="font-sans text-[13px] text-[var(--ink)] text-right truncate">
        {value}
      </span>
    </div>
  );
}

export function ClientRailCard({ detail, whatsappUrl }: ClientRailCardProps) {
  return (
    <div className="bg-[var(--paper)] rounded-[var(--r-lg)] border border-[var(--rule)] p-[18px]">
      {/* Client header */}
      <div className="flex items-center gap-[12px] mb-[14px]">
        <span
          aria-hidden="true"
          className={cn(
            "inline-flex items-center justify-center",
            "w-[40px] h-[40px] rounded-full shrink-0",
            "bg-[var(--brand-soft)] text-[var(--brand-ink)]",
            "font-sans text-[15px] font-semibold"
          )}
        >
          {detail.clientInitials}
        </span>
        <div>
          <p className="font-sans text-[14px] font-semibold text-[var(--ink)]">
            {detail.clientName}
          </p>
          <p className="font-mono text-[12px] text-[var(--ink-muted)]">
            {detail.clientPhone}
          </p>
          <p className="font-mono text-[11px] text-[var(--ink-subtle)]">
            {detail.clientLanguage}
          </p>
        </div>
      </div>

      {/* Rail lines */}
      <div className="mb-[14px]">
        <RailLine
          label="National ID"
          value={
            <span className="font-mono text-[12px]">{detail.clientNationalId}</span>
          }
        />
        <RailLine label="Member since" value={detail.clientMemberSince} />
        <RailLine label="Other cases" value={detail.clientOtherCases} />
      </div>

      {/* WhatsApp */}
      <a
        href={whatsappUrl ?? "#"}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Message ${detail.clientName} on WhatsApp`}
        className={cn(
          "flex items-center justify-center gap-[8px]",
          "w-full h-[36px] rounded-[var(--r-pill)]",
          "border border-[var(--rule)]",
          "font-sans text-[12px] text-[var(--ink-muted)] font-medium",
          "transition-colors duration-[var(--m-fast)]",
          "hover:bg-[var(--cream)] hover:text-[var(--ink)]",
          "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
        )}
      >
        <MessageCircle size={14} aria-hidden="true" />
        Message on WhatsApp
      </a>
    </div>
  );
}

"use client";

import * as React from "react";
import { Inbox } from "lucide-react";
import { cn } from "@/lib/utils";
import { PriorityDot } from "@/components/atoms/PriorityDot";
import { SLABadge } from "@/components/atoms/SLABadge";
import { StatusPill } from "@/components/atoms/StatusPill";

interface UnassignedCase {
  code: string;
  serviceName: string;
  serviceNameBase: string;
  serviceNameItalic: string;
  clientInitials: string;
  clientName: string;
  priority: "high" | "mid" | "low";
  ageDisplay: string;
  slaState: "over" | "warn" | "ok";
  category: string;
}

const MOCK_UNASSIGNED: UnassignedCase[] = [
  {
    code: "PRX-2026-00510",
    serviceName: "Passport renewal",
    serviceNameBase: "Passport",
    serviceNameItalic: "renewal",
    clientInitials: "FK",
    clientName: "Fabrice Kayitesi",
    priority: "high",
    ageDisplay: "2h",
    slaState: "ok",
    category: "Identity",
  },
  {
    code: "PRX-2026-00511",
    serviceName: "Business license",
    serviceNameBase: "Business",
    serviceNameItalic: "license",
    clientInitials: "GN",
    clientName: "Grace Nishimwe",
    priority: "mid",
    ageDisplay: "5h",
    slaState: "ok",
    category: "Business",
  },
  {
    code: "PRX-2026-00512",
    serviceName: "National ID",
    serviceNameBase: "National",
    serviceNameItalic: "ID",
    clientInitials: "EP",
    clientName: "Etienne Patrice",
    priority: "low",
    ageDisplay: "12h",
    slaState: "ok",
    category: "Identity",
  },
];

export default function UnassignedPage() {
  const [claimed, setClaimed] = React.useState<string[]>([]);

  const remaining = MOCK_UNASSIGNED.filter((c) => !claimed.includes(c.code));

  return (
    <div className="px-[20px] min-[980px]:px-[32px] py-[28px] max-w-[1000px]">
      {/* Header */}
      <div className="mb-[28px]">
        <h1 className="font-serif text-[28px] min-[980px]:text-[34px] font-normal text-[var(--ink)] mb-[6px]">
          Unassigned <em className="italic font-normal">pool</em>
        </h1>
        <p className="font-mono text-[11px] tracking-[0.1em] uppercase text-[var(--ink-muted)]">
          {remaining.length} CASES AVAILABLE · PULL TO CLAIM
        </p>
      </div>

      {remaining.length === 0 ? (
        /* Empty state */
        <div className="flex flex-col items-center justify-center py-[64px] gap-[16px]">
          <div className="flex items-center justify-center w-[56px] h-[56px] rounded-full bg-[var(--ok-soft)]">
            <Inbox size={28} className="text-[var(--ok)]" />
          </div>
          <div className="text-center">
            <p className="font-serif text-[22px] text-[var(--ink)] mb-[6px]">
              No unassigned <em className="italic font-normal">cases.</em>
            </p>
            <p className="font-sans text-[13.5px] text-[var(--ink-muted)] max-w-[280px] leading-[1.5]">
              No unassigned cases right now. New submissions will appear here automatically.
            </p>
          </div>
        </div>
      ) : (
        /* Table */
        <div className="bg-[var(--paper)] rounded-[var(--r-lg)] border border-[var(--rule)] overflow-hidden">
          {/* Desktop */}
          <div className="hidden min-[640px]:block overflow-x-auto">
            <table className="w-full" aria-label="Unassigned cases">
              <thead>
                <tr className="border-b border-[var(--rule)]">
                  <th scope="col" className="w-[32px] pl-[16px] py-[10px] text-left">
                    <span className="sr-only">Priority</span>
                  </th>
                  <th scope="col" className="py-[10px] pr-[16px] text-left font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--ink-muted)]">Code</th>
                  <th scope="col" className="py-[10px] pr-[16px] text-left font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--ink-muted)]">Service</th>
                  <th scope="col" className="py-[10px] pr-[16px] text-left font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--ink-muted)]">Client</th>
                  <th scope="col" className="py-[10px] pr-[16px] text-left font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--ink-muted)]">Category</th>
                  <th scope="col" className="py-[10px] pr-[16px] text-left font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--ink-muted)]">Age</th>
                  <th scope="col" className="py-[10px] pr-[16px] text-right font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--ink-muted)]">Action</th>
                </tr>
              </thead>
              <tbody>
                {remaining.map((c) => (
                  <tr
                    key={c.code}
                    className="border-b border-[var(--rule)] last:border-0 hover:bg-[var(--cream)] transition-colors duration-[var(--m-fast)]"
                  >
                    <td className="w-[32px] pl-[16px] py-[12px]">
                      <PriorityDot priority={c.priority} />
                    </td>
                    <td className="py-[12px] pr-[16px]">
                      <span className="font-mono text-[12px] text-[var(--ink)] tracking-tight">
                        {c.code}
                      </span>
                    </td>
                    <td className="py-[12px] pr-[16px]">
                      <span className="font-serif text-[14px] text-[var(--ink)]">
                        {c.serviceNameBase}{" "}
                        <em className="italic font-normal">{c.serviceNameItalic}</em>
                      </span>
                    </td>
                    <td className="py-[12px] pr-[16px]">
                      <div className="flex items-center gap-[8px]">
                        <span
                          aria-hidden="true"
                          className="inline-flex items-center justify-center w-[28px] h-[28px] rounded-full bg-[var(--brand-soft)] text-[var(--brand-ink)] font-sans text-[11px] font-semibold"
                        >
                          {c.clientInitials}
                        </span>
                        <span className="font-sans text-[13px] text-[var(--ink)]">
                          {c.clientName}
                        </span>
                      </div>
                    </td>
                    <td className="py-[12px] pr-[16px]">
                      <StatusPill label={c.category} variant="info" />
                    </td>
                    <td className="py-[12px] pr-[16px]">
                      <span className="font-mono text-[12px] text-[var(--ink-subtle)]">
                        {c.ageDisplay}
                      </span>
                    </td>
                    <td className="py-[12px] pr-[16px] text-right">
                      <button
                        type="button"
                        aria-label={`Assign ${c.code} to me`}
                        onClick={() => setClaimed((prev) => [...prev, c.code])}
                        className={cn(
                          "px-[12px] h-[28px] rounded-[var(--r-pill)]",
                          "bg-[var(--ink)] text-[var(--paper)]",
                          "font-sans text-[12px] font-medium",
                          "transition-colors duration-[var(--m-fast)]",
                          "hover:bg-[var(--ink-2)]",
                          "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
                        )}
                      >
                        Assign to me
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="min-[640px]:hidden flex flex-col gap-[8px] p-[12px]">
            {remaining.map((c) => (
              <div
                key={c.code}
                className="bg-[var(--paper-2)] rounded-[var(--r-md)] border border-[var(--rule)] p-[14px]"
              >
                <div className="flex items-center justify-between mb-[8px]">
                  <span className="font-mono text-[11px] text-[var(--ink-muted)]">
                    {c.code}
                  </span>
                  <span className="font-mono text-[11px] text-[var(--ink-subtle)]">
                    {c.ageDisplay}
                  </span>
                </div>
                <p className="font-serif text-[16px] text-[var(--ink)] mb-[8px]">
                  {c.serviceNameBase}{" "}
                  <em className="italic font-normal">{c.serviceNameItalic}</em>
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-[6px]">
                    <PriorityDot priority={c.priority} />
                    <span className="font-sans text-[12px] text-[var(--ink-muted)]">
                      {c.clientName}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setClaimed((prev) => [...prev, c.code])}
                    className={cn(
                      "px-[12px] h-[28px] rounded-[var(--r-pill)]",
                      "bg-[var(--ink)] text-[var(--paper)]",
                      "font-sans text-[12px] font-medium"
                    )}
                  >
                    Assign to me
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

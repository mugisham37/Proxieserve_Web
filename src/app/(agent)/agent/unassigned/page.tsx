"use client";

import * as React from "react";
import { Inbox } from "lucide-react";
import { cn } from "@/lib/utils";
import { PriorityDot } from "@/components/atoms/agent/PriorityDot";
import { StatusPill } from "@/components/atoms/shared/StatusPill";
import { adaptUnassignedCase } from "@/lib/agent-adapters";
import { useUnassignedCases, useClaimCase } from "@/hooks/useAgentCases";
import { isApiError } from "@/lib/api/types";

export default function UnassignedPage() {
  const { data, isLoading } = useUnassignedCases();
  const claimCase = useClaimCase();
  const [claimingCode, setClaimingCode] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const remaining = React.useMemo(
    () => (data?.cases ?? []).map(adaptUnassignedCase),
    [data?.cases]
  );

  async function handleClaim(code: string) {
    setError(null);
    setClaimingCode(code);
    try {
      await claimCase.mutateAsync(code);
    } catch (err) {
      setError(isApiError(err) ? err.message : "Failed to claim case.");
    } finally {
      setClaimingCode(null);
    }
  }

  return (
    <div className="px-[20px] min-[980px]:px-[32px] py-[28px] max-w-[1000px]">
      <div className="mb-[28px]">
        <h1 className="font-serif text-[28px] min-[980px]:text-[34px] font-normal text-[var(--ink)] mb-[6px]">
          Unassigned <em className="italic font-normal">pool</em>
        </h1>
        <p className="font-mono text-[11px] tracking-[0.1em] uppercase text-[var(--ink-muted)]">
          {isLoading ? "LOADING…" : `${remaining.length} CASES AVAILABLE · PULL TO CLAIM`}
        </p>
      </div>

      {error && (
        <p className="mb-4 font-sans text-[12px] text-[var(--danger)] bg-[var(--danger)]/8 border border-[var(--danger)]/20 rounded-[var(--r-md)] px-3 py-2">
          {error}
        </p>
      )}

      {!isLoading && remaining.length === 0 ? (
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
        <div className="bg-[var(--paper)] rounded-[var(--r-lg)] border border-[var(--rule)] overflow-hidden">
          <div className="hidden min-[640px]:block overflow-x-auto">
            <table className="w-full" aria-label="Unassigned cases">
              <thead>
                <tr className="border-b border-[var(--rule)]">
                  <th scope="col" className="w-[32px] pl-[16px] py-[10px] text-left">
                    <span className="sr-only">Priority</span>
                  </th>
                  <th scope="col" className="py-[10px] pr-[16px] text-left font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--ink-muted)]">Code</th>
                  <th scope="col" className="py-[10px] pr-[16px] text-left font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--ink-muted)]">Service</th>
                  <th scope="col" className="py-[10px] pr-[16px] text-left font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--ink-muted)]">Tier</th>
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
                        disabled={claimingCode === c.code || claimCase.isPending}
                        onClick={() => void handleClaim(c.code)}
                        className={cn(
                          "px-[12px] h-[28px] rounded-[var(--r-pill)]",
                          "bg-[var(--ink)] text-[var(--paper)]",
                          "font-sans text-[12px] font-medium",
                          "transition-colors duration-[var(--m-fast)]",
                          "hover:bg-[var(--ink-2)]",
                          "disabled:opacity-50 disabled:cursor-not-allowed",
                          "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
                        )}
                      >
                        {claimingCode === c.code ? "Claiming…" : "Assign to me"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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
                  <PriorityDot priority={c.priority} />
                  <button
                    type="button"
                    disabled={claimingCode === c.code || claimCase.isPending}
                    onClick={() => void handleClaim(c.code)}
                    className={cn(
                      "px-[12px] h-[28px] rounded-[var(--r-pill)]",
                      "bg-[var(--ink)] text-[var(--paper)]",
                      "font-sans text-[12px] font-medium",
                      "disabled:opacity-50"
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

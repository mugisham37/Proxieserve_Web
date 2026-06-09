"use client";

import * as React from "react";
import { AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { AppButton } from "@/components/atoms/shared/AppButton";
import { CaseOversightRow } from "@/components/molecules/CaseOversightRow";
import { AuditRow } from "@/components/molecules/AuditRow";
import { PermissionBoundaryDialog } from "@/components/molecules/PermissionBoundaryDialog";
import { AdminEmptyState } from "@/components/molecules/AdminEmptyState";
import {
  useAdminState,
  useAdminDispatch,
  useFilteredOversightCases,
  useFilteredAuditLog,
} from "@/lib/admin-context";
import type { OversightTab, AuditFilter, PermissionDialogState } from "@/lib/types/admin";

const OVERSIGHT_TABS: { id: OversightTab; label: string }[] = [
  { id: "attention", label: "Needs attention" },
  { id: "sla", label: "SLA breaches" },
  { id: "disputes", label: "Disputes" },
  { id: "all", label: "All cases" },
];

const AUDIT_FILTERS: { id: AuditFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "Privileged", label: "Privileged" },
  { id: "Money", label: "Money" },
  { id: "Config", label: "Config" },
];

export function OversightBoard() {
  const { oversightTab, auditFilter, permissionDialog } = useAdminState();
  const dispatch = useAdminDispatch();
  const filteredCases = useFilteredOversightCases();
  const filteredAudit = useFilteredAuditLog();
  const [auditVisible, setAuditVisible] = React.useState(20);

  function openIntervene(code: string, agent: string) {
    dispatch({
      type: "SET_PERMISSION_DIALOG",
      payload: { caseCode: code, agentName: agent },
    });
  }

  function handleConfirmIntervene(reason: string, notifyAgent: boolean) {
    // In production: send intervention to backend
    void reason;
    void notifyAgent;
    dispatch({ type: "SET_PERMISSION_DIALOG", payload: null });
  }

  return (
    <>
      <div className="px-[20px] min-[980px]:px-[40px] py-[28px] flex flex-col gap-[28px]">
        {/* Page header */}
        <div>
          <h1 className="font-serif text-[26px] font-normal text-[var(--ink)]">
            Oversight
          </h1>
          <p className="font-sans text-[13px] text-[var(--ink-muted)] mt-[2px]">
            Monitor cases and review the immutable audit log
          </p>
        </div>

        {/* Cases section */}
        <section aria-label="Case oversight">
          {/* Tab bar */}
          <div
            role="tablist"
            aria-label="Case filter tabs"
            className="flex gap-[4px] mb-[16px] flex-wrap"
          >
            {OVERSIGHT_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={oversightTab === tab.id}
                onClick={() =>
                  dispatch({ type: "SET_OVERSIGHT_TAB", payload: tab.id })
                }
                className={cn(
                  "px-[14px] py-[7px] rounded-[var(--r-pill)]",
                  "font-sans text-[13px] font-medium",
                  "transition-colors duration-[var(--m-fast)]",
                  "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]",
                  oversightTab === tab.id
                    ? "bg-[var(--ink)] text-[var(--paper)]"
                    : "bg-[var(--paper)] text-[var(--ink-muted)] border border-[var(--rule)] hover:text-[var(--ink)] hover:bg-[var(--cream)]"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Cases table */}
          <div className="rounded-[var(--r-lg)] border border-[var(--rule)] bg-[var(--paper)] overflow-x-auto">
            <table
              className="w-full min-w-[680px]"
              aria-label="Oversight cases"
            >
              <thead>
                <tr className="border-b border-[var(--rule)]">
                  {["Code", "Service", "Agent", "Client", "Status", "Issue", "Action"].map(
                    (col) => (
                      <th
                        key={col}
                        scope="col"
                        className={cn(
                          "px-[12px] py-[10px] first:pl-[16px] last:pr-[16px]",
                          "font-mono text-[10px] tracking-[0.06em] uppercase",
                          "text-[var(--ink-muted)] text-left"
                        )}
                      >
                        {col}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {filteredCases.length === 0 ? (
                  <tr>
                    <td colSpan={7}>
                      <AdminEmptyState
                        title="No cases here"
                        description="No cases match this filter. Try switching to 'All cases' to see the full list."
                      />
                    </td>
                  </tr>
                ) : (
                  filteredCases.map((item) => (
                    <CaseOversightRow
                      key={item.code}
                      item={item}
                      onIntervene={() =>
                        openIntervene(item.code, item.agent)
                      }
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Audit log section */}
        <section aria-label="Audit log">
          <div className="flex items-center justify-between mb-[12px] flex-wrap gap-[8px]">
            <h2 className="font-mono text-[11px] tracking-[0.08em] uppercase text-[var(--ink-muted)]">
              Audit log
              <span className="ml-[8px] font-sans text-[10px] normal-case tracking-normal text-[var(--ok)]">
                append-only · tamper-evident
              </span>
            </h2>

            {/* Filter pills */}
            <div className="flex gap-[4px]" role="group" aria-label="Audit log filter">
              {AUDIT_FILTERS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={auditFilter === f.id}
                  onClick={() =>
                    dispatch({ type: "SET_AUDIT_FILTER", payload: f.id })
                  }
                  className={cn(
                    "px-[10px] py-[4px] rounded-[var(--r-pill)]",
                    "font-mono text-[11px]",
                    "transition-colors duration-[var(--m-fast)]",
                    "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]",
                    auditFilter === f.id
                      ? "bg-[var(--ink)] text-[var(--paper)]"
                      : "bg-[var(--paper)] text-[var(--ink-muted)] border border-[var(--rule)] hover:text-[var(--ink)]"
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Log entries */}
          <div
            className="rounded-[var(--r-lg)] border border-[var(--rule)] bg-[var(--paper)] overflow-hidden"
            role="list"
            aria-label="Audit log entries"
          >
            {filteredAudit.length === 0 ? (
              <AdminEmptyState
                title="No audit entries"
                description="No log entries match this filter, or this is a fresh installation with no recorded actions yet."
              />
            ) : (
              <>
                {filteredAudit.slice(0, auditVisible).map((entry) => (
                  <AuditRow key={entry.id} entry={entry} />
                ))}

                {auditVisible < filteredAudit.length && (
                  <div className="px-[16px] py-[12px] flex justify-center border-t border-[var(--rule-soft)]">
                    <AppButton
                      variant="ghost"
                      size="sm"
                      onClick={() => setAuditVisible((v) => v + 20)}
                    >
                      <ChevronDown size={14} />
                      Load older entries
                    </AppButton>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </div>

      {/* Permission boundary dialog — state #4 */}
      <AnimatePresence>
        {permissionDialog && (
          <PermissionBoundaryDialog
            dialog={permissionDialog}
            onConfirm={handleConfirmIntervene}
            onCancel={() =>
              dispatch({ type: "SET_PERMISSION_DIALOG", payload: null })
            }
          />
        )}
      </AnimatePresence>
    </>
  );
}

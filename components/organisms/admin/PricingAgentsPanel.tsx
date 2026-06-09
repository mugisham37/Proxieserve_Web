"use client";

import * as React from "react";
import { AnimatePresence } from "framer-motion";
import { Plus, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { AppButton } from "@/components/atoms/AppButton";
import { PricingTableRow } from "@/components/molecules/PricingTableRow";
import { AgentTableRow } from "@/components/molecules/AgentTableRow";
import { ScheduledChangesBanner } from "@/components/molecules/ScheduledChangesBanner";
import { DestructiveConfirmDialog } from "@/components/molecules/DestructiveConfirmDialog";
import { useAdminState, useAdminDispatch, useScheduledChanges } from "@/lib/admin-context";

export function PricingAgentsPanel() {
  const { pricingRows, agents } = useAdminState();
  const dispatch = useAdminDispatch();
  const scheduledRows = useScheduledChanges();

  const [deleteTarget, setDeleteTarget] = React.useState<{
    id: string;
    name: string;
    type: "pricing row" | "agent";
  } | null>(null);

  function handleDelete() {
    if (!deleteTarget) return;
    if (deleteTarget.type === "pricing row") {
      dispatch({ type: "DELETE_PRICING_ROW", payload: deleteTarget.id });
    } else {
      dispatch({ type: "REMOVE_AGENT", payload: deleteTarget.id });
    }
    setDeleteTarget(null);
  }

  const activeAgents = agents.filter((a) => a.status === "active").length;
  const avgLoad =
    agents.length > 0
      ? Math.round(
          agents.reduce((s, a) => s + (a.load / a.capacity) * 100, 0) /
            agents.length
        )
      : 0;

  return (
    <>
      <div className="px-[20px] min-[980px]:px-[40px] py-[28px] flex flex-col gap-[28px]">
        {/* Page header */}
        <div>
          <h1 className="font-serif text-[26px] font-normal text-[var(--ink)]">
            Pricing & Agents
          </h1>
          <p className="font-sans text-[13px] text-[var(--ink-muted)] mt-[2px]">
            Manage service fees and the agent roster
          </p>
        </div>

        {/* Scheduled changes banner */}
        {scheduledRows.length > 0 && (
          <ScheduledChangesBanner rows={pricingRows} />
        )}

        {/* Pricing section */}
        <section aria-label="Pricing">
          <div className="flex items-center justify-between mb-[14px]">
            <h2 className="font-mono text-[11px] tracking-[0.08em] uppercase text-[var(--ink-muted)]">
              Fee schedule
            </h2>
            <AppButton variant="default" size="sm">
              <Plus size={13} aria-hidden="true" />
              Add row
            </AppButton>
          </div>

          <div className="rounded-[var(--r-lg)] border border-[var(--rule)] bg-[var(--paper)] overflow-x-auto">
            <table className="w-full min-w-[680px]" aria-label="Fee schedule">
              <thead>
                <tr className="border-b border-[var(--rule)]">
                  {[
                    { label: "Service", align: "left" },
                    { label: "Standard fee", align: "right" },
                    { label: "Urgent fee", align: "right" },
                    { label: "Gov. pass.", align: "center" },
                    { label: "Effective", align: "left" },
                    { label: "", align: "right" },
                  ].map((col, i) => (
                    <th
                      key={i}
                      scope="col"
                      className={cn(
                        "px-[12px] py-[10px] first:pl-[16px] last:pr-[16px]",
                        "font-mono text-[10px] tracking-[0.06em] uppercase text-[var(--ink-muted)]",
                        col.align === "right"
                          ? "text-right"
                          : col.align === "center"
                          ? "text-center"
                          : "text-left"
                      )}
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pricingRows.map((row) => (
                  <PricingTableRow
                    key={row.id}
                    row={row}
                    onEdit={() => {/* TODO: open edit modal */}}
                    onDelete={() =>
                      setDeleteTarget({
                        id: row.id,
                        name: row.service,
                        type: "pricing row",
                      })
                    }
                  />
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Agent stats strip */}
        <section aria-label="Agent summary statistics">
          <div className="grid grid-cols-2 min-[640px]:grid-cols-4 gap-[12px]">
            {[
              { label: "Total agents", value: agents.length },
              { label: "Active now", value: activeAgents },
              {
                label: "Avg load",
                value: `${avgLoad}%`,
              },
              {
                label: "2FA enabled",
                value: `${agents.filter((a) => a.twoFa).length}/${agents.length}`,
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className={cn(
                  "flex flex-col gap-[4px] px-[16px] py-[14px]",
                  "rounded-[var(--r-md)] border border-[var(--rule)] bg-[var(--paper)]"
                )}
              >
                <span className="font-mono text-[10px] tracking-[0.08em] uppercase text-[var(--ink-muted)]">
                  {stat.label}
                </span>
                <span className="font-serif text-[26px] leading-none text-[var(--ink)]">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Agents table */}
        <section aria-label="Agent roster">
          <div className="flex items-center justify-between mb-[14px]">
            <h2 className="font-mono text-[11px] tracking-[0.08em] uppercase text-[var(--ink-muted)]">
              Agent roster
            </h2>
            <div className="flex gap-[8px]">
              <AppButton variant="ghost" size="sm">
                <UserPlus size={13} aria-hidden="true" />
                Invite agent
              </AppButton>
              <AppButton variant="default" size="sm">
                <Plus size={13} aria-hidden="true" />
                Add agent
              </AppButton>
            </div>
          </div>

          <div className="rounded-[var(--r-lg)] border border-[var(--rule)] bg-[var(--paper)] overflow-x-auto">
            <table className="w-full min-w-[720px]" aria-label="Agent roster">
              <thead>
                <tr className="border-b border-[var(--rule)]">
                  {["Agent", "Email", "Skills", "Load", "2FA", "Role", ""].map(
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
                {agents.map((agent) => (
                  <AgentTableRow
                    key={agent.id}
                    agent={agent}
                    onRemove={() =>
                      setDeleteTarget({
                        id: agent.id,
                        name: agent.fullName,
                        type: "agent",
                      })
                    }
                  />
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* Destructive confirm dialog — state #2 */}
      <AnimatePresence>
        {deleteTarget && (
          <DestructiveConfirmDialog
            entityName={deleteTarget.name}
            entityType={deleteTarget.type}
            onConfirm={handleDelete}
            onCancel={() => setDeleteTarget(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

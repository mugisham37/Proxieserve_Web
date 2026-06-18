"use client";

import * as React from "react";
import Link from "next/link";
import { Plus, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { AppButton } from "@/components/atoms/shared/AppButton";
import { PricingTableRow } from "@/components/molecules/admin/PricingTableRow";
import { AgentTableRow } from "@/components/molecules/agent/AgentTableRow";
import { SkeletonBlock } from "@/components/atoms/shared/SkeletonBlock";
import { derivePricingRows, adaptAdminAgent } from "@/lib/admin-adapters";
import { useAdminServices } from "@/hooks/useServices";
import { useAdminAnalytics } from "@/hooks/useAnalytics";

export function PricingAgentsPanel() {
  const { data: servicesData, isLoading: servicesLoading } = useAdminServices();
  const { data: analyticsData, isLoading: agentsLoading } = useAdminAnalytics();

  const pricingRows = React.useMemo(
    () => derivePricingRows(servicesData?.services ?? []),
    [servicesData?.services]
  );
  const agents = React.useMemo(
    () => (analyticsData?.agents ?? []).map(adaptAdminAgent),
    [analyticsData?.agents]
  );

  const activeAgents = agents.filter((a) => a.status === "active").length;
  const avgLoad =
    agents.length > 0
      ? Math.round(
          agents.reduce((s, a) => s + (a.load / Math.max(a.capacity, 1)) * 100, 0) /
            agents.length
        )
      : 0;

  return (
    <div className="px-[20px] min-[980px]:px-[40px] py-[28px] flex flex-col gap-[28px]">
      <div>
        <h1 className="font-serif text-[26px] font-normal text-[var(--ink)]">
          Pricing & Agents
        </h1>
        <p className="font-sans text-[13px] text-[var(--ink-muted)] mt-[2px]">
          Manage service fees and the agent roster
        </p>
      </div>

      <section aria-label="Pricing">
        <div className="flex items-center justify-between mb-[14px]">
          <h2 className="font-mono text-[11px] tracking-[0.08em] uppercase text-[var(--ink-muted)]">
            Fee schedule
          </h2>
          <AppButton variant="default" size="sm" asChild>
            <Link href="/admin/services">
              <Plus size={13} aria-hidden="true" />
              Manage services
            </Link>
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
              {servicesLoading ? (
                <tr>
                  <td colSpan={6} className="px-[16px] py-[24px]">
                    <SkeletonBlock className="h-[60px] rounded-[var(--r-md)]" />
                  </td>
                </tr>
              ) : pricingRows.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-[16px] py-[32px] text-center font-sans text-[13px] text-[var(--ink-muted)]"
                  >
                    No services configured yet
                  </td>
                </tr>
              ) : (
                pricingRows.map((row) => (
                  <PricingTableRow
                    key={row.id}
                    row={row}
                    onEdit={() => {}}
                    onDelete={() => {}}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-label="Agent summary statistics">
        <div className="grid grid-cols-2 min-[640px]:grid-cols-4 gap-[12px]">
          {[
            { label: "Total agents", value: agents.length },
            { label: "Active now", value: activeAgents },
            { label: "Avg load", value: `${avgLoad}%` },
            {
              label: "2FA enabled",
              value: agents.length
                ? `${agents.filter((a) => a.twoFa).length}/${agents.length}`
                : "0/0",
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

      <section aria-label="Agent roster">
        <div className="flex items-center justify-between mb-[14px]">
          <h2 className="font-mono text-[11px] tracking-[0.08em] uppercase text-[var(--ink-muted)]">
            Agent roster
          </h2>
          <div className="flex gap-[8px]">
            <AppButton variant="ghost" size="sm" asChild>
              <Link href="/admin/agents">
                <UserPlus size={13} aria-hidden="true" />
                Manage agents
              </Link>
            </AppButton>
          </div>
        </div>

        <div className="rounded-[var(--r-lg)] border border-[var(--rule)] bg-[var(--paper)] overflow-x-auto">
          <table className="w-full min-w-[720px]" aria-label="Agent roster">
            <thead>
              <tr className="border-b border-[var(--rule)]">
                {["Agent", "Email", "Skills", "Load", "2FA", "Role", ""].map((col) => (
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
                ))}
              </tr>
            </thead>
            <tbody>
              {agentsLoading ? (
                <tr>
                  <td colSpan={7} className="px-[16px] py-[24px]">
                    <SkeletonBlock className="h-[80px] rounded-[var(--r-md)]" />
                  </td>
                </tr>
              ) : (
                agents.map((agent) => (
                  <AgentTableRow
                    key={agent.id}
                    agent={agent}
                    onRemove={() => {}}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

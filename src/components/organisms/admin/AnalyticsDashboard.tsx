"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { KpiCard } from "@/components/atoms/admin/KpiCard";
import { AlertItem } from "@/components/molecules/shared/AlertItem";
import { AgentPerfRow } from "@/components/molecules/agent/AgentPerfRow";
import { useAdminState } from "@/lib/admin-context";

// ─── Bar chart helpers ────────────────────────────────────────────────────────

function BarChart({
  bars,
  className,
}: {
  bars: { label: string; value: number; color?: string }[];
  className?: string;
}) {
  const max = Math.max(...bars.map((b) => b.value));
  return (
    <div
      className={cn("flex items-end gap-[6px] h-[120px]", className)}
      aria-hidden="true"
    >
      {bars.map((bar, i) => (
        <div
          key={bar.label}
          className="flex-1 flex flex-col items-center gap-[4px]"
        >
          <div className="flex-1 w-full flex items-end">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${(bar.value / max) * 100}%` }}
              transition={{ duration: 0.4, delay: i * 0.04, ease: [0, 0, 0, 1] }}
              style={{ backgroundColor: bar.color ?? "var(--brand)" }}
              className="w-full rounded-t-[var(--r-sm)] min-h-[2px]"
            />
          </div>
          <span className="font-mono text-[9px] text-[var(--ink-subtle)] leading-none">
            {bar.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function HorizBar({
  label,
  pct,
  color,
  value,
}: {
  label: string;
  pct: number;
  color: string;
  value?: string | number;
}) {
  return (
    <div className="flex flex-col gap-[4px]">
      <div className="flex items-center justify-between">
        <span className="font-sans text-[12px] text-[var(--ink-muted)]">{label}</span>
        {value !== undefined && (
          <span className="font-mono text-[12px] text-[var(--ink)]">{value}</span>
        )}
        {value === undefined && (
          <span className="font-mono text-[12px] text-[var(--ink)]">{pct}%</span>
        )}
      </div>
      <div className="h-[6px] w-full bg-[var(--rule-soft)] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: [0, 0, 0, 1] }}
          style={{ backgroundColor: color }}
          className="h-full rounded-full"
        />
      </div>
    </div>
  );
}

function ChartCard({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-[16px] p-[20px]",
        "rounded-[var(--r-lg)] border border-[var(--rule)] bg-[var(--paper)]",
        className
      )}
    >
      <h3 className="font-mono text-[11px] tracking-[0.08em] uppercase text-[var(--ink-muted)]">
        {title}
      </h3>
      {children}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function AnalyticsDashboard() {
  const {
    metrics,
    loading,
    weeklyBars,
    serviceMix,
    paymentMix,
    statusBreakdown,
    alerts,
    agents,
  } = useAdminState();

  return (
    <div className="px-[20px] min-[980px]:px-[40px] py-[28px] flex flex-col gap-[28px]">
      {/* Page header */}
      <div>
        <h1 className="font-serif text-[26px] font-normal text-[var(--ink)]">
          Analytics
        </h1>
        <p className="font-sans text-[13px] text-[var(--ink-muted)] mt-[2px]">
          Platform performance at a glance
        </p>
      </div>

      {/* KPI row — 2 col mobile, 3 col tablet, 6 col desktop */}
      <section aria-label="Key metrics">
        <div className="grid grid-cols-2 min-[640px]:grid-cols-3 min-[1280px]:grid-cols-6 gap-[12px]">
          {loading
            ? metrics.map((m) => <KpiCard key={m.id} metric={m} loading />)
            : metrics.map((m, i) => (
                <KpiCard key={m.id} metric={m} index={i} />
              ))}
        </div>
      </section>

      {/* Charts row 1 */}
      <section
        aria-label="Volume charts"
        className="grid grid-cols-1 min-[640px]:grid-cols-2 gap-[16px]"
      >
        <ChartCard title="Weekly application volume">
          <BarChart
            bars={weeklyBars.map((b) => ({
              label: b.week.replace(/^[A-Za-z]+ /, ""),
              value: b.count,
              color: "var(--brand)",
            }))}
          />
          <div className="flex items-center justify-between mt-[4px]">
            <span className="font-sans text-[11px] text-[var(--ink-subtle)]">
              Last 10 weeks
            </span>
            <span className="font-mono text-[11px] text-[var(--ink-muted)]">
              {weeklyBars.reduce((s, b) => s + b.count, 0)} total
            </span>
          </div>
        </ChartCard>

        <ChartCard title="Service mix (30 days)">
          <div className="flex flex-col gap-[10px]">
            {serviceMix.map((s) => (
              <HorizBar
                key={s.service}
                label={s.service}
                pct={s.pct}
                color={s.color}
              />
            ))}
          </div>
        </ChartCard>
      </section>

      {/* Charts row 2 */}
      <section
        aria-label="Payment and status breakdowns"
        className="grid grid-cols-1 min-[640px]:grid-cols-2 gap-[16px]"
      >
        <ChartCard title="Payment method split">
          <div className="flex flex-col gap-[10px]">
            {paymentMix.map((p) => (
              <HorizBar
                key={p.method}
                label={p.method}
                pct={p.pct}
                color={p.color}
              />
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Status breakdown">
          <div className="flex flex-col gap-[10px]">
            {statusBreakdown.map((s) => (
              <HorizBar
                key={s.label}
                label={s.label}
                pct={s.pct}
                color={s.color}
                value={s.count.toLocaleString()}
              />
            ))}
          </div>
        </ChartCard>
      </section>

      {/* Needs attention */}
      {alerts.length > 0 && (
        <section aria-label="Needs attention">
          <h2 className="font-mono text-[11px] tracking-[0.08em] uppercase text-[var(--ink-muted)] mb-[12px]">
            Needs attention
          </h2>
          <div className="flex flex-col gap-[6px]" role="list">
            {alerts
              .sort((a, b) =>
                a.severity === "danger" && b.severity !== "danger" ? -1 : 0
              )
              .map((alert) => (
                <AlertItem key={alert.id} item={alert} />
              ))}
          </div>
        </section>
      )}

      {/* Agent performance table */}
      <section aria-label="Agent performance">
        <h2 className="font-mono text-[11px] tracking-[0.08em] uppercase text-[var(--ink-muted)] mb-[12px]">
          Agent performance
        </h2>
        <div
          className={cn(
            "rounded-[var(--r-lg)] border border-[var(--rule)]",
            "bg-[var(--paper)] overflow-x-auto"
          )}
        >
          <table className="w-full min-w-[680px]" aria-label="Agent performance table">
            <thead>
              <tr className="border-b border-[var(--rule)]">
                {[
                  { label: "Agent", align: "left" },
                  { label: "Active", align: "right" },
                  { label: "Completed", align: "right" },
                  { label: "Avg turn.", align: "right" },
                  { label: "SLA %", align: "right" },
                  { label: "Load", align: "left" },
                  { label: "Rating", align: "right" },
                  { label: "Status", align: "left" },
                ].map((col) => (
                  <th
                    key={col.label}
                    scope="col"
                    className={cn(
                      "px-[12px] py-[10px] first:pl-[16px] last:pr-[16px]",
                      "font-mono text-[10px] tracking-[0.06em] uppercase",
                      "text-[var(--ink-muted)]",
                      col.align === "right" ? "text-right" : "text-left"
                    )}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {agents.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-[16px] py-[32px] text-center font-sans text-[13px] text-[var(--ink-muted)]"
                  >
                    No agents yet
                  </td>
                </tr>
              ) : (
                agents.map((agent) => (
                  <AgentPerfRow key={agent.id} agent={agent} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

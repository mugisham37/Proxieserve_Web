"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { AppCard } from "@/components/molecules/AppCard";
import { PillButton } from "@/components/atoms/PillButton";
import { MOCK_DASHBOARD_APPLICATIONS } from "@/lib/dashboard-data";
import type { ApplicationSummary, AppStatus } from "@/lib/dashboard-data";

type SortKey = "updatedAt" | "submittedAt" | "status";

const STATUS_FILTERS: { value: AppStatus | "all"; label: string }[] = [
  { value: "all",              label: "All" },
  { value: "received",         label: "Received" },
  { value: "in-progress",      label: "In progress" },
  { value: "action-required",  label: "Action required" },
  { value: "on-hold",          label: "On hold" },
  { value: "completed",        label: "Completed" },
  { value: "rejected",         label: "Rejected" },
  { value: "archived",         label: "Archived" },
];

function sortApps(apps: ApplicationSummary[], key: SortKey): ApplicationSummary[] {
  return [...apps].sort((a, b) => {
    if (key === "status") return a.status.localeCompare(b.status);
    return b[key].localeCompare(a[key]);
  });
}

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show:  { opacity: 1, y: 0, transition: { duration: 0.24 } },
};

export function ApplicationsGrid() {
  const [statusFilter, setStatusFilter] = React.useState<AppStatus | "all">("all");
  const [sortKey, setSortKey] = React.useState<SortKey>("updatedAt");

  const filtered = React.useMemo(() => {
    const base = statusFilter === "all"
      ? MOCK_DASHBOARD_APPLICATIONS
      : MOCK_DASHBOARD_APPLICATIONS.filter((a) => a.status === statusFilter);
    return sortApps(base, sortKey);
  }, [statusFilter, sortKey]);

  return (
    <div className="max-w-[1200px]">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="font-serif font-medium text-[clamp(28px,4vw,40px)] text-[var(--ink)] m-0 leading-[1.1]">
            Applications
          </h1>
          <p className="font-sans text-[13.5px] text-[var(--ink-muted)] mt-1">
            {MOCK_DASHBOARD_APPLICATIONS.length} total · {filtered.length} shown
          </p>
        </div>
        <Link href="/services">
          <PillButton variant="solid" size="sm">+ New application</PillButton>
        </Link>
      </div>

      {/* Filter + sort bar */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {/* Status filter chips */}
        <div
          className="flex flex-wrap gap-1"
          role="group"
          aria-label="Filter by status"
        >
          {STATUS_FILTERS.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => setStatusFilter(value)}
              className={cn(
                "px-3 py-[5px] rounded-[999px] font-sans text-[12px] font-semibold",
                "border transition-colors duration-[var(--m-fast)]",
                "focus-visible:outline-none focus-visible:[box-shadow:var(--focus-ring)]",
                statusFilter === value
                  ? "bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)]"
                  : "bg-transparent text-[var(--ink-muted)] border-[var(--rule)] hover:border-[var(--ink)] hover:text-[var(--ink)]"
              )}
              aria-pressed={statusFilter === value}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Sort select */}
        <div className="ml-auto">
          <label htmlFor="apps-sort" className="sr-only">Sort by</label>
          <select
            id="apps-sort"
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
            className={cn(
              "px-3 py-[5px] rounded-[999px] font-sans text-[12px] font-semibold",
              "bg-[var(--paper)] border border-[var(--rule)] text-[var(--ink)]",
              "appearance-none cursor-pointer pr-7",
              "focus-visible:outline-none focus-visible:[box-shadow:var(--focus-ring)]"
            )}
          >
            <option value="updatedAt">Sort: Last updated</option>
            <option value="submittedAt">Sort: Submitted date</option>
            <option value="status">Sort: Status</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-6 bg-[var(--paper)] border border-[var(--rule)] border-dashed rounded-[var(--r-lg)] text-center">
          <p className="font-serif text-[18px] text-[var(--ink)] mb-2">No applications found</p>
          <p className="font-sans text-[13px] text-[var(--ink-muted)]">
            Try a different status filter.
          </p>
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
        >
          {filtered.map((app) => (
            <motion.div key={app.code} variants={itemVariants}>
              <AppCard app={app} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

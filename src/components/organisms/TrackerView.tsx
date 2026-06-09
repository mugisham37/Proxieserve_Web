"use client";

import * as React from "react";
import { AnimatePresence } from "framer-motion";
import { StatusHero } from "@/components/molecules/StatusHero";
import { TimelineCard } from "@/components/molecules/TimelineCard";
import { AgentCard } from "@/components/molecules/AgentCard";
import { DocsCard } from "@/components/molecules/DocsCard";
import { AppMetaSideCard } from "@/components/molecules/AppMetaSideCard";
import { NotificationPrefsCard } from "@/components/molecules/NotificationPrefsCard";
import { OutcomeCard } from "@/components/molecules/OutcomeCard";
import { RejectionPanel } from "@/components/molecules/RejectionPanel";
import { ClaimToAccountModal } from "@/components/molecules/ClaimToAccountModal";
import { PillButton } from "@/components/atoms/shared/PillButton";
import { getItem, setItem } from "@/lib/storage";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";
import type { TrackerApplication } from "@/lib/tracker-data";

interface TrackerViewProps {
  application: TrackerApplication;
}

export function TrackerView({ application }: TrackerViewProps) {
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const { session } = useAuth();

  // Track view count and fire modal on 2nd+ view
  React.useEffect(() => {
    const key = `proxi:tracker:views:${application.code}`;
    const current = parseInt(getItem(key) ?? "0", 10);
    const next = current + 1;
    setItem(key, String(next));
    if (next >= 2) {
      // Small delay so page renders first
      const t = setTimeout(() => setShowModal(true), 800);
      return () => clearTimeout(t);
    }
  }, [application.code]);

  // 60-second polling interval (mock — no actual data change)
  React.useEffect(() => {
    const interval = setInterval(() => {
      if (document.visibilityState === "visible") {
        // In production this would re-fetch; in mock, no-op
      }
    }, 60_000);
    return () => clearInterval(interval);
  }, []);

  function handleRefresh() {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1200);
  }

  const isActionRequired = application.status === "action-required";

  return (
    <div className="container py-8 sm:py-12 pb-20 sm:pb-[120px]">
      {/* Authenticated shortcut — shown when user is logged in */}
      {session && (
        <div className="mb-4 flex justify-end">
          <Link
            href={`/app/${application.code}`}
            className="inline-flex items-center gap-1.5 font-sans text-[13px] text-[var(--brand)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] rounded-sm"
          >
            Manage in your dashboard →
          </Link>
        </div>
      )}

      {/* Status hero — full width above the grid */}
      <StatusHero
        application={application}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
      />

      {/* Page title for screen readers / browser tab — dynamic by status */}
      <h2 className="sr-only">
        {application.status === "completed"
          ? "Completed"
          : application.status === "rejected"
            ? "Rejected"
            : application.status === "action-required"
              ? "Action required"
              : application.status === "on-hold"
                ? "On hold"
                : "Application received"}{" "}
        — {application.serviceName} ({application.code})
      </h2>

      {/* Two-column grid: 1-col mobile, 1fr+340px at 980px+ */}
      <div className="grid grid-cols-1 gap-6 [--aside-w:340px] lg:grid-cols-[minmax(0,1fr)_var(--aside-w)] lg:gap-8">
        {/* ── MAIN COLUMN ── */}
        <div>
          {/* Completed outcome card */}
          {application.outcomeData && (
            <OutcomeCard outcome={application.outcomeData} />
          )}

          {/* Rejected panel */}
          {application.rejectionData && (
            <RejectionPanel
              rejection={application.rejectionData}
              agent={application.agent}
            />
          )}

          {/* Action required — upload prompt */}
          {isActionRequired && application.actionData && (
            <section className="bg-[var(--warn-soft)] border border-[var(--warn)] rounded-[var(--r-lg)] p-7 mb-4">
              <h2 className="font-serif font-medium text-[20px] text-[var(--warn)] m-0 mb-2">
                Upload required
              </h2>
              <p className="font-sans text-[14px] text-[var(--ink-2)] leading-[1.6] mb-5 m-0">
                <strong className="font-medium">{application.actionData.agentName}</strong> needs:{" "}
                {application.actionData.missing}
              </p>
              <PillButton variant="solid" size="sm" className="bg-[var(--warn)] border-[var(--warn)] text-white hover:bg-[var(--warn)]/90">
                {application.actionData.uploadLabel} →
              </PillButton>
            </section>
          )}

          {/* On-hold notice */}
          {application.onHoldData && (
            <section className="bg-[var(--warn-soft)] border border-[var(--warn)] rounded-[var(--r-lg)] p-7 mb-4">
              <h2 className="font-serif font-medium text-[20px] text-[var(--warn)] m-0 mb-3">
                Processing paused by authority
              </h2>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-2 mb-0">
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--ink-muted)]">Authority</dt>
                  <dd className="font-sans text-[14px] text-[var(--ink)] font-medium m-0">{application.onHoldData.authority}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--ink-muted)]">Delay</dt>
                  <dd className="font-sans text-[14px] text-[var(--ink)] font-medium m-0">{application.onHoldData.delayDays} days</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--ink-muted)]">Original ETA</dt>
                  <dd className="font-sans text-[14px] text-[var(--ink-muted)] m-0 line-through">{application.onHoldData.originalEta}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--ink-muted)]">New ETA</dt>
                  <dd className="font-sans text-[14px] text-[var(--ink)] font-medium m-0">{application.onHoldData.newEta}</dd>
                </div>
              </dl>
            </section>
          )}

          <TimelineCard steps={application.timeline} />
          <DocsCard docs={application.documents} isGuest={true} />
        </div>

        {/* ── ASIDE COLUMN ── */}
        <aside>
          <AgentCard agent={application.agent} />
          <AppMetaSideCard meta={application.meta} />
          <NotificationPrefsCard code={application.code} />
        </aside>
      </div>

      {/* Claim to account modal */}
      <AnimatePresence>
        {showModal && (
          <ClaimToAccountModal
            code={application.code}
            serviceName={application.serviceName}
            onDismiss={() => setShowModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import * as React from "react";
import { AnimatePresence } from "framer-motion";
import { StatusHero } from "@/components/molecules/agent/StatusHero";
import { TimelineCard } from "@/components/molecules/shared/TimelineCard";
import { AgentCard } from "@/components/molecules/agent/AgentCard";
import { DocsCard } from "@/components/molecules/agent/DocsCard";
import { AppMetaSideCard } from "@/components/molecules/dashboard/AppMetaSideCard";
import { NotificationPrefsCard } from "@/components/molecules/dashboard/NotificationPrefsCard";
import { OutcomeCard } from "@/components/molecules/marketing/OutcomeCard";
import { RejectionPanel } from "@/components/molecules/system/RejectionPanel";
import { ClaimToAccountModal } from "@/components/molecules/auth/ClaimToAccountModal";
import { PillButton } from "@/components/atoms/shared/PillButton";
import { getItem, setItem } from "@/lib/storage";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";
import type { PublicTrackerApplication } from "@/lib/tracker-ui-types";

interface TrackerViewProps {
  application: PublicTrackerApplication;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export function TrackerView({ application, onRefresh, isRefreshing = false }: TrackerViewProps) {
  const [showModal, setShowModal] = React.useState(false);
  const { session } = useAuth();

  React.useEffect(() => {
    const key = `hebuza:tracker:views:${application.code}`;
    const current = parseInt(getItem(key) ?? "0", 10);
    const next = current + 1;
    setItem(key, String(next));
    if (next >= 2) {
      const t = setTimeout(() => setShowModal(true), 800);
      return () => clearTimeout(t);
    }
  }, [application.code]);

  const isActionRequired = application.status === "action-required";

  return (
    <div className="container py-8 sm:py-12 pb-20 sm:pb-[120px]">
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

      <StatusHero
        application={application}
        onRefresh={onRefresh}
        isRefreshing={isRefreshing}
      />

      <h2 className="sr-only">
        {application.statusLabel} — {application.serviceName} ({application.code})
      </h2>

      <div className="grid grid-cols-1 gap-6 [--aside-w:340px] lg:grid-cols-[minmax(0,1fr)_var(--aside-w)] lg:gap-8">
        <div>
          {application.outcomeData && <OutcomeCard outcome={application.outcomeData} />}

          {application.rejectionData && application.agent && (
            <RejectionPanel rejection={application.rejectionData} agent={application.agent} />
          )}

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

          {application.onHoldData && (
            <section className="bg-[var(--warn-soft)] border border-[var(--warn)] rounded-[var(--r-lg)] p-7 mb-4">
              <h2 className="font-serif font-medium text-[20px] text-[var(--warn)] m-0 mb-3">
                Processing paused by authority
              </h2>
            </section>
          )}

          <TimelineCard steps={application.timeline} />
          {application.documents && application.documents.length > 0 && (
            <DocsCard docs={application.documents} isGuest={true} />
          )}
        </div>

        <aside>
          {application.agent && <AgentCard agent={application.agent} />}
          {application.meta && <AppMetaSideCard meta={application.meta} />}
          <NotificationPrefsCard code={application.code} />
        </aside>
      </div>

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

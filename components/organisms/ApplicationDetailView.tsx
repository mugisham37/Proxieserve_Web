"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ApplicationHero } from "@/components/molecules/ApplicationHero";
import { DetailTabNav, type DetailTab } from "@/components/molecules/DetailTabNav";
import { MessageThread } from "@/components/molecules/MessageThread";
import { DashDocRow } from "@/components/molecules/DashDocRow";
import { AgentMiniCard } from "@/components/molecules/AgentMiniCard";
import { PaymentHistoryRow } from "@/components/molecules/PaymentHistoryRow";
import { TimelineCard } from "@/components/molecules/TimelineCard";
import { RejectionPanel } from "@/components/molecules/RejectionPanel";
import { AppMetaSideCard } from "@/components/molecules/AppMetaSideCard";
import { PillButton } from "@/components/atoms/PillButton";
import { ProgressBar } from "@/components/atoms/ProgressBar";
import {
  getApplicationMessages,
  getApplicationDocuments,
  getApplicationPayments,
  getApplicationAgent,
} from "@/lib/dashboard-data";
import type { ApplicationSummary, AppStatus } from "@/lib/dashboard-data";
import type { TimelineStep, AppMeta, RejectionData } from "@/lib/tracker-data";

// ---------------------------------------------------------------------------
// Derive timeline steps from ApplicationSummary
// ---------------------------------------------------------------------------
const TIMELINE_STEPS_MAP: Record<string, string[]> = {
  default: [
    "Application received",
    "Document verification",
    "Initial review",
    "Authority submission",
    "Authority processing",
    "Document preparation",
    "Ready for collection",
  ],
};

function deriveTimeline(app: ApplicationSummary): TimelineStep[] {
  const labels = TIMELINE_STEPS_MAP.default;
  return labels.map((title, i): TimelineStep => {
    if (i < app.completedSteps) return { id: `step-${i}`, title, status: "done", date: app.updatedAt };
    if (i === app.completedSteps && app.completedSteps < app.progressSteps) return { id: `step-${i}`, title, status: "current", date: app.estimatedCompletion, estimated: true };
    return { id: `step-${i}`, title, status: "upcoming", estimated: true };
  });
}

// Derive AppMeta from ApplicationSummary for the sidebar card
function deriveAppMeta(app: ApplicationSummary): AppMeta {
  const feeMap: Record<string, number> = {
    Standard: 25000, Express: 40000, Urgent: 60000,
  };
  return {
    serviceType: app.serviceCategory,
    tier: app.tier,
    submittedAt: app.submittedAt,
    serviceFee: feeMap[app.tier] ?? 25000,
    governmentFee: 50000,
  };
}

// ---------------------------------------------------------------------------
// Panel animations
// ---------------------------------------------------------------------------
const panelVariants = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.16 } },
  exit:   { opacity: 0, transition: { duration: 0.1 } },
};

// ---------------------------------------------------------------------------
// Tab panel components
// ---------------------------------------------------------------------------

function OverviewPanel({ app }: { app: ApplicationSummary }) {
  const agent = getApplicationAgent(app.code);

  if (app.status === "rejected") {
    const rejection: RejectionData = {
      reason: "The submitted documents did not meet the requirements of the issuing authority. A key certificate was found to be invalid.",
      whatNow: "You may reapply with corrected documents. Contact your agent below for guidance on what to fix.",
    };
    return <RejectionPanel rejection={rejection} agent={agent} />;
  }

  if (app.status === "action-required") {
    return (
      <div className="bg-[var(--warn-soft)] border border-[var(--warn)] rounded-[var(--r-lg)] p-7 mb-4">
        <h2 className="font-serif font-medium text-[20px] text-[var(--warn)] m-0 mb-3">
          Action required
        </h2>
        <p className="font-sans text-[14px] text-[var(--ink)] mb-5">
          Your agent has requested an additional document. Please check the messages tab for full details, then upload the required file below.
        </p>
        <a
          href={`/dashboard/applications/${app.code}?tab=messages`}
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2 rounded-[999px]",
            "font-sans text-[13px] font-semibold",
            "bg-[var(--warn)] text-white",
            "hover:opacity-90 transition-opacity duration-[var(--m-fast)]",
            "focus-visible:outline-none focus-visible:[box-shadow:var(--focus-ring)]"
          )}
        >
          View agent request →
        </a>
      </div>
    );
  }

  if (app.status === "completed") {
    return (
      <div className="bg-[var(--ok-soft)] border border-[var(--ok)] rounded-[var(--r-lg)] px-[22px] py-5 mb-4">
        <h2 className="font-serif font-medium text-[20px] text-[var(--ok)] m-0 mb-2">
          Application complete ✓
        </h2>
        <p className="font-sans text-[14px] text-[var(--ink)] mb-4">
          All processing is complete. Your documents have been dispatched to your registered address.
          Estimated delivery is within 2–3 business days.
        </p>
        <div className="flex gap-3 flex-wrap">
          <PillButton variant="solid" size="sm">Download documents</PillButton>
          <PillButton variant="ghost" size="sm">Rate your experience</PillButton>
        </div>
      </div>
    );
  }

  // Default overview
  return (
    <div className="space-y-4">
      {/* Status summary card */}
      <div className="bg-[var(--paper)] border border-[var(--rule)] rounded-[var(--r-lg)] p-6">
        <h2 className="font-serif font-medium text-[20px] text-[var(--ink)] m-0 mb-4">
          Application overview
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--ink-muted)] mb-1">Status</p>
            <p className="font-sans text-[14px] font-semibold text-[var(--ink)] capitalize">
              {app.status.replace("-", " ")}
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--ink-muted)] mb-1">Progress</p>
            <p className="font-sans text-[14px] font-semibold text-[var(--ink)]">
              {app.completedSteps} of {app.progressSteps} steps
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--ink-muted)] mb-1">Submitted</p>
            <p className="font-sans text-[14px] text-[var(--ink)]">{app.submittedAt}</p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--ink-muted)] mb-1">Est. completion</p>
            <p className="font-sans text-[14px] text-[var(--ink)]">{app.estimatedCompletion}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TimelinePanel({ app }: { app: ApplicationSummary }) {
  const steps = deriveTimeline(app);
  return <TimelineCard steps={steps} />;
}

function DocumentsPanel({ app }: { app: ApplicationSummary }) {
  const docs = getApplicationDocuments(app.code);
  // State 6: document upload progress simulation
  const [uploadProgress, setUploadProgress] = React.useState<number | null>(null);

  function handleUpload() {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev === null || prev >= 100) {
          clearInterval(interval);
          return null; // reset after complete
        }
        return prev + 10;
      });
    }, 200);
  }

  return (
    <section aria-labelledby="docs-panel-heading">
      <div className="flex items-center justify-between gap-4 mb-5">
        <h2 id="docs-panel-heading" className="font-serif font-medium text-[22px] text-[var(--ink)] m-0">
          Documents
        </h2>
        <PillButton size="sm" variant="ghost" onClick={handleUpload}>
          + Upload
        </PillButton>
      </div>

      {/* State 6: upload in progress */}
      {uploadProgress !== null && (
        <li className="grid grid-cols-[40px_1fr] gap-[14px] items-center px-3 py-3 mb-2 bg-[var(--cream)] border border-[var(--rule)] rounded-[var(--r-md)] list-none">
          <div className="flex items-center justify-center w-10 h-10 rounded-[var(--r-sm)] bg-[var(--cream-2)] font-mono text-[10px] font-bold text-[var(--ink-muted)]">
            PDF
          </div>
          <div className="min-w-0">
            <p className="font-sans text-[14px] font-medium text-[var(--ink)] m-0">Uploading document…</p>
            <div className="mt-2">
              <ProgressBar value={uploadProgress} color="brand" />
              <p className="font-mono text-[10px] text-[var(--ink-muted)] mt-1">{uploadProgress}%</p>
            </div>
          </div>
        </li>
      )}

      {docs.length === 0 ? (
        <p className="font-sans text-[13.5px] text-[var(--ink-muted)]">No documents uploaded yet.</p>
      ) : (
        <ul className="flex flex-col gap-2" aria-label="Application documents">
          {docs.map((doc) => (
            <DashDocRow key={doc.id} doc={doc} />
          ))}
        </ul>
      )}
    </section>
  );
}

function MessagesPanel({ app }: { app: ApplicationSummary }) {
  const messages = getApplicationMessages(app.code);
  return (
    <section aria-labelledby="messages-panel-heading">
      <h2 id="messages-panel-heading" className="font-serif font-medium text-[22px] text-[var(--ink)] m-0 mb-5">
        Messages
      </h2>
      <MessageThread messages={messages} applicationCode={app.code} />
    </section>
  );
}

function PaymentPanel({ app }: { app: ApplicationSummary }) {
  const payments = getApplicationPayments(app.code);
  const total = payments.reduce((s, p) => s + (p.status !== "refunded" ? p.amount : 0), 0);

  return (
    <section aria-labelledby="payment-panel-heading">
      <h2 id="payment-panel-heading" className="font-serif font-medium text-[22px] text-[var(--ink)] m-0 mb-5">
        Payment history
      </h2>
      {payments.length === 0 ? (
        <p className="font-sans text-[13.5px] text-[var(--ink-muted)]">No payment records yet.</p>
      ) : (
        <div className="bg-[var(--paper)] border border-[var(--rule)] rounded-[var(--r-lg)] px-6 py-4">
          <div role="rowgroup" aria-label="Payment records">
            {payments.map((p) => (
              <PaymentHistoryRow key={p.id} payment={p} />
            ))}
          </div>
          {/* Total row */}
          <div className="flex justify-between items-baseline pt-4 mt-2 border-t border-[var(--rule)]">
            <span className="font-sans text-[13px] font-semibold text-[var(--ink-muted)]">Total paid</span>
            <span className="font-mono text-[17px] font-bold text-[var(--ink)]">
              RWF {total.toLocaleString("en-RW")}
            </span>
          </div>
        </div>
      )}
    </section>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

interface ApplicationDetailViewProps {
  application: ApplicationSummary;
}

export function ApplicationDetailView({ application }: ApplicationDetailViewProps) {
  const searchParams = useSearchParams();
  const activeTab = (searchParams.get("tab") as DetailTab) ?? "overview";

  const docs = getApplicationDocuments(application.code);
  const messages = getApplicationMessages(application.code);
  const payments = getApplicationPayments(application.code);
  const agent = getApplicationAgent(application.code);
  const appMeta = deriveAppMeta(application);

  const counts = {
    timeline: application.progressSteps,
    documents: docs.length,
    messages: messages.length,
    payment: payments.length,
  };

  return (
    <div className="max-w-[1100px]">
      {/* Hero */}
      <ApplicationHero application={application} />

      {/* Tab navigation */}
      <DetailTabNav applicationCode={application.code} counts={counts} />

      {/* Two-column grid: main + sidebar */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
        {/* Tab panel */}
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={panelVariants}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              {activeTab === "overview"  && <OverviewPanel  app={application} />}
              {activeTab === "timeline"  && <TimelinePanel  app={application} />}
              {activeTab === "documents" && <DocumentsPanel app={application} />}
              {activeTab === "messages"  && <MessagesPanel  app={application} />}
              {activeTab === "payment"   && <PaymentPanel   app={application} />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-5">
          <AgentMiniCard agent={agent} applicationCode={application.code} />
          <AppMetaSideCard meta={appMeta} />
        </div>
      </div>
    </div>
  );
}

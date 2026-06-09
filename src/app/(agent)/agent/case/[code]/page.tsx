"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { WorkTabs } from "@/components/molecules/agent/WorkTabs";
import type { WorkTabKey } from "@/components/molecules/agent/WorkTabs";
import { ChecklistItem } from "@/components/molecules/marketing/ChecklistItem";
import { InternalNoteBubble } from "@/components/molecules/agent/InternalNoteBubble";
import { DualLaneComposer } from "@/components/molecules/agent/DualLaneComposer";
import { DocumentThumb } from "@/components/molecules/agent/DocumentThumb";
import { ClientRailCard } from "@/components/molecules/agent/ClientRailCard";
import { PaymentRailCard } from "@/components/molecules/payment/PaymentRailCard";
import { SLARailCard } from "@/components/molecules/agent/SLARailCard";
import { QuickActionsCard } from "@/components/molecules/dashboard/QuickActionsCard";
import { StatusChanger } from "@/components/molecules/agent/StatusChanger";
import { KbdHintBar, CASE_HINTS } from "@/components/molecules/system/KbdHintBar";
import { useAgentDispatch } from "@/lib/agent-context";
import { MOCK_CASE_DETAIL } from "@/lib/agent-data";
import type { AgentStatus, ChecklistStep } from "@/lib/types/agent";

// ─── Checklist Pane ───────────────────────────────────────────────────────────

function ChecklistPane({
  steps,
  onCheck,
}: {
  steps: ChecklistStep[];
  onCheck: (id: string) => void;
}) {
  const currentStep = steps.find((s) => s.isCurrent);
  const internalNote =
    "Client re-uploaded the photo on 22 May — looks clearer now. Verify before submitting to Immigration.";

  return (
    <div className="py-[16px]">
      {/* Internal note */}
      <div className="px-[20px] mb-[16px]">
        <InternalNoteBubble
          body={internalNote}
          senderName="Aline M."
          timestamp="20 May 09:25"
        />
      </div>

      {/* Checklist */}
      <div aria-label="Case checklist">
        {steps.map((step) => (
          <ChecklistItem key={step.id} step={step} onCheck={onCheck} />
        ))}
      </div>

      {/* Actions */}
      {currentStep && (
        <div className="flex items-center gap-[8px] px-[20px] pt-[16px] flex-wrap">
          <button
            type="button"
            aria-label="Mark current step done and continue"
            onClick={() => onCheck(currentStep.id)}
            className={cn(
              "px-[16px] h-[38px] rounded-[var(--r-pill)]",
              "bg-[var(--ink)] text-[var(--paper)]",
              "font-sans text-[13px] font-medium",
              "transition-colors duration-[var(--m-fast)]",
              "hover:bg-[var(--ink-2)]",
              "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
            )}
          >
            Mark step done &amp; continue
          </button>
          <Link
            href={`/agent/case/${MOCK_CASE_DETAIL.code}/doc/doc-4`}
            className={cn(
              "px-[16px] h-[38px] rounded-[var(--r-pill)]",
              "border border-[var(--rule)]",
              "font-sans text-[13px] text-[var(--ink-muted)]",
              "inline-flex items-center",
              "transition-colors duration-[var(--m-fast)]",
              "hover:bg-[var(--cream)] hover:text-[var(--ink)]",
              "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
            )}
          >
            Open the new photo →
          </Link>
        </div>
      )}
    </div>
  );
}

// ─── Conversation Pane ────────────────────────────────────────────────────────

function ConversationPane({ caseCode }: { caseCode: string }) {
  const messages = MOCK_CASE_DETAIL.conversation;

  return (
    <div className="flex flex-col">
      {/* Thread */}
      <div className="flex flex-col gap-[0] px-[20px] py-[16px]" role="log" aria-label="Conversation messages" aria-live="polite">
        {messages.map((msg) => {
          if (msg.type === "system") {
            return (
              <div key={msg.id} className="flex items-center gap-[8px] py-[10px]">
                <div className="flex-1 h-[1px] bg-[var(--rule)]" />
                <span className="font-mono text-[10px] tracking-[0.08em] text-[var(--ink-subtle)] whitespace-nowrap">
                  {msg.body} · {msg.timestamp}
                </span>
                <div className="flex-1 h-[1px] bg-[var(--rule)]" />
              </div>
            );
          }

          if (msg.type === "internal_note") {
            return (
              <div key={msg.id} className="py-[6px]">
                <InternalNoteBubble
                  body={msg.body}
                  senderName={msg.senderName}
                  timestamp={msg.timestamp}
                />
              </div>
            );
          }

          const isAgent = msg.type === "agent";
          return (
            <div
              key={msg.id}
              data-type={msg.type}
              className={cn(
                "flex gap-[10px] py-[8px]",
                isAgent && "flex-row-reverse"
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "inline-flex items-center justify-center shrink-0",
                  "w-[32px] h-[32px] rounded-full mt-[2px]",
                  "font-sans text-[12px] font-semibold",
                  isAgent
                    ? "bg-[var(--ink)] text-[var(--paper)]"
                    : "bg-[var(--brand-soft)] text-[var(--brand-ink)]"
                )}
              >
                {msg.senderInitials}
              </span>
              <div className={cn("flex flex-col", isAgent && "items-end")}>
                <div
                  className={cn(
                    "px-[14px] py-[10px] rounded-[var(--r-lg)] max-w-[440px]",
                    isAgent
                      ? "bg-[var(--ink)] text-[var(--paper)] rounded-tr-[4px]"
                      : "bg-[var(--paper-2)] text-[var(--ink)] rounded-tl-[4px]",
                    "border border-[var(--rule)]"
                  )}
                >
                  <p className="font-sans text-[13.5px] leading-[1.5]">{msg.body}</p>
                </div>
                <span className="font-mono text-[10px] text-[var(--ink-subtle)] mt-[4px]">
                  {msg.senderName} · {msg.timestamp}
                  {msg.isRead && isAgent && " · read"}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Composer */}
      <div className="px-[20px] pb-[20px]">
        <DualLaneComposer
          placeholder={`Reply to ${MOCK_CASE_DETAIL.clientName}…`}
          onSend={(body, lane) => {
            // real: dispatch message to API
          }}
        />
      </div>
    </div>
  );
}

// ─── Documents Pane ───────────────────────────────────────────────────────────

function DocumentsPane({ caseCode }: { caseCode: string }) {
  return (
    <div className="p-[20px]">
      <div className="grid grid-cols-2 min-[600px]:grid-cols-3 min-[1200px]:grid-cols-4 gap-[12px]">
        {MOCK_CASE_DETAIL.documents.map((doc) => (
          <DocumentThumb key={doc.id} doc={doc} caseCode={caseCode} />
        ))}
      </div>
    </div>
  );
}

// ─── Details Pane ─────────────────────────────────────────────────────────────

function DetailsPane() {
  return (
    <div className="p-[20px]">
      <div className="bg-[var(--paper-2)] rounded-[var(--r-md)] border border-[var(--rule)] overflow-hidden">
        <div className="px-[16px] py-[12px] border-b border-[var(--rule)]">
          <h3 className="font-sans text-[12px] font-semibold text-[var(--ink)]">
            Application answers
          </h3>
        </div>
        {MOCK_CASE_DETAIL.applicationAnswers.map((item, i) => (
          <div
            key={i}
            className={cn(
              "flex items-center justify-between gap-[16px]",
              "px-[16px] py-[10px]",
              "border-b border-[var(--rule)] last:border-0"
            )}
          >
            <span className="font-mono text-[11px] tracking-[0.06em] uppercase text-[var(--ink-muted)] shrink-0">
              {item.label}
            </span>
            <span className="font-sans text-[13px] text-[var(--ink)] text-right">
              {item.value === "—" ? (
                <span className="text-[var(--ink-subtle)]">—</span>
              ) : (
                item.value
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── History Pane ─────────────────────────────────────────────────────────────

function HistoryPane() {
  return (
    <div className="p-[20px]">
      <ol aria-label="Case history" className="flex flex-col gap-[0]">
        {MOCK_CASE_DETAIL.history.map((entry, i) => (
          <li
            key={i}
            className={cn(
              "flex gap-[14px] pb-[16px]",
              "relative before:absolute before:left-[76px] before:top-[20px]",
              "before:w-[1px] before:bottom-0 before:bg-[var(--rule)]",
              i === MOCK_CASE_DETAIL.history.length - 1 && "before:hidden"
            )}
          >
            <span className="font-mono text-[11px] text-[var(--ink-subtle)] w-[76px] shrink-0 pt-[2px]">
              {entry.timestamp}
            </span>
            <div className="relative z-10 flex items-start gap-[10px]">
              <span
                aria-hidden="true"
                className="mt-[6px] w-[6px] h-[6px] rounded-full bg-[var(--ink-subtle)] shrink-0"
              />
              <p className="font-sans text-[13px] text-[var(--ink)] leading-[1.5]">
                {entry.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

// ─── Case Detail Page ─────────────────────────────────────────────────────────

export default function CaseDetailPage() {
  const params = useParams();
  const code = params.code as string;
  const dispatch = useAgentDispatch();

  const [activeTab, setActiveTab] = React.useState<WorkTabKey>("checklist");
  const [status, setStatus] = React.useState(MOCK_CASE_DETAIL.status);
  const [checklist, setChecklist] = React.useState(MOCK_CASE_DETAIL.checklist);

  const handleCheck = (id: string) => {
    setChecklist((prev) => {
      const idx = prev.findIndex((s) => s.id === id);
      if (idx === -1) return prev;
      const updated = prev.map((s, i) => {
        if (i === idx) return { ...s, isDone: true, isCurrent: false, doneAt: "now" };
        if (i === idx + 1) return { ...s, isCurrent: true };
        return s;
      });
      return updated;
    });
  };

  const handleStatusChange = (next: AgentStatus) => {
    setStatus(next);
    dispatch({ type: "CHANGE_CASE_STATUS", payload: { code, status: next } });
  };

  return (
    <>
      <div className="max-w-[1400px]">
        {/* Case header */}
        <div className="px-[20px] min-[980px]:px-[32px] py-[20px] border-b border-[var(--rule)]">
          <Link
            href="/agent"
            className={cn(
              "inline-flex items-center gap-[6px] mb-[12px]",
              "font-sans text-[12px] text-[var(--ink-muted)]",
              "transition-colors duration-[var(--m-fast)]",
              "hover:text-[var(--ink)]",
              "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
            )}
          >
            <ArrowLeft size={13} aria-hidden="true" />
            Back to cases
          </Link>

          <div className="flex items-start justify-between gap-[16px] flex-wrap">
            <div>
              <p className="font-mono text-[11px] text-[var(--ink-muted)] mb-[4px]">
                {code} · submitted {MOCK_CASE_DETAIL.submittedAt}
              </p>
              <h1 className="font-serif text-[26px] font-normal text-[var(--ink)]">
                {MOCK_CASE_DETAIL.serviceNameBase}{" "}
                <em className="italic font-normal">
                  {MOCK_CASE_DETAIL.serviceNameItalic}
                </em>
              </h1>
            </div>
            <StatusChanger value={status} onChange={handleStatusChange} />
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid min-[1000px]:grid-cols-[1fr_380px]">
          {/* Work column */}
          <div className="min-w-0 border-r border-[var(--rule)]">
            <WorkTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              panels={{
                checklist: (
                  <ChecklistPane steps={checklist} onCheck={handleCheck} />
                ),
                conversation: <ConversationPane caseCode={code} />,
                documents: <DocumentsPane caseCode={code} />,
                details: <DetailsPane />,
                history: <HistoryPane />,
              }}
            />
          </div>

          {/* Rail */}
          <aside
            aria-label="Case details rail"
            className="hidden min-[1000px]:flex flex-col gap-[16px] p-[20px] sticky top-[56px] self-start max-h-[calc(100vh-56px)] overflow-y-auto"
          >
            <ClientRailCard
              detail={MOCK_CASE_DETAIL}
              whatsappUrl="#"
            />
            <PaymentRailCard
              detail={MOCK_CASE_DETAIL}
              onViewReceipt={() => {}}
            />
            <SLARailCard detail={MOCK_CASE_DETAIL} />
            <QuickActionsCard caseCode={code} />
          </aside>
        </div>
      </div>

      <KbdHintBar hints={CASE_HINTS} />
    </>
  );
}

"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { WorkTabs } from "@/components/molecules/agent/WorkTabs";
import type { WorkTabKey } from "@/components/molecules/agent/WorkTabs";
import { DualLaneComposer } from "@/components/molecules/agent/DualLaneComposer";
import { QuickActionsCard } from "@/components/molecules/dashboard/QuickActionsCard";
import { StatusChanger } from "@/components/molecules/agent/StatusChanger";
import { KbdHintBar, CASE_HINTS } from "@/components/molecules/system/KbdHintBar";
import { useAgentDispatch } from "@/lib/agent-context";
import type { AgentStatus } from "@/lib/types/agent";

// ─── Empty pane ───────────────────────────────────────────────────────────────

function EmptyPane({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center py-[48px] px-[20px]">
      <p className="font-sans text-[13px] text-[var(--ink-muted)]">{label}</p>
    </div>
  );
}

// ─── Conversation Pane ────────────────────────────────────────────────────────

function ConversationPane({ caseCode }: { caseCode: string }) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-[0] px-[20px] py-[16px]" role="log" aria-label="Conversation messages" aria-live="polite">
        <EmptyPane label="No messages yet." />
      </div>
      <div className="px-[20px] pb-[20px]">
        <DualLaneComposer
          placeholder="Reply to client…"
          onSend={() => {}}
        />
      </div>
    </div>
  );
}

// ─── Case Detail Page ─────────────────────────────────────────────────────────

export default function CaseDetailPage() {
  const params = useParams();
  const code = params.code as string;
  const dispatch = useAgentDispatch();

  const [activeTab, setActiveTab] = React.useState<WorkTabKey>("checklist");
  const [status, setStatus] = React.useState<AgentStatus>("in-progress");

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
                {code}
              </p>
              <h1 className="font-serif text-[26px] font-normal text-[var(--ink)]">
                Case <em className="italic font-normal">details</em>
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
                checklist: <EmptyPane label="No checklist steps yet." />,
                conversation: <ConversationPane caseCode={code} />,
                documents: <EmptyPane label="No documents uploaded yet." />,
                details: <EmptyPane label="No application details yet." />,
                history: <EmptyPane label="No history yet." />,
              }}
            />
          </div>

          {/* Rail */}
          <aside
            aria-label="Case details rail"
            className="hidden min-[1000px]:flex flex-col gap-[16px] p-[20px] sticky top-[56px] self-start max-h-[calc(100vh-56px)] overflow-y-auto"
          >
            <QuickActionsCard caseCode={code} />
          </aside>
        </div>
      </div>

      <KbdHintBar hints={CASE_HINTS} />
    </>
  );
}

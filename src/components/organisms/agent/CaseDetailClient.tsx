"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { WorkTabs } from "@/components/molecules/agent/WorkTabs";
import type { WorkTabKey } from "@/components/molecules/agent/WorkTabs";
import { DualLaneComposer } from "@/components/molecules/agent/DualLaneComposer";
import { QuickActionsCard } from "@/components/molecules/dashboard/QuickActionsCard";
import { StatusChanger } from "@/components/molecules/agent/StatusChanger";
import { KbdHintBar, CASE_HINTS } from "@/components/molecules/system/KbdHintBar";
import { SkeletonBlock } from "@/components/atoms/shared/SkeletonBlock";
import {
  adaptDocumentItem,
  adaptMessageItem,
  getClientNameFromDetail,
} from "@/lib/agent-adapters";
import type { AgentStatus } from "@/lib/types/agent";
import { useAgentCase, useUpdateCaseStatus } from "@/hooks/useAgentCases";
import { useMessages, useSendMessage } from "@/hooks/useMessages";
import { useDocuments } from "@/hooks/useDocuments";
import { isApiError } from "@/lib/api/types";

function EmptyPane({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center py-[48px] px-[20px]">
      <p className="font-sans text-[13px] text-[var(--ink-muted)]">{label}</p>
    </div>
  );
}

function LoadingPane() {
  return (
    <div className="flex flex-col gap-3 p-[20px]">
      <SkeletonBlock className="h-4 w-3/4" />
      <SkeletonBlock className="h-4 w-1/2" />
      <SkeletonBlock className="h-4 w-2/3" />
    </div>
  );
}

interface CaseDetailClientProps {
  code: string;
}

export function CaseDetailClient({ code }: CaseDetailClientProps) {
  const { data: detail, isLoading, error } = useAgentCase(code);
  const { data: messagesData, isLoading: messagesLoading } = useMessages(code, true);
  const { data: documentsData, isLoading: documentsLoading } = useDocuments(code);
  const updateStatus = useUpdateCaseStatus(code);
  const sendMessage = useSendMessage(code, true);

  const [activeTab, setActiveTab] = React.useState<WorkTabKey>("checklist");
  const [statusError, setStatusError] = React.useState<string | null>(null);

  const status = (detail?.status ?? "in-progress") as AgentStatus;
  const messages = React.useMemo(
    () => (messagesData?.messages ?? detail?.messages ?? []).map(adaptMessageItem),
    [messagesData?.messages, detail?.messages]
  );
  const documents = React.useMemo(
    () => (documentsData?.documents ?? detail?.documents ?? []).map(adaptDocumentItem),
    [documentsData?.documents, detail?.documents]
  );

  const handleStatusChange = async (next: AgentStatus) => {
    setStatusError(null);
    try {
      await updateStatus.mutateAsync({ status: next });
    } catch (err) {
      setStatusError(isApiError(err) ? err.message : "Failed to update status.");
    }
  };

  const handleSend = async (body: string, lane: "reply" | "note") => {
    await sendMessage.mutateAsync({
      content: body,
      is_internal: lane === "note",
    });
  };

  if (error) {
    return (
      <div className="px-[20px] py-[40px]">
        <p className="font-sans text-[13px] text-[var(--danger)]">
          Failed to load case details.
        </p>
      </div>
    );
  }

  const clientName = detail ? getClientNameFromDetail(detail) : "Client";
  const serviceName = detail?.service_name ?? "Case";

  return (
    <>
      <div className="max-w-[1400px]">
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
                {isLoading ? (
                  "Loading…"
                ) : (
                  <>
                    {serviceName.split(" ").slice(0, -1).join(" ")}{" "}
                    <em className="italic font-normal">
                      {serviceName.split(" ").slice(-1)[0]}
                    </em>
                  </>
                )}
              </h1>
              {!isLoading && (
                <p className="font-sans text-[13px] text-[var(--ink-muted)] mt-1">
                  {clientName} · {detail?.status_display ?? status}
                </p>
              )}
            </div>
            <StatusChanger
              value={status}
              onChange={(next) => void handleStatusChange(next)}
            />
          </div>
          {statusError && (
            <p className="mt-3 font-sans text-[12px] text-[var(--danger)]">{statusError}</p>
          )}
        </div>

        <div className="grid min-[1000px]:grid-cols-[1fr_380px]">
          <div className="min-w-0 border-r border-[var(--rule)]">
            <WorkTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              panels={{
                checklist: documentsLoading ? (
                  <LoadingPane />
                ) : documents.length === 0 ? (
                  <EmptyPane label="No checklist steps yet." />
                ) : (
                  <div className="p-[20px] flex flex-col gap-3">
                    {documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between py-2 border-b border-[var(--rule)] last:border-0"
                      >
                        <div>
                          <p className="font-sans text-[13px] text-[var(--ink)]">{doc.label}</p>
                          <p className="font-sans text-[12px] text-[var(--ink-muted)]">
                            {doc.filename} · {doc.fileSize}
                          </p>
                        </div>
                        <span className="font-mono text-[10px] uppercase text-[var(--ink-muted)]">
                          {doc.status}
                        </span>
                      </div>
                    ))}
                  </div>
                ),
                conversation: messagesLoading ? (
                  <LoadingPane />
                ) : (
                  <div className="flex flex-col">
                    <div
                      className="flex flex-col gap-[12px] px-[20px] py-[16px] max-h-[420px] overflow-y-auto"
                      role="log"
                      aria-label="Conversation messages"
                      aria-live="polite"
                    >
                      {messages.length === 0 ? (
                        <EmptyPane label="No messages yet." />
                      ) : (
                        messages.map((message) => (
                          <div
                            key={message.id}
                            className={cn(
                              "rounded-[var(--r-md)] px-3 py-2",
                              message.type === "internal_note"
                                ? "bg-[var(--warn-soft)]"
                                : "bg-[var(--paper-2)]"
                            )}
                          >
                            <p className="font-mono text-[10px] text-[var(--ink-muted)] mb-1">
                              {message.senderName}
                            </p>
                            <p className="font-sans text-[13px] text-[var(--ink)] whitespace-pre-wrap">
                              {message.body}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                    <div className="px-[20px] pb-[20px]">
                      <DualLaneComposer
                        placeholder="Reply to client…"
                        onSend={(body, lane) => void handleSend(body, lane)}
                      />
                    </div>
                  </div>
                ),
                documents: documentsLoading ? (
                  <LoadingPane />
                ) : documents.length === 0 ? (
                  <EmptyPane label="No documents uploaded yet." />
                ) : (
                  <div className="p-[20px] flex flex-col gap-3">
                    {documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="rounded-[var(--r-md)] border border-[var(--rule)] px-3 py-2"
                      >
                        <p className="font-sans text-[13px] font-medium text-[var(--ink)]">
                          {doc.filename}
                        </p>
                        <p className="font-sans text-[12px] text-[var(--ink-muted)]">
                          {doc.label} · {doc.fileSize} · {doc.uploadedAt}
                        </p>
                      </div>
                    ))}
                  </div>
                ),
                details: isLoading || !detail ? (
                  <LoadingPane />
                ) : (
                  <div className="p-[20px] flex flex-col gap-3">
                    {Object.entries(detail.personal_info).map(([key, value]) => (
                      <div key={key} className="flex justify-between gap-4 py-2 border-b border-[var(--rule)]">
                        <span className="font-sans text-[12px] text-[var(--ink-muted)] capitalize">
                          {key.replace(/_/g, " ")}
                        </span>
                        <span className="font-sans text-[13px] text-[var(--ink)]">
                          {String(value ?? "—")}
                        </span>
                      </div>
                    ))}
                    {Object.entries(detail.service_data).map(([key, value]) => (
                      <div key={key} className="flex justify-between gap-4 py-2 border-b border-[var(--rule)]">
                        <span className="font-sans text-[12px] text-[var(--ink-muted)] capitalize">
                          {key.replace(/_/g, " ")}
                        </span>
                        <span className="font-sans text-[13px] text-[var(--ink)]">
                          {String(value ?? "—")}
                        </span>
                      </div>
                    ))}
                  </div>
                ),
                history: isLoading || !detail ? (
                  <LoadingPane />
                ) : detail.status_history.length === 0 ? (
                  <EmptyPane label="No history yet." />
                ) : (
                  <div className="p-[20px] flex flex-col gap-3">
                    {detail.status_history.map((entry, index) => (
                      <div key={`${entry.status}-${entry.created_at}-${index}`} className="py-2 border-b border-[var(--rule)]">
                        <p className="font-sans text-[13px] text-[var(--ink)]">{entry.status}</p>
                        <p className="font-sans text-[12px] text-[var(--ink-muted)]">
                          {entry.changed_by ?? "System"} · {entry.created_at}
                        </p>
                        {entry.note && (
                          <p className="font-sans text-[12px] text-[var(--ink-muted)] mt-1">
                            {entry.note}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ),
              }}
            />
          </div>

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

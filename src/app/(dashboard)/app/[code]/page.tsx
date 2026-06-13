"use client";

import * as React from "react";
import Link from "next/link";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useDashboard } from "@/lib/dashboard-context";
import { formatFee, formatFileSize } from "@/lib/dashboard-utils";
import { InAppStatusHero } from "@/components/molecules/agent/InAppStatusHero";
import { DetailTabs } from "@/components/molecules/agent/DetailTabs";
import type { DashboardApplication, DashboardMessage, DashboardDocument } from "@/lib/types/dashboard";

// ─── Compact agent mini card (reference exact) ───────────────────────────────

function AgentMiniCard({
  agent,
}: {
  agent: {
    name: string;
    initials: string;
    role: string;
    isOnline: boolean;
    avgReplyMinutes: number;
    whatsappUrl: string;
  };
}) {
  const firstName = agent.name.split(" ")[0];
  const lastName = agent.name.split(" ").slice(1).join(" ");

  return (
    <div className="bg-[var(--paper)] border border-[var(--rule)] rounded-[var(--r-lg)] p-[22px]">
      {/* Head */}
      <div className="flex items-center gap-[12px] mb-[14px]">
        {/* Brand-colored avatar (reference: background: var(--brand)) */}
        <span
          aria-hidden="true"
          className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-[var(--brand)] text-white font-serif font-medium text-[16px] shrink-0"
        >
          {agent.initials}
        </span>
        <div className="min-w-0">
          <h3 className="font-serif font-medium text-[17px] text-[var(--ink)] leading-tight m-0">
            {firstName} <em className="italic font-normal">{lastName}</em>
          </h3>
          <p className="font-mono text-[10px] text-[var(--ink-muted)] tracking-[0.06em] uppercase mt-[2px]">
            YOUR AGENT
          </p>
          <span className="inline-flex items-center gap-[6px] mt-[6px] font-sans text-[11px] text-[var(--ok)]">
            <span className="w-[6px] h-[6px] rounded-full bg-[var(--ok)]" aria-hidden="true" />
            {agent.isOnline
              ? `Online · usually replies in ${agent.avgReplyMinutes}h`
              : "Offline"}
          </span>
        </div>
      </div>

      {/* Contact buttons — WhatsApp first, then in-app (reference order) */}
      <div className="grid gap-[8px]">
        <a
          href={agent.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-[10px] px-[14px] py-[10px] rounded-[var(--r-md)] bg-[#25D366] border border-[#25D366] font-sans text-[13px] font-medium text-[var(--ink)] no-underline transition-colors hover:bg-[#1FB554] hover:border-[#1FB554] focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
          aria-label={`Message ${agent.name} on WhatsApp`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="shrink-0" aria-hidden="true">
            <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z" />
          </svg>
          WhatsApp
        </a>
        <button
          type="button"
          className="flex items-center gap-[10px] px-[14px] py-[10px] rounded-[var(--r-md)] bg-[var(--cream)] border border-[var(--rule)] font-sans text-[13px] font-medium text-[var(--ink)] transition-colors hover:bg-[var(--paper-2)] hover:border-[var(--ink)] focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
          aria-label="Send an in-app message to your agent"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="shrink-0 text-[var(--ink-muted)]" aria-hidden="true">
            <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z" />
          </svg>
          In-app message
        </button>
      </div>
    </div>
  );
}

// ─── Meta card (reference sidebar) ───────────────────────────────────────────

function MetaCard({
  heading,
  rows,
}: {
  heading: string;
  rows: { label: string; value: React.ReactNode; valueClass?: string }[];
}) {
  return (
    <div className="bg-[var(--paper)] border border-[var(--rule)] rounded-[var(--r-lg)] p-[22px] mt-[16px]">
      <h4 className="font-sans font-semibold text-[11px] text-[var(--ink-muted)] tracking-[0.10em] uppercase m-0 mb-[12px]">
        {heading}
      </h4>
      {rows.map(({ label, value, valueClass }, i) => (
        <div
          key={i}
          className="flex justify-between py-[6px] text-[13px] border-b border-[var(--rule-soft)] last:border-b-0"
        >
          <span className="text-[var(--ink-muted)]">{label}</span>
          <span className={cn("text-[var(--ink)] font-medium", valueClass)}>{value}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Section heading (eyebrow + serif H2) ─────────────────────────────────────

function SectionHead({
  eyebrow,
  title,
  titleItalic,
  action,
}: {
  eyebrow: string;
  title: string;
  titleItalic?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between mb-[16px]">
      <div>
        <span className="font-mono text-[10px] tracking-[0.08em] uppercase text-[var(--ink-muted)]">
          {eyebrow}
        </span>
        <h2 className="font-serif text-[20px] font-normal text-[var(--ink)] leading-[1.2] mt-[4px]">
          {titleItalic ? (
            <>
              <em className="italic font-normal">{title}</em>{" "}
              {titleItalic}
            </>
          ) : (
            <>
              {title}
            </>
          )}
        </h2>
      </div>
      {action}
    </div>
  );
}

// ─── Message bubble (reference-exact styling) ─────────────────────────────────

function MessageBubble({ message }: { message: DashboardMessage & { isOptimistic?: boolean } }) {
  const isSystem = message.senderType === "system";
  const isMine = message.senderType === "user";

  // System message — transparent, dashed border, pill, centered mono text
  if (isSystem) {
    return (
      <div className="col-span-full flex justify-center py-[4px]" role="note">
        <div className="bg-transparent border border-dashed border-[var(--rule)] rounded-[var(--r-pill)] font-mono text-[10.5px] text-[var(--ink-muted)] px-[12px] py-[4px] text-center">
          {message.body}
        </div>
      </div>
    );
  }

  // Agent message — avatar left, bubble right
  if (!isMine) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.15 }}
        className="grid grid-cols-[36px_1fr] gap-[12px] items-start"
      >
        <span
          aria-hidden="true"
          className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[var(--brand)] text-white font-serif font-medium text-[13px] shrink-0"
        >
          {message.senderInitials}
        </span>
        <div>
          <div className="flex items-baseline gap-[10px] mb-[4px]">
            <span className="font-sans text-[13px] font-semibold text-[var(--ink)]">
              {message.senderName}
            </span>
            <time className="font-mono text-[10.5px] text-[var(--ink-muted)]">
              {message.timestamp}
            </time>
          </div>
          <div className="bg-[var(--paper)] border border-[var(--rule)] rounded-[4px_14px_14px_14px] px-[14px] py-[12px]">
            <p className="font-sans text-[14.5px] leading-[1.55] text-[var(--ink)] m-0">
              {message.body}
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  // User (mine) message — avatar right, bubble left, "You" label
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: message.isOptimistic ? 0.6 : 1 }}
      transition={{ duration: 0.15 }}
      className="grid grid-cols-[1fr_36px] gap-[12px] items-start"
    >
      <div className="flex flex-col items-end">
        <div className="flex items-baseline gap-[10px] mb-[4px] flex-row-reverse">
          <span className="font-sans text-[13px] font-semibold text-[var(--ink)]">You</span>
          <time className="font-mono text-[10.5px] text-[var(--ink-muted)]">
            {message.timestamp}
          </time>
        </div>
        <div className="bg-[var(--brand-soft)] border border-[var(--rule-soft)] rounded-[14px_4px_14px_14px] px-[14px] py-[12px]">
          <p className="font-sans text-[14.5px] leading-[1.55] text-[var(--ink)] m-0">
            {message.body}
          </p>
        </div>
        {message.isOptimistic && (
          <span className="font-mono text-[10px] text-[var(--ink-muted)] mt-[4px]">
            Sending…
          </span>
        )}
      </div>
      <span
        aria-hidden="true"
        className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[var(--ink)] text-[var(--paper)] font-serif font-medium text-[13px] shrink-0"
      >
        {message.senderInitials}
      </span>
    </motion.div>
  );
}

// ─── Message input row (reference: textarea | attach | send) ─────────────────

function MessageInputRow({
  agentFirstName,
  onSend,
  disabled,
}: {
  agentFirstName: string;
  onSend: (body: string) => void;
  disabled?: boolean;
}) {
  const [value, setValue] = React.useState("");
  const liveRef = React.useRef<HTMLParagraphElement>(null);

  const handleSend = () => {
    if (!value.trim()) return;
    if (liveRef.current) liveRef.current.textContent = "Sending…";
    onSend(value.trim());
    setValue("");
    setTimeout(() => {
      if (liveRef.current) liveRef.current.textContent = "";
    }, 1500);
  };

  return (
    <div
      className={cn(
        "grid gap-[8px] p-[12px] border-t border-[var(--rule)] bg-[var(--paper)]",
        "grid-cols-[1fr_40px_auto]"
      )}
    >
      <p ref={liveRef} className="sr-only" aria-live="polite" />

      {/* Textarea first */}
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
        placeholder={`Reply to ${agentFirstName}...`}
        disabled={disabled}
        rows={1}
        aria-label="Type your message"
        className="resize-none px-[12px] py-[8px] rounded-[var(--r-md)] border border-[var(--rule)] bg-[var(--cream)] font-sans text-[14px] text-[var(--ink)] placeholder:text-[var(--ink-muted)]/50 outline-none focus:border-[var(--ink)] transition-colors min-h-[40px] max-h-[100px] disabled:opacity-50"
      />

      {/* Attach */}
      <button
        type="button"
        aria-label="Attach file"
        disabled={disabled}
        className="w-[40px] h-[40px] flex items-center justify-center rounded-[var(--r-md)] bg-[var(--cream)] border border-[var(--rule)] text-[var(--ink-muted)] hover:bg-[var(--paper-2)] hover:text-[var(--ink)] transition-colors focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] disabled:opacity-50"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
          <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
        </svg>
      </button>

      {/* Send */}
      <button
        type="button"
        onClick={handleSend}
        disabled={disabled || !value.trim()}
        aria-label="Send message"
        className="px-[16px] h-[40px] rounded-[var(--r-pill)] bg-[var(--ink)] text-[var(--paper)] font-sans text-[13px] font-medium hover:bg-[var(--ink-2)] transition-colors focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
      >
        Send →
      </button>
    </div>
  );
}

// ─── Document tile (reference exact) ─────────────────────────────────────────

function DocTile({ doc }: { doc: DashboardDocument }) {
  return (
    <div
      className={cn(
        "grid grid-cols-[40px_1fr_auto] items-center gap-[12px]",
        "px-[16px] py-[12px] border-b border-[var(--rule)] last:border-b-0"
      )}
    >
      {/* Thumb */}
      <div className="w-[40px] h-[50px] rounded-[var(--r-sm)] bg-[var(--cream-2)] border border-[var(--rule)] flex items-center justify-center shrink-0">
        <span className="font-mono text-[9px] text-[var(--ink-muted)] tracking-[0.04em]">
          {doc.ext}
        </span>
      </div>

      {/* Info */}
      <div className="min-w-0">
        <p className={cn("font-sans text-[13px] font-medium truncate", doc.hasWarning ? "text-[var(--warn)]" : "text-[var(--ink)]")}>
          {doc.filename}
          {doc.hasWarning && doc.warningNote && (
            <em className="italic font-normal text-[var(--warn)] text-[12px]">
              {" "}— {doc.warningNote}
            </em>
          )}
        </p>
        <p className="font-mono text-[11px] text-[var(--ink-muted)] mt-[1px]">
          {formatFileSize(doc.fileSize)} · uploaded {doc.uploadedAt} · {doc.categoryLabel}
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-[6px] shrink-0">
        {doc.hasWarning ? (
          <button
            type="button"
            className="inline-flex items-center px-[10px] py-[4px] rounded-[var(--r-pill)] bg-[var(--brand)] text-white font-sans text-[12px] font-medium hover:bg-[var(--brand-ink)] transition-colors focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
          >
            Replace
          </button>
        ) : (
          <button
            type="button"
            className="inline-flex items-center px-[10px] py-[4px] rounded-[var(--r-pill)] bg-transparent border border-[var(--rule)] text-[var(--ink)] font-sans text-[12px] font-medium hover:bg-[var(--cream)] hover:border-[var(--ink)] transition-colors focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
          >
            Preview
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Messages section (reusable for Overview + Messages tab) ──────────────────

function MessagesSection({
  messages,
  agentFirstName,
  onSend,
  isOffline,
}: {
  messages: (DashboardMessage & { isOptimistic?: boolean })[];
  agentFirstName: string;
  onSend: (body: string) => void;
  isOffline: boolean;
}) {
  return (
    <section className="mb-[32px]">
      <SectionHead
        eyebrow="02 / Conversation"
        title="Messages"
        titleItalic={`with ${agentFirstName}`}
      />
      <div className="bg-[var(--paper)] border border-[var(--rule)] rounded-[var(--r-lg)] overflow-hidden">
        <div
          className="flex flex-col gap-[16px] p-[16px]"
          role="log"
          aria-label="Message thread"
          aria-live="polite"
        >
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
        </div>
        <MessageInputRow
          agentFirstName={agentFirstName}
          onSend={onSend}
          disabled={isOffline}
        />
        {isOffline && (
          <p role="alert" className="px-[16px] pb-[10px] font-sans text-[12px] text-[var(--danger)]">
            You&apos;re offline. Messages will be sent when you reconnect.
          </p>
        )}
      </div>
    </section>
  );
}

// ─── Documents section (reusable) ────────────────────────────────────────────

function DocumentsSection({ documents }: { documents: DashboardDocument[] }) {
  return (
    <section>
      <SectionHead
        eyebrow={`03 / Files on this case`}
        title="Your"
        titleItalic="documents"
        action={
          <a href="#" className="font-sans text-[13px] text-[var(--brand-ink)] hover:text-[var(--brand)] transition-colors">
            Add a file
          </a>
        }
      />
      <div className="bg-[var(--paper)] border border-[var(--rule)] rounded-[var(--r-lg)] overflow-hidden">
        {documents.map((doc) => (
          <DocTile key={doc.id} doc={doc} />
        ))}
      </div>
    </section>
  );
}

// ─── Tab definitions ──────────────────────────────────────────────────────────

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "messages", label: "Messages" },
  { id: "documents", label: "Documents" },
  { id: "payment", label: "Payment" },
  { id: "history", label: "History" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ApplicationDetailPage() {
  const { code } = useParams<{ code: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const prefersReduced = useReducedMotion();
  const { addOptimisticMessage, resolveOptimisticMessage, isOffline } = useDashboard();

  const tab = searchParams.get("tab") ?? "overview";
  // TODO: fetch from API using `code`
  const application = null as DashboardApplication | null;
  const rawMessages: DashboardMessage[] = [];
  const documents: DashboardDocument[] = [];

  const [localMessages, setLocalMessages] = React.useState(rawMessages);

  const agentFirstName = application?.agent.name.split(" ")[0] ?? "your agent";

  const tabsWithCounts = TABS.map((t) => ({
    ...t,
    count:
      t.id === "messages"
        ? application?.unreadMessageCount
        : t.id === "documents"
        ? application?.documentCount
        : undefined,
  }));

  const handleSend = React.useCallback(
    (body: string) => {
      const tempId = `opt_${Date.now()}`;
      const msg: DashboardMessage & { isOptimistic: boolean } = {
        id: tempId,
        applicationCode: code,
        applicationLabel: "PASSPORT",
        senderType: "user",
        senderName: "You",
        senderInitials: "AM",
        avatarVariant: "brand",
        timestamp: "Just now",
        timeAgo: "Just now",
        body,
        isRead: true,
        isOptimistic: true,
      };
      setLocalMessages((prev) => [...prev, msg]);
      addOptimisticMessage({ id: tempId, body, timestamp: msg.timestamp, status: "sending" });
      setTimeout(() => {
        setLocalMessages((prev) =>
          prev.map((m) => (m.id === tempId ? { ...m, isOptimistic: false } : m))
        );
        resolveOptimisticMessage(tempId, "sent");
      }, 1200);
    },
    [code, addOptimisticMessage, resolveOptimisticMessage]
  );

  if (!application) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-[16px] p-[40px] text-center">
        <p className="font-serif text-[24px] text-[var(--ink-muted)]">Application not found</p>
        <Link href="/dashboard" className="font-sans text-[13px] text-[var(--brand-ink)] hover:underline">
          ← Back to dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full">

      {/* ── Page header ── */}
      <header className="px-[24px] pt-[24px] pb-[20px] min-[980px]:px-[40px] border-b border-[var(--rule)]">
        <div className="flex items-start justify-between gap-[12px]">
          <div>
            <p className="font-mono text-[10px] tracking-[0.08em] uppercase text-[var(--ink-muted)] mb-[4px]">
              Application · {application.code}
            </p>
            <h1 className="font-serif text-[clamp(22px,2.8vw,32px)] font-normal text-[var(--ink)] leading-[1.1]">
              {application.serviceNameBase}{" "}
              <em className="italic font-normal">{application.serviceNameItalic}</em>
            </h1>
            <p className="font-serif italic text-[clamp(13px,1.4vw,15px)] text-[var(--ink-muted)] mt-[4px]">
              {application.tier} tier · submitted {application.submittedAt} · estimated completion{" "}
              <em className="not-italic font-medium text-[var(--ink)]">{application.estimatedDate}</em>.
            </p>
          </div>
          <Link
            href="/dashboard"
            className="hidden sm:inline-flex items-center px-[12px] py-[6px] rounded-[var(--r-pill)] border border-[var(--rule)] font-sans text-[12px] text-[var(--ink)] hover:bg-[var(--cream)] transition-colors focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] shrink-0 mt-[4px]"
          >
            ← Dashboard
          </Link>
        </div>
      </header>

      {/* ── Status hero (inside app-body padding, rounded) ── */}
      <div className="px-[24px] pt-[24px] min-[980px]:px-[40px]">
        <InAppStatusHero
          status={application.status}
          category={application.category}
          code={application.code}
          headline={application.headline}
          body={application.subheadline}
          updatedAt={application.updatedAt}
          ctas={
            application.status === "action-required"
              ? [
                  {
                    label: "Upload new photo ↗",
                    onClick: () =>
                      router.push(`/app/${code}?tab=documents`),
                  },
                  {
                    label: "Talk to Aline →",
                    onClick: () =>
                      router.push(`/app/${code}?tab=messages`),
                  },
                ]
              : application.status === "completed"
              ? [{ label: "Download certificate ↓", onClick: () => {} }]
              : []
          }
          className="mb-[24px]"
        />
      </div>

      {/* ── Tabs ── */}
      <DetailTabs
        tabs={tabsWithCounts}
        activeTab={tab}
        className="px-[24px] min-[980px]:px-[40px]"
      />

      {/* ── Content + sidebar ── */}
      <div className="px-[24px] min-[980px]:px-[40px] py-[28px]">
        <div className="grid grid-cols-1 min-[1080px]:grid-cols-[minmax(0,1fr)_320px] gap-[32px] items-start">

          {/* ── Main column ── */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={prefersReduced ? undefined : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={prefersReduced ? undefined : { opacity: 0 }}
                transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
              >
                {/* ── Overview: full messages + full documents ── */}
                {tab === "overview" && (
                  <>
                    <MessagesSection
                      messages={localMessages}
                      agentFirstName={agentFirstName}
                      onSend={handleSend}
                      isOffline={isOffline}
                    />
                    <DocumentsSection documents={documents} />
                  </>
                )}

                {/* ── Messages only ── */}
                {tab === "messages" && (
                  <MessagesSection
                    messages={localMessages}
                    agentFirstName={agentFirstName}
                    onSend={handleSend}
                    isOffline={isOffline}
                  />
                )}

                {/* ── Documents only ── */}
                {tab === "documents" && (
                  <DocumentsSection documents={documents} />
                )}

                {/* ── Payment ── */}
                {tab === "payment" && (
                  <div className="flex flex-col items-center gap-[16px] py-[60px] text-center">
                    <p className="font-serif italic text-[20px] text-[var(--ink-muted)]">
                      Payment portal coming soon
                    </p>
                    <p className="font-sans text-[13.5px] text-[var(--ink-muted)] max-w-[360px] leading-[1.5]">
                      Online payments will be available in the next update. Follow up via WhatsApp or in-app message.
                    </p>
                  </div>
                )}

                {/* ── History ── */}
                {tab === "history" && (
                  <section>
                    <SectionHead eyebrow="04 / Timeline" title="Application" titleItalic="history" />
                    <div className="bg-[var(--paper)] border border-[var(--rule)] rounded-[var(--r-lg)] overflow-hidden">
                      <p className="font-sans text-[13px] text-[var(--ink-muted)] px-[16px] py-[20px]">No history yet.</p>
                    </div>
                  </section>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Right sidebar (≥1080px) ── */}
          <aside
            aria-label="Application details"
            className="hidden min-[1080px]:flex flex-col"
          >
            <AgentMiniCard agent={application.agent} />

            <MetaCard
              heading="Application"
              rows={[
                { label: "Service", value: application.serviceName },
                { label: "Tier", value: application.tier },
                { label: "Submitted", value: application.submittedAt, valueClass: "font-mono" },
                { label: "Est. completion", value: application.estimatedCompletion, valueClass: "font-mono" },
                { label: "Service fee", value: formatFee(application.serviceFee), valueClass: "font-mono" },
                { label: "Gov. fee", value: formatFee(application.governmentFee), valueClass: "font-mono" },
                {
                  label: "Payment",
                  value: application.paymentStatus,
                  valueClass: application.paymentStatus === "unpaid" ? "text-[var(--warn)]" : "text-[var(--ok)]",
                },
              ]}
            />

            {/* Actions card */}
            <div className="bg-[var(--paper)] border border-[var(--rule)] rounded-[var(--r-lg)] p-[22px] mt-[16px]">
              <h4 className="font-sans font-semibold text-[11px] text-[var(--ink-muted)] tracking-[0.10em] uppercase m-0 mb-[12px]">
                Actions
              </h4>
              <div className="grid gap-[8px]">
                <a
                  href="#"
                  className="flex items-center gap-[10px] px-[14px] py-[10px] rounded-[var(--r-md)] bg-[var(--cream)] border border-[var(--rule)] font-sans text-[13px] font-medium text-[var(--ink)] no-underline hover:bg-[var(--paper-2)] transition-colors focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                    <polyline points="6 9 6 2 18 2 18 9" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><rect x="6" y="14" width="12" height="8" />
                  </svg>
                  Download summary (PDF)
                </a>
                <a
                  href="/dashboard"
                  className="flex items-center gap-[10px] px-[14px] py-[10px] rounded-[var(--r-md)] bg-[var(--cream)] border border-[var(--rule)] font-sans text-[13px] font-medium text-[var(--ink)] no-underline hover:bg-[var(--paper-2)] transition-colors focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 2" />
                  </svg>
                  Full history
                </a>
                <button
                  type="button"
                  className="flex items-center gap-[10px] px-[14px] py-[10px] rounded-[var(--r-md)] bg-transparent border border-[var(--rule)] font-sans text-[13px] font-medium text-[var(--danger)] hover:bg-[var(--danger-soft)] transition-colors focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" /><path d="m15 9-6 6M9 9l6 6" />
                  </svg>
                  Cancel application
                </button>
              </div>
            </div>

            {/* Mobile: sidebar below content (shown only on small screens via flex-col order) */}
          </aside>
        </div>

        {/* Mobile sidebar — shown below content on small screens */}
        <div className="flex flex-col gap-[16px] mt-[24px] min-[1080px]:hidden">
          <AgentMiniCard agent={application.agent} />
          <MetaCard
            heading="Application"
            rows={[
              { label: "Service", value: application.serviceName },
              { label: "Tier", value: application.tier },
              { label: "Submitted", value: application.submittedAt, valueClass: "font-mono" },
              { label: "Est. completion", value: application.estimatedCompletion, valueClass: "font-mono" },
              { label: "Service fee", value: formatFee(application.serviceFee), valueClass: "font-mono" },
              { label: "Gov. fee", value: formatFee(application.governmentFee), valueClass: "font-mono" },
              {
                label: "Payment",
                value: application.paymentStatus,
                valueClass: application.paymentStatus === "unpaid" ? "text-[var(--warn)]" : "text-[var(--ok)]",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

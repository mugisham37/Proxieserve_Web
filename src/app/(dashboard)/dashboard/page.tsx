"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Plus, Search, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  useDashboard,
  isLongAbsence,
  isAbsenceDismissed,
  dismissAbsenceBanner,
} from "@/lib/dashboard-context";
import {
  MOCK_APPLICATIONS,
  MOCK_MESSAGES,
  MOCK_HISTORY,
  MOCK_SUMMARY,
  MOCK_USER,
  getTodayLabel,
} from "@/lib/dashboard-data";
import { StatTile } from "@/components/atoms/admin/StatTile";
import { QuickActionChip } from "@/components/atoms/shared/QuickActionChip";
import { SkeletonBlock } from "@/components/atoms/shared/SkeletonBlock";
import { WelcomeBanner } from "@/components/molecules/system/WelcomeBanner";
import { ApplicationCard } from "@/components/molecules/dashboard/ApplicationCard";
import { RecentMessageRow } from "@/components/molecules/dashboard/RecentMessageRow";
import { HistoryRow } from "@/components/molecules/agent/HistoryRow";

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-[20px] px-[24px] py-[28px] min-[980px]:px-[40px]">
      <SkeletonBlock className="h-[80px] rounded-[var(--r-md)]" />
      <div className="grid grid-cols-2 min-[768px]:grid-cols-4 gap-[12px]">
        {[...Array(4)].map((_, i) => (
          <SkeletonBlock key={i} className="h-[90px] rounded-[var(--r-md)]" />
        ))}
      </div>
      <div className="grid grid-cols-1 min-[768px]:grid-cols-2 gap-[16px]">
        {[...Array(2)].map((_, i) => (
          <SkeletonBlock key={i} className="h-[200px] rounded-[var(--r-md)]" />
        ))}
      </div>
    </div>
  );
}

// ─── Section heading ──────────────────────────────────────────────────────────

function SectionHead({
  eyebrow,
  title,
  titleItalic,
  moreHref,
  moreLabel = "See all →",
}: {
  eyebrow: string;
  title: string;
  titleItalic?: string;
  moreHref?: string;
  moreLabel?: string;
}) {
  return (
    <div className="flex items-start justify-between mb-[14px]">
      <div>
        <p className="font-mono text-[11px] tracking-[0.06em] uppercase text-[var(--ink-muted)] mb-[2px]">
          {eyebrow}
        </p>
        <h2 className="font-serif text-[22px] font-normal text-[var(--ink)] leading-[1.2]">
          {title}
          {titleItalic && (
            <em className="italic font-normal"> {titleItalic}</em>
          )}
        </h2>
      </div>
      {moreHref && (
        <Link
          href={moreHref}
          className="font-sans text-[12px] text-[var(--brand-ink)] hover:text-[var(--brand)] transition-colors mt-[6px]"
        >
          {moreLabel}
        </Link>
      )}
    </div>
  );
}

// ─── List card ────────────────────────────────────────────────────────────────

function ListCardHead({
  title,
  titleItalic,
  badge,
  moreLabel = "All →",
  moreHref,
}: {
  title: string;
  titleItalic?: string;
  badge?: number;
  moreLabel?: string;
  moreHref?: string;
}) {
  return (
    <div className="flex items-center justify-between px-[16px] py-[14px] border-b border-[var(--rule)]">
      <h3 className="font-serif text-[16px] font-normal text-[var(--ink)]">
        {title}
        {titleItalic && (
          <em className="italic font-normal"> {titleItalic}</em>
        )}
        {badge !== undefined && badge > 0 && (
          <span className="ml-[8px] inline-flex items-center justify-center min-w-[18px] h-[18px] px-[4px] rounded-full bg-[var(--brand-soft)] text-[var(--brand-ink)] font-mono text-[10px] font-medium not-italic">
            {badge}
            <span className="sr-only"> unread</span>
          </span>
        )}
      </h3>
      {moreHref && (
        <Link
          href={moreHref}
          className="font-sans text-[12px] text-[var(--brand-ink)] hover:text-[var(--brand)] transition-colors"
        >
          {moreLabel}
        </Link>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const prefersReduced = useReducedMotion();
  const { isOffline, lastSeen, setUnreadCount, setActionCount } = useDashboard();

  const [isLoading, setIsLoading] = React.useState(true);
  const [showAbsence, setShowAbsence] = React.useState(false);

  React.useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  React.useEffect(() => {
    setUnreadCount(MOCK_SUMMARY.unreadCount);
    setActionCount(MOCK_SUMMARY.actionCount);
  }, [setUnreadCount, setActionCount]);

  React.useEffect(() => {
    if (isLongAbsence(lastSeen) && !isAbsenceDismissed()) {
      setShowAbsence(true);
    }
  }, [lastSeen]);

  const activeApps = MOCK_APPLICATIONS.filter(
    (a) => a.status !== "completed" && a.status !== "discontinued"
  );
  const actionApp = activeApps.find((a) => a.status === "action-required");

  const fadeUp = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0 },
  };

  if (isLoading) return <DashboardSkeleton />;

  return (
    <div className="flex flex-col">
      {/* ── Page header ── */}
      <div className="px-[24px] pt-[28px] pb-[24px] min-[980px]:px-[40px] border-b border-[var(--rule)]">
        <div className="flex items-start justify-between gap-[12px]">
          <div>
            <p className="font-mono text-[10px] tracking-[0.08em] uppercase text-[var(--ink-muted)] mb-[6px]">
              Dashboard · {getTodayLabel()}
            </p>
            <h1 className="font-serif text-[clamp(26px,3vw,36px)] font-normal text-[var(--ink)] leading-[1.1]">
              Welcome back,{" "}
              <em className="italic font-normal">{MOCK_USER.firstName}</em>.
            </h1>
            <p className="font-serif italic text-[clamp(14px,1.5vw,17px)] text-[var(--ink-muted)] mt-[6px] leading-[1.5]">
              You have{" "}
              <strong className="font-semibold not-italic text-[var(--ink)]">
                {MOCK_SUMMARY.unreadCount} unread message{MOCK_SUMMARY.unreadCount !== 1 ? "s" : ""}
              </strong>{" "}
              and{" "}
              <strong className="font-semibold not-italic text-[var(--ink)]">
                {MOCK_SUMMARY.actionCount} action waiting
              </strong>
              .{" "}
              <em className="italic">Everything else is on track.</em>
            </p>
          </div>
          <Link
            href="/services"
            className={cn(
              "hidden sm:inline-flex items-center gap-[6px] shrink-0",
              "px-[16px] py-[9px] rounded-[var(--r-pill)]",
              "bg-[var(--ink)] text-[var(--paper)]",
              "font-sans text-[13px] font-medium",
              "transition-colors duration-[var(--m-fast)] hover:bg-[var(--ink-2)]",
              "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
            )}
          >
            New application ↗
          </Link>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="px-[24px] py-[24px] min-[980px]:px-[40px] flex flex-col gap-[28px]">

        {/* Long-absence banner */}
        <WelcomeBanner
          visible={showAbsence}
          headline={<>Welcome back, <em className="italic">{MOCK_USER.firstName}.</em></>}
          body="It looks like it's been a while. Your applications are up to date — here's a quick look at what's happening."
          variant="absence"
          ctas={[
            {
              label: "Dismiss",
              onClick: () => {
                dismissAbsenceBanner();
                setShowAbsence(false);
              },
            },
          ]}
        />

        {/* Action-required welcome banner */}
        <WelcomeBanner
          visible={!!actionApp && !showAbsence}
          headline={
            <>
              {MOCK_USER.firstName} needs a{" "}
              <em className="italic">clearer photo</em> for your{" "}
              <strong className="font-semibold not-italic">passport renewal</strong>
            </>
          }
          body="Upload it from your phone — takes 30 seconds. Once we have it, we'll keep going."
          ctas={[
            {
              label: "Upload now →",
              href: actionApp ? `/app/${actionApp.code}?tab=documents` : "/dashboard",
            },
          ]}
        />

        {/* ── Stat tiles ── */}
        <motion.div
          variants={prefersReduced ? {} : { visible: { transition: { staggerChildren: 0.06 } } }}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 min-[768px]:grid-cols-4 gap-[12px]"
        >
          {[
            {
              label: "Active",
              value: MOCK_SUMMARY.activeCount,
              delta: `in progress · ${MOCK_SUMMARY.actionCount} action needed`,
              variant: "brand" as const,
            },
            {
              label: "Completed",
              value: MOCK_SUMMARY.completedCount,
              delta: "+1 this month",
              deltaColor: "brand" as const,
            },
            {
              label: "Documents",
              value: MOCK_SUMMARY.docCount,
              delta: `on file · ${MOCK_SUMMARY.docSizeMB} MB`,
            },
            {
              label: "Avg. turnaround",
              value: `${MOCK_SUMMARY.avgTurnaround}d`,
              delta: "faster than typical",
              deltaColor: "ok" as const,
            },
          ].map((tile, i) => (
            <motion.div
              key={tile.label}
              variants={prefersReduced ? {} : fadeUp}
              transition={{ duration: 0.2, delay: i * 0.05 }}
            >
              <StatTile
                label={tile.label}
                value={tile.value}
                delta={tile.delta}
                deltaColor={tile.deltaColor}
                variant={tile.variant}
                className="h-full"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* ── Quick actions ── */}
        <div className="flex flex-wrap gap-[8px]">
          <QuickActionChip
            icon={<Plus size={14} />}
            label="Apply for another service"
            href="/services"
            disabled={isOffline}
          />
          <QuickActionChip
            icon={<Search size={14} />}
            label="Track another code"
            href="/track"
          />
          <QuickActionChip
            icon={<MessageCircle size={14} />}
            label="WhatsApp support"
            href="https://wa.me/250788000000"
          />
        </div>

        {/* ── Active applications ── */}
        <section aria-labelledby="active-apps-heading">
          <SectionHead
            eyebrow="01 / Active"
            title="Your"
            titleItalic="applications"
            moreHref="/dashboard"
            moreLabel="See all →"
          />

          {activeApps.length === 0 ? (
            <div className="flex flex-col items-center gap-[20px] py-[48px] px-[24px] text-center border-2 border-dashed border-[var(--rule)] rounded-[var(--r-xl)] bg-[var(--paper)]">
              <span className="inline-flex items-center justify-center w-[56px] h-[56px] rounded-full border border-[var(--rule)] text-[var(--ink-muted)]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                  <rect x="9" y="3" width="6" height="4" rx="1" />
                </svg>
              </span>
              <div>
                <h3 className="font-serif text-[20px] font-normal text-[var(--ink)] mb-[6px]">
                  <em className="italic">No active applications</em>
                </h3>
                <p className="font-sans text-[14px] text-[var(--ink-muted)] max-w-[320px]">
                  Browse our services and submit your first application. We handle everything from start to finish.
                </p>
              </div>
              <Link
                href="/services"
                className="inline-flex items-center px-[20px] py-[10px] rounded-[var(--r-pill)] bg-[var(--ink)] text-[var(--paper)] font-sans text-[13px] font-medium hover:bg-[var(--ink-2)] transition-colors focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
              >
                Browse services
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 min-[768px]:grid-cols-2 gap-[16px]">
              {activeApps.map((app, i) => (
                <motion.div
                  key={app.code}
                  initial={prefersReduced ? undefined : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: i * 0.06, ease: [0.2, 0, 0, 1] }}
                >
                  <ApplicationCard application={app} />
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* ── Bottom two-column: messages + history ── */}
        <div className="grid grid-cols-1 min-[980px]:grid-cols-2 gap-[20px]">

          {/* Recent messages */}
          <section
            aria-labelledby="recent-msg-heading"
            className="rounded-[var(--r-md)] border border-[var(--rule)] bg-[var(--paper)] overflow-hidden"
          >
            <ListCardHead
              title="Recent"
              titleItalic="messages"
              badge={MOCK_SUMMARY.unreadCount}
              moreLabel="All →"
              moreHref="/dashboard"
            />
            <ul>
              {MOCK_MESSAGES.map((msg) => (
                <li key={msg.id}>
                  <RecentMessageRow message={msg} />
                </li>
              ))}
            </ul>
          </section>

          {/* Completed history */}
          <section
            aria-labelledby="history-heading"
            className="rounded-[var(--r-md)] border border-[var(--rule)] bg-[var(--paper)] overflow-hidden"
          >
            <ListCardHead
              title="Completed"
              moreLabel={`All ${MOCK_SUMMARY.completedCount} →`}
              moreHref="/dashboard"
            />
            <ul>
              {MOCK_HISTORY.map((entry) => (
                <li key={entry.code}>
                  <HistoryRow entry={entry} />
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

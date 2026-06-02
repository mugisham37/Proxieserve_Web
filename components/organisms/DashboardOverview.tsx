"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { WelcomeBanner } from "@/components/molecules/WelcomeBanner";
import { StatCard } from "@/components/molecules/StatCard";
import { AppCard } from "@/components/molecules/AppCard";
import { QuickActionChip } from "@/components/atoms/QuickActionChip";
import { PillButton } from "@/components/atoms/PillButton";
import { useAuth } from "@/lib/auth-context";
import {
  MOCK_DASHBOARD_APPLICATIONS,
  MOCK_STATS,
  MOCK_USER_PROFILE,
  getApplicationMessages,
} from "@/lib/dashboard-data";

// Stagger animation helpers
const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show:  { opacity: 1, y: 0, transition: { duration: 0.28 } },
};

const statVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show:  { opacity: 1, scale: 1, transition: { duration: 0.24 } },
};

// Quick action icon wrappers
function NewAppIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}
function UploadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M7 9V2M4 5l3-3 3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 11h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  );
}
function MessageIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M1 3a1 1 0 011-1h10a1 1 0 011 1v7a1 1 0 01-1 1H3l-2 2V3z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
    </svg>
  );
}
function TrackIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.3"/>
      <circle cx="7" cy="7" r="2" fill="currentColor"/>
    </svg>
  );
}

interface DashboardOverviewProps {
  userName?: string;
  isReturning?: boolean;
}

export function DashboardOverview({
  userName = MOCK_USER_PROFILE.name,
  isReturning = MOCK_USER_PROFILE.isReturning,
}: DashboardOverviewProps) {
  const router = useRouter();
  const { session } = useAuth();
  const resolvedUserName = session?.name ?? userName;
  const firstName = resolvedUserName.split(" ")[0];
  const apps = MOCK_DASHBOARD_APPLICATIONS.slice(0, 6);
  const stats = MOCK_STATS;

  // Recent messages: last message per app that has messages
  const recentMessages = MOCK_DASHBOARD_APPLICATIONS
    .map((app) => {
      const msgs = getApplicationMessages(app.code);
      if (!msgs.length) return null;
      const last = msgs[msgs.length - 1];
      return { app, message: last };
    })
    .filter(Boolean)
    .slice(0, 3) as Array<{ app: typeof MOCK_DASHBOARD_APPLICATIONS[0]; message: { body: string; sentAt: string; sender: string } }>;

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "short", month: "long", day: "numeric", year: "numeric",
  });

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="max-w-[1200px]"
    >
      {/* Page header */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-start justify-between gap-4 mb-2">
          <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--ink-muted)]">
            Dashboard · {today}
          </p>
          <Link href="/services">
            <PillButton size="sm" variant="default">
              + New application
            </PillButton>
          </Link>
        </div>
        <h1 className="font-serif font-medium text-[clamp(32px,4.4vw,48px)] text-[var(--ink)] m-0 leading-[1.1]">
          Good morning, <em>{firstName}</em>.
        </h1>
        <p className="font-sans text-[15px] text-[var(--ink-muted)] mt-2">
          Here&apos;s what&apos;s happening with your applications.
        </p>
      </motion.div>

      {/* Welcome banner (returning users only) */}
      {isReturning && (
        <motion.div variants={itemVariants} className="mb-8">
          <WelcomeBanner name={resolvedUserName} isReturning={true} />
        </motion.div>
      )}

      {/* Stats grid */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8"
      >
        <motion.div variants={statVariants}>
          <StatCard
            label="Active"
            value={stats.active}
            delta={`${stats.active} in progress`}
            deltaVariant="ok"
          />
        </motion.div>
        <motion.div variants={statVariants}>
          <StatCard
            label="Completed"
            value={stats.completed}
            delta="All time"
            deltaVariant="neutral"
          />
        </motion.div>
        <motion.div variants={statVariants}>
          <StatCard
            label="Documents"
            value={stats.documents}
            delta="Across all apps"
            deltaVariant="neutral"
          />
        </motion.div>
        <motion.div variants={statVariants}>
          <StatCard
            label="Avg. turnaround"
            value={`${stats.avgTurnaroundDays}d`}
            delta="Industry avg 28d"
            deltaVariant="ok"
            variant="brand"
          />
        </motion.div>
      </motion.div>

      {/* Quick actions */}
      <motion.div variants={itemVariants} className="mb-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--ink-muted)] mb-3">
          Quick actions
        </p>
        <div className="flex flex-wrap gap-2">
          <QuickActionChip icon={<NewAppIcon />} label="New application" onClick={() => router.push("/services")} />
          <QuickActionChip icon={<UploadIcon />} label="Upload document" onClick={() => router.push("/dashboard/documents")} />
          <QuickActionChip icon={<MessageIcon />} label="Message agent" onClick={() => router.push("/dashboard/messages")} />
          <QuickActionChip icon={<TrackIcon />} label="Track application" onClick={() => router.push("/track")} />
        </div>
      </motion.div>

      {/* Applications section */}
      <motion.section variants={itemVariants} className="mb-10" aria-labelledby="overview-apps-heading">
        <div className="flex items-center justify-between gap-4 mb-4">
          <h2 id="overview-apps-heading" className="font-serif text-[20px] font-medium text-[var(--ink)] m-0">
            Your applications
          </h2>
          <Link
            href="/dashboard/applications"
            className="font-sans text-[13px] text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors duration-[var(--m-fast)]"
          >
            View all →
          </Link>
        </div>

        {apps.length === 0 ? (
          <EmptyApplicationsState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {apps.map((app) => (
              <AppCard key={app.code} app={app} />
            ))}
          </div>
        )}
      </motion.section>

      {/* Recent messages section */}
      {recentMessages.length > 0 && (
        <motion.section variants={itemVariants} aria-labelledby="overview-messages-heading">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h2 id="overview-messages-heading" className="font-serif text-[20px] font-medium text-[var(--ink)] m-0">
              Recent messages
            </h2>
            <Link
              href="/dashboard/messages"
              className="font-sans text-[13px] text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors duration-[var(--m-fast)]"
            >
              View all →
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            {recentMessages.map(({ app, message }) => (
              <Link
                key={app.code}
                href={`/dashboard/applications/${app.code}?tab=messages`}
                className={cn(
                  "flex items-start gap-3 bg-[var(--paper)] border border-[var(--rule)] rounded-[var(--r-md)] p-4",
                  "transition-[box-shadow] duration-[var(--m-fast)] hover:[box-shadow:var(--sh-subtle)]",
                  "focus-visible:outline-none focus-visible:[box-shadow:var(--focus-ring)]"
                )}
              >
                {/* App badge */}
                <div className="flex items-center justify-center w-8 h-8 shrink-0 rounded-full bg-[var(--cream-2)] font-mono text-[10px] font-bold text-[var(--ink-muted)]">
                  {app.unreadMessages > 0 && (
                    <span className="sr-only">{app.unreadMessages} unread</span>
                  )}
                  {app.code.split("-").pop()}
                </div>
                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2 mb-[2px]">
                    <p className="font-sans text-[13px] font-semibold text-[var(--ink)] truncate m-0">
                      {app.serviceName}
                    </p>
                    <time
                      dateTime={message.sentAt}
                      className="font-mono text-[11px] text-[var(--ink-muted)] shrink-0"
                    >
                      {new Date(message.sentAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </time>
                  </div>
                  <p className="font-sans text-[12.5px] text-[var(--ink-muted)] truncate m-0">
                    {message.sender === "agent" ? "Agent: " : ""}{message.body}
                  </p>
                </div>
                {/* Unread dot */}
                {app.unreadMessages > 0 && (
                  <span
                    className="w-2 h-2 rounded-full bg-[var(--brand)] shrink-0 mt-[6px]"
                    aria-hidden="true"
                  />
                )}
              </Link>
            ))}
          </div>
        </motion.section>
      )}
    </motion.div>
  );
}

function EmptyApplicationsState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 bg-[var(--paper)] border border-[var(--rule)] border-dashed rounded-[var(--r-lg)] text-center">
      <div className="w-12 h-12 rounded-full bg-[var(--cream-2)] flex items-center justify-center mb-4" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="3" y="4" width="14" height="12" rx="2" stroke="var(--ink-muted)" strokeWidth="1.5"/>
          <path d="M7 9h6M7 12h4" stroke="var(--ink-muted)" strokeWidth="1.3" strokeLinecap="round"/>
        </svg>
      </div>
      <h3 className="font-serif text-[18px] text-[var(--ink)] mb-2">No applications yet</h3>
      <p className="font-sans text-[13px] text-[var(--ink-muted)] max-w-[280px] mb-5">
        Start your first application and we&apos;ll handle the paperwork for you.
      </p>
      <Link href="/services">
        <PillButton variant="solid">Browse services</PillButton>
      </Link>
    </div>
  );
}

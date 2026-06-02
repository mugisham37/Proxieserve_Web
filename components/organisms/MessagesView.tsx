"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { MessageThread } from "@/components/molecules/MessageThread";
import { DashBadge } from "@/components/atoms/DashBadge";
import { MOCK_DASHBOARD_APPLICATIONS, getApplicationMessages } from "@/lib/dashboard-data";

export function MessagesView() {
  const [selectedCode, setSelectedCode] = React.useState<string | null>(
    MOCK_DASHBOARD_APPLICATIONS[0]?.code ?? null
  );
  const [showThread, setShowThread] = React.useState(false); // mobile: full-screen thread

  const selectedApp = MOCK_DASHBOARD_APPLICATIONS.find((a) => a.code === selectedCode) ?? null;
  const selectedMessages = selectedCode ? getApplicationMessages(selectedCode) : [];

  function selectApp(code: string) {
    setSelectedCode(code);
    setShowThread(true);
  }

  return (
    <div className="max-w-[1100px]">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="font-serif font-medium text-[clamp(28px,4vw,40px)] text-[var(--ink)] m-0 leading-[1.1]">
          Messages
        </h1>
        <p className="font-sans text-[13.5px] text-[var(--ink-muted)] mt-1">
          All conversations with your agents across applications.
        </p>
      </div>

      {/* Split layout */}
      <div className="bg-[var(--paper)] border border-[var(--rule)] rounded-[var(--r-lg)] overflow-hidden">
        <div className="flex h-[calc(100vh-280px)] min-h-[500px]">
          {/* ----------------------------------------------------------------
              Application list panel
              — hidden on mobile when a thread is open
          ---------------------------------------------------------------- */}
          <div
            className={cn(
              "w-full lg:w-[300px] lg:border-r lg:border-[var(--rule)] flex-shrink-0 overflow-y-auto",
              showThread ? "hidden lg:flex lg:flex-col" : "flex flex-col"
            )}
            aria-label="Application conversations"
          >
            {MOCK_DASHBOARD_APPLICATIONS.map((app) => {
              const msgs = getApplicationMessages(app.code);
              const lastMsg = msgs[msgs.length - 1];
              const isSelected = selectedCode === app.code;

              return (
                <button
                  key={app.code}
                  type="button"
                  onClick={() => selectApp(app.code)}
                  className={cn(
                    "w-full text-left flex items-start gap-3 px-4 py-4",
                    "border-b border-[var(--rule-soft)] last:border-b-0",
                    "transition-colors duration-[var(--m-fast)]",
                    "focus-visible:outline-none focus-visible:[box-shadow:var(--focus-ring-inset,inset_0_0_0_2px_var(--focus))]",
                    isSelected
                      ? "bg-[var(--cream-2)]"
                      : "hover:bg-[var(--cream)]"
                  )}
                  aria-current={isSelected ? "true" : undefined}
                >
                  {/* App avatar */}
                  <div className="flex items-center justify-center w-9 h-9 shrink-0 rounded-full bg-[var(--cream)] font-mono text-[10px] font-bold text-[var(--ink-muted)] border border-[var(--rule)]">
                    {app.code.split("-").pop()}
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1 mb-[2px]">
                      <p className="font-sans text-[13px] font-semibold text-[var(--ink)] truncate m-0">
                        {app.serviceName}
                      </p>
                      {lastMsg && (
                        <time
                          dateTime={lastMsg.sentAt}
                          className="font-mono text-[10px] text-[var(--ink-muted)] shrink-0"
                        >
                          {new Date(lastMsg.sentAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </time>
                      )}
                    </div>
                    <p className="font-sans text-[12px] text-[var(--ink-muted)] truncate m-0">
                      {lastMsg ? lastMsg.body : "No messages yet"}
                    </p>
                  </div>

                  {/* Unread badge */}
                  {app.unreadMessages > 0 && (
                    <DashBadge
                      count={app.unreadMessages}
                      variant="brand"
                      aria-label={`${app.unreadMessages} unread`}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* ----------------------------------------------------------------
              Thread panel
              — full screen on mobile, right column on desktop
          ---------------------------------------------------------------- */}
          <div
            className={cn(
              "flex-1 min-w-0 flex flex-col",
              !showThread && "hidden lg:flex"
            )}
          >
            {selectedApp ? (
              <>
                {/* Thread header */}
                <div className="flex items-center gap-3 px-5 py-3 border-b border-[var(--rule)] bg-[var(--paper)]">
                  {/* Mobile back button */}
                  <button
                    type="button"
                    onClick={() => setShowThread(false)}
                    className="lg:hidden flex items-center justify-center w-8 h-8 rounded-full hover:bg-[var(--cream)] transition-colors duration-[var(--m-fast)] focus-visible:outline-none focus-visible:[box-shadow:var(--focus-ring)]"
                    aria-label="Back to conversations"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <div className="min-w-0">
                    <p className="font-sans text-[14px] font-semibold text-[var(--ink)] m-0 truncate">
                      {selectedApp.serviceName}
                    </p>
                    <p className="font-mono text-[10px] text-[var(--ink-muted)] m-0">
                      {selectedApp.code}
                    </p>
                  </div>
                  <Link
                    href={`/dashboard/applications/${selectedApp.code}?tab=messages`}
                    className="ml-auto font-sans text-[12px] text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors duration-[var(--m-fast)] shrink-0"
                  >
                    View app →
                  </Link>
                </div>

                {/* Thread body */}
                <div className="flex-1 overflow-y-auto px-5 py-4">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedCode}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.14 }}
                    >
                      <MessageThread
                        messages={selectedMessages}
                        applicationCode={selectedApp.code}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <p className="font-sans text-[13.5px] text-[var(--ink-muted)]">
                  Select a conversation to view messages.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

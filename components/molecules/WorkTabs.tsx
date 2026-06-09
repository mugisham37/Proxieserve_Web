"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export type WorkTabKey = "checklist" | "conversation" | "documents" | "details" | "history";

interface Tab {
  key: WorkTabKey;
  label: string;
}

const TABS: Tab[] = [
  { key: "checklist", label: "Checklist" },
  { key: "conversation", label: "Conversation" },
  { key: "documents", label: "Documents" },
  { key: "details", label: "Details" },
  { key: "history", label: "History" },
];

interface WorkTabsProps {
  activeTab: WorkTabKey;
  onTabChange: (tab: WorkTabKey) => void;
  panels: Partial<Record<WorkTabKey, React.ReactNode>>;
}

export function WorkTabs({ activeTab, onTabChange, panels }: WorkTabsProps) {
  const prefersReduced = useReducedMotion();

  return (
    <div>
      {/* Tab bar */}
      <div
        role="tablist"
        aria-label="Case work tabs"
        className={cn(
          "flex items-center gap-[0]",
          "border-b border-[var(--rule)]",
          "overflow-x-auto"
        )}
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              role="tab"
              id={`tab-${tab.key}`}
              aria-selected={isActive}
              aria-controls={`panel-${tab.key}`}
              type="button"
              onClick={() => onTabChange(tab.key)}
              className={cn(
                "relative px-[16px] h-[44px] shrink-0",
                "font-sans text-[13px] font-medium",
                "transition-colors duration-[var(--m-fast)]",
                "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]",
                isActive
                  ? "text-[var(--ink)]"
                  : "text-[var(--ink-muted)] hover:text-[var(--ink)]"
              )}
            >
              {tab.label}
              {isActive && (
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--brand)] rounded-t-full"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Active panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          role="tabpanel"
          id={`panel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
          initial={prefersReduced ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={prefersReduced ? {} : { opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
        >
          {panels[activeTab]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface DetailTab {
  id: string;
  label: string;
  count?: number;
}

interface DetailTabsProps {
  tabs: DetailTab[];
  activeTab: string;
  onTabChange?: (tabId: string) => void;
  useQueryParam?: boolean;
  className?: string;
}

export function DetailTabs({
  tabs,
  activeTab,
  onTabChange,
  useQueryParam = true,
  className,
}: DetailTabsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const prefersReduced = useReducedMotion();

  const handleTabClick = (tabId: string) => {
    if (onTabChange) {
      onTabChange(tabId);
    }
    if (useQueryParam) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("tab", tabId);
      router.push(`?${params.toString()}`, { scroll: false });
    }
  };

  const tablistId = React.useId();

  return (
    <div
      className={cn(
        "border-b border-[var(--rule)]",
        "overflow-x-auto",
        "[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]",
        className
      )}
    >
      <div
        role="tablist"
        aria-label="Application detail tabs"
        className="flex min-w-max"
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          const tabId = `${tablistId}-tab-${tab.id}`;

          return (
            <button
              key={tab.id}
              id={tabId}
              role="tab"
              aria-selected={isActive}
              aria-controls={`${tablistId}-panel-${tab.id}`}
              type="button"
              onClick={() => handleTabClick(tab.id)}
              className={cn(
                "relative flex items-center gap-[6px] px-[16px] py-[12px]",
                "font-serif text-[14px] italic",
                "transition-colors duration-[var(--m-fast)]",
                "focus-visible:outline-none focus-visible:bg-[var(--cream)]",
                "whitespace-nowrap",
                isActive
                  ? "text-[var(--ink)]"
                  : "text-[var(--ink-muted)] hover:text-[var(--ink)]"
              )}
            >
              {tab.label}
              {tab.count !== undefined && tab.count > 0 && (
                <span
                  className={cn(
                    "inline-flex items-center justify-center min-w-[18px] h-[16px] px-[4px]",
                    "rounded-[var(--r-sm)] font-mono text-[9px] font-medium not-italic",
                    isActive
                      ? "bg-[var(--ink)] text-[var(--paper)]"
                      : "bg-[var(--cream-2)] text-[var(--ink-muted)]"
                  )}
                  aria-label={`${tab.count} items`}
                >
                  {tab.count}
                </span>
              )}

              {/* Active underline indicator */}
              {isActive && (
                <motion.div
                  layoutId={`${tablistId}-underline`}
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--ink)]"
                  transition={
                    prefersReduced
                      ? { duration: 0 }
                      : { duration: 0.2, ease: [0.2, 0, 0, 1] }
                  }
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface DetailTabPanelProps {
  tabId: string;
  activeTab: string;
  tablistId: string;
  children: React.ReactNode;
  className?: string;
}

export function DetailTabPanel({
  tabId,
  activeTab,
  tablistId,
  children,
  className,
}: DetailTabPanelProps) {
  if (tabId !== activeTab) return null;

  return (
    <div
      role="tabpanel"
      id={`${tablistId}-panel-${tabId}`}
      aria-labelledby={`${tablistId}-tab-${tabId}`}
      className={cn("outline-none", className)}
      tabIndex={0}
    >
      {children}
    </div>
  );
}

"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "requirements", label: "Requirements" },
  { id: "how-it-works", label: "How it works" },
  { id: "pricing", label: "Pricing" },
  { id: "faqs", label: "FAQs" },
  { id: "related", label: "Related" },
] as const;

interface ServiceSubNavProps {
  className?: string;
}

export function ServiceSubNav({ className }: ServiceSubNavProps) {
  const [activeTab, setActiveTab] = React.useState<string>("overview");

  React.useEffect(() => {
    const sectionIds = TABS.map((t) => t.id);
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveTab(id);
        },
        { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  function handleTabClick(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveTab(id);
  }

  return (
    <nav
      aria-label="Service sections"
      className={cn(
        "sticky top-14 z-40 bg-[rgba(251,246,232,0.92)] backdrop-blur-[8px] border-b border-[var(--rule)]",
        className
      )}
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div
          role="tablist"
          className="flex items-center gap-0 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {TABS.map(({ id, label }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                role="tab"
                type="button"
                aria-selected={isActive}
                onClick={() => handleTabClick(id)}
                className={cn(
                  "relative shrink-0 font-sans text-[13px] px-4 py-4 transition-colors duration-[var(--m-fast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] rounded-sm",
                  isActive ? "text-[var(--ink)]" : "text-[var(--ink-muted)] hover:text-[var(--ink)]"
                )}
              >
                {label}
                {isActive && (
                  <motion.div
                    layoutId="subnav-indicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--ink)]"
                    transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

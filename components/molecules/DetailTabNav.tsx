"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export type DetailTab = "overview" | "timeline" | "documents" | "messages" | "payment";

interface TabCounts {
  timeline: number;
  documents: number;
  messages: number;
  payment: number;
}

interface DetailTabNavProps {
  applicationCode: string;
  counts: TabCounts;
}

const TABS: { id: DetailTab; label: string }[] = [
  { id: "overview",   label: "Overview"   },
  { id: "timeline",   label: "Timeline"   },
  { id: "documents",  label: "Documents"  },
  { id: "messages",   label: "Messages"   },
  { id: "payment",    label: "Payment"    },
];

export function DetailTabNav({ applicationCode, counts }: DetailTabNavProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = (searchParams.get("tab") as DetailTab) ?? "overview";

  function navigate(tab: DetailTab) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    router.push(`/dashboard/applications/${applicationCode}?${params.toString()}`);
  }

  const countFor = (id: DetailTab): number | undefined => {
    if (id === "overview") return undefined;
    return counts[id as keyof TabCounts];
  };

  return (
    <nav
      aria-label="Application detail tabs"
      className="flex gap-1 border-b border-[var(--rule)] mb-8 overflow-x-auto [scrollbar-width:none] [-webkit-overflow-scrolling:touch]"
    >
      {TABS.map(({ id, label }) => {
        const isActive = id === activeTab;
        const count = countFor(id);

        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => navigate(id)}
            className={cn(
              "flex items-center gap-2 shrink-0",
              "px-[18px] py-3",
              "font-serif italic text-[15px] font-bold leading-none",
              "border-b-2 -mb-px",
              "transition-colors duration-[var(--m-fast)]",
              "focus-visible:outline-none focus-visible:[box-shadow:var(--focus-ring)]",
              isActive
                ? "text-[var(--ink)] border-[var(--ink)]"
                : "text-[var(--ink-muted)] border-transparent hover:text-[var(--ink)]"
            )}
          >
            {label}
            {count !== undefined && count > 0 && (
              <span
                className={cn(
                  "inline-flex items-center justify-center min-w-[18px] h-[18px] px-[5px]",
                  "font-mono text-[10px] font-semibold leading-none rounded-[999px]",
                  isActive
                    ? "bg-[var(--ink)] text-[var(--paper)]"
                    : "bg-[var(--cream-2)] text-[var(--ink-muted)]"
                )}
                aria-label={`${count} ${label.toLowerCase()}`}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}

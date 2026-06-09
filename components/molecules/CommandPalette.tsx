"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAgentState, useAgentDispatch } from "@/lib/agent-context";

interface PaletteResult {
  id: string;
  label: string;
  sublabel?: string;
  action: () => void;
}

function buildResults(
  query: string,
  cases: ReturnType<typeof useAgentState>["cases"],
  router: ReturnType<typeof useRouter>,
  dispatch: ReturnType<typeof useAgentDispatch>
): PaletteResult[] {
  const q = query.toLowerCase().trim();

  const caseResults: PaletteResult[] = cases
    .filter(
      (c) =>
        !q ||
        c.code.toLowerCase().includes(q) ||
        c.serviceName.toLowerCase().includes(q) ||
        c.clientName.toLowerCase().includes(q)
    )
    .slice(0, 5)
    .map((c) => ({
      id: `case-${c.code}`,
      label: `${c.code} · ${c.serviceName}`,
      sublabel: c.clientName,
      action: () => {
        dispatch({ type: "CLOSE_PALETTE" });
        router.push(`/agent/case/${c.code}`);
      },
    }));

  const actionResults: PaletteResult[] = [
    {
      id: "action-away",
      label: "Set me to Away",
      sublabel: "Change availability",
      action: () => {
        dispatch({ type: "SET_AVAILABILITY", payload: "away" });
        dispatch({ type: "CLOSE_PALETTE" });
      },
    },
    {
      id: "action-available",
      label: "Set me to Available",
      sublabel: "Change availability",
      action: () => {
        dispatch({ type: "SET_AVAILABILITY", payload: "available" });
        dispatch({ type: "CLOSE_PALETTE" });
      },
    },
  ].filter((a) =>
    !q ||
    a.label.toLowerCase().includes(q) ||
    (a.sublabel?.toLowerCase().includes(q) ?? false)
  );

  return [...caseResults, ...actionResults].slice(0, 8);
}

export function CommandPalette() {
  const prefersReduced = useReducedMotion();
  const router = useRouter();
  const { cases } = useAgentState();
  const dispatch = useAgentDispatch();

  const [query, setQuery] = React.useState("");
  const [activeIndex, setActiveIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const listRef = React.useRef<HTMLUListElement>(null);

  const results = React.useMemo(
    () => buildResults(query, cases, router, dispatch),
    [query, cases, router, dispatch]
  );

  // Focus input on mount
  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Reset index when results change
  React.useEffect(() => {
    setActiveIndex(0);
  }, [results.length]);

  const close = () => dispatch({ type: "CLOSE_PALETTE" });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "Escape":
        close();
        break;
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, results.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
        break;
      case "Enter":
        e.preventDefault();
        results[activeIndex]?.action();
        break;
    }
  };

  return (
    <motion.div
      initial={prefersReduced ? {} : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-[20px]"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      onKeyDown={handleKeyDown}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[var(--ink)]/40"
        aria-hidden="true"
        onClick={close}
      />

      {/* Palette */}
      <motion.div
        initial={prefersReduced ? {} : { scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.12, ease: [0.2, 0, 0, 1] }}
        className={cn(
          "relative z-10 w-full max-w-[540px]",
          "bg-[var(--paper)] rounded-[var(--r-lg)]",
          "border border-[var(--rule)] shadow-[var(--sh-overlay)]",
          "overflow-hidden"
        )}
      >
        {/* Search input */}
        <div className="flex items-center gap-[10px] px-[16px] border-b border-[var(--rule)]">
          <Search size={16} className="text-[var(--ink-muted)] shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search cases, codes, clients, actions…"
            aria-label="Search command palette"
            aria-autocomplete="list"
            aria-controls="palette-results"
            aria-activedescendant={
              results[activeIndex] ? `palette-item-${results[activeIndex].id}` : undefined
            }
            className={cn(
              "flex-1 h-[48px]",
              "bg-transparent border-none outline-none",
              "font-mono text-[14px] text-[var(--ink)]",
              "placeholder:text-[var(--ink-subtle)]"
            )}
          />
        </div>

        {/* Results */}
        {results.length > 0 ? (
          <ul
            id="palette-results"
            ref={listRef}
            role="listbox"
            aria-label="Palette results"
            className="py-[6px] max-h-[360px] overflow-y-auto"
          >
            {results.map((result, idx) => (
              <li
                key={result.id}
                id={`palette-item-${result.id}`}
                role="option"
                aria-selected={idx === activeIndex}
                onClick={result.action}
                onMouseEnter={() => setActiveIndex(idx)}
                className={cn(
                  "flex items-center justify-between gap-[12px]",
                  "px-[16px] py-[10px] cursor-pointer",
                  "transition-colors duration-[var(--m-fast)]",
                  idx === activeIndex
                    ? "bg-[var(--brand-soft)]"
                    : "hover:bg-[var(--cream)]"
                )}
              >
                <div className="flex-1 min-w-0">
                  <p className="font-sans text-[13px] font-medium text-[var(--ink)] truncate">
                    {result.label}
                  </p>
                  {result.sublabel && (
                    <p className="font-sans text-[12px] text-[var(--ink-muted)] truncate">
                      {result.sublabel}
                    </p>
                  )}
                </div>
                {idx === activeIndex && (
                  <kbd className="shrink-0 inline-flex items-center justify-center px-[5px] h-[18px] font-mono text-[10px] bg-[var(--paper-2)] border border-[var(--rule)] rounded-[4px] text-[var(--ink-muted)]">
                    ↵
                  </kbd>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div className="px-[16px] py-[24px] text-center">
            <p className="font-sans text-[13px] text-[var(--ink-subtle)]">
              No results for &ldquo;{query}&rdquo;
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

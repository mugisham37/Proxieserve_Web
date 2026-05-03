"use client";

import { useState } from "react";
import type { FAQItem } from "@/types";

interface FAQAccordionProps {
  items: FAQItem[];
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="max-w-[720px] mx-auto w-full">
      {items.map((item, i) => {
        const isOpen = openIdx === i;
        return (
          <div
            key={i}
            className={`border-b ${isOpen ? "faq-item-open border-warning" : "border-border"} relative`}
          >
            <button
              className="w-full flex items-center gap-3 py-[18px] bg-transparent border-none cursor-pointer font-sans text-left text-[var(--text)] focus-visible:outline-2 focus-visible:outline-[var(--brand)] focus-visible:outline-offset-2 focus-visible:rounded"
              onClick={() => setOpenIdx(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span className="font-mono text-[13px] text-text-subtle shrink-0 w-7">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 text-[16px] font-medium text-text">
                {item.q}
              </span>
              <svg
                width="20" height="20" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round"
                className="text-text-subtle shrink-0 transition-transform duration-200"
                style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                aria-hidden="true"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {isOpen && (
              <div className="pb-[18px] pl-10 pr-0">
                <p className="text-[14px] text-text-muted leading-[1.7]">{item.a}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

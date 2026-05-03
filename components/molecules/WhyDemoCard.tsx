"use client";

import { useState } from "react";
import { MkIcon } from "@/components/atoms/MkIcon";

export function WhyDemoCard() {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-bg border border-border rounded-lg p-6 max-w-[380px] w-full relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-[12px] text-text-subtle">Total Spend · Today</span>
        <button
          onClick={() => setOpen((o) => !o)}
          className="text-[12px] font-medium text-brand bg-transparent border-none cursor-pointer px-2 py-0.5 rounded hover:bg-brand-soft transition-colors font-sans"
        >
          Why?
        </button>
      </div>

      {/* Value */}
      <div className="font-mono text-[32px] font-semibold text-text [font-feature-settings:'tnum']">
        US$ 4,231<span className="text-text-muted text-[22px]">.45</span>
      </div>
      <div className="text-[13px] text-text-subtle mt-1">
        of US$ 10,000 cap ·{" "}
        <span className="text-success">Inside cap</span>
      </div>

      {/* Inline popover — expands below value when open */}
      {open && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-[13px] text-text">Why this spend level?</span>
            <button
              onClick={() => setOpen(false)}
              className="bg-transparent border-none text-text-subtle cursor-pointer flex"
            >
              <MkIcon name="x" size={16} />
            </button>
          </div>
          <p className="text-[14px] font-medium text-text mb-2">
            Increased Instagram Reels budget by 15%
          </p>
          <ul className="list-none p-0 m-0 mb-2">
            {[
              "CPA tracking 18% under target (US$ 8.45 vs US$ 12.00)",
              "Reels CTR 3.2% — 1.8× above Feed average",
              "ROAS 3.8x — highest across all active ad sets",
            ].map((item) => (
              <li
                key={item}
                className="text-[13px] text-text-muted pl-3.5 py-0.5 relative before:content-['·'] before:absolute before:left-0.5 before:font-bold before:text-text-subtle"
              >
                {item}
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2 pt-2 border-t border-border text-[12px]">
            <span className="text-brand font-medium">Real-time Optimizer</span>
            <code className="font-mono text-[11px] text-text-subtle">run_7f3a…e91c</code>
          </div>
        </div>
      )}
    </div>
  );
}

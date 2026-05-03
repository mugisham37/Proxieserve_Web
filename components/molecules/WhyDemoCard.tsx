"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function WhyDemoCard() {
  return (
    <div className="bg-bg border border-border rounded-[14px] p-6 max-w-[380px] w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-[12px] text-text-subtle">Total Spend · Today</span>
        <Popover>
          <PopoverTrigger
            className="text-[12px] font-medium text-brand bg-transparent border-none cursor-pointer px-2 py-0.5 rounded hover:bg-brand-soft transition-colors"
            aria-label="Why was this amount spent?"
          >
            Why?
          </PopoverTrigger>
          <PopoverContent
            side="top"
            className="w-80 bg-surface border border-border text-text p-4 rounded-[14px] shadow-lg"
          >
            <p className="text-[13px] font-semibold text-text mb-1">
              Why US$ 4,231.45?
            </p>
            <ul className="text-[12px] text-text-muted space-y-1 mb-3 list-none p-0">
              <li className="pl-3 relative before:content-['·'] before:absolute before:left-0 before:text-text-subtle before:font-bold">
                Audience #3 (Lagos, F 25–34) hit 4.2× ROAS threshold
              </li>
              <li className="pl-3 relative before:content-['·'] before:absolute before:left-0 before:text-text-subtle before:font-bold">
                Shifted $800 from paused Meta carousel to WhatsApp DM
              </li>
              <li className="pl-3 relative before:content-['·'] before:absolute before:left-0 before:text-text-subtle before:font-bold">
                Still $5,768.55 inside daily cap
              </li>
            </ul>
            <p className="text-[11px] text-text-subtle border-t border-border pt-2">
              Decided by Optimiser Agent · GPT-4o · 2 min ago
            </p>
          </PopoverContent>
        </Popover>
      </div>

      {/* Value */}
      <div className="font-mono text-[32px] font-semibold text-text [font-feature-settings:'tnum']">
        US$ 4,231
        <span className="text-text-muted text-[22px]">.45</span>
      </div>
      <div className="text-[13px] text-text-subtle mt-1">
        of US$ 10,000 cap ·{" "}
        <span className="text-success">Inside cap</span>
      </div>

      {/* Breakdown */}
      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-[12px] text-text-subtle mb-2">Allocated today</p>
        <ul className="text-[13px] text-text-muted space-y-1 list-none p-0">
          <li className="pl-3 relative before:content-['·'] before:absolute before:left-0 before:text-text-subtle before:font-bold">
            Meta Ads — US$ 2,400
          </li>
          <li className="pl-3 relative before:content-['·'] before:absolute before:left-0 before:text-text-subtle before:font-bold">
            Google Ads — US$ 1,400
          </li>
          <li className="pl-3 relative before:content-['·'] before:absolute before:left-0 before:text-text-subtle before:font-bold">
            WhatsApp DM — US$ 431.45
          </li>
        </ul>
      </div>
    </div>
  );
}

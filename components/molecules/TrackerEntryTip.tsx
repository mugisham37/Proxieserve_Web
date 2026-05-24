import * as React from "react";

interface TrackerEntryTipProps {
  num: number;
  title: React.ReactNode;
  body: string;
}

export function TrackerEntryTip({ num, title, body }: TrackerEntryTipProps) {
  return (
    <article className="border border-[var(--rule)] rounded-[var(--r-md)] px-[18px] py-4 grid grid-cols-[28px_1fr] gap-3 items-start">
      {/* Numbered circle */}
      <span
        className="w-6 h-6 rounded-full bg-[var(--brand-soft)] text-[var(--brand-ink)] inline-flex items-center justify-center font-serif italic text-[12px] font-semibold shrink-0 mt-[1px]"
        aria-hidden="true"
      >
        {num}
      </span>

      <div>
        <h4 className="font-serif font-medium text-[14.5px] text-[var(--ink)] m-0 mb-1 leading-snug">
          {title}
        </h4>
        <p className="font-sans text-[12.5px] text-[var(--ink-muted)] leading-[1.5] m-0">
          {body}
        </p>
      </div>
    </article>
  );
}

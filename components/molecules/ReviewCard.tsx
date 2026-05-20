import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ReviewCardProps {
  title: string;
  editHref: string;
  children: React.ReactNode;
  className?: string;
}

export function ReviewCard({ title, editHref, children, className }: ReviewCardProps) {
  return (
    <div className={cn("bg-[var(--paper)] border border-[var(--rule)] rounded-[var(--r-lg)] overflow-hidden", className)}>
      <div className="flex items-center justify-between gap-4 px-5 py-3.5 border-b border-[var(--rule-soft)]">
        <h3 className="font-sans text-[14px] font-semibold text-[var(--ink)]">{title}</h3>
        <Link
          href={editHref}
          className="font-sans text-[12px] text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors shrink-0"
        >
          Edit →
        </Link>
      </div>
      <div className="px-5 py-4 flex flex-col divide-y divide-[var(--rule-soft)]">
        {children}
      </div>
    </div>
  );
}

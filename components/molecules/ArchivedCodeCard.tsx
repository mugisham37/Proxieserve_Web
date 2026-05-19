import * as React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ArchivedCodeCardProps extends React.HTMLAttributes<HTMLDivElement> {
  code?: string;
}

export function ArchivedCodeCard({ code, className, ...props }: ArchivedCodeCardProps) {
  return (
    <div
      className={cn(
        "bg-[var(--warn-soft)] border border-[var(--warn)] rounded-[var(--r-xl)] p-6 flex flex-col gap-3",
        className
      )}
      role="alert"
      {...props}
    >
      <div className="flex items-center gap-2">
        <span className="text-[var(--warn)] text-[20px]" aria-hidden="true">⌛</span>
        <p className="eyebrow text-[var(--warn)]">Archived Application</p>
      </div>
      {code && (
        <p className="font-mono text-[16px] text-[var(--ink)] font-semibold tracking-wide">{code}</p>
      )}
      <p className="font-sans text-[14px] text-[var(--ink-muted)] leading-relaxed">
        This tracking code refers to an application that has been archived after 24 months.
        Completed records are retained but are no longer actively tracked.
      </p>
      <Link
        href="/contact"
        className="font-sans text-[13px] font-medium text-[var(--brand)] hover:underline self-start mt-1"
      >
        Request records access →
      </Link>
    </div>
  );
}

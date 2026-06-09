"use client";

import * as React from "react";
import Link from "next/link";
import { FileImage, Check, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CaseDocument } from "@/lib/types/agent";

interface DocumentThumbProps {
  doc: CaseDocument;
  caseCode: string;
  className?: string;
}

export function DocumentThumb({ doc, caseCode, className }: DocumentThumbProps) {
  return (
    <Link
      href={`/agent/case/${caseCode}/doc/${doc.id}`}
      aria-label={`View ${doc.label}`}
      className={cn(
        "flex flex-col overflow-hidden",
        "bg-[var(--paper-2)] rounded-[var(--r-md)] border border-[var(--rule)]",
        "transition-colors duration-[var(--m-fast)]",
        "hover:border-[var(--ink)] hover:shadow-[var(--sh-raised)]",
        "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]",
        className
      )}
    >
      {/* Thumbnail preview */}
      <div className="relative aspect-[3/4] bg-gradient-to-br from-[var(--cream-2)] to-[var(--cream)] flex items-center justify-center">
        <FileImage size={32} className="text-[var(--ink-subtle)]" aria-hidden="true" />

        {/* Status badge */}
        <div className="absolute top-[8px] right-[8px]">
          {doc.status === "verified" && (
            <span
              aria-label="Verified"
              className={cn(
                "inline-flex items-center gap-[3px]",
                "px-[6px] py-[2px] rounded-[var(--r-pill)]",
                "bg-[var(--ok-soft)] text-[var(--ok)]",
                "font-mono text-[10px] font-medium"
              )}
            >
              <Check size={9} aria-hidden="true" />
              verified
            </span>
          )}
          {doc.status === "new" && (
            <span
              aria-label="New — needs review"
              className={cn(
                "inline-flex items-center gap-[3px]",
                "px-[6px] py-[2px] rounded-[var(--r-pill)]",
                "bg-[var(--brand)] text-white",
                "font-mono text-[10px] font-bold uppercase tracking-[0.06em]"
              )}
            >
              NEW
            </span>
          )}
          {doc.status === "rejected" && (
            <span
              aria-label="Rejected"
              className={cn(
                "inline-flex items-center",
                "px-[6px] py-[2px] rounded-[var(--r-pill)]",
                "bg-[var(--danger-soft)] text-[var(--danger)]",
                "font-mono text-[10px] font-medium"
              )}
            >
              rejected
            </span>
          )}
        </div>
      </div>

      {/* Meta */}
      <div className="p-[10px]">
        <p className="font-mono text-[11px] text-[var(--ink)] truncate mb-[2px]">
          {doc.filename}
        </p>
        <p className="font-sans text-[11px] text-[var(--ink-muted)] truncate">
          {doc.label}
        </p>
        <p className="font-mono text-[10px] text-[var(--ink-subtle)] mt-[4px]">
          {doc.fileSize} · {doc.uploadedAt}
        </p>
      </div>
    </Link>
  );
}

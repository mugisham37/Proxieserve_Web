import * as React from "react";
import { cn } from "@/lib/utils";
import { StatusPill } from "@/components/atoms/StatusPill";

interface HeroDocumentCardProps extends React.HTMLAttributes<HTMLDivElement> {
  filename?: string;
  filesize?: string;
  status?: "uploading" | "uploaded" | "error";
}

export function HeroDocumentCard({
  className,
  filename = "notarial_deed.pdf",
  filesize = "1.2 MB",
  status = "uploaded",
  ...props
}: HeroDocumentCardProps) {
  return (
    <div
      className={cn(
        "bg-[var(--paper)] border border-[var(--rule)] rounded-[var(--r-xl)]",
        "p-4 shadow-[var(--sh-subtle)] flex items-center gap-3",
        className
      )}
      {...props}
    >
      {/* Document icon */}
      <div className="relative shrink-0 w-10 h-12 bg-[var(--cream-2)] rounded-[var(--r-sm)] border border-[var(--rule)] flex items-end justify-center pb-1">
        <div
          className="absolute top-0 right-0 w-3 h-3 bg-[var(--paper)] border-b border-l border-[var(--rule)]"
          style={{ borderBottomLeftRadius: "4px" }}
        />
        <span className="font-mono text-[8px] text-[var(--ink-muted)] uppercase tracking-wider">PDF</span>
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-sans text-[13px] font-medium text-[var(--ink)] truncate">{filename}</p>
        <p className="font-mono text-[11px] text-[var(--ink-muted)]">{filesize}</p>
      </div>

      {status === "uploaded" && <StatusPill variant="ok" label="Uploaded" size="md" />}
      {status === "uploading" && <StatusPill variant="info" label="Uploading…" size="md" />}
      {status === "error" && <StatusPill variant="danger" label="Failed" size="md" />}
    </div>
  );
}

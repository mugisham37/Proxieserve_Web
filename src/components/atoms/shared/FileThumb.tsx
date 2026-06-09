import * as React from "react";
import { cn } from "@/lib/utils";

interface FileThumbProps {
  ext: string;
  className?: string;
}

const EXT_COLORS: Record<string, string> = {
  jpg: "bg-[var(--b-pink)] text-white",
  jpeg: "bg-[var(--b-pink)] text-white",
  png: "bg-[var(--b-blue)] text-white",
  pdf: "bg-[var(--danger)] text-white",
  doc: "bg-[var(--info)] text-white",
  docx: "bg-[var(--info)] text-white",
};

export function FileThumb({ ext, className }: FileThumbProps) {
  const normalized = ext.toLowerCase().replace(/^\./, "");
  const colorClass = EXT_COLORS[normalized] ?? "bg-[var(--ink-muted)] text-white";

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center w-9 h-10 rounded-[var(--r-sm)] font-mono text-[9px] font-bold uppercase tracking-wider shrink-0",
        colorClass,
        className
      )}
    >
      {normalized.slice(0, 4)}
    </span>
  );
}

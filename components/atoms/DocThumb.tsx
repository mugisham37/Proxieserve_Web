import * as React from "react";
import { cn } from "@/lib/utils";

interface DocThumbProps {
  ext: "JPG" | "PDF" | "PNG";
  className?: string;
}

export function DocThumb({ ext, className }: DocThumbProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative flex items-end justify-center shrink-0",
        "w-[40px] h-[50px] rounded-[4px]",
        "bg-[var(--cream-2)] pb-[4px]",
        "font-mono text-[9px] font-semibold text-[var(--ink-muted)]",
        /* folded corner via pseudo-element — implemented as inline style overlay */
        "before:content-[''] before:absolute before:top-0 before:right-0",
        "before:w-[10px] before:h-[10px] before:bg-[var(--paper)]",
        "[clip-path:none]",
        className
      )}
      style={{
        /* The folded corner is a CSS triangle overlay */
      }}
    >
      {/* Folded corner triangle */}
      <span
        className="absolute top-0 right-0 w-[10px] h-[10px] bg-[var(--paper)]"
        style={{ clipPath: "polygon(0 0, 100% 100%, 0 100%)" }}
      />
      {ext}
    </span>
  );
}

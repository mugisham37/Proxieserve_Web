"use client";

import * as React from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  code: string;
  size?: "md" | "lg";
  copyable?: boolean;
}

export function CodeChip({ code, size = "md", copyable = true, className, ...props }: CodeChipProps) {
  const [copied, setCopied] = React.useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-[999px] font-mono",
        "bg-[var(--cream-2)] text-[var(--ink)] border border-[var(--rule)]",
        size === "md" ? "px-3 py-1 text-[13px]" : "px-4 py-1.5 text-[15px]",
        className
      )}
      {...props}
    >
      {code}
      {copyable && (
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? "Copied" : "Copy code"}
          className={cn(
            "inline-flex items-center justify-center rounded-full",
            "text-[var(--ink-muted)] hover:text-[var(--ink)]",
            "transition-colors duration-[120ms]",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--focus)]",
            size === "md" ? "w-4 h-4" : "w-5 h-5"
          )}
        >
          {copied ? (
            <Check className={size === "md" ? "w-3 h-3" : "w-3.5 h-3.5"} />
          ) : (
            <Copy className={size === "md" ? "w-3 h-3" : "w-3.5 h-3.5"} />
          )}
        </button>
      )}
    </span>
  );
}

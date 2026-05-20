"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface BigCodeChipProps {
  code: string;
  className?: string;
}

export function BigCodeChip({ code, className }: BigCodeChipProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  const waLink = `https://wa.me/?text=${encodeURIComponent(`My ProxiServe tracking code: ${code}`)}`;

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <div className="flex items-center gap-3 bg-[var(--paper)] border border-[var(--rule)] rounded-[var(--r-xl)] px-6 py-4 shadow-[var(--sh-subtle)]">
        <span
          className="font-mono font-semibold text-[var(--ink)] tracking-widest select-all"
          style={{ fontSize: "clamp(20px, 4vw, 32px)" }}
        >
          {code}
        </span>

        <div className="flex items-center gap-1.5 ml-2">
          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy tracking code"
            className={cn(
              "flex items-center justify-center w-9 h-9 rounded-[var(--r-md)] border transition-colors duration-[120ms]",
              copied
                ? "border-[var(--ok)] bg-[var(--ok-soft)] text-[var(--ok)]"
                : "border-[var(--rule-strong)] bg-[var(--paper)] text-[var(--ink-muted)] hover:border-[var(--ink-muted)] hover:text-[var(--ink)]"
            )}
          >
            {copied ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8l3 3 7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <rect x="5" y="5" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
                <path d="M3 11V3h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>

          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share tracking code on WhatsApp"
            className="flex items-center justify-center w-9 h-9 rounded-[var(--r-md)] border border-[var(--rule-strong)] bg-[var(--paper)] text-[var(--ink-muted)] hover:border-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 1.5C4.41 1.5 1.5 4.41 1.5 8c0 1.16.31 2.25.85 3.19L1.5 14.5l3.37-.84A6.47 6.47 0 0 0 8 14.5c3.59 0 6.5-2.91 6.5-6.5S11.59 1.5 8 1.5Z" stroke="currentColor" strokeWidth="1.3" />
              <path d="M6 6.5c.1.5.4 1.5 1.5 2.5S9.5 10.1 10 10c.4-.1.5-.5.5-.7v-.7c0-.15-.1-.25-.25-.3l-1-.25c-.15-.05-.3 0-.4.1l-.3.35c-.05.05-.15.08-.25.05C7.6 8.4 7.1 7.9 6.85 7.35c-.03-.1 0-.2.05-.25l.35-.3c.1-.1.15-.25.1-.4L7.1 5.4c-.05-.15-.15-.25-.3-.25H6.2c-.2 0-.6.1-.2.95Z" fill="currentColor" />
            </svg>
          </a>
        </div>
      </div>

      <p className="font-mono text-[11px] text-[var(--ink-subtle)] uppercase tracking-[0.14em]">
        Save this code · you&apos;ll need it to track your application
      </p>
    </div>
  );
}

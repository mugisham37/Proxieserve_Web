import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface AuthFooterLinksProps {
  className?: string;
}

export function AuthFooterLinks({ className }: AuthFooterLinksProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-3 pt-5 mt-5 border-t border-[var(--rule)]",
        className
      )}
    >
      {[
        { label: "Privacy", href: "/legal/privacy" },
        { label: "Terms", href: "/legal/terms" },
        { label: "Help", href: "/contact" },
      ].map(({ label, href }, i, arr) => (
        <React.Fragment key={label}>
          <Link
            href={href}
            className="font-sans text-[12px] text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors"
          >
            {label}
          </Link>
          {i < arr.length - 1 && (
            <span className="text-[var(--rule-strong)] text-[12px]" aria-hidden="true">·</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

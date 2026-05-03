import Link from "next/link";
import { FOOTER_COLUMNS, COMPLIANCE_BADGES } from "@/lib/constants";

export function MarketingFooter() {
  return (
    <footer className="bg-[var(--surface)] border-t border-[var(--border)] px-4 md:px-8 pt-12 pb-6">
      {/* Main grid: 2-col on mobile, 4-col on desktop */}
      <div className="max-w-[1280px] mx-auto grid grid-cols-2 gap-8 mb-10 md:grid-cols-[2fr_1fr_1fr_1fr]">
        {/* Brand column */}
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 text-[17px] font-bold text-[var(--text)] mb-3">
            <svg width="24" height="24" viewBox="0 0 28 28" fill="none" aria-hidden="true">
              <circle cx="14" cy="14" r="12" stroke="var(--brand)" strokeWidth="2" />
              <circle cx="14" cy="14" r="5" fill="var(--brand)" />
            </svg>
            SolAI
          </div>
          <p className="text-[13px] text-[var(--text-subtle)] max-w-[280px]">
            The autonomous revenue engine for e-commerce sellers. Built by Digisi Rwanda.
          </p>
        </div>

        {/* Link columns */}
        {FOOTER_COLUMNS.map((col) => (
          <div key={col.heading}>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--text-subtle)] mb-3">
              {col.heading}
            </h4>
            {col.links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block text-[13px] text-[var(--text-muted)] mb-2 no-underline hover:text-[var(--text)] hover:no-underline transition-colors duration-[120ms]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="max-w-[1280px] mx-auto pt-6 border-t border-[var(--border)] flex flex-col gap-3 md:flex-row md:justify-between md:items-center flex-wrap">
        <span className="text-[12px] text-[var(--text-subtle)]">
          © 2026 Digisi Rwanda. All rights reserved.
        </span>
        <div className="flex gap-1.5 flex-wrap">
          {COMPLIANCE_BADGES.map((badge) => (
            <span
              key={badge}
              className="font-mono text-[10px] font-medium px-2 py-0.5 rounded bg-[var(--surface-2)] text-[var(--text-subtle)] border border-[var(--border)] uppercase tracking-[0.04em]"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}

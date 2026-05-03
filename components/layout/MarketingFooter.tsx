import Link from "next/link";
import { ComplianceBadge } from "@/components/atoms/ComplianceBadge";
import { FOOTER_COLUMNS, COMPLIANCE_BADGES } from "@/lib/constants";

export function MarketingFooter() {
  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-[1280px] mx-auto px-8 pt-12 pb-6 md:px-4">
        {/* Main grid */}
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-8 mb-10 md:grid-cols-2 sm:grid-cols-1">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-2 text-[17px] font-bold text-text mb-3">
              <span className="w-7 h-7 rounded-md bg-brand flex items-center justify-center text-white text-[13px] font-bold">
                S
              </span>
              SolAI
            </div>
            <p className="text-[13px] text-text-subtle max-w-[280px] leading-relaxed">
              Autonomous e-commerce revenue engine for African sellers. Upload a
              product — SolAI runs everything else.
            </p>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.heading}>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.06em] text-text-subtle mb-3">
                {col.heading}
              </h4>
              {col.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block text-[13px] text-text-muted mb-2 no-underline hover:text-text hover:no-underline transition-colors duration-[120ms]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-border flex justify-between items-center flex-wrap gap-3 sm:flex-col sm:items-start">
          <span className="text-[12px] text-text-subtle">
            © {new Date().getFullYear()} SolAI Technologies Ltd. Kigali, Rwanda.
          </span>
          <div className="flex gap-1.5 flex-wrap">
            {COMPLIANCE_BADGES.map((badge) => (
              <ComplianceBadge key={badge}>{badge}</ComplianceBadge>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

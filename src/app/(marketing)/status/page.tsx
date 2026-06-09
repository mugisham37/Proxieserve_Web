import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "System status — ProxiServe",
  description: "Real-time status of ProxiServe services.",
};

// Status entries — in production these would come from an uptime monitoring API
const SERVICES = [
  { name: "Application submission", status: "operational" as const },
  { name: "Payments (MoMo / card)", status: "operational" as const },
  { name: "WhatsApp & SMS delivery", status: "operational" as const },
  { name: "Document uploads", status: "operational" as const },
  { name: "Agent workspace", status: "operational" as const },
  { name: "Admin panel", status: "operational" as const },
] satisfies { name: string; status: "operational" | "degraded" | "outage" }[];

const STATUS_CONFIG = {
  operational: { label: "Operational", color: "var(--ok)", bg: "var(--ok-soft)" },
  degraded: { label: "Degraded", color: "var(--warn)", bg: "var(--warn-soft)" },
  outage: { label: "Outage", color: "var(--danger)", bg: "var(--danger-soft)" },
};

const allOperational = SERVICES.every((s) => s.status === "operational");

export default function StatusPage() {
  return (
    <div className="min-h-[calc(100dvh-80px)] py-16 px-5">
      <div className="max-w-[640px] mx-auto">

        {/* Header */}
        <div className="mb-10">
          <p className="font-mono text-[11px] tracking-[0.1em] text-[var(--ink-muted)] uppercase mb-3">
            System status
          </p>
          <h1 className="font-serif font-normal text-[clamp(32px,5vw,52px)] leading-[1.05] tracking-[-0.02em] m-0 mb-4">
            {allOperational ? (
              <>All systems <em className="font-normal italic">operational.</em></>
            ) : (
              <>Some systems are <em className="font-normal italic">experiencing issues.</em></>
            )}
          </h1>
          <p className="font-sans text-[14px] text-[var(--ink-muted)] leading-[1.6] m-0">
            This page shows the live status of all ProxiServe systems.
            Incidents are posted here as soon as they are detected.
          </p>
        </div>

        {/* Overall status banner */}
        <div
          className="flex items-center gap-3 rounded-[var(--r-md)] px-5 py-4 mb-8 border"
          style={{
            background: allOperational ? "var(--ok-soft)" : "var(--warn-soft)",
            borderColor: allOperational ? "var(--ok)" : "var(--warn)",
          }}
        >
          <span
            className="w-3 h-3 rounded-full shrink-0"
            style={{ background: allOperational ? "var(--ok)" : "var(--warn)" }}
            aria-hidden="true"
          />
          <span
            className="font-serif font-medium text-[17px]"
            style={{ color: allOperational ? "var(--ok)" : "var(--warn)" }}
          >
            {allOperational ? "All systems are fully operational." : "Some systems have reported issues."}
          </span>
        </div>

        {/* Service list */}
        <div className="border border-[var(--rule)] rounded-[var(--r-lg)] overflow-hidden mb-10">
          {SERVICES.map((svc, i) => {
            const cfg = STATUS_CONFIG[svc.status];
            return (
              <div
                key={svc.name}
                className="flex items-center justify-between px-5 py-4 border-b border-[var(--rule-soft)] last:border-b-0 bg-[var(--paper)]"
                style={{ borderTopWidth: i === 0 ? 0 : undefined }}
              >
                <span className="font-sans text-[14px] text-[var(--ink)]">{svc.name}</span>
                <span
                  className="inline-flex items-center gap-[6px] font-sans font-medium text-[12px]"
                  style={{ color: cfg.color }}
                >
                  <span
                    className="w-[7px] h-[7px] rounded-full shrink-0"
                    style={{ background: cfg.color }}
                    aria-hidden="true"
                  />
                  {cfg.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <p className="font-mono text-[11px] text-[var(--ink-subtle)] text-center leading-[1.6] mb-6">
          Updated automatically · Hosted separately from the main application
        </p>

        <div className="flex justify-center">
          <Link
            href="/"
            className="font-serif italic text-[15px] text-[var(--ink-muted)] hover:text-[var(--ink)] underline transition-colors"
          >
            ← Back to ProxiServe
          </Link>
        </div>

      </div>
    </div>
  );
}

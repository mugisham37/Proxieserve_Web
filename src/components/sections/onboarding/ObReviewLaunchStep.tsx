"use client";

import { MkIcon } from "@/components/atoms/MkIcon";
import { ObStatusDot } from "@/components/atoms/ObStatusDot";
import { ObReviewCard } from "@/components/molecules/ObReviewCard";
import { AuthConsentRow } from "@/components/molecules/AuthConsentRow";
import type { ConnectionKey, ConnectionStatus, RailKey } from "@/types";

interface ObReviewLaunchStepProps {
  connections: Record<ConnectionKey, ConnectionStatus>;
  rails: Record<RailKey, boolean>;
  agreed: boolean;
  onAgreedChange: (v: boolean) => void;
  onGoToStep: (step: number) => void;
}

const CONNECTION_LABELS: Record<ConnectionKey, string> = {
  shopify: "Shopify — Inema Boutique",
  woo: "WooCommerce",
  meta: "Meta — Ad Account #1847293",
  google: "Google Ads",
  whatsapp: "WhatsApp — +250 788 123 456",
};

const RAIL_LABELS: Record<RailKey, string> = {
  stripe: "Stripe — acct_1N…7xQ",
  momo: "MTN MoMo — MM-2847",
  airtel: "Airtel Money",
  flutterwave: "Flutterwave",
};

const TIMELINE = [
  { time: "Now", msg: "Campaign Planner is researching audiences and splitting budget.", active: true },
  { time: "~5 min", msg: "Creative Generator produces 3 ad variants for Meta.", active: false },
  { time: "~15 min", msg: "Ads submitted to Meta for review.", active: false },
  { time: "~30 min", msg: "First impressions start delivering.", active: false },
  { time: "Ongoing", msg: "Real-time Optimizer checks performance every 15 minutes.", active: false },
];

interface LaunchSuccessProps {
  onDashboard: () => void;
}

function LaunchSuccess({ onDashboard }: LaunchSuccessProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-[96px] h-[96px] rounded-full bg-[var(--brand-soft)] text-[var(--brand)] flex items-center justify-center mb-6">
        <MkIcon name="rocket" size={48} />
      </div>
      <h1 className="text-[clamp(24px,3vw,32px)] font-bold tracking-[-0.02em] mb-2">
        You&apos;re live!
      </h1>
      <p className="text-[15px] text-[var(--text-muted)] mb-8 max-w-[480px]">
        SolAI is building your first campaign now. Your first ads will appear within 30 minutes.
      </p>

      <div className="w-full max-w-[480px] flex flex-col text-left">
        {TIMELINE.map((row, i) => (
          <div
            key={i}
            className="flex items-start gap-3 py-[10px] text-[14px] text-[var(--text-muted)]"
            style={{ borderBottom: i < TIMELINE.length - 1 ? "1px solid var(--border)" : "none" }}
          >
            <span
              className="text-[12px] text-[var(--text-subtle)] w-[60px] flex-shrink-0 text-right mt-[3px]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {row.time}
            </span>
            <span
              className="w-[8px] h-[8px] rounded-full flex-shrink-0 mt-[6px]"
              style={{
                background: row.active ? "var(--success)" : "var(--border)",
                boxShadow: row.active ? "0 0 0 3px rgba(52,211,153,0.2)" : "none",
              }}
            />
            <span>{row.msg}</span>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={onDashboard}
        className="mt-8 inline-flex items-center gap-2 px-5 py-3 text-[15px] font-semibold bg-[var(--brand)] text-white border border-[var(--brand)] rounded-[10px] cursor-pointer transition-all duration-150 hover:bg-[#4A6BEE]"
      >
        Go to dashboard <MkIcon name="arrowRight" size={16} />
      </button>
    </div>
  );
}

export function ObReviewLaunchStep({
  connections,
  rails,
  agreed,
  onAgreedChange,
  onGoToStep,
}: ObReviewLaunchStepProps) {
  const activeConnections = (Object.entries(connections) as [ConnectionKey, ConnectionStatus][]).filter(
    ([, status]) => status === "connected"
  );
  const activeRails = (Object.entries(rails) as [RailKey, boolean][]).filter(([, active]) => active);

  return (
    <div>
      <h1 className="text-[clamp(24px,3vw,32px)] font-bold tracking-[-0.02em] mb-2">
        Review &amp; launch
      </h1>
      <p className="text-[15px] text-[var(--text-muted)] mb-6">
        Confirm everything looks right before SolAI starts working.
      </p>

      <div className="flex flex-col gap-3 mb-6">
        {/* Connections */}
        <ObReviewCard title="Connections" onEdit={() => onGoToStep(1)}>
          <div className="flex flex-col gap-2">
            {(Object.entries(connections) as [ConnectionKey, ConnectionStatus][]).map(([key, status]) => (
              <div key={key} className="flex items-center gap-2 text-[13px] text-[var(--text-muted)]">
                <ObStatusDot variant={status === "connected" ? "success" : "idle"} />
                <span>
                  {CONNECTION_LABELS[key]}
                  {status === "idle" && (
                    <span className="text-[var(--text-subtle)]"> — Not connected</span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </ObReviewCard>

        {/* Payment Rails */}
        <ObReviewCard title="Payment Rails" onEdit={() => onGoToStep(2)}>
          <div className="flex flex-col gap-2">
            {activeRails.length === 0 ? (
              <p className="text-[13px] text-[var(--text-subtle)]">No rails connected.</p>
            ) : (
              activeRails.map(([key]) => (
                <div key={key} className="flex items-center gap-2 text-[13px] text-[var(--text-muted)]">
                  <ObStatusDot variant="success" />
                  <span>{RAIL_LABELS[key]}</span>
                </div>
              ))
            )}
          </div>
        </ObReviewCard>

        {/* Product */}
        <ObReviewCard title="Product" onEdit={() => onGoToStep(3)}>
          <div>
            <strong className="block text-[15px] text-[var(--text)] mb-1">
              Ankara Print Tee — Indigo
            </strong>
            <p className="text-[13px] text-[var(--text-muted)] mb-1">
              US$ 35.00 · Hand-cut Ankara wax-print t-shirt in indigo colourway.
            </p>
            <p className="text-[12px] text-[var(--text-subtle)]">
              Target: Women 25-45 in East Africa + EU diaspora · EN, FR, RW
            </p>
          </div>
        </ObReviewCard>

        {/* Budget */}
        <ObReviewCard title="Budget" onEdit={() => onGoToStep(3)}>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Daily cap", value: "US$ 500.00" },
              { label: "Total cap", value: "US$ 5,000.00" },
              { label: "Duration", value: "~10 days" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="text-center p-3 bg-[var(--bg)] border border-[var(--border)] rounded-[10px]"
              >
                <span className="block text-[12px] text-[var(--text-subtle)] mb-[2px]">
                  {stat.label}
                </span>
                <strong
                  className="text-[16px] text-[var(--text)]"
                  style={{ fontFamily: "var(--font-mono)", fontFeatureSettings: '"tnum"' }}
                >
                  {stat.value}
                </strong>
              </div>
            ))}
          </div>
        </ObReviewCard>
      </div>

      {/* Consent */}
      <div className="p-4 bg-[var(--surface)] border border-[var(--border)] rounded-[14px]">
        <AuthConsentRow checked={agreed} onCheckedChange={onAgreedChange}>
          I authorise SolAI to spend up to{" "}
          <strong className="text-[var(--text)]">US$ 500.00/day</strong> (max{" "}
          <strong className="text-[var(--text)]">US$ 5,000.00</strong> total) on my linked Meta ad
          account. I understand this is a{" "}
          <strong className="text-[var(--text)]">hard cap</strong> that cannot be exceeded. I have
          read the{" "}
          <a href="/terms" className="text-[var(--brand)]">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-[var(--brand)]">
            Data Processing Agreement
          </a>
          .
        </AuthConsentRow>
      </div>
    </div>
  );
}

export { LaunchSuccess };

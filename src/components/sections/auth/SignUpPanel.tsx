import { AuthPanelStep } from "@/src/components/molecules/AuthPanelStep";
import { AuthTrustBadge } from "@/src/components/atoms/AuthTrustBadge";
import { SIGNUP_PANEL_STEPS, SIGNUP_TRUST_BADGES } from "@/src/lib/auth/data";

export function SignUpPanel() {
  return (
    <div className="w-full max-w-[340px]">
      <p className="font-mono text-[11px] font-medium text-[var(--brand)] uppercase tracking-[0.08em] mb-5">
        What happens next
      </p>
      <div className="flex flex-col gap-4">
        {SIGNUP_PANEL_STEPS.map((step) => (
          <AuthPanelStep key={step.num} {...step} />
        ))}
      </div>
      <div className="flex flex-col gap-2 mt-6 pt-5 border-t border-[var(--border)]">
        {SIGNUP_TRUST_BADGES.map((badge) => (
          <AuthTrustBadge key={badge.label} icon={badge.icon}>
            {badge.label}
          </AuthTrustBadge>
        ))}
      </div>
    </div>
  );
}

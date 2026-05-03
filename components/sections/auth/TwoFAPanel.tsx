import { MkIcon } from "@/components/atoms/MkIcon";
import { AuthTrustBadge } from "@/components/atoms/AuthTrustBadge";
import { TWOFA_TRUST_BADGES } from "@/lib/auth/data";

export function TwoFAPanel() {
  return (
    <div className="flex flex-col items-center text-center max-w-[300px]">
      <div className="w-16 h-16 rounded-full bg-[var(--brand-soft)] text-[var(--brand)] flex items-center justify-center">
        <MkIcon name="shield" size={36} />
      </div>
      <h3 className="mt-4 text-[18px] font-semibold text-[var(--text)]">Secure your account</h3>
      <p className="text-[14px] text-[var(--text-muted)] mt-2 max-w-[280px]">
        Two-factor authentication adds a second layer of protection. SolAI handles real money —
        security isn't optional.
      </p>
      <div className="flex flex-col gap-2 mt-6 items-start w-full max-w-[220px]">
        {TWOFA_TRUST_BADGES.map((badge) => (
          <AuthTrustBadge key={badge.label} icon={badge.icon}>
            {badge.label}
          </AuthTrustBadge>
        ))}
      </div>
    </div>
  );
}

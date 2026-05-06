import { MkIcon } from "@/components/atoms/MkIcon";
import type { IconName } from "@/types";

interface AuthTrustBadgeProps {
  icon: IconName;
  children: React.ReactNode;
}

export function AuthTrustBadge({ icon, children }: AuthTrustBadgeProps) {
  return (
    <div className="flex items-center gap-2 text-[13px] text-[var(--text-muted)]">
      <MkIcon name={icon} size={16} className="text-[var(--brand)] flex-shrink-0" />
      {children}
    </div>
  );
}

import { MkIcon } from "@/components/atoms/MkIcon";
import type { IconName } from "@/types";

interface ObWelcomeCardProps {
  icon: IconName;
  title: string;
  desc: string;
}

export function ObWelcomeCard({ icon, title, desc }: ObWelcomeCardProps) {
  return (
    <div className="flex gap-3 p-4 bg-[var(--surface)] border border-[var(--border)] rounded-[14px] text-left">
      <div className="w-[40px] h-[40px] rounded-[10px] bg-[var(--brand-soft)] text-[var(--brand)] flex items-center justify-center flex-shrink-0">
        <MkIcon name={icon} size={22} />
      </div>
      <div>
        <strong className="block text-[14px] text-[var(--text)] mb-[2px]">{title}</strong>
        <p className="text-[13px] text-[var(--text-muted)] m-0">{desc}</p>
      </div>
    </div>
  );
}

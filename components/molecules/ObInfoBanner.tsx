import { MkIcon } from "@/components/atoms/MkIcon";

interface ObInfoBannerProps {
  children: React.ReactNode;
}

export function ObInfoBanner({ children }: ObInfoBannerProps) {
  return (
    <div className="flex items-start gap-2 p-3 px-[14px] bg-[var(--surface)] border border-[var(--border)] rounded-[10px] text-[13px] text-[var(--text-muted)] mt-4">
      <span className="text-[var(--info)] flex-shrink-0 mt-[1px]">
        <MkIcon name="info" size={16} />
      </span>
      <span>{children}</span>
    </div>
  );
}

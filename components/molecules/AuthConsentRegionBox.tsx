import { MkIcon } from "@/components/atoms/MkIcon";

export function AuthConsentRegionBox() {
  return (
    <div className="flex items-start gap-2 p-3 bg-[var(--surface)] border border-[var(--border)] rounded-[10px] text-[12px] text-[var(--text-subtle)]">
      <MkIcon name="shield" size={14} className="text-[var(--brand)] flex-shrink-0 mt-[1px]" />
      <span>
        Your data is processed under{" "}
        <strong className="text-[var(--text-muted)]">Rwanda Law N° 058/2021</strong> and{" "}
        <strong className="text-[var(--text-muted)]">GDPR</strong>. Stored in AWS af-south-1
        (Cape Town).
      </span>
    </div>
  );
}

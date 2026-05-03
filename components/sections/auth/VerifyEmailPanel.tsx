import { MkIcon } from "@/components/atoms/MkIcon";

interface VerifyEmailPanelProps {
  email?: string;
}

export function VerifyEmailPanel({ email = "kalisa@inema.rw" }: VerifyEmailPanelProps) {
  return (
    <div className="flex flex-col items-center text-center max-w-[280px]">
      <div className="w-20 h-20 rounded-full bg-[var(--brand-soft)] text-[var(--brand)] flex items-center justify-center mb-4">
        <MkIcon name="mail" size={48} />
      </div>
      <p className="text-[14px] text-[var(--text-muted)] mt-4">We sent a 6-digit code to</p>
      <p className="text-[16px] font-semibold text-[var(--text)] mt-1">{email}</p>
    </div>
  );
}

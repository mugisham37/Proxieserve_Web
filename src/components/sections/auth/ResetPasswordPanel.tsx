import { MkIcon } from "@/components/atoms/MkIcon";

export function ResetPasswordPanel() {
  return (
    <div className="flex flex-col items-center text-center max-w-[280px]">
      <div className="w-16 h-16 rounded-full bg-[var(--brand-soft)] text-[var(--brand)] flex items-center justify-center mb-4">
        <MkIcon name="key" size={36} />
      </div>
      <p className="text-[15px] text-[var(--text-muted)] mt-4 max-w-[240px]">
        We'll send you a secure link to reset your password. No security questions, no hassle.
      </p>
    </div>
  );
}

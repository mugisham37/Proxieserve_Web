import type { PasswordStrength } from "@/types";

function calcStrength(pw: string): PasswordStrength {
  if (!pw) return 0;
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score as PasswordStrength;
}

const LABELS: Record<PasswordStrength, string> = {
  0: "",
  1: "Weak",
  2: "Fair",
  3: "Good",
  4: "Strong",
};

const SEGMENT_COLORS: Record<number, string> = {
  1: "var(--danger)",
  2: "var(--warning)",
  3: "var(--info)",
  4: "var(--success)",
};

interface PasswordStrengthBarProps {
  password: string;
}

export function PasswordStrengthBar({ password }: PasswordStrengthBarProps) {
  const strength = calcStrength(password);
  if (!password) return null;

  return (
    <div className="flex items-center gap-2 mt-1">
      <div className="flex gap-1 flex-1">
        {[1, 2, 3, 4].map((seg) => (
          <div
            key={seg}
            className="h-[4px] flex-1 rounded-full transition-colors duration-200"
            style={{
              background: seg <= strength ? SEGMENT_COLORS[strength] : "var(--surface-2)",
            }}
          />
        ))}
      </div>
      <span
        className="text-[11px] font-medium min-w-[36px] text-right transition-colors duration-200"
        style={{ color: strength > 0 ? SEGMENT_COLORS[strength] : "var(--text-subtle)" }}
      >
        {LABELS[strength]}
      </span>
    </div>
  );
}

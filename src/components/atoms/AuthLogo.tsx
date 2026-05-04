import Link from "next/link";

export function AuthLogo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 text-[17px] font-bold text-[var(--text)] no-underline hover:no-underline"
    >
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="14" cy="14" r="12" stroke="var(--brand)" strokeWidth="2" />
        <circle cx="14" cy="14" r="5" fill="var(--brand)" />
      </svg>
      <span>SolAI</span>
    </Link>
  );
}

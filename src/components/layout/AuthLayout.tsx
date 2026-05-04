import Link from "next/link";
import { AuthLogo } from "@/src/components/atoms/AuthLogo";

interface AuthLayoutProps {
  children: React.ReactNode;
  panel: React.ReactNode;
}

export function AuthLayout({ children, panel }: AuthLayoutProps) {
  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-[1fr_0.7fr]">
      {/* Form side */}
      <div className="flex flex-col px-5 py-6 md:px-12 md:py-8">
        <AuthLogo />

        {/* Centered form content */}
        <div className="auth-form-content flex-1 flex flex-col justify-center max-w-[420px] w-full mx-auto mt-8 md:mt-0">
          {children}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-[var(--border)] mt-auto text-[12px] text-[var(--text-subtle)]">
          <span>© 2026 Digisi Rwanda</span>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-[var(--text-subtle)] hover:text-[var(--text)] transition-colors duration-[120ms] no-underline">
              Privacy
            </Link>
            <Link href="/terms" className="text-[var(--text-subtle)] hover:text-[var(--text)] transition-colors duration-[120ms] no-underline">
              Terms
            </Link>
          </div>
        </div>
      </div>

      {/* Panel side — hidden on mobile */}
      <div className="auth-panel-side hidden md:flex items-center justify-center px-10 py-12 bg-[var(--surface)] border-l border-[var(--border)]">
        {panel}
      </div>
    </div>
  );
}

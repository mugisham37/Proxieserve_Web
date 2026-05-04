import { AuthLogo } from "@/src/components/atoms/AuthLogo";
import { MkIcon } from "@/src/components/atoms/MkIcon";
import { ObStepper } from "@/src/components/molecules/ObStepper";

const ONBOARDING_STEPS = ["Welcome", "Connections", "Payments", "Product & Budget", "Review & Launch"];

interface OnboardingLayoutProps {
  step: number;
  children: React.ReactNode;
  onNext?: () => void;
  onBack?: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  showSave?: boolean;
}

export function OnboardingLayout({
  step,
  children,
  onNext,
  onBack,
  nextLabel = "Continue",
  nextDisabled = false,
  showSave = true,
}: OnboardingLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)]">
      {/* Header */}
      <header className="flex items-center gap-4 md:gap-6 px-4 md:px-8 py-3 md:py-4 border-b border-[var(--border)] bg-[var(--surface)]">
        <AuthLogo />
        <ObStepper steps={ONBOARDING_STEPS} current={step} />
        {showSave && (
          <button
            type="button"
            className="ml-auto text-[13px] font-medium text-[var(--text-muted)] bg-none border border-[var(--border)] px-[14px] py-[6px] rounded-[10px] cursor-pointer font-[inherit] transition-all duration-[120ms] hover:text-[var(--text)] hover:border-[var(--text-subtle)] flex-shrink-0"
          >
            Save &amp; exit
          </button>
        )}
      </header>

      {/* Scrollable main content */}
      <main className="flex-1 flex justify-center px-4 md:px-8 py-8 md:py-10 overflow-y-auto">
        <div className="w-full max-w-[680px] onboarding-step-content">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="flex justify-between items-center px-4 md:px-8 py-3 md:py-4 border-t border-[var(--border)] bg-[var(--surface)]">
        {step > 0 ? (
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-[6px] px-5 py-[10px] text-[14px] font-medium text-[var(--text-muted)] bg-none border border-transparent rounded-[10px] cursor-pointer font-[inherit] transition-all duration-[120ms] hover:text-[var(--text)] hover:bg-[var(--surface-2)]"
          >
            <MkIcon name="arrowLeft" size={16} /> Back
          </button>
        ) : (
          <div />
        )}
        <button
          type="button"
          onClick={onNext}
          disabled={nextDisabled}
          className="inline-flex items-center gap-[6px] px-5 py-[10px] text-[14px] font-medium bg-[var(--brand)] text-white border border-[var(--brand)] rounded-[10px] cursor-pointer font-[inherit] transition-all duration-[120ms] hover:bg-[#4A6BEE] disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-[var(--brand)] focus-visible:outline-offset-2"
        >
          {nextLabel} <MkIcon name="arrowRight" size={16} />
        </button>
      </footer>
    </div>
  );
}

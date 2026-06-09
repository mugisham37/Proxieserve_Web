"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { CodeEntryInput } from "@/components/atoms/tracker/CodeEntryInput";
import { PillButton } from "@/components/atoms/shared/PillButton";
import { TrackerEntryTip } from "@/components/molecules/tracker/TrackerEntryTip";
import { LostCodeRecoveryCard } from "@/components/molecules/tracker/LostCodeRecoveryCard";
import { isValidTrackerCode, TRACKER_ERROR } from "@/lib/tracker";
import { getApplicationByCode } from "@/lib/tracker-data";

interface CodeEntrySectionProps {
  initialCode?: string;
  /** Auto-open the lost-code recovery card (from not-found redirect) */
  autoRecover?: boolean;
}

export function CodeEntrySection({ initialCode = "", autoRecover = false }: CodeEntrySectionProps) {
  const router = useRouter();
  const [code, setCode] = React.useState(initialCode);
  const [error, setError] = React.useState<string | null>(null);
  const [showRecovery, setShowRecovery] = React.useState(autoRecover);
  const [loading, setLoading] = React.useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!isValidTrackerCode(code)) {
      setError(TRACKER_ERROR);
      return;
    }

    // Validate against mock data on the client side
    const app = getApplicationByCode(code);
    if (!app) {
      setError("We couldn't find an application with that code. Double-check it and try again.");
      return;
    }

    setLoading(true);
    router.push(`/track/${encodeURIComponent(code)}`);
  }

  function handleCodeChange(value: string) {
    setCode(value);
    if (error) setError(null);
  }

  return (
    <div className="min-h-[calc(100vh-60px)] flex items-center py-14">
      <div className="container">
        {/* Entry card — max 580px centered */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
          className="w-full max-w-[580px] mx-auto bg-[var(--paper)] border border-[var(--ink)] rounded-[var(--r-xl)] px-10 py-12 max-[600px]:px-6 max-[600px]:py-8"
          style={{
            clipPath:
              "polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px)",
          }}
          aria-label="Track your application"
          noValidate
        >
          {/* Eyebrow */}
          <p className="inline-flex items-center gap-3 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--ink-muted)] mb-5 before:content-[''] before:w-6 before:h-px before:bg-[var(--ink)]">
            Public tracker
          </p>

          {/* H1 */}
          <h1 className="font-serif font-normal text-[clamp(36px,5vw,56px)] leading-[1.04] tracking-[-0.02em] text-[var(--ink)] m-0 mb-4">
            Track your <em>application.</em>
          </h1>

          {/* Subheading */}
          <p className="font-serif text-[clamp(17px,1.7vw,19px)] text-[var(--ink-2)] leading-[1.5] m-0 mb-8 max-w-[460px]">
            Enter your <em>PRX tracking code</em> to see real-time status, your assigned agent, and submitted documents.
          </p>

          {/* Code input */}
          <CodeEntryInput
            value={code}
            onChange={handleCodeChange}
            error={error ?? undefined}
            disabled={loading}
          />

          {/* Error message */}
          <AnimatePresence>
            {error && (
              <motion.p
                id="code-entry-error"
                role="alert"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.18 }}
                className="font-sans text-[13px] text-[var(--danger)] mt-2 m-0 overflow-hidden"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Helper row */}
          <div className="flex justify-between items-center flex-wrap gap-2 mt-3 mb-6 text-[13px]">
            <span className="text-[var(--ink-muted)]">
              e.g. <span className="font-mono tracking-[0.06em]">PRX-2026-00483</span>
            </span>
            <button
              type="button"
              onClick={() => setShowRecovery((v) => !v)}
              className="text-[var(--brand-ink)] underline underline-offset-[3px] hover:text-[var(--brand)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] rounded-sm"
            >
              {showRecovery ? "Hide recovery" : "Lost your code?"}
            </button>
          </div>

          {/* CTA */}
          <PillButton
            type="submit"
            variant="solid"
            size="md"
            disabled={loading || !code}
            arrow
            className="w-full justify-center"
          >
            {loading ? "Tracking…" : "Track"}
          </PillButton>

          {/* Alt row */}
          <div className="mt-6 pt-6 border-t border-[var(--rule)] flex justify-between gap-4 flex-wrap font-sans text-[13.5px]">
            <span className="text-[var(--ink-muted)]">
              Have an account?{" "}
              <a href="/login" className="text-[var(--brand-ink)] font-medium hover:underline">
                Sign in →
              </a>
            </span>
            <a href="/services" className="text-[var(--brand-ink)] font-medium hover:underline">
              Start a new application →
            </a>
          </div>
        </motion.form>

        {/* Lost code recovery card — expands below */}
        <div className="w-full max-w-[580px] mx-auto">
          <AnimatePresence>
            {showRecovery && (
              <LostCodeRecoveryCard
                onSuccess={() => {
                  setTimeout(() => setShowRecovery(false), 3000);
                }}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Tips grid */}
        <div className="w-full max-w-[580px] mx-auto mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TrackerEntryTip
            num={1}
            title={<>Your code starts with <em className="not-italic font-mono">PRX</em></>}
            body="You received it by SMS and email when you submitted your application. It looks like PRX-2026-00483."
          />
          <TrackerEntryTip
            num={2}
            title="Real-time status updates"
            body="See exactly where your application is, who's handling it, and what documents have been received."
          />
        </div>
      </div>
    </div>
  );
}

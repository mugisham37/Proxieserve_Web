"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PillButton } from "@/components/atoms/PillButton";

interface LostCodeRecoveryCardProps {
  onSuccess?: () => void;
}

export function LostCodeRecoveryCard({ onSuccess }: LostCodeRecoveryCardProps) {
  const [phone, setPhone] = React.useState("");
  const [sent, setSent] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!phone.trim()) return;
    setLoading(true);
    // Mock: resolve after 1s
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      onSuccess?.();
    }, 1000);
  }

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.26, ease: "easeOut" }}
      className="overflow-hidden"
    >
      <section className="bg-[var(--paper)] border border-[var(--ink)] rounded-[var(--r-xl)] p-7 mt-4">
        <h3 className="font-serif font-normal italic text-[20px] m-0 mb-3 text-[var(--ink)]">
          Recover your tracking code
        </h3>
        <p className="font-sans text-[13.5px] text-[var(--ink-muted)] mb-5 m-0">
          Enter the phone number you used when submitting your application and we&apos;ll send your code by SMS.
        </p>

        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 px-5 py-4 bg-[var(--ok-soft)] border border-[var(--ok)] rounded-[var(--r-md)]"
            >
              <span className="text-[var(--ok)] text-[18px]" aria-hidden="true">✓</span>
              <p className="font-sans text-[13.5px] text-[var(--ok)] font-medium m-0">
                SMS sent! Check your phone for the code.
              </p>
            </motion.div>
          ) : (
            <motion.form key="form" onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex items-stretch gap-0 border border-[var(--rule-strong)] rounded-[var(--r-pill)] overflow-hidden focus-within:border-[var(--ink)] focus-within:[box-shadow:var(--focus-ring)]">
                {/* Country prefix button */}
                <button
                  type="button"
                  className="flex items-center gap-2 px-4 py-3 bg-[var(--cream)] border-r border-[var(--rule)] font-mono text-[13px] text-[var(--ink)] whitespace-nowrap hover:bg-[var(--paper-2)] transition-colors shrink-0"
                  aria-label="Country code: Rwanda +250"
                >
                  🇷🇼 +250
                </button>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="780 000 000"
                  autoComplete="tel"
                  className="flex-1 px-4 py-3 bg-transparent font-sans text-[15px] text-[var(--ink)] placeholder:text-[var(--ink-subtle)] focus:outline-none min-w-0"
                  aria-label="Phone number"
                />
              </div>

              <PillButton
                type="submit"
                variant="solid"
                size="sm"
                disabled={loading || !phone.trim()}
                className="self-start"
              >
                {loading ? "Sending…" : "Send my code by SMS"}
              </PillButton>
            </motion.form>
          )}
        </AnimatePresence>

        <p className="font-sans text-[12px] text-[var(--ink-subtle)] mt-4 m-0">
          🔒 We only use this to look up your application — we won&apos;t store or share your number.
        </p>
      </section>
    </motion.div>
  );
}

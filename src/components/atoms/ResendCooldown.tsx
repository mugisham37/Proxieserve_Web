"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ResendCooldownProps {
  cooldownSeconds?: number; // default 30
  onResend: () => void;
  className?: string;
}

export function ResendCooldown({
  cooldownSeconds = 30,
  onResend,
  className,
}: ResendCooldownProps) {
  const [remaining, setRemaining] = React.useState(cooldownSeconds);
  const [active, setActive] = React.useState(true);

  React.useEffect(() => {
    if (!active) return;
    if (remaining <= 0) {
      setActive(false);
      return;
    }
    const id = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(id);
          setActive(false);
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [active, remaining]);

  function handleResend() {
    setRemaining(cooldownSeconds);
    setActive(true);
    onResend();
  }

  return (
    <button
      type="button"
      onClick={handleResend}
      disabled={active}
      aria-live="polite"
      className={cn(
        "font-sans text-[13px] underline underline-offset-2 transition-colors duration-[120ms]",
        active
          ? "text-[var(--ink-subtle)] cursor-not-allowed no-underline"
          : "text-[var(--brand-ink)] hover:text-[var(--brand)] cursor-pointer",
        className
      )}
    >
      {active ? `Resend in ${remaining}s` : "Resend code"}
    </button>
  );
}

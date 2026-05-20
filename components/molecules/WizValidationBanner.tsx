"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface WizValidationBannerProps {
  errors: Record<string, string>;
  onFieldClick?: (fieldId: string) => void;
  className?: string;
}

export function WizValidationBanner({ errors, onFieldClick, className }: WizValidationBannerProps) {
  const errorEntries = Object.entries(errors).filter(([, msg]) => msg);
  const [shake, setShake] = React.useState(0);

  React.useEffect(() => {
    setShake((s) => s + 1);
  }, [errors]);

  if (errorEntries.length === 0) return null;

  const handleClick = (id: string) => {
    if (onFieldClick) {
      onFieldClick(id);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" });
      document.getElementById(id)?.focus();
    }
  };

  return (
    <motion.div
      key={shake}
      role="alert"
      aria-live="assertive"
      animate={{ x: [0, -6, 6, -4, 4, -2, 2, 0] }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className={cn(
        "rounded-[var(--r-md)] bg-[var(--danger-soft)] border-l-[3px] border-[var(--danger)] px-4 py-3.5",
        className
      )}
    >
      <h4 className="font-sans text-[13px] font-semibold text-[var(--danger)] mb-2">
        Fix {errorEntries.length} issue{errorEntries.length !== 1 ? "s" : ""} before continuing
      </h4>
      <ol className="flex flex-col gap-1.5 list-decimal list-inside">
        {errorEntries.map(([id, msg]) => (
          <li key={id}>
            <button
              type="button"
              onClick={() => handleClick(id)}
              className="font-sans text-[12.5px] text-[var(--danger)] underline-offset-2 hover:underline text-left"
            >
              {msg}
            </button>
          </li>
        ))}
      </ol>
    </motion.div>
  );
}

"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  /** "icon" = icon-only button (36×36), "row" = full-width labeled row */
  variant?: "icon" | "row";
  className?: string;
}

export function ThemeToggle({ variant = "icon", className }: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch — only render once mounted on client
  React.useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  function toggle() {
    setTheme(isDark ? "light" : "dark");
  }

  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  if (!mounted) {
    // Render placeholder to avoid layout shift
    return (
      <div
        className={cn(
          variant === "icon"
            ? "w-[36px] h-[36px] rounded-[var(--r-md)]"
            : "h-[36px] w-full rounded-[var(--r-md)]",
          "bg-transparent",
          className
        )}
        aria-hidden="true"
      />
    );
  }

  if (variant === "row") {
    return (
      <button
        type="button"
        onClick={toggle}
        aria-label={label}
        className={cn(
          "flex items-center gap-[8px] px-[10px] py-[8px]",
          "w-full rounded-[var(--r-md)]",
          "font-sans text-[13px] text-[var(--ink-muted)]",
          "transition-colors duration-[var(--m-fast)]",
          "hover:bg-[var(--cream)] hover:text-[var(--ink)]",
          "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]",
          className
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isDark ? "sun" : "moon"}
            initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            aria-hidden="true"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </motion.span>
        </AnimatePresence>
        <span>{isDark ? "Light mode" : "Dark mode"}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      className={cn(
        "flex items-center justify-center",
        "w-[36px] h-[36px] rounded-[var(--r-md)]",
        "text-[var(--ink-muted)]",
        "transition-colors duration-[var(--m-fast)]",
        "hover:bg-[var(--paper-2)] hover:text-[var(--ink)]",
        "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]",
        className
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "sun" : "moon"}
          initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          aria-hidden="true"
          className="flex"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

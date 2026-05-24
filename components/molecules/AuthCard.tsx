import * as React from "react";
import { cn } from "@/lib/utils";

interface AuthCardProps {
  variant?: "client" | "staff";
  size?: "default" | "lg";
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export function AuthCard({
  variant = "client",
  size = "default",
  title,
  subtitle,
  children,
  className,
}: AuthCardProps) {
  return (
    <div
      className={cn(
        "w-full bg-[var(--paper)]",
        // Client: rounded, elevated
        variant === "client" && [
          "rounded-[var(--r-xl)] shadow-[var(--sh-raised)]",
          "px-8 py-9 sm:px-10",
          size === "default" ? "max-w-[460px]" : "max-w-[520px]",
        ],
        // Staff: square corners, ink border
        variant === "staff" && [
          "rounded-[var(--r-md)] border border-[var(--ink)]",
          "px-8 py-9",
          "max-w-[400px]",
        ],
        className
      )}
    >
      {(title || subtitle) && (
        <header className="mb-7">
          {title && (
            <h1
              className={cn(
                "font-serif text-[var(--ink)] leading-tight",
                variant === "client" ? "text-[28px] sm:text-[32px]" : "text-[22px]"
              )}
            >
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="font-sans text-[14px] text-[var(--ink-muted)] mt-1.5 leading-snug">
              {subtitle}
            </p>
          )}
        </header>
      )}
      {children}
    </div>
  );
}

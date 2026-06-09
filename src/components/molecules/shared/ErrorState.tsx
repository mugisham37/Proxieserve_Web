import * as React from "react";
import { cn } from "@/lib/utils";
import { AppButton } from "@/components/atoms/shared/AppButton";

interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Something went wrong",
  description = "We couldn't load this content. Please try again.",
  onRetry,
  className,
  ...props
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 p-12 text-center",
        "bg-[var(--danger-soft)] rounded-[var(--r-xl)]",
        className
      )}
      role="alert"
      {...props}
    >
      <span className="text-[var(--danger)] text-[32px]" aria-hidden="true">⚠</span>
      <div>
        <h3 className="t-h3 text-[var(--danger)] mb-1">{title}</h3>
        <p className="font-sans text-[14px] text-[var(--ink-muted)]">{description}</p>
      </div>
      {onRetry && (
        <AppButton variant="default" size="sm" onClick={onRetry}>
          Try again
        </AppButton>
      )}
    </div>
  );
}

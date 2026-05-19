import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const statusPillVariants = cva(
  "inline-flex items-center gap-1.5 rounded-[999px] font-sans font-medium",
  {
    variants: {
      variant: {
        info: "bg-[var(--info-soft)] text-[var(--info)]",
        brand: "bg-[var(--brand-soft)] text-[var(--brand-ink)]",
        warn: "bg-[var(--warn-soft)] text-[var(--warn)]",
        ok: "bg-[var(--ok-soft)] text-[var(--ok)]",
        danger: "bg-[var(--danger-soft)] text-[var(--danger)]",
      },
      size: {
        md: "px-2.5 py-1 text-[12px]",
        lg: "px-3 py-1.5 text-[13px]",
      },
    },
    defaultVariants: {
      variant: "info",
      size: "md",
    },
  }
);

const dotVariants = cva("rounded-full shrink-0", {
  variants: {
    variant: {
      info: "bg-[var(--info)]",
      brand: "bg-[var(--brand)]",
      warn: "bg-[var(--warn)]",
      ok: "bg-[var(--ok)]",
      danger: "bg-[var(--danger)]",
    },
    size: {
      md: "w-1.5 h-1.5",
      lg: "w-2 h-2",
    },
  },
  defaultVariants: { variant: "info", size: "md" },
});

export interface StatusPillProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusPillVariants> {
  label: string;
}

export function StatusPill({ className, variant, size, label, ...props }: StatusPillProps) {
  return (
    <span className={cn(statusPillVariants({ variant, size }), className)} {...props}>
      <span className={dotVariants({ variant, size })} />
      {label}
    </span>
  );
}

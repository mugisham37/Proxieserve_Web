import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const tagVariants = cva(
  "inline-flex items-center rounded-[999px] font-sans font-medium text-[11px] px-2 py-0.5",
  {
    variants: {
      variant: {
        default: "bg-[var(--cream-2)] text-[var(--ink-muted)] border border-[var(--rule)]",
        solid: "bg-[var(--ink)] text-[var(--paper)]",
        brand: "bg-[var(--brand-soft)] text-[var(--brand-ink)]",
        warn: "bg-[var(--warn-soft)] text-[var(--warn)]",
        danger: "bg-[var(--danger-soft)] text-[var(--danger)]",
        ok: "bg-[var(--ok-soft)] text-[var(--ok)]",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface TagProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {}

export function Tag({ className, variant, ...props }: TagProps) {
  return <span className={cn(tagVariants({ variant }), className)} {...props} />;
}

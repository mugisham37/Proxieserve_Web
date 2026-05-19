"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const pillButtonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "rounded-[999px] border font-serif italic",
    "transition-all duration-[120ms] ease-out",
    "active:scale-[0.98] cursor-pointer select-none",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-[var(--paper)] text-[var(--ink)] border-[var(--rule-strong)]",
          "hover:bg-[var(--ink)] hover:text-[var(--paper)] hover:border-[var(--ink)]",
        ],
        solid: [
          "bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)]",
          "hover:bg-[var(--paper)] hover:text-[var(--ink)] hover:border-[var(--rule-strong)]",
        ],
        brand: [
          "bg-[var(--brand)] text-white border-[var(--brand)]",
          "hover:bg-[var(--brand-ink)] hover:border-[var(--brand-ink)]",
        ],
        ghost: [
          "bg-transparent text-[var(--ink)] border-[var(--rule-strong)]",
          "hover:bg-[var(--ink)] hover:text-[var(--paper)] hover:border-[var(--ink)]",
        ],
      },
      size: {
        sm: "px-[18px] py-[10px] text-[14px] leading-none",
        md: "px-[26px] py-[14px] text-[17px] leading-none",
        lg: "px-[30px] py-[18px] text-[19px] leading-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface PillButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof pillButtonVariants> {
  asChild?: boolean;
  arrow?: boolean;
}

const PillButton = React.forwardRef<HTMLButtonElement, PillButtonProps>(
  ({ className, variant, size, asChild = false, arrow = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(pillButtonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      >
        {children}
        {arrow && (
          <span className="not-italic font-sans font-medium ml-0.5">→</span>
        )}
      </Comp>
    );
  }
);
PillButton.displayName = "PillButton";

export { PillButton, pillButtonVariants };

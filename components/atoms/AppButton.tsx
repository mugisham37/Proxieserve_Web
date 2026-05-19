"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const appButtonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "rounded-[var(--r-md)] border font-sans font-medium",
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
        sm: "px-3 py-1.5 text-[13px]",
        md: "px-4 py-2 text-[14px]",
        lg: "px-5 py-2.5 text-[15px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface AppButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof appButtonVariants> {
  asChild?: boolean;
}

const AppButton = React.forwardRef<HTMLButtonElement, AppButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(appButtonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
AppButton.displayName = "AppButton";

export { AppButton, appButtonVariants };

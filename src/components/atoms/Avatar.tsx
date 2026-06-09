import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const avatarVariants = cva(
  "inline-flex items-center justify-center rounded-full font-sans font-semibold shrink-0",
  {
    variants: {
      color: {
        ink: "bg-[var(--ink)] text-[var(--paper)]",
        brand: "bg-[var(--brand)] text-white",
        green: "bg-[var(--b-green)] text-white",
        blue: "bg-[var(--b-blue)] text-white",
        marigold: "bg-[var(--b-marigold)] text-[var(--ink)]",
      },
      size: {
        sm: "w-6 h-6 text-[10px]",
        md: "w-8 h-8 text-[13px]",
        lg: "w-16 h-16 text-[22px]",
      },
    },
    defaultVariants: { color: "ink", size: "md" },
  }
);

export interface AvatarProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color">,
    VariantProps<typeof avatarVariants> {
  initials: string;
}

export function Avatar({ className, color, size, initials, ...props }: AvatarProps) {
  return (
    <span className={cn(avatarVariants({ color, size }), className)} aria-hidden="true" {...props}>
      {initials.slice(0, 2).toUpperCase()}
    </span>
  );
}

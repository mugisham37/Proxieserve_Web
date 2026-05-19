import * as React from "react";
import { cn } from "@/lib/utils";

interface SkeletonBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  rounded?: "sm" | "md" | "lg" | "xl" | "full";
}

const radiusMap = {
  sm: "rounded-[var(--r-sm)]",
  md: "rounded-[var(--r-md)]",
  lg: "rounded-[var(--r-lg)]",
  xl: "rounded-[var(--r-xl)]",
  full: "rounded-full",
};

export function SkeletonBlock({
  className,
  width,
  height,
  rounded = "md",
  style,
  ...props
}: SkeletonBlockProps) {
  return (
    <div
      className={cn(
        "skeleton-shimmer bg-[var(--cream-2)]",
        radiusMap[rounded],
        className
      )}
      style={{ width, height, ...style }}
      aria-hidden="true"
      {...props}
    />
  );
}

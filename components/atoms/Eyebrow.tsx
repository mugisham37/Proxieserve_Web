import * as React from "react";
import { cn } from "@/lib/utils";

interface EyebrowProps extends React.HTMLAttributes<HTMLParagraphElement> {
  withLine?: boolean;
  as?: "p" | "span" | "div";
}

export function Eyebrow({ className, withLine = false, as: Tag = "p", children, ...props }: EyebrowProps) {
  return (
    <Tag
      className={cn(
        "eyebrow",
        withLine && "flex items-center gap-3 before:block before:w-7 before:h-px before:bg-current before:shrink-0",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

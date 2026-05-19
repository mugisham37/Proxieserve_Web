import * as React from "react";
import { cn } from "@/lib/utils";

interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  strong?: boolean;
}

export function Divider({ strong = false, className, ...props }: DividerProps) {
  return (
    <hr
      className={cn(
        "border-0 border-t",
        strong ? "border-[var(--rule-strong)]" : "border-[var(--rule)]",
        className
      )}
      {...props}
    />
  );
}

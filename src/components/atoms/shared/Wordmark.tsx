import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface WordmarkProps {
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
}

const sizeMap = {
  sm: "text-[16px]",
  md: "text-[20px]",
  lg: "text-[26px]",
};

export function Wordmark({ size = "md", href = "/", className }: WordmarkProps) {
  const content = (
    <span className={cn("font-serif font-medium tracking-[-0.01em] text-[var(--ink)]", sizeMap[size], className)}>
      Hebu<span className="not-italic text-(--brand)">za</span>
    </span>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] rounded-sm">
        {content}
      </Link>
    );
  }

  return content;
}

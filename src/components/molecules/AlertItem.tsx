import * as React from "react";
import Link from "next/link";
import { AlertTriangle, Info, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AlertItem as AlertItemType } from "@/lib/types/admin";

interface AlertItemProps {
  item: AlertItemType;
  className?: string;
}

const severityStyles = {
  warn: {
    border: "border-l-[var(--warn)]",
    bg: "bg-[var(--warn-soft)]",
    icon: "text-[var(--warn)]",
    Icon: AlertTriangle,
  },
  danger: {
    border: "border-l-[var(--danger)]",
    bg: "bg-[var(--danger-soft)]",
    icon: "text-[var(--danger)]",
    Icon: AlertCircle,
  },
  info: {
    border: "border-l-[var(--info)]",
    bg: "bg-[var(--info-soft)]",
    icon: "text-[var(--info)]",
    Icon: Info,
  },
};

export function AlertItem({ item, className }: AlertItemProps) {
  const styles = severityStyles[item.severity];
  const { Icon } = styles;

  return (
    <div
      role="listitem"
      className={cn(
        "flex items-start gap-[12px]",
        "px-[16px] py-[12px]",
        "border-l-[3px] rounded-r-[var(--r-md)]",
        styles.border,
        styles.bg,
        className
      )}
    >
      <Icon
        size={15}
        className={cn("shrink-0 mt-[1px]", styles.icon)}
        aria-hidden="true"
      />
      <p className="flex-1 font-sans text-[13px] leading-[1.5] text-[var(--ink)]">
        {item.message}
      </p>
      {item.cta && item.ctaHref && (
        <Link
          href={item.ctaHref}
          className={cn(
            "shrink-0 font-sans text-[12px] font-medium",
            "underline underline-offset-2",
            styles.icon,
            "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] rounded-[var(--r-sm)]"
          )}
        >
          {item.cta}
        </Link>
      )}
    </div>
  );
}

import * as React from "react";
import { cn } from "@/lib/utils";

interface SettingsSectionProps {
  title: string;
  titleItalic?: string;
  subtitle?: string;
  children: React.ReactNode;
  variant?: "default" | "danger";
  className?: string;
}

export function SettingsSection({
  title,
  titleItalic,
  subtitle,
  children,
  variant = "default",
  className,
}: SettingsSectionProps) {
  return (
    <section
      className={cn(
        "rounded-[var(--r-md)] border bg-[var(--paper)] overflow-hidden",
        variant === "default" ? "border-[var(--rule)]" : "border-[var(--danger)]",
        className
      )}
    >
      <div className="px-[28px] pt-[24px] pb-[20px] border-b border-[var(--rule)]">
        <h2 className="font-serif text-[20px] font-normal text-[var(--ink)] leading-[1.25]">
          {title}
          {titleItalic && (
            <>
              {" "}
              <em className="italic font-normal">{titleItalic}</em>
            </>
          )}
        </h2>
        {subtitle && (
          <p className="font-sans text-[13px] text-[var(--ink-muted)] mt-[4px]">
            {subtitle}
          </p>
        )}
      </div>
      <div>{children}</div>
    </section>
  );
}

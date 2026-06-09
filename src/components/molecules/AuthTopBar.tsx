import * as React from "react";
import { Wordmark } from "@/components/atoms/shared/Wordmark";
import { LangSwitcher } from "@/components/atoms/shared/LangSwitcher";
import { cn } from "@/lib/utils";

interface AuthTopBarProps {
  zone?: "client" | "staff";
  rightSlot?: React.ReactNode;
  className?: string;
}

export function AuthTopBar({ zone = "client", rightSlot, className }: AuthTopBarProps) {
  return (
    <header
      className={cn(
        "w-full border-b border-[var(--rule)]",
        zone === "staff" ? "bg-[var(--cream-2)]" : "bg-[var(--cream)]",
        className
      )}
    >
      <div className="flex items-center justify-between px-5 sm:px-8 h-14">
        <Wordmark />

        <div className="flex items-center gap-4">
          {zone === "client" && <LangSwitcher />}
          {rightSlot}
        </div>
      </div>
    </header>
  );
}

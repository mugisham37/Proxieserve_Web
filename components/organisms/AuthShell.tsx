import * as React from "react";
import { AuthTopBar } from "@/components/molecules/AuthTopBar";
import { AuthRail } from "@/components/molecules/AuthRail";
import { cn } from "@/lib/utils";

interface AuthShellProps {
  zone?: "client" | "staff";
  topBarRight?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function AuthShell({
  zone = "client",
  topBarRight,
  children,
  className,
}: AuthShellProps) {
  return (
    <div
      className={cn(
        "min-h-screen flex flex-col",
        zone === "client" ? "bg-[var(--cream)]" : "bg-[var(--cream-2)]"
      )}
    >
      <AuthTopBar zone={zone} rightSlot={topBarRight} />

      {/* Main content area */}
      <div className={cn("flex flex-1", className)}>
        {/* Marketing rail — client zone only, ≥ lg */}
        {zone === "client" && <AuthRail />}

        {/* Form area */}
        <main
          className={cn(
            "flex-1 flex items-start justify-center px-5 py-10 sm:py-14",
            zone === "client" ? "lg:items-center" : "items-center"
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

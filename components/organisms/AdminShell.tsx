"use client";

import * as React from "react";
import { AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { AdminProvider, useAdminState, useAdminDispatch } from "@/lib/admin-context";
import { AdminSideNav } from "@/components/molecules/AdminSideNav";
import { AdminTopBar } from "@/components/molecules/AdminTopBar";
import { AdminMobileTabBar } from "@/components/molecules/AdminMobileTabBar";
import { OfflineBanner } from "@/components/molecules/OfflineBanner";

// ─── Inner shell — consumes AdminContext ──────────────────────────────────────

function AdminShellInner({ children }: { children: React.ReactNode }) {
  const { darkMode, isOffline } = useAdminState();

  return (
    <div
      data-theme={darkMode ? "dark" : undefined}
      className={cn(
        "min-h-screen bg-[var(--cream)]",
        "grid grid-cols-1 min-[980px]:grid-cols-[232px_1fr]"
      )}
    >
      {/* Desktop sidenav */}
      <React.Suspense>
        <AdminSideNav />
      </React.Suspense>

      {/* Right column */}
      <div className="flex flex-col min-w-0">
        {/* Top bar */}
        <AdminTopBar />

        {/* Persistent banners */}
        <AnimatePresence>
          {isOffline && (
            <div className="px-[20px] min-[980px]:px-[32px] pt-[8px]">
              <OfflineBanner onRetry={() => window.location.reload()} />
            </div>
          )}
        </AnimatePresence>

        {/* Main content */}
        <main
          id="main-content"
          tabIndex={-1}
          className={cn(
            "flex-1 outline-none",
            "pb-[80px] min-[980px]:pb-0"
          )}
        >
          {children}
        </main>
      </div>

      {/* Mobile bottom tab bar */}
      <React.Suspense>
        <AdminMobileTabBar />
      </React.Suspense>
    </div>
  );
}

// ─── Public shell — provides AdminContext ─────────────────────────────────────

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <AdminProvider>
      <AdminShellInner>{children}</AdminShellInner>
    </AdminProvider>
  );
}

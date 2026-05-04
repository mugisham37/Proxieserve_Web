"use client";

import { DashboardUIProvider } from "@/src/lib/dashboard/context";
import { DashSidebar } from "@/src/components/layout/DashSidebar";
import { DashTopbar } from "@/src/components/layout/DashTopbar";
import { DashNotificationsDrawer } from "@/src/components/layout/DashNotificationsDrawer";
import { DashCopilot } from "@/src/components/layout/DashCopilot";
import { useDashboardUI } from "@/src/hooks/useDashboardUI";

function MobileOverlay() {
  const { mobileMenuOpen, setMobileMenuOpen } = useDashboardUI();
  if (!mobileMenuOpen) return null;
  return (
    <div
      className="fixed inset-0 bg-black/50 z-[99] md:hidden"
      onClick={() => setMobileMenuOpen(false)}
    />
  );
}

function ShellInner({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen" style={{ background: "var(--bg)" }}>
      <DashSidebar />
      <MobileOverlay />
      <div className="flex-1 flex flex-col min-w-0">
        <DashTopbar />
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          {children}
        </main>
      </div>
      <DashNotificationsDrawer />
      <DashCopilot />
    </div>
  );
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <DashboardUIProvider>
      <ShellInner>{children}</ShellInner>
    </DashboardUIProvider>
  );
}

"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/lib/auth-context";
import { DashSideNav } from "@/components/molecules/DashSideNav";
import { DashTopBar } from "@/components/molecules/DashTopBar";
import { DashTabBar } from "@/components/molecules/DashTabBar";
import { SessionExpiredModal } from "@/components/molecules/SessionExpiredModal";
import { EmailVerifyBanner } from "@/components/molecules/EmailVerifyBanner";
import { OfflineBanner } from "@/components/molecules/OfflineBanner";
import { MultiTabConflictBanner } from "@/components/molecules/MultiTabConflictBanner";
import { SkeletonBlock } from "@/components/atoms/SkeletonBlock";
import { MOCK_STATS, getTotalUnreadMessages } from "@/lib/dashboard-data";
import { useResendOtp } from "@/hooks/useAuth";
import { useSession } from "@/hooks/useSession";
import { SESSION_QUERY_KEY } from "@/lib/auth-types";

interface DashboardShellProps {
  children: React.ReactNode;
  /** Optional back href for mobile top bar */
  backHref?: string;
  /** Optional page title for mobile top bar */
  pageTitle?: string;
}

export function DashboardShell({ children, backHref, pageTitle }: DashboardShellProps) {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const { session, isHydrated, signOut } = useAuth();
  const { isLoading: isSessionLoading, refetch } = useSession();
  const resendOtpMutation = useResendOtp();

  const [isSessionExpired, setIsSessionExpired] = React.useState(false);
  const [showMultiTabBanner, setShowMultiTabBanner] = React.useState(false);
  const [isOnline, setIsOnline] = React.useState(
    () => (typeof navigator === "undefined" ? true : navigator.onLine),
  );

  React.useEffect(() => {
    if (isHydrated && !isSessionLoading && !session) {
      const nextPath = pathname?.startsWith("/dashboard") ? pathname : "/dashboard";
      router.replace(`/login?next=${encodeURIComponent(nextPath)}`);
    }
  }, [isHydrated, isSessionLoading, pathname, router, session]);

  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  React.useEffect(() => {
    if (typeof window === "undefined" || !("BroadcastChannel" in window)) return;
    const bc = new BroadcastChannel("proxi:dashboard");
    bc.postMessage({ type: "tab-open" });
    bc.onmessage = (e: MessageEvent) => {
      if (e.data?.type === "tab-open") setShowMultiTabBanner(true);
    };
    return () => bc.close();
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      void refetch().then((result) => {
        if (result.status === "success" && !result.data) {
          signOut();
          setIsSessionExpired(true);
        }
      });
    }, 60_000);
    return () => clearInterval(interval);
  }, [refetch, signOut]);

  React.useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleStorage = () => {
      void queryClient.invalidateQueries({ queryKey: [...SESSION_QUERY_KEY] });
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [queryClient]);

  const unreadMessages = getTotalUnreadMessages();
  const initials = session?.name
    ? session.name.split(" ").map((p) => p[0]).join("").toUpperCase().slice(0, 2)
    : "PS";
  const userName = session?.name ?? "ProxiServe User";
  const userRole = session?.role === "staff:admin"
    ? "Admin"
    : session?.role === "staff:agent"
      ? "Agent"
      : "Client";

  if (!isHydrated || isSessionLoading) {
    return (
      <div className="min-h-screen bg-[var(--cream)]">
        {/* Mobile top bar skeleton */}
        <div className="lg:hidden sticky top-0 z-40 h-14 bg-[var(--paper)] border-b border-[var(--rule)] flex items-center px-5 gap-3">
          <SkeletonBlock className="w-[120px] h-7 rounded-[999px]" />
          <SkeletonBlock className="ml-auto w-9 h-9 rounded-full" />
        </div>
        <div className="flex">
          {/* Desktop sidebar skeleton */}
          <div className="hidden lg:flex flex-col w-[240px] shrink-0 h-screen sticky top-0 bg-[var(--paper)] border-r border-[var(--rule)] px-5 py-6 gap-4">
            <SkeletonBlock className="w-[160px] h-8 rounded-[999px]" />
            {Array.from({ length: 5 }).map((_, i) => (
              <SkeletonBlock key={i} className="w-full h-10 rounded-[var(--r-md)]" />
            ))}
          </div>
          {/* Main content skeleton */}
          <main className="flex-1 min-w-0 p-6 lg:p-10 space-y-4">
            <SkeletonBlock className="w-full h-[120px] rounded-[var(--r-lg)]" />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <SkeletonBlock key={i} className="h-[90px] rounded-[var(--r-md)]" />
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonBlock key={i} className="h-[220px] rounded-[var(--r-lg)]" />
              ))}
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <>
      {/* Skip link */}
      <a
        href="#dash-main"
        className="skip"
      >
        Skip to main content
      </a>

      <div className="flex flex-col min-h-screen bg-[var(--cream)]">
        {!isOnline && <OfflineBanner />}
        {!session.isEmailVerified && (
          <EmailVerifyBanner
            email={session.email}
            onResend={() => {
              void resendOtpMutation.mutateAsync().catch(() => undefined);
            }}
          />
        )}
        {showMultiTabBanner && (
          <MultiTabConflictBanner
            onResume={() => setShowMultiTabBanner(false)}
            onDismiss={() => setShowMultiTabBanner(false)}
          />
        )}

        {/* Mobile top bar */}
        <DashTopBar
          title={pageTitle}
          backHref={backHref}
          initials={initials}
        />

        {/* Desktop + mobile body */}
        <div className="flex flex-1 min-h-0">
          {/* Desktop sidebar */}
          <DashSideNav
            stats={MOCK_STATS}
            unreadMessages={unreadMessages}
            userName={userName}
            userInitials={initials}
            userRole={userRole}
          />

          {/* Main content */}
          <main
            id="dash-main"
            tabIndex={-1}
            className="flex-1 min-w-0 px-5 py-6 lg:px-10 lg:py-10 focus-visible:outline-none"
          >
            {children}
          </main>
        </div>

        {/* Mobile bottom tab bar */}
        <DashTabBar unreadMessages={unreadMessages} />
      </div>

      {/* Session expired modal */}
      <SessionExpiredModal isOpen={isSessionExpired} />
    </>
  );
}

"use client";

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";
import { useSignOut } from "@/hooks/useAuth";
import { DashboardProvider, useDashboard } from "@/lib/dashboard-context";
import { SideNav } from "@/components/molecules/system/SideNav";
import { MobileTopBar } from "@/components/molecules/system/MobileTopBar";
import { MobileTabBar } from "@/components/molecules/system/MobileTabBar";
import { EmailVerifyBanner } from "@/components/molecules/auth/EmailVerifyBanner";
import { OfflineBanner } from "@/components/molecules/system/OfflineBanner";
import { MultiTabConflictBanner } from "@/components/molecules/system/MultiTabConflictBanner";
import { OnboardingProvider, useOnboarding } from "@/lib/onboarding-context";
import { Coachmark } from "@/components/molecules/system/Coachmark";

// ─── Session Expired Modal ────────────────────────────────────────────────────

function SessionExpiredModal() {
  const prefersReduced = useReducedMotion();
  const router = useRouter();
  const pathname = usePathname();
  const focusRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    // Trap focus when modal is shown
    focusRef.current?.focus();
  }, []);

  return (
    <motion.div
      initial={prefersReduced ? {} : { opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-[20px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="session-expired-title"
      onKeyDown={(e) => {
        // Prevent Escape from closing
        if (e.key === "Escape") e.preventDefault();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[var(--ink)]/45" aria-hidden="true" />

      {/* Modal card */}
      <motion.div
        initial={prefersReduced ? {} : { scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
        className={cn(
          "relative z-10 w-full max-w-[380px]",
          "bg-[var(--paper)] rounded-[var(--r-lg)]",
          "border border-[var(--rule)] shadow-[var(--sh-overlay)]",
          "p-[28px]"
        )}
      >
        <h2
          id="session-expired-title"
          className="font-serif text-[22px] font-normal text-[var(--ink)] mb-[8px]"
        >
          Your session{" "}
          <em className="italic font-normal">expired</em>
        </h2>
        <p className="font-sans text-[13.5px] text-[var(--ink-muted)] mb-[24px] leading-[1.5]">
          You were signed out due to inactivity. All your in-progress work has
          been saved. Sign back in to continue.
        </p>
        <button
          ref={focusRef}
          type="button"
          onClick={() => {
            const next = encodeURIComponent(pathname);
            router.push(`/login?next=${next}`);
          }}
          className={cn(
            "w-full h-[44px] rounded-[var(--r-pill)]",
            "bg-[var(--ink)] text-[var(--paper)]",
            "font-serif italic text-[16px]",
            "transition-colors duration-[var(--m-fast)]",
            "hover:bg-[var(--ink-2)]",
            "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
          )}
        >
          Sign back in →
        </button>
      </motion.div>
    </motion.div>
  );
}

// ─── Tour starter ─────────────────────────────────────────────────────────────

function ClientTourStarter() {
  const { start } = useOnboarding();
  React.useEffect(() => { start("client"); }, [start]);
  return null;
}

// ─── Inner Shell (consumes DashboardContext) ──────────────────────────────────

function AppShellInner({ children }: { children: React.ReactNode }) {
  const { session } = useAuth();
  const signOutMutation = useSignOut();

  const { isOffline, multiTabConflict, dismissMultiTabConflict, sessionExpired, unreadCount, actionCount } =
    useDashboard();

  const handleSignOut = React.useCallback(() => {
    signOutMutation.mutate();
  }, [signOutMutation]);

  return (
    <div
      className={cn(
        "min-h-screen bg-[var(--cream)]",
        "grid grid-cols-1 min-[980px]:grid-cols-[240px_1fr]"
      )}
    >
      {/* Desktop sidenav */}
      <React.Suspense>
        <SideNav
          user={session ? {
            fullName: session.name,
            initials: session.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase(),
            role: session.role,
          } : null}
          unreadCount={unreadCount}
          actionCount={actionCount}
          onSignOut={handleSignOut}
        />
      </React.Suspense>

      {/* Right column: top bar + banners + main + tab bar */}
      <div className="flex flex-col min-w-0">
        {/* Mobile top bar */}
        <MobileTopBar initials={session ? session.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase() : ""} />

        {/* Persistent banners */}
        <EmailVerifyBanner
          email={session?.email ?? ""}
          visible={false}
        />

        {isOffline && (
          <div className="px-[20px] pt-[16px] min-[980px]:px-[40px]">
            <OfflineBanner
              onRetry={() => window.location.reload()}
            />
          </div>
        )}

        {multiTabConflict && (
          <div className="px-[20px] pt-[16px] min-[980px]:px-[40px]">
            <MultiTabConflictBanner
              onResume={dismissMultiTabConflict}
              onDismiss={dismissMultiTabConflict}
            />
          </div>
        )}

        {/* Main content area */}
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

        {/* Mobile bottom tab bar */}
        <React.Suspense>
          <MobileTabBar unreadCount={unreadCount} />
        </React.Suspense>
      </div>

      {/* Session expired modal */}
      <AnimatePresence>
        {sessionExpired && <SessionExpiredModal />}
      </AnimatePresence>

      {/* Onboarding coachmarks */}
      <ClientTourStarter />
      <Coachmark />
    </div>
  );
}

// ─── Public API ───────────────────────────────────────────────────────────────

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <OnboardingProvider>
      <DashboardProvider
        initialUnreadCount={0}
        initialActionCount={0}
      >
        <AppShellInner>{children}</AppShellInner>
      </DashboardProvider>
    </OnboardingProvider>
  );
}

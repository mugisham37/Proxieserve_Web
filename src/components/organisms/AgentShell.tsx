"use client";

import * as React from "react";
import { AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { AgentProvider, useAgentState, useAgentDispatch } from "@/lib/agent-context";
import { AgentSideNav } from "@/components/molecules/AgentSideNav";
import { AgentTopBar } from "@/components/molecules/AgentTopBar";
import { AgentMobileTabBar } from "@/components/molecules/AgentMobileTabBar";
import { OfflineBanner } from "@/components/molecules/OfflineBanner";
import { BannerSLA } from "@/components/molecules/BannerSLA";
import { ConfirmModal } from "@/components/molecules/ConfirmModal";
import { CommandPalette } from "@/components/molecules/CommandPalette";
import { OnboardingProvider, useOnboarding } from "@/lib/onboarding-context";
import { Coachmark } from "@/components/molecules/Coachmark";

function AgentTourStarter() {
  const { start } = useOnboarding();
  React.useEffect(() => { start("agent"); }, [start]);
  return null;
}

// ─── Inner shell — consumes AgentContext ──────────────────────────────────────

function AgentShellInner({ children }: { children: React.ReactNode }) {
  const { darkMode, isOffline, slaBreachCount, cases, confirmModal, commandPaletteOpen } =
    useAgentState();
  const dispatch = useAgentDispatch();

  // Global ⌘K / Ctrl+K handler
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        dispatch({ type: "TOGGLE_PALETTE" });
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [dispatch]);

  const oldestSLACase = cases
    .filter((c) => c.slaState === "over")
    .sort((a, b) => {
      // Very simple sort by display string length desc (over cases appear first)
      return b.ageDisplay.length - a.ageDisplay.length;
    })[0];

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
        <AgentSideNav />
      </React.Suspense>

      {/* Right column */}
      <div className="flex flex-col min-w-0">
        {/* Top bar */}
        <AgentTopBar />

        {/* Persistent banners */}
        {isOffline && (
          <OfflineBanner onRetry={() => window.location.reload()} />
        )}

        {slaBreachCount > 0 && (
          <BannerSLA
            count={slaBreachCount}
            oldestCode={oldestSLACase?.code}
          />
        )}

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

        {/* Mobile bottom tab bar */}
        <React.Suspense>
          <AgentMobileTabBar />
        </React.Suspense>
      </div>

      {/* Command palette */}
      <AnimatePresence>
        {commandPaletteOpen && <CommandPalette />}
      </AnimatePresence>

      {/* Onboarding coachmarks */}
      <AgentTourStarter />
      <Coachmark />

      {/* Confirm modal */}
      <AnimatePresence>
        {confirmModal && (
          <ConfirmModal
            title={confirmModal.title}
            body={confirmModal.body}
            withNote={confirmModal.withNote}
            confirmLabel={confirmModal.confirmLabel}
            onConfirm={(note) => {
              confirmModal.onConfirm();
              dispatch({ type: "SET_CONFIRM_MODAL", payload: null });
            }}
            onCancel={() =>
              dispatch({ type: "SET_CONFIRM_MODAL", payload: null })
            }
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Public API ───────────────────────────────────────────────────────────────

interface AgentShellProps {
  children: React.ReactNode;
}

export function AgentShell({ children }: AgentShellProps) {
  return (
    <OnboardingProvider>
      <AgentProvider>
        <AgentShellInner>{children}</AgentShellInner>
      </AgentProvider>
    </OnboardingProvider>
  );
}

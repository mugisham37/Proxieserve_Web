"use client";

import * as React from "react";
import { getItem, setItem } from "@/lib/storage";

// ─── Types ────────────────────────────────────────────────────────────────────

export type OnboardingRole = "client" | "agent" | "admin";

export interface OnboardingStep {
  targetId: string;  // DOM id of the element to highlight
  title: string;
  body: string;
}

interface OnboardingState {
  active: boolean;
  step: number;
  role: OnboardingRole | null;
}

interface OnboardingContextValue {
  state: OnboardingState;
  start: (role: OnboardingRole) => void;
  next: () => void;
  skip: () => void;
  steps: OnboardingStep[];
}

// ─── Step definitions ─────────────────────────────────────────────────────────

const STEPS: Record<OnboardingRole, OnboardingStep[]> = {
  client: [
    {
      targetId: "onboard-tracking-code",
      title: "Your tracking code",
      body: "This is how you check progress anytime — even without an account. We'll text it to you too.",
    },
    {
      targetId: "onboard-track-nav",
      title: "Track your application",
      body: "Use the Track link anytime to see where your application stands. No account needed.",
    },
    {
      targetId: "onboard-messages",
      title: "Message your agent",
      body: "Your assigned agent can message you here. You can reply directly from your dashboard.",
    },
  ],
  agent: [
    {
      targetId: "onboard-case-queue",
      title: "Your case queue",
      body: "All cases assigned to you appear here. New cases with outstanding actions are shown first.",
    },
    {
      targetId: "onboard-case-detail",
      title: "Open a case",
      body: "Click any case to view the client's documents, personal details, and submission history.",
    },
    {
      targetId: "onboard-status-update",
      title: "Update the status",
      body: "As you work through each step, update the status so clients can track their progress in real time.",
    },
  ],
  admin: [
    {
      targetId: "onboard-services-nav",
      title: "Manage your services",
      body: "Create and configure services — each has its own form schema, document requirements, and pricing.",
    },
    {
      targetId: "onboard-oversight",
      title: "Oversight & cases",
      body: "View all open cases, reassign between agents, and resolve disputes from one place.",
    },
    {
      targetId: "onboard-analytics",
      title: "Analytics",
      body: "Track application volume, completion rates, revenue, and agent performance at a glance.",
    },
  ],
};

function storageKey(role: OnboardingRole) {
  return `hebuza:onboarding:${role}`;
}

function isComplete(role: OnboardingRole): boolean {
  return getItem(storageKey(role)) === "complete";
}

function markComplete(role: OnboardingRole) {
  setItem(storageKey(role), "complete");
}

// ─── Context ──────────────────────────────────────────────────────────────────

const OnboardingContext = React.createContext<OnboardingContextValue | null>(null);

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<OnboardingState>({
    active: false,
    step: 0,
    role: null,
  });

  const steps = state.role ? STEPS[state.role] : [];

  const start = React.useCallback((role: OnboardingRole) => {
    if (isComplete(role)) return;
    setState({ active: true, step: 0, role });
  }, []);

  const next = React.useCallback(() => {
    setState((prev) => {
      if (!prev.role) return prev;
      const totalSteps = STEPS[prev.role].length;
      if (prev.step >= totalSteps - 1) {
        markComplete(prev.role);
        return { active: false, step: 0, role: prev.role };
      }
      return { ...prev, step: prev.step + 1 };
    });
  }, []);

  const skip = React.useCallback(() => {
    setState((prev) => {
      if (prev.role) markComplete(prev.role);
      return { active: false, step: 0, role: prev.role };
    });
  }, []);

  const value = React.useMemo<OnboardingContextValue>(
    () => ({ state, start, next, skip, steps }),
    [state, start, next, skip, steps]
  );

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const ctx = React.useContext(OnboardingContext);
  if (!ctx) throw new Error("useOnboarding must be used within OnboardingProvider");
  return ctx;
}

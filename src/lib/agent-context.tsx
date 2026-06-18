"use client";

import * as React from "react";
import type {
  AgentState,
  AgentAction,
  AvailabilityStatus,
  QueueTab,
  AgentCase,
} from "@/lib/types/agent";

// ─── Reducer ──────────────────────────────────────────────────────────────────

function agentReducer(state: AgentState, action: AgentAction): AgentState {
  switch (action.type) {
    case "SET_AVAILABILITY":
      return { ...state, availability: action.payload };
    case "SET_FOCUS_INDEX":
      return { ...state, queueFocusIndex: action.payload };
    case "TOGGLE_PALETTE":
      return { ...state, commandPaletteOpen: !state.commandPaletteOpen };
    case "CLOSE_PALETTE":
      return { ...state, commandPaletteOpen: false };
    case "TOGGLE_DARK_MODE":
      return { ...state, darkMode: !state.darkMode };
    case "SET_DARK_MODE":
      return { ...state, darkMode: action.payload };
    case "SET_TAB":
      return { ...state, activeTab: action.payload, queueFocusIndex: 0 };
    case "SET_OFFLINE":
      return { ...state, isOffline: action.payload };
    case "SET_CONFIRM_MODAL":
      return { ...state, confirmModal: action.payload };
    case "SET_SLA_BREACH_COUNT":
      return { ...state, slaBreachCount: action.payload };
    default:
      return state;
  }
}

function buildInitialState(storedDarkMode: boolean): AgentState {
  return {
    availability: "available",
    queueFocusIndex: 0,
    commandPaletteOpen: false,
    activeTab: "all",
    darkMode: storedDarkMode,
    isOffline: false,
    offlineQueueCount: 0,
    slaBreachCount: 0,
    confirmModal: null,
  };
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface AgentContextValue {
  state: AgentState;
  dispatch: React.Dispatch<AgentAction>;
}

const AgentContext = React.createContext<AgentContextValue | null>(null);

export function AgentProvider({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = React.useState(false);

  const [state, dispatch] = React.useReducer(
    agentReducer,
    false,
    buildInitialState
  );

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem("agent-dark-mode");
      if (stored === "true") {
        dispatch({ type: "SET_DARK_MODE", payload: true });
      }
    } catch {
      // localStorage may be unavailable
    }
    setIsHydrated(true);
  }, []);

  React.useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem("agent-dark-mode", String(state.darkMode));
    } catch {
      // ignore
    }
  }, [state.darkMode, isHydrated]);

  React.useEffect(() => {
    const handleOffline = () => dispatch({ type: "SET_OFFLINE", payload: true });
    const handleOnline = () => dispatch({ type: "SET_OFFLINE", payload: false });
    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);
    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  return (
    <AgentContext.Provider value={{ state, dispatch }}>
      {children}
    </AgentContext.Provider>
  );
}

export function useAgent(): AgentContextValue {
  const ctx = React.useContext(AgentContext);
  if (!ctx) {
    throw new Error("useAgent must be used inside <AgentProvider>");
  }
  return ctx;
}

export function useAgentState(): AgentState {
  return useAgent().state;
}

export function useAgentDispatch(): React.Dispatch<AgentAction> {
  return useAgent().dispatch;
}

export function useFilteredCases(tab: QueueTab, cases: AgentCase[]) {
  return React.useMemo(() => {
    switch (tab) {
      case "action-required":
        return cases.filter((c) => c.status === "action-required");
      case "in-progress":
        return cases.filter((c) => c.status === "in-progress" || c.status === "under-review");
      case "awaiting-authority":
        return cases.filter(
          (c) =>
            c.status === "awaiting-response" ||
            c.status === "submitted-to-authority"
        );
      case "completed":
        return cases.filter((c) => c.status === "completed");
      case "all":
      default:
        return cases;
    }
  }, [tab, cases]);
}

export function useCaseCounts(cases: AgentCase[]) {
  return React.useMemo(() => {
    return {
      all: cases.length,
      actionRequired: cases.filter((c) => c.status === "action-required").length,
      inProgress: cases.filter(
        (c) => c.status === "in-progress" || c.status === "under-review"
      ).length,
      awaitingAuthority: cases.filter(
        (c) =>
          c.status === "awaiting-response" ||
          c.status === "submitted-to-authority"
      ).length,
      completed: cases.filter((c) => c.status === "completed").length,
    };
  }, [cases]);
}

export function useToggleAvailability() {
  const dispatch = useAgentDispatch();
  const { state } = useAgent();
  return React.useCallback(() => {
    dispatch({
      type: "SET_AVAILABILITY",
      payload: state.availability === "available" ? "away" : "available",
    });
  }, [dispatch, state.availability]);
}

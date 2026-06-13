"use client";

import * as React from "react";
import type {
  AgentState,
  AgentAction,
  AgentUser,
  AgentCase,
  AgentSettings,
  AvailabilityStatus,
  QueueTab,
} from "@/lib/types/agent";

const EMPTY_AGENT_USER: AgentUser = {
  id: "",
  fullName: "",
  firstName: "",
  initials: "",
  email: "",
  role: "AGENT",
  city: "",
  availability: "available",
  dailyCap: 8,
  acceptNewCases: true,
};

const DEFAULT_AGENT_SETTINGS: AgentSettings = {
  acceptNewCases: true,
  dailyCap: 8,
  notifications: {
    newCaseAssigned: true,
    clientReplied: true,
    slaApproaching: true,
    dailySummary: false,
  },
  appearance: {
    darkMode: false,
    compactTables: true,
  },
  security: {
    twoFactorEnabled: false,
    trustedDevicesCount: 0,
    passwordLastChangedLabel: "",
  },
};

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
    case "CHANGE_CASE_STATUS":
      return {
        ...state,
        cases: state.cases.map((c) =>
          c.code === action.payload.code
            ? { ...c, status: action.payload.status }
            : c
        ),
      };
    case "SET_SLA_BREACH_COUNT":
      return { ...state, slaBreachCount: action.payload };
    default:
      return state;
  }
}

// ─── Initial State ────────────────────────────────────────────────────────────

function buildInitialState(
  user: AgentUser,
  cases: AgentCase[],
  settings: AgentSettings,
  storedDarkMode: boolean
): AgentState {
  const slaBreachCount = cases.filter((c) => c.slaState === "over").length;
  return {
    user,
    cases,
    settings,
    availability: user.availability,
    queueFocusIndex: 0,
    commandPaletteOpen: false,
    activeTab: "all",
    darkMode: storedDarkMode,
    isOffline: false,
    offlineQueueCount: 0,
    slaBreachCount,
    confirmModal: null,
  };
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface AgentContextValue {
  state: AgentState;
  dispatch: React.Dispatch<AgentAction>;
}

const AgentContext = React.createContext<AgentContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

interface AgentProviderProps {
  children: React.ReactNode;
}

export function AgentProvider({ children }: AgentProviderProps) {
  const [isHydrated, setIsHydrated] = React.useState(false);

  const [state, dispatch] = React.useReducer(
    agentReducer,
    undefined,
    () => buildInitialState(EMPTY_AGENT_USER, [], DEFAULT_AGENT_SETTINGS, false)
  );

  // Hydrate dark mode from localStorage after mount
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

  // Persist dark mode to localStorage
  React.useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem("agent-dark-mode", String(state.darkMode));
    } catch {
      // ignore
    }
  }, [state.darkMode, isHydrated]);

  // Offline detection
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

// ─── Hooks ────────────────────────────────────────────────────────────────────

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

// ─── Derived selectors ────────────────────────────────────────────────────────

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

// Toggle availability helper
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

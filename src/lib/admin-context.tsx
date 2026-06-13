"use client";

import * as React from "react";
import type {
  AdminState,
  AdminAction,
  AdminUser,
  AdminSettings,
} from "@/lib/types/admin";

const EMPTY_ADMIN_USER: AdminUser = {
  id: "",
  fullName: "",
  firstName: "",
  initials: "",
  email: "",
  role: "MANAGER",
  lastLogin: "",
};

const DEFAULT_ADMIN_SETTINGS: AdminSettings = {
  acceptNewApps: true,
  guestApps: false,
  dataRetention: "24 months",
  compactTables: true,
  enforce2FA: false,
  sessionTimeout: 30,
  ipAllowlist: "",
  maintenanceMode: false,
};

// ─── Reducer ──────────────────────────────────────────────────────────────────

function adminReducer(state: AdminState, action: AdminAction): AdminState {
  switch (action.type) {
    case "TOGGLE_DARK_MODE":
      return { ...state, darkMode: !state.darkMode };
    case "SET_DARK_MODE":
      return { ...state, darkMode: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_OFFLINE":
      return { ...state, isOffline: action.payload };
    case "SET_CONFIRM_MODAL":
      return { ...state, confirmModal: action.payload };
    case "SET_PERMISSION_DIALOG":
      return { ...state, permissionDialog: action.payload };
    case "SET_BROADCAST_CONFIRM":
      return { ...state, broadcastConfirm: action.payload };
    case "SET_SCHEMA_PUBLISH":
      return { ...state, schemaPublishOpen: action.payload };
    case "SET_OVERSIGHT_TAB":
      return { ...state, oversightTab: action.payload };
    case "SET_AUDIT_FILTER":
      return { ...state, auditFilter: action.payload };
    case "SET_ACTIVE_SCHEMA_SERVICE":
      return {
        ...state,
        activeSchemaServiceId: action.payload,
        schemaFields: action.payload === null ? state.schemaFields : [],
      };
    case "UPDATE_SCHEMA_FIELDS":
      return { ...state, schemaFields: action.payload };
    case "UPDATE_SETTINGS":
      return { ...state, settings: { ...state.settings, ...action.payload } };
    case "DELETE_PRICING_ROW":
      return {
        ...state,
        pricingRows: state.pricingRows.filter((r) => r.id !== action.payload),
      };
    case "REMOVE_AGENT":
      return {
        ...state,
        agents: state.agents.filter((a) => a.id !== action.payload),
      };
    default:
      return state;
  }
}

// ─── Initial State ────────────────────────────────────────────────────────────

function buildInitialState(storedDarkMode: boolean): AdminState {
  return {
    user: EMPTY_ADMIN_USER,
    agents: [],
    metrics: [],
    weeklyBars: [],
    serviceMix: [],
    paymentMix: [],
    statusBreakdown: [],
    alerts: [],
    settings: DEFAULT_ADMIN_SETTINGS,
    services: [],
    activeSchemaServiceId: null,
    schemaFields: [],
    pricingRows: [],
    auditLog: [],
    oversightCases: [],
    broadcasts: [],
    darkMode: storedDarkMode,
    isOffline: false,
    loading: true,
    confirmModal: null,
    permissionDialog: null,
    broadcastConfirm: null,
    schemaPublishOpen: false,
    oversightTab: "all",
    auditFilter: "all",
  };
}

// ─── Context ──────────────────────────────────────────────────────────────────

const AdminStateCtx = React.createContext<AdminState | null>(null);
const AdminDispatchCtx = React.createContext<React.Dispatch<AdminAction> | null>(null);

const DARK_MODE_KEY = "admin-dark-mode";

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(
    adminReducer,
    true, // admin defaults dark — hydrated below
    (defaultDark) => buildInitialState(defaultDark)
  );

  // Hydrate dark mode from localStorage; default true for admin
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(DARK_MODE_KEY);
      const dark = stored === null ? true : stored === "true";
      dispatch({ type: "SET_DARK_MODE", payload: dark });
    } catch {
      // localStorage unavailable
    }
  }, []);

  // Persist dark mode changes
  React.useEffect(() => {
    try {
      localStorage.setItem(DARK_MODE_KEY, String(state.darkMode));
    } catch {
      // ignore
    }
  }, [state.darkMode]);

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
    <AdminStateCtx.Provider value={state}>
      <AdminDispatchCtx.Provider value={dispatch}>
        {children}
      </AdminDispatchCtx.Provider>
    </AdminStateCtx.Provider>
  );
}

// ─── Hooks ────────────────────────────────────────────────────────────────────

export function useAdminState(): AdminState {
  const ctx = React.useContext(AdminStateCtx);
  if (!ctx) throw new Error("useAdminState must be used within AdminProvider");
  return ctx;
}

export function useAdminDispatch(): React.Dispatch<AdminAction> {
  const ctx = React.useContext(AdminDispatchCtx);
  if (!ctx) throw new Error("useAdminDispatch must be used within AdminProvider");
  return ctx;
}

// Convenience derived hooks
export function useFilteredOversightCases() {
  const { oversightCases, oversightTab } = useAdminState();
  if (oversightTab === "all") return oversightCases;
  if (oversightTab === "attention")
    return oversightCases.filter(
      (c) => c.status === "sla-breach" || c.status === "escalated" || c.issue
    );
  if (oversightTab === "sla")
    return oversightCases.filter((c) => c.status === "sla-breach");
  if (oversightTab === "disputes")
    return oversightCases.filter((c) => c.status === "disputed");
  return oversightCases;
}

export function useFilteredAuditLog() {
  const { auditLog, auditFilter } = useAdminState();
  if (auditFilter === "all") return auditLog;
  return auditLog.filter((e) => e.kind === auditFilter);
}

export function useScheduledChanges() {
  const { pricingRows } = useAdminState();
  return pricingRows.filter((r) => r.scheduledChange);
}

"use client";

import * as React from "react";
import type {
  AdminState,
  AdminAction,
  FieldDef,
} from "@/lib/types/admin";

function adminReducer(state: AdminState, action: AdminAction): AdminState {
  switch (action.type) {
    case "TOGGLE_DARK_MODE":
      return { ...state, darkMode: !state.darkMode };
    case "SET_DARK_MODE":
      return { ...state, darkMode: action.payload };
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
        schemaFields: action.payload === null ? [] : state.schemaFields,
      };
    case "UPDATE_SCHEMA_FIELDS":
      return { ...state, schemaFields: action.payload };
    default:
      return state;
  }
}

function buildInitialState(storedDarkMode: boolean): AdminState {
  return {
    activeSchemaServiceId: null,
    schemaFields: [],
    darkMode: storedDarkMode,
    isOffline: false,
    confirmModal: null,
    permissionDialog: null,
    broadcastConfirm: null,
    schemaPublishOpen: false,
    oversightTab: "attention",
    auditFilter: "all",
  };
}

const AdminStateCtx = React.createContext<AdminState | null>(null);
const AdminDispatchCtx = React.createContext<React.Dispatch<AdminAction> | null>(null);

const DARK_MODE_KEY = "admin-dark-mode";

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(
    adminReducer,
    true,
    (defaultDark) => buildInitialState(defaultDark)
  );

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(DARK_MODE_KEY);
      const dark = stored === null ? true : stored === "true";
      dispatch({ type: "SET_DARK_MODE", payload: dark });
    } catch {
      // localStorage unavailable
    }
  }, []);

  React.useEffect(() => {
    try {
      localStorage.setItem(DARK_MODE_KEY, String(state.darkMode));
    } catch {
      // ignore
    }
  }, [state.darkMode]);

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

export function useSchemaFields(): FieldDef[] {
  return useAdminState().schemaFields;
}

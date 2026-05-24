"use client";

import * as React from "react";
import {
  AuthSession,
  AuthUiState,
  INITIAL_AUTH_UI_STATE,
  AUTH_SESSION_KEY,
  AUTH_VERIFIED_KEY,
} from "./auth-types";
import { getItem, setItem, removeItem } from "./storage";

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------
type AuthAction =
  | { type: "SET_SESSION"; payload: AuthSession }
  | { type: "CLEAR_SESSION" }
  | { type: "SET_EMAIL_VERIFIED" }
  | { type: "SET_UI"; payload: Partial<AuthUiState> }
  | { type: "RESET_UI" };

interface AuthState {
  session: AuthSession | null;
  uiState: AuthUiState;
}

function reducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "SET_SESSION":
      return { ...state, session: action.payload };
    case "CLEAR_SESSION":
      return { ...state, session: null };
    case "SET_EMAIL_VERIFIED":
      if (!state.session) return state;
      return { ...state, session: { ...state.session, isEmailVerified: true } };
    case "SET_UI":
      return { ...state, uiState: { ...state.uiState, ...action.payload } };
    case "RESET_UI":
      return { ...state, uiState: INITIAL_AUTH_UI_STATE };
    default:
      return state;
  }
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------
interface AuthContextValue {
  session: AuthSession | null;
  dispatch: React.Dispatch<AuthAction>;
  uiState: AuthUiState;
  setUiState: (patch: Partial<AuthUiState>) => void;
  isHydrated: boolean;
  signOut: () => void;
}

const AuthContext = React.createContext<AuthContextValue | null>(null);

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(reducer, {
    session: null,
    uiState: INITIAL_AUTH_UI_STATE,
  });
  const [isHydrated, setIsHydrated] = React.useState(false);

  // Hydrate session from localStorage on mount
  React.useEffect(() => {
    const raw = getItem(AUTH_SESSION_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as AuthSession;
        // Sync email verified flag
        const verified = getItem(AUTH_VERIFIED_KEY);
        if (verified === "true") {
          parsed.isEmailVerified = true;
        }
        dispatch({ type: "SET_SESSION", payload: parsed });
      } catch {
        removeItem(AUTH_SESSION_KEY);
      }
    }
    setIsHydrated(true);
  }, []);

  // Persist session to localStorage on change
  React.useEffect(() => {
    if (!isHydrated) return;
    if (state.session) {
      setItem(AUTH_SESSION_KEY, JSON.stringify(state.session));
      setItem(AUTH_VERIFIED_KEY, String(state.session.isEmailVerified));
    } else {
      removeItem(AUTH_SESSION_KEY);
    }
  }, [state.session, isHydrated]);

  const setUiState = React.useCallback((patch: Partial<AuthUiState>) => {
    dispatch({ type: "SET_UI", payload: patch });
  }, []);

  const signOut = React.useCallback(() => {
    dispatch({ type: "CLEAR_SESSION" });
    removeItem(AUTH_SESSION_KEY);
    removeItem(AUTH_VERIFIED_KEY);
  }, []);

  const value: AuthContextValue = React.useMemo(
    () => ({
      session: state.session,
      dispatch,
      uiState: state.uiState,
      setUiState,
      isHydrated,
      signOut,
    }),
    [state.session, state.uiState, isHydrated, setUiState, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------
export function useAuth(): AuthContextValue {
  const ctx = React.useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within <AuthProvider>");
  }
  return ctx;
}

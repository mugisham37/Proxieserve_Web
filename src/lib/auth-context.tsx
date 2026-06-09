"use client";

import * as React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { SESSION_INVALIDATED_EVENT } from "@/lib/api/client";
import {
  AuthSession,
  AuthUiState,
  INITIAL_AUTH_UI_STATE,
  SESSION_QUERY_KEY,
  STAFF_PRE_2FA_KEY,
} from "./auth-types";
import { useSession } from "@/hooks/useSession";

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------
type AuthAction =
  | { type: "HYDRATE_FROM_SERVER"; payload: AuthSession | null }
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
    case "HYDRATE_FROM_SERVER":
    case "SET_SESSION":
      return { ...state, session: action.payload };
    case "CLEAR_SESSION":
      return { ...state, session: null, uiState: INITIAL_AUTH_UI_STATE };
    case "SET_EMAIL_VERIFIED":
      if (!state.session) return state;
      return {
        ...state,
        session: { ...state.session, isEmailVerified: true },
        uiState: { ...state.uiState, showEmailVerifyBanner: false },
      };
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
  const queryClient = useQueryClient();
  const { session: serverSession, isLoading: isSessionLoading, isError: isSessionError } = useSession();
  const [state, dispatch] = React.useReducer(reducer, {
    session: null,
    uiState: INITIAL_AUTH_UI_STATE,
  });
  const isHydrated = !isSessionLoading;

  React.useEffect(() => {
    if (isSessionLoading || isSessionError) {
      return;
    }

    dispatch({ type: "HYDRATE_FROM_SERVER", payload: serverSession });
  }, [isSessionError, isSessionLoading, serverSession]);

  React.useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleSessionInvalidated = () => {
      dispatch({ type: "CLEAR_SESSION" });
      queryClient.setQueryData([...SESSION_QUERY_KEY], null);
      if (typeof window !== "undefined") {
        sessionStorage.removeItem(STAFF_PRE_2FA_KEY);
      }
    };

    window.addEventListener(SESSION_INVALIDATED_EVENT, handleSessionInvalidated);
    return () => {
      window.removeEventListener(SESSION_INVALIDATED_EVENT, handleSessionInvalidated);
    };
  }, [queryClient]);

  const setUiState = React.useCallback((patch: Partial<AuthUiState>) => {
    dispatch({ type: "SET_UI", payload: patch });
  }, []);

  const signOut = React.useCallback(() => {
    dispatch({ type: "CLEAR_SESSION" });
    queryClient.setQueryData([...SESSION_QUERY_KEY], null);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(STAFF_PRE_2FA_KEY);
    }
  }, [queryClient]);

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

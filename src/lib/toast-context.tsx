"use client";

import * as React from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ToastVariant = "default" | "success" | "error" | "warning";

export interface Toast {
  id: string;
  message: string;
  variant: ToastVariant;
  duration: number;
}

type ToastAction =
  | { type: "ADD"; payload: Toast }
  | { type: "REMOVE"; id: string };

// ─── Context ──────────────────────────────────────────────────────────────────

interface ToastContextValue {
  toasts: Toast[];
  toast: (message: string, options?: { variant?: ToastVariant; duration?: number }) => void;
  dismiss: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

function reducer(state: Toast[], action: ToastAction): Toast[] {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "REMOVE":
      return state.filter((t) => t.id !== action.id);
    default:
      return state;
  }
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, dispatch] = React.useReducer(reducer, []);

  const toast = React.useCallback(
    (message: string, options?: { variant?: ToastVariant; duration?: number }) => {
      const id = `t-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      const variant = options?.variant ?? "default";
      const duration = options?.duration ?? 4000;
      dispatch({ type: "ADD", payload: { id, message, variant, duration } });
    },
    []
  );

  const dismiss = React.useCallback((id: string) => {
    dispatch({ type: "REMOVE", id });
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

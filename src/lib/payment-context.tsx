"use client";

import * as React from "react";
import type { PaymentSession, PaymentMethod, PaymentOutcome } from "@/lib/types/payment";
import { PAY_SESSION_KEY } from "@/lib/types/payment";
function getDefaultSession(applicationId: string): PaymentSession {
  return {
    applicationId,
    trackingCode: applicationId,
    serviceName: "Government service",
    serviceFee: 0,
    governmentFee: 0,
    vatRate: 0.18,
    platformFee: 0,
    selectedMethod: null,
    status: "idle",
  };
}

/* ─── Actions ─── */

type PaymentAction =
  | { type: "SET_METHOD"; payload: PaymentMethod }
  | { type: "SET_STATUS"; payload: PaymentSession["status"] }
  | { type: "SET_TRANSACTION"; payload: { transactionId: string; receiptNumber: string; paidAt: string } }
  | { type: "PATCH"; payload: Partial<PaymentSession> }
  | { type: "HYDRATE"; payload: PaymentSession }
  | { type: "RESET" };

function reducer(state: PaymentSession, action: PaymentAction): PaymentSession {
  switch (action.type) {
    case "SET_METHOD":
      return { ...state, selectedMethod: action.payload };
    case "SET_STATUS":
      return { ...state, status: action.payload };
    case "SET_TRANSACTION":
      return {
        ...state,
        status: "success",
        transactionId: action.payload.transactionId,
        receiptNumber: action.payload.receiptNumber,
        paidAt: action.payload.paidAt,
      };
    case "PATCH":
      return { ...state, ...action.payload };
    case "HYDRATE":
      return action.payload;
    case "RESET":
      return { ...state, selectedMethod: null, status: "idle" };
    default:
      return state;
  }
}

/* ─── Context ─── */

interface PaymentContextValue {
  session: PaymentSession;
  dispatch: React.Dispatch<PaymentAction>;
}

const PaymentContext = React.createContext<PaymentContextValue | null>(null);

interface PaymentProviderProps {
  children: React.ReactNode;
  applicationId: string;
}

export function PaymentProvider({ children, applicationId }: PaymentProviderProps) {
  const initial = getDefaultSession(applicationId);

  const [session, dispatch] = React.useReducer(reducer, initial, (init) => {
    if (typeof window === "undefined") return init;
    try {
      const saved = sessionStorage.getItem(PAY_SESSION_KEY(applicationId));
      if (saved) {
        const parsed = JSON.parse(saved) as PaymentSession;
        // Only restore if same applicationId — prevents stale cross-session bleed
        if (parsed.applicationId === applicationId) return parsed;
      }
    } catch {
      // ignore
    }
    return init;
  });

  // Persist to sessionStorage on every change
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      sessionStorage.setItem(PAY_SESSION_KEY(applicationId), JSON.stringify(session));
    } catch {
      // ignore quota errors
    }
  }, [session, applicationId]);

  const value = React.useMemo(() => ({ session, dispatch }), [session]);

  return (
    <PaymentContext.Provider value={value}>
      {children}
    </PaymentContext.Provider>
  );
}

export function usePayment(): PaymentContextValue {
  const ctx = React.useContext(PaymentContext);
  if (!ctx) {
    throw new Error("usePayment must be used inside <PaymentProvider>");
  }
  return ctx;
}

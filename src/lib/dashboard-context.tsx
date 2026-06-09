"use client";

import * as React from "react";
import { SESSION_INVALIDATED_EVENT } from "@/lib/api/client";
import type { OptimisticMessage } from "@/lib/types/dashboard";

// ─── Types ────────────────────────────────────────────────────────────────────

interface DashboardContextValue {
  activeCode: string | null;
  setActiveCode: (code: string | null) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  unreadCount: number;
  setUnreadCount: (count: number) => void;
  actionCount: number;
  setActionCount: (count: number) => void;
  isOffline: boolean;
  lastSync: string | null;
  multiTabConflict: boolean;
  dismissMultiTabConflict: () => void;
  sessionExpired: boolean;
  optimisticMessages: OptimisticMessage[];
  addOptimisticMessage: (msg: OptimisticMessage) => void;
  resolveOptimisticMessage: (id: string, status: "sent" | "failed") => void;
  removeOptimisticMessage: (id: string) => void;
  lastSeen: string | null;
}

// ─── Context ─────────────────────────────────────────────────────────────────

const DashboardContext = React.createContext<DashboardContextValue | null>(null);

export function useDashboard(): DashboardContextValue {
  const ctx = React.useContext(DashboardContext);
  if (!ctx) {
    throw new Error("useDashboard must be used within <DashboardProvider>");
  }
  return ctx;
}

// ─── Provider ─────────────────────────────────────────────────────────────────

interface DashboardProviderProps {
  children: React.ReactNode;
  initialUnreadCount?: number;
  initialActionCount?: number;
}

const LAST_SEEN_KEY = "proxi:dashboard:last_seen";
const LONG_ABSENCE_DISMISSED_KEY = "proxi:dashboard:absence_dismissed";
const ABSENCE_THRESHOLD_DAYS = 90;

export function DashboardProvider({
  children,
  initialUnreadCount = 0,
  initialActionCount = 0,
}: DashboardProviderProps) {
  const [activeCode, setActiveCode] = React.useState<string | null>(null);
  const [activeTab, setActiveTab] = React.useState("overview");
  const [unreadCount, setUnreadCount] = React.useState(initialUnreadCount);
  const [actionCount, setActionCount] = React.useState(initialActionCount);
  const [isOffline, setIsOffline] = React.useState(false);
  const [lastSync, setLastSync] = React.useState<string | null>(null);
  const [multiTabConflict, setMultiTabConflict] = React.useState(false);
  const [sessionExpired, setSessionExpired] = React.useState(false);
  const [optimisticMessages, setOptimisticMessages] = React.useState<OptimisticMessage[]>([]);
  const [lastSeen, setLastSeen] = React.useState<string | null>(null);

  const channelRef = React.useRef<BroadcastChannel | null>(null);

  // ── Offline detection ──────────────────────────────────────────────────────
  React.useEffect(() => {
    const handleOffline = () => {
      setIsOffline(true);
    };
    const handleOnline = () => {
      setIsOffline(false);
      setLastSync(new Date().toLocaleTimeString("en-RW", { hour: "2-digit", minute: "2-digit" }));
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);
    setIsOffline(!navigator.onLine);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  // ── Session invalidation ───────────────────────────────────────────────────
  React.useEffect(() => {
    const handle = () => setSessionExpired(true);
    window.addEventListener(SESSION_INVALIDATED_EVENT, handle);
    return () => window.removeEventListener(SESSION_INVALIDATED_EVENT, handle);
  }, []);

  // ── BroadcastChannel ───────────────────────────────────────────────────────
  React.useEffect(() => {
    if (typeof BroadcastChannel === "undefined") return;

    const channel = new BroadcastChannel("proxi:dashboard");
    channelRef.current = channel;

    channel.onmessage = (e) => {
      if (e.data?.type === "SESSION_CONFLICT") {
        setMultiTabConflict(true);
      }
      if (e.data?.type === "UNREAD_SYNC" && typeof e.data.count === "number") {
        setUnreadCount(e.data.count);
      }
    };

    // Notify other tabs this one is active
    channel.postMessage({ type: "TAB_ACTIVE" });

    return () => channel.close();
  }, []);

  // ── Last seen / long-absence ───────────────────────────────────────────────
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem(LAST_SEEN_KEY);
    if (stored) {
      setLastSeen(stored);
    }

    // Record this visit
    localStorage.setItem(LAST_SEEN_KEY, new Date().toISOString());
  }, []);

  // ─── Callbacks ──────────────────────────────────────────────────────────────

  const dismissMultiTabConflict = React.useCallback(() => {
    setMultiTabConflict(false);
    channelRef.current?.postMessage({ type: "SESSION_CONFLICT" });
  }, []);

  const addOptimisticMessage = React.useCallback((msg: OptimisticMessage) => {
    setOptimisticMessages((prev) => [...prev, msg]);
  }, []);

  const resolveOptimisticMessage = React.useCallback(
    (id: string, status: "sent" | "failed") => {
      setOptimisticMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, status } : m))
      );
    },
    []
  );

  const removeOptimisticMessage = React.useCallback((id: string) => {
    setOptimisticMessages((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const value: DashboardContextValue = React.useMemo(
    () => ({
      activeCode,
      setActiveCode,
      activeTab,
      setActiveTab,
      unreadCount,
      setUnreadCount,
      actionCount,
      setActionCount,
      isOffline,
      lastSync,
      multiTabConflict,
      dismissMultiTabConflict,
      sessionExpired,
      optimisticMessages,
      addOptimisticMessage,
      resolveOptimisticMessage,
      removeOptimisticMessage,
      lastSeen,
    }),
    [
      activeCode,
      activeTab,
      unreadCount,
      actionCount,
      isOffline,
      lastSync,
      multiTabConflict,
      dismissMultiTabConflict,
      sessionExpired,
      optimisticMessages,
      addOptimisticMessage,
      resolveOptimisticMessage,
      removeOptimisticMessage,
      lastSeen,
    ]
  );

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

// ─── Long absence helper ──────────────────────────────────────────────────────

export function isLongAbsence(lastSeenIso: string | null): boolean {
  if (!lastSeenIso) return false;
  const days = (Date.now() - new Date(lastSeenIso).getTime()) / (1000 * 60 * 60 * 24);
  return days >= ABSENCE_THRESHOLD_DAYS;
}

export function isAbsenceDismissed(): boolean {
  if (typeof window === "undefined") return true;
  const raw = localStorage.getItem(LONG_ABSENCE_DISMISSED_KEY);
  if (!raw) return false;
  const dismissedAt = new Date(raw).getTime();
  const days = (Date.now() - dismissedAt) / (1000 * 60 * 60 * 24);
  return days < ABSENCE_THRESHOLD_DAYS;
}

export function dismissAbsenceBanner(): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(LONG_ABSENCE_DISMISSED_KEY, new Date().toISOString());
}

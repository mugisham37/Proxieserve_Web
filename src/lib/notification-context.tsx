"use client";

import * as React from "react";
import { setItem, getItem } from "@/lib/storage";

// ─── Types ────────────────────────────────────────────────────────────────────

export type NotifType =
  | "status_change"
  | "payment"
  | "message"
  | "action_required"
  | "broadcast";

export interface Notification {
  id: string;
  type: NotifType;
  title: string;
  body: string;
  applicationCode?: string;
  read: boolean;
  createdAt: Date;
}

interface NotificationState {
  notifications: Notification[];
}

type NotificationAction =
  | { type: "ADD"; payload: Omit<Notification, "id" | "read" | "createdAt"> }
  | { type: "MARK_READ"; id: string }
  | { type: "MARK_ALL_READ" }
  | { type: "CLEAR_ALL" };

const STORAGE_KEY = "hebuza:notifRead";

function reducer(state: NotificationState, action: NotificationAction): NotificationState {
  switch (action.type) {
    case "ADD":
      return {
        notifications: [
          {
            ...action.payload,
            id: `n-${Date.now()}-${Math.random().toString(36).slice(2)}`,
            read: false,
            createdAt: new Date(),
          },
          ...state.notifications,
        ],
      };
    case "MARK_READ":
      return {
        notifications: state.notifications.map((n) =>
          n.id === action.id ? { ...n, read: true } : n
        ),
      };
    case "MARK_ALL_READ":
      return { notifications: state.notifications.map((n) => ({ ...n, read: true })) };
    case "CLEAR_ALL":
      return { notifications: [] };
    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface NotificationContextValue {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (payload: Omit<Notification, "id" | "read" | "createdAt">) => void;
  markRead: (id: string) => void;
  markAllRead: () => void;
  clearAll: () => void;
}

const NotificationContext = React.createContext<NotificationContextValue | null>(null);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  // Hydrate read state from localStorage so refreshes don't show stale unread badges
  const [state, dispatch] = React.useReducer(reducer, { notifications: [] });

  // Persist read IDs on change
  React.useEffect(() => {
    const readIds = state.notifications.filter((n) => n.read).map((n) => n.id);
    setItem(STORAGE_KEY, JSON.stringify(readIds));
  }, [state.notifications]);

  const unreadCount = state.notifications.filter((n) => !n.read).length;

  const value = React.useMemo<NotificationContextValue>(
    () => ({
      notifications: state.notifications,
      unreadCount,
      addNotification: (payload) => dispatch({ type: "ADD", payload }),
      markRead: (id) => dispatch({ type: "MARK_READ", id }),
      markAllRead: () => dispatch({ type: "MARK_ALL_READ" }),
      clearAll: () => dispatch({ type: "CLEAR_ALL" }),
    }),
    [state.notifications, unreadCount]
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const ctx = React.useContext(NotificationContext);
  if (!ctx) throw new Error("useNotifications must be used within NotificationProvider");
  return ctx;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

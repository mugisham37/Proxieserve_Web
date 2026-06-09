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

// ─── Demo seed data ───────────────────────────────────────────────────────────

const DEMO: Notification[] = [
  {
    id: "n1",
    type: "status_change",
    title: "Status changed to In Progress",
    body: "Passport renewal · PRX-2026-00483",
    applicationCode: "PRX-2026-00483",
    read: false,
    createdAt: new Date(Date.now() - 5 * 60 * 1000),
  },
  {
    id: "n2",
    type: "payment",
    title: "Payment received · RWF 15,000",
    body: "MTN MoMo · receipt available",
    applicationCode: "PRX-2026-00483",
    read: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: "n3",
    type: "message",
    title: "Agent sent you a message",
    body: '"Got your forms — sending them today."',
    applicationCode: "PRX-2026-00483",
    read: true,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
];

const STORAGE_KEY = "proxi:notifRead";

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
  const [state, dispatch] = React.useReducer(reducer, undefined, () => {
    const readIds = getReadIds();
    return {
      notifications: DEMO.map((n) => ({
        ...n,
        read: readIds.has(n.id) || n.read,
      })),
    };
  });

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

function getReadIds(): Set<string> {
  try {
    const raw = getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    return new Set(Array.isArray(parsed) ? parsed : []);
  } catch {
    return new Set();
  }
}

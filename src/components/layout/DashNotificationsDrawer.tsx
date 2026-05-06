"use client";

import { MkIcon } from "@/components/atoms/MkIcon";
import { NotifItem } from "@/components/molecules/NotifItem";
import { useDashboardUI } from "@/hooks/useDashboardUI";
import { DASH_NOTIFICATIONS } from "@/lib/data/dashboard";
import type { NotifTab } from "@/types";

const TABS: { id: NotifTab; label: string }[] = [
  { id: "all", label: "All" },
  { id: "actions", label: "Needs attention" },
  { id: "wins", label: "Wins" },
];

export function DashNotificationsDrawer() {
  const { notifOpen, setNotifOpen, notifTab, setNotifTab } = useDashboardUI();

  if (!notifOpen) return null;

  const filtered = DASH_NOTIFICATIONS.filter((n) => {
    if (notifTab === "actions") return n.type === "warning" || n.type === "danger";
    if (notifTab === "wins") return n.type === "success";
    return true;
  });

  return (
    <div
      className="fixed inset-0 z-[200] flex justify-end"
      style={{ background: "rgba(0,0,0,0.4)" }}
      onClick={() => setNotifOpen(false)}
    >
      <div
        className="h-full flex flex-col w-[380px] max-w-full"
        style={{
          background: "var(--surface)",
          borderLeft: "1px solid var(--border)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4 flex-shrink-0"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <h2 className="text-[16px] font-semibold">Notifications</h2>
          <button
            className="flex rounded p-1 transition-colors"
            style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-subtle)" }}
            onClick={() => setNotifOpen(false)}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--surface-2)";
              (e.currentTarget as HTMLElement).style.color = "var(--text)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "none";
              (e.currentTarget as HTMLElement).style.color = "var(--text-subtle)";
            }}
          >
            <MkIcon name="x" size={18} />
          </button>
        </div>

        {/* Tabs */}
        <div
          className="flex flex-shrink-0"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className="flex-1 py-2.5 text-[13px] font-medium border-b-2 transition-colors cursor-pointer"
              style={{
                background: "none",
                border: "none",
                borderBottom: notifTab === tab.id ? "2px solid var(--brand)" : "2px solid transparent",
                color: notifTab === tab.id ? "var(--brand)" : "var(--text-muted)",
                fontFamily: "inherit",
                cursor: "pointer",
              }}
              onClick={() => setNotifTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="text-center py-8 text-[13px]" style={{ color: "var(--text-subtle)" }}>
              No notifications
            </div>
          ) : (
            filtered.map((n, i) => <NotifItem key={i} notif={n} />)
          )}
        </div>
      </div>
    </div>
  );
}

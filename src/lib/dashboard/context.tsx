"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { NotifTab } from "@/types";

interface DashboardUIState {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (v: boolean) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (v: boolean) => void;
  notifOpen: boolean;
  setNotifOpen: (v: boolean) => void;
  notifTab: NotifTab;
  setNotifTab: (t: NotifTab) => void;
  copilotOpen: boolean;
  setCopilotOpen: (v: boolean) => void;
}

const DashboardUIContext = createContext<DashboardUIState | null>(null);

export function DashboardUIProvider({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsedState] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifTab, setNotifTab] = useState<NotifTab>("all");
  const [copilotOpen, setCopilotOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("dash-sidebar-collapsed");
    if (stored !== null) setSidebarCollapsedState(stored === "true");
  }, []);

  const setSidebarCollapsed = (v: boolean) => {
    setSidebarCollapsedState(v);
    localStorage.setItem("dash-sidebar-collapsed", String(v));
  };

  return (
    <DashboardUIContext.Provider
      value={{
        sidebarCollapsed,
        setSidebarCollapsed,
        mobileMenuOpen,
        setMobileMenuOpen,
        notifOpen,
        setNotifOpen,
        notifTab,
        setNotifTab,
        copilotOpen,
        setCopilotOpen,
      }}
    >
      {children}
    </DashboardUIContext.Provider>
  );
}

export function useDashboardUI() {
  const ctx = useContext(DashboardUIContext);
  if (!ctx) throw new Error("useDashboardUI must be used inside DashboardUIProvider");
  return ctx;
}

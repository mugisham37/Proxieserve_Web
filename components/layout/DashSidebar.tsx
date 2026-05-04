"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MkIcon } from "@/components/atoms/MkIcon";
import { useDashboardUI } from "@/hooks/useDashboardUI";
import { DASH_NAV_ITEMS } from "@/lib/data/dashboard";

export function DashSidebar() {
  const { sidebarCollapsed, setSidebarCollapsed, mobileMenuOpen } = useDashboardUI();
  const pathname = usePathname();

  return (
    <aside
      className={[
        "flex flex-col h-screen flex-shrink-0 overflow-y-auto transition-all duration-200",
        "fixed z-[100] md:sticky md:top-0",
        sidebarCollapsed ? "w-16" : "w-[240px]",
        mobileMenuOpen ? "left-0" : "-left-60 md:left-0",
      ].join(" ")}
      style={{ background: "var(--surface)", borderRight: "1px solid var(--border)" }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 min-h-[56px] flex-shrink-0"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-[16px] font-bold no-underline overflow-hidden whitespace-nowrap"
          style={{ color: "var(--text)" }}
        >
          <svg width="24" height="24" viewBox="0 0 28 28" fill="none" aria-hidden>
            <circle cx="14" cy="14" r="12" stroke="var(--brand)" strokeWidth="2" />
            <circle cx="14" cy="14" r="5" fill="var(--brand)" />
          </svg>
          {!sidebarCollapsed && <span>SolAI</span>}
        </Link>
        <button
          className="w-7 h-7 rounded-[var(--radius-sm)] flex items-center justify-center flex-shrink-0 transition-colors"
          style={{
            background: "none",
            border: "1px solid var(--border)",
            cursor: "pointer",
            color: "var(--text-subtle)",
          }}
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          aria-label="Toggle sidebar"
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "var(--surface-2)";
            (e.currentTarget as HTMLElement).style.color = "var(--text)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "none";
            (e.currentTarget as HTMLElement).style.color = "var(--text-subtle)";
          }}
        >
          <MkIcon name={sidebarCollapsed ? "chevronRight" : "panelLeft"} size={16} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-2 flex flex-col gap-0.5">
        {DASH_NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.id}
              href={item.href}
              title={sidebarCollapsed ? item.label : undefined}
              className={[
                "flex items-center gap-2.5 px-3 py-2 rounded-[var(--radius-md)] text-[14px] font-medium no-underline transition-all duration-100 overflow-hidden whitespace-nowrap",
                sidebarCollapsed ? "justify-center px-2.5" : "",
                isActive
                  ? "text-[var(--text)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text)]",
              ].join(" ")}
              style={
                isActive
                  ? { background: "var(--brand-soft)" }
                  : undefined
              }
              onMouseEnter={(e) => {
                if (!isActive) (e.currentTarget as HTMLElement).style.background = "var(--surface-2)";
              }}
              onMouseLeave={(e) => {
                if (!isActive) (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              <span style={isActive ? { color: "var(--brand)" } : undefined}>
                <MkIcon name={item.icon} size={18} />
              </span>
              {!sidebarCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 flex-shrink-0" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-semibold flex-shrink-0"
            style={{ background: "var(--brand-soft)", color: "var(--brand)" }}
          >
            IB
          </div>
          {!sidebarCollapsed && (
            <div>
              <strong className="block text-[13px]" style={{ color: "var(--text)" }}>
                Inema Boutique
              </strong>
              <span className="text-[11px]" style={{ color: "var(--text-subtle)" }}>
                Growth plan
              </span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

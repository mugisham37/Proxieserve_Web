"use client";

import * as React from "react";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { StatTile } from "@/components/atoms/admin/StatTile";
import { Switch } from "@/components/atoms/shared/Switch";
import { PerfBarChart } from "@/components/molecules/agent/PerfBarChart";
import { Leaderboard } from "@/components/molecules/agent/Leaderboard";
import { useAgentState, useAgentDispatch } from "@/lib/agent-context";
import type { AgentSettings } from "@/lib/types/agent";

const DEFAULT_AGENT_SETTINGS: AgentSettings = {
  acceptNewCases: true,
  dailyCap: 8,
  notifications: {
    newCaseAssigned: true,
    clientReplied: true,
    slaApproaching: true,
    dailySummary: false,
  },
  appearance: {
    darkMode: false,
    compactTables: true,
  },
  security: {
    twoFactorEnabled: false,
    trustedDevicesCount: 0,
    passwordLastChangedLabel: "—",
  },
};

// ─── Settings Row ─────────────────────────────────────────────────────────────

function SettingsRow({
  label,
  description,
  control,
}: {
  label: string;
  description: string;
  control: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-[16px] py-[14px] border-b border-[var(--rule)] last:border-0">
      <div>
        <p className="font-sans text-[14px] font-medium text-[var(--ink)]">{label}</p>
        <p className="font-sans text-[12px] text-[var(--ink-muted)]">{description}</p>
      </div>
      <div className="shrink-0">{control}</div>
    </div>
  );
}

function SettingsSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-[32px]">
      <h3 className="font-mono text-[10px] tracking-[0.12em] uppercase text-[var(--ink-muted)] mb-[4px]">
        {title}
      </h3>
      <div className="bg-[var(--paper)] rounded-[var(--r-lg)] border border-[var(--rule)] px-[18px]">
        {children}
      </div>
    </div>
  );
}

// ─── Performance Page ─────────────────────────────────────────────────────────

export default function PerformancePage() {
  const { darkMode } = useAgentState();
  const dispatch = useAgentDispatch();

  const [settings, setSettings] = React.useState(DEFAULT_AGENT_SETTINGS);
  const [activeChip, setActiveChip] = React.useState<"month" | "quarter">("month");

  const toggleNotif = (key: keyof typeof settings.notifications) => {
    setSettings((s) => ({
      ...s,
      notifications: { ...s.notifications, [key]: !s.notifications[key] },
    }));
  };

  const toggleAppearance = (key: keyof typeof settings.appearance) => {
    if (key === "darkMode") {
      dispatch({ type: "TOGGLE_DARK_MODE" });
    }
    setSettings((s) => ({
      ...s,
      appearance: { ...s.appearance, [key]: !s.appearance[key] },
    }));
  };

  return (
    <div className="px-[20px] min-[980px]:px-[32px] py-[28px]">
      {/* Header */}
      <div className="flex items-start justify-between gap-[16px] mb-[28px] flex-wrap">
        <div>
          <h1 className="font-serif text-[28px] min-[980px]:text-[34px] font-normal text-[var(--ink)] mb-[6px]">
            Your <em className="italic font-normal">performance</em>
          </h1>
          <p className="font-mono text-[11px] tracking-[0.1em] uppercase text-[var(--ink-muted)]">
            THIS MONTH · MAY 2026 · YOUR OWN METRICS ONLY
          </p>
        </div>
        {/* Period chips */}
        <div className="flex items-center gap-[6px]" role="group" aria-label="Time period">
          {(["month", "quarter"] as const).map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={activeChip === c}
              onClick={() => setActiveChip(c)}
              className={cn(
                "px-[14px] h-[32px] rounded-[var(--r-pill)]",
                "font-sans text-[12px] font-medium capitalize",
                "transition-colors duration-[var(--m-fast)]",
                "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]",
                activeChip === c
                  ? "bg-[var(--ink)] text-[var(--paper)]"
                  : "border border-[var(--rule)] text-[var(--ink-muted)] hover:bg-[var(--paper)] hover:text-[var(--ink)]"
              )}
            >
              {c === "month" ? "This month" : "Quarter"}
            </button>
          ))}
        </div>
      </div>

      {/* Stat tiles */}
      <section aria-label="Performance metrics" className="mb-[32px]">
        <div className="grid grid-cols-2 min-[760px]:grid-cols-4 gap-[12px]">
          <StatTile label="Completed" value={0} delta="no data yet" />
          <StatTile label="Avg turnaround" value="—" delta="no data yet" />
          <StatTile label="On-time SLA" value="—" delta="target 90%" deltaColor="muted" />
          <StatTile label="Client rating" value="—" delta="no ratings yet" variant="brand" />
        </div>
      </section>

      {/* Charts grid */}
      <section aria-label="Performance charts" className="mb-[40px]">
        <div className="grid min-[900px]:grid-cols-[1.4fr_1fr] gap-[20px]">
          {/* Bar chart */}
          <div className="bg-[var(--paper)] rounded-[var(--r-lg)] border border-[var(--rule)] p-[20px]">
            <h2 className="font-serif text-[18px] font-normal text-[var(--ink)] mb-[4px]">
              Cases completed <em className="italic font-normal">per week</em>
            </h2>
            <p className="font-mono text-[10px] tracking-[0.1em] uppercase text-[var(--ink-muted)] mb-[20px]">
              Last 6 weeks
            </p>
            <PerfBarChart bars={[]} />
          </div>

          {/* Leaderboard */}
          <div className="bg-[var(--paper)] rounded-[var(--r-lg)] border border-[var(--rule)] p-[20px]">
            <h2 className="font-serif text-[18px] font-normal text-[var(--ink)] mb-[4px]">
              Team <em className="italic font-normal">leaderboard</em>
            </h2>
            <p className="font-mono text-[10px] tracking-[0.1em] uppercase text-[var(--ink-muted)] mb-[16px]">
              Completed this month · anonymised ranks
            </p>
            <Leaderboard entries={[]} />
          </div>
        </div>
      </section>

      {/* Settings */}
      <section id="settings" aria-label="Agent settings" className="max-w-[680px]">
        <h2 className="font-serif text-[24px] font-normal text-[var(--ink)] mb-[4px]">
          Agent <em className="italic font-normal">settings</em>
        </h2>
        <p className="font-sans text-[13.5px] text-[var(--ink-muted)] mb-[28px]">
          Availability, notifications, and your security.
        </p>

        <SettingsSection title="Availability">
          <SettingsRow
            label="Accept new case assignments"
            description="When off, the dispatcher skips you for new work"
            control={
              <Switch
                checked={settings.acceptNewCases}
                onChange={(v) => setSettings((s) => ({ ...s, acceptNewCases: v }))}
                label="Accept new case assignments"
              />
            }
          />
          <SettingsRow
            label="Daily case cap"
            description="Max new cases assigned per day"
            control={
              <select
                aria-label="Daily case cap"
                value={settings.dailyCap ?? "none"}
                onChange={(e) => {
                  const val = e.target.value;
                  setSettings((s) => ({
                    ...s,
                    dailyCap: val === "none" ? null : Number(val),
                  }));
                }}
                className={cn(
                  "px-[10px] h-[32px] rounded-[var(--r-pill)]",
                  "border border-[var(--rule)]",
                  "font-sans text-[13px] text-[var(--ink)] bg-[var(--paper)]",
                  "focus:outline-none focus:border-[var(--ink)]"
                )}
              >
                <option value="5">5</option>
                <option value="8">8</option>
                <option value="10">10</option>
                <option value="none">No cap</option>
              </select>
            }
          />
        </SettingsSection>

        <SettingsSection title="Notifications">
          <SettingsRow
            label="New case assigned"
            description="Push + email"
            control={
              <Switch
                checked={settings.notifications.newCaseAssigned}
                onChange={() => toggleNotif("newCaseAssigned")}
                label="New case assigned notifications"
              />
            }
          />
          <SettingsRow
            label="Client replied"
            description="Push only"
            control={
              <Switch
                checked={settings.notifications.clientReplied}
                onChange={() => toggleNotif("clientReplied")}
                label="Client replied notifications"
              />
            }
          />
          <SettingsRow
            label="SLA approaching breach"
            description="Push + email · 4h before"
            control={
              <Switch
                checked={settings.notifications.slaApproaching}
                onChange={() => toggleNotif("slaApproaching")}
                label="SLA approaching notifications"
              />
            }
          />
          <SettingsRow
            label="Daily summary"
            description="Email at 8:00 CAT"
            control={
              <Switch
                checked={settings.notifications.dailySummary}
                onChange={() => toggleNotif("dailySummary")}
                label="Daily summary email"
              />
            }
          />
        </SettingsSection>

        <SettingsSection title="Appearance">
          <SettingsRow
            label="Dark mode"
            description="Easier on the eyes for long shifts"
            control={
              <Switch
                checked={darkMode}
                onChange={() => toggleAppearance("darkMode")}
                label="Dark mode"
              />
            }
          />
          <SettingsRow
            label="Compact tables"
            description="More rows per screen"
            control={
              <Switch
                checked={settings.appearance.compactTables}
                onChange={() => toggleAppearance("compactTables")}
                label="Compact tables"
              />
            }
          />
        </SettingsSection>

        <SettingsSection title="Security">
          <SettingsRow
            label="Two-factor authentication"
            description="Required for all staff · authenticator app"
            control={
              <span className="inline-flex items-center px-[10px] h-[24px] rounded-[var(--r-pill)] bg-[var(--ok-soft)] text-[var(--ok)] font-mono text-[11px] font-medium">
                On
              </span>
            }
          />
          <SettingsRow
            label="Trusted devices"
            description={`${settings.security.trustedDevicesCount} devices · this MacBook + your phone`}
            control={
              <button
                type="button"
                className={cn(
                  "px-[12px] h-[30px] rounded-[var(--r-pill)]",
                  "border border-[var(--rule)]",
                  "font-sans text-[12px] text-[var(--ink-muted)]",
                  "transition-colors duration-[var(--m-fast)]",
                  "hover:bg-[var(--cream)] hover:text-[var(--ink)]",
                  "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
                )}
              >
                Manage
              </button>
            }
          />
          <SettingsRow
            label="Change password"
            description={`Last changed ${settings.security.passwordLastChangedLabel}`}
            control={
              <button
                type="button"
                className={cn(
                  "px-[12px] h-[30px] rounded-[var(--r-pill)]",
                  "border border-[var(--rule)]",
                  "font-sans text-[12px] text-[var(--ink-muted)]",
                  "transition-colors duration-[var(--m-fast)]",
                  "hover:bg-[var(--cream)] hover:text-[var(--ink)]",
                  "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
                )}
              >
                Change
              </button>
            }
          />
        </SettingsSection>

        {/* Sign out */}
        <button
          type="button"
          aria-label="Sign out of all devices"
          className={cn(
            "flex items-center gap-[8px]",
            "px-[16px] h-[40px] rounded-[var(--r-pill)]",
            "border border-[var(--danger)]/50 text-[var(--danger)]",
            "font-sans text-[13px]",
            "transition-colors duration-[var(--m-fast)]",
            "hover:bg-[var(--danger-soft)]",
            "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
          )}
        >
          <LogOut size={14} aria-hidden="true" />
          Sign out of all devices
        </button>
      </section>
    </div>
  );
}

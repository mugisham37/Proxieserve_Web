"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/atoms/Switch";
import { AppButton } from "@/components/atoms/AppButton";
import { BroadcastComposer } from "@/components/organisms/admin/BroadcastComposer";
import { RecentBroadcastRow } from "@/components/molecules/RecentBroadcastRow";
import { MaintenancePanel } from "@/components/molecules/MaintenancePanel";
import { useAdminState, useAdminDispatch } from "@/lib/admin-context";

const DATA_RETENTION_OPTIONS = [
  { value: "12-months", label: "12 months" },
  { value: "24-months", label: "24 months" },
  { value: "36-months", label: "36 months" },
  { value: "forever", label: "Forever" },
];

export function BroadcastsSettings() {
  const { broadcasts, settings } = useAdminState();
  const dispatch = useAdminDispatch();

  function patchSettings(patch: Parameters<typeof dispatch>[0] & { type: "UPDATE_SETTINGS" }) {
    dispatch(patch);
  }

  return (
    <div className="px-[20px] min-[980px]:px-[40px] py-[28px] flex flex-col gap-[32px]">
      {/* Page header */}
      <div>
        <h1 className="font-serif text-[26px] font-normal text-[var(--ink)]">
          Broadcasts & Settings
        </h1>
        <p className="font-sans text-[13px] text-[var(--ink-muted)] mt-[2px]">
          Send messages to users and configure platform behaviour
        </p>
      </div>

      {/* Broadcast composer */}
      <section aria-label="Broadcast composer">
        <h2 className="font-mono text-[11px] tracking-[0.08em] uppercase text-[var(--ink-muted)] mb-[14px]">
          Compose broadcast
        </h2>
        <BroadcastComposer />
      </section>

      {/* Recent broadcasts */}
      <section aria-label="Recent broadcasts">
        <h2 className="font-mono text-[11px] tracking-[0.08em] uppercase text-[var(--ink-muted)] mb-[14px]">
          Recent broadcasts
        </h2>
        <div className="rounded-[var(--r-lg)] border border-[var(--rule)] bg-[var(--paper)] overflow-x-auto">
          <table className="w-full min-w-[640px]" aria-label="Recent broadcasts">
            <thead>
              <tr className="border-b border-[var(--rule)]">
                {[
                  { label: "Audience", align: "left" },
                  { label: "Channels", align: "left" },
                  { label: "Message", align: "left" },
                  { label: "Sent at", align: "left" },
                  { label: "Reach", align: "right" },
                ].map((col) => (
                  <th
                    key={col.label}
                    scope="col"
                    className={cn(
                      "px-[12px] py-[10px] first:pl-[16px] last:pr-[16px]",
                      "font-mono text-[10px] tracking-[0.06em] uppercase text-[var(--ink-muted)]",
                      col.align === "right" ? "text-right" : "text-left"
                    )}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {broadcasts.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-[16px] py-[40px] text-center font-sans text-[13px] text-[var(--ink-muted)]"
                  >
                    No broadcasts sent yet
                  </td>
                </tr>
              ) : (
                broadcasts.map((record) => (
                  <RecentBroadcastRow key={record.id} record={record} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Platform settings */}
      <section aria-label="Platform settings">
        <h2 className="font-mono text-[11px] tracking-[0.08em] uppercase text-[var(--ink-muted)] mb-[14px]">
          Platform settings
        </h2>

        <div className="flex flex-col gap-[12px]">
          {/* General */}
          <SettingsGroup title="General">
            <SettingRow
              label="Accept new applications"
              description="Allow clients to submit new applications on the platform"
            >
              <Switch
                checked={settings.acceptNewApps}
                onChange={(val) =>
                  dispatch({ type: "UPDATE_SETTINGS", payload: { acceptNewApps: val } })
                }
              />
            </SettingRow>
            <SettingRow
              label="Guest applications"
              description="Allow unregistered users to submit applications"
            >
              <Switch
                checked={settings.guestApps}
                onChange={(val) =>
                  dispatch({ type: "UPDATE_SETTINGS", payload: { guestApps: val } })
                }
              />
            </SettingRow>
            <SettingRow
              label="Data retention"
              description="How long to retain completed application data"
            >
              <select
                value={settings.dataRetention}
                onChange={(e) =>
                  dispatch({
                    type: "UPDATE_SETTINGS",
                    payload: { dataRetention: e.target.value },
                  })
                }
                aria-label="Data retention period"
                className={cn(
                  "h-[34px] px-[10px]",
                  "bg-[var(--cream)] border border-[var(--rule)]",
                  "rounded-[var(--r-md)] font-sans text-[13px] text-[var(--ink)]",
                  "focus:outline-none focus:border-[var(--ink)]"
                )}
              >
                {DATA_RETENTION_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </SettingRow>
          </SettingsGroup>

          {/* Appearance */}
          <SettingsGroup title="Appearance">
            <SettingRow
              label="Dark mode"
              description="Use dark theme across the admin panel"
            >
              <Switch
                checked={settings.compactTables || false}
                onChange={(val) =>
                  dispatch({
                    type: "UPDATE_SETTINGS",
                    payload: { compactTables: val },
                  })
                }
              />
            </SettingRow>
            <SettingRow
              label="Compact tables"
              description="Reduce row height in data tables for denser views"
            >
              <Switch
                checked={settings.compactTables}
                onChange={(val) =>
                  dispatch({
                    type: "UPDATE_SETTINGS",
                    payload: { compactTables: val },
                  })
                }
              />
            </SettingRow>
          </SettingsGroup>

          {/* Security */}
          <SettingsGroup title="Security">
            <SettingRow
              label="Enforce 2FA for all staff"
              description="Require two-factor authentication before staff can access the workspace"
            >
              <Switch
                checked={settings.enforce2FA}
                onChange={(val) =>
                  dispatch({ type: "UPDATE_SETTINGS", payload: { enforce2FA: val } })
                }
              />
            </SettingRow>
            <SettingRow
              label="Session timeout"
              description="Minutes of inactivity before a staff session expires"
            >
              <input
                type="number"
                min={15}
                max={480}
                step={15}
                value={settings.sessionTimeout}
                onChange={(e) =>
                  dispatch({
                    type: "UPDATE_SETTINGS",
                    payload: { sessionTimeout: Number(e.target.value) },
                  })
                }
                aria-label="Session timeout in minutes"
                className={cn(
                  "w-[80px] h-[34px] px-[10px]",
                  "bg-[var(--cream)] border border-[var(--rule)]",
                  "rounded-[var(--r-md)] font-mono text-[13px] text-[var(--ink)]",
                  "focus:outline-none focus:border-[var(--ink)]"
                )}
              />
            </SettingRow>
            <SettingRow
              label="IP allowlist"
              description="Comma-separated IPs that can access the admin panel (leave blank to allow all)"
            >
              <input
                type="text"
                value={settings.ipAllowlist}
                onChange={(e) =>
                  dispatch({
                    type: "UPDATE_SETTINGS",
                    payload: { ipAllowlist: e.target.value },
                  })
                }
                placeholder="e.g. 192.168.1.1, 10.0.0.0/24"
                aria-label="IP allowlist"
                className={cn(
                  "w-[240px] h-[34px] px-[10px]",
                  "bg-[var(--cream)] border border-[var(--rule)]",
                  "rounded-[var(--r-md)] font-mono text-[12px] text-[var(--ink)]",
                  "placeholder:text-[var(--ink-subtle)]",
                  "focus:outline-none focus:border-[var(--ink)]"
                )}
              />
            </SettingRow>
          </SettingsGroup>

          {/* Maintenance */}
          <SettingsGroup title="Maintenance">
            <div className="p-[4px]">
              <MaintenancePanel
                enabled={settings.maintenanceMode}
                onToggle={() =>
                  dispatch({
                    type: "UPDATE_SETTINGS",
                    payload: { maintenanceMode: !settings.maintenanceMode },
                  })
                }
              />
            </div>
          </SettingsGroup>
        </div>

        {/* Save settings */}
        <div className="flex justify-end mt-[16px]">
          <AppButton variant="solid" size="md">
            Save settings
          </AppButton>
        </div>
      </section>
    </div>
  );
}

// ─── Helper components ────────────────────────────────────────────────────────

function SettingsGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[var(--r-lg)] border border-[var(--rule)] bg-[var(--paper)] overflow-hidden">
      <div className="px-[16px] py-[10px] border-b border-[var(--rule)] bg-[var(--paper-2)]">
        <h3 className="font-mono text-[10px] tracking-[0.08em] uppercase text-[var(--ink-muted)]">
          {title}
        </h3>
      </div>
      <div className="divide-y divide-[var(--rule-soft)]">{children}</div>
    </div>
  );
}

function SettingRow({
  label,
  description,
  children,
}: {
  label: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-[16px] px-[16px] py-[12px]">
      <div className="flex flex-col gap-[1px]">
        <span className="font-sans text-[13px] font-medium text-[var(--ink)]">
          {label}
        </span>
        <span className="font-sans text-[12px] text-[var(--ink-muted)]">
          {description}
        </span>
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

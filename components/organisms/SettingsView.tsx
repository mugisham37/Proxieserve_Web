"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SettingsSection } from "@/components/molecules/SettingsSection";
import { SettingsRow } from "@/components/molecules/SettingsRow";
import { DeviceTile } from "@/components/molecules/DeviceTile";
import { Switch } from "@/components/atoms/Switch";
import { PillButton } from "@/components/atoms/PillButton";
import { SegmentedGroup } from "@/components/atoms/SegmentedGroup";
import { MOCK_USER_PROFILE } from "@/lib/dashboard-data";
import { getItem, setItem } from "@/lib/storage";
import { useAuth } from "@/lib/auth-context";
import type { AuthLanguage } from "@/lib/auth-types";

const NOTIF_KEY = "proxi:user:notifs";

function loadNotifPrefs() {
  try {
    const raw = getItem(NOTIF_KEY);
    if (raw) return JSON.parse(raw) as { whatsapp: boolean; sms: boolean; email: boolean };
  } catch {}
  return { whatsapp: true, sms: true, email: true };
}

const MOCK_DEVICES = [
  { id: "dev1", deviceName: "MacBook Pro 16-inch",  meta: "Kigali, Rwanda · Last seen 25 May 2026",         isCurrent: true  },
  { id: "dev2", deviceName: "iPhone 15 Pro",      meta: "Kigali, Rwanda · Last seen 24 May 2026",         isCurrent: false },
  { id: "dev3", deviceName: "Chrome on Windows",  meta: "Kigali, Rwanda · Last seen 20 May 2026",         isCurrent: false },
];

export function SettingsView() {
  const { session } = useAuth();
  const user = session ?? MOCK_USER_PROFILE;
  const initialLanguage: AuthLanguage = session?.language ?? "en";

  // Language
  const [language, setLanguage] = React.useState<AuthLanguage>(initialLanguage);

  // Notification prefs
  const [notifPrefs, setNotifPrefs] = React.useState(loadNotifPrefs);
  function setNotif(key: "whatsapp" | "sms" | "email", val: boolean) {
    const next = { ...notifPrefs, [key]: val };
    setNotifPrefs(next);
    setItem(NOTIF_KEY, JSON.stringify(next));
  }

  // Devices
  const [devices, setDevices] = React.useState(MOCK_DEVICES);
  function revokeDevice(id: string) {
    setDevices((prev) => prev.filter((d) => d.id !== id));
  }

  // Close account confirm dialog
  const [showCloseConfirm, setShowCloseConfirm] = React.useState(false);

  const displayName = user.name;
  const displayEmail = user.email;
  const displayPhone = user.phone ?? "No phone on file";
  const isEmailVerified = user.isEmailVerified;

  return (
    <div className="max-w-[720px] space-y-6">
      {/* Page header */}
      <div className="mb-2">
        <h1 className="font-serif font-medium text-[clamp(28px,4vw,40px)] text-[var(--ink)] m-0 leading-[1.1]">
          Settings
        </h1>
        <p className="font-sans text-[13.5px] text-[var(--ink-muted)] mt-1">
          Manage your profile, notifications, security, and account preferences.
        </p>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Profile                                                           */}
      {/* ---------------------------------------------------------------- */}
      <SettingsSection title="Profile" subtitle="Your personal information on ProxiServe.">
        <SettingsRow label="Full name">
          <div className="flex items-center gap-3">
            <span className="font-sans text-[13.5px] text-[var(--ink)]">{displayName}</span>
            <PillButton size="sm" variant="ghost">Edit</PillButton>
          </div>
        </SettingsRow>

        <SettingsRow
          label="Email address"
          description={isEmailVerified ? undefined : "Please verify your email address."}
        >
          <div className="flex items-center gap-2">
            <span className="font-sans text-[13.5px] text-[var(--ink)]">{displayEmail}</span>
            {isEmailVerified ? (
              <span className="inline-flex items-center px-2 py-[2px] bg-[var(--ok-soft)] text-[var(--ok)] rounded-[999px] font-sans text-[10px] font-semibold">
                Verified
              </span>
            ) : (
              <span className="inline-flex items-center px-2 py-[2px] bg-[var(--warn-soft)] text-[var(--warn)] rounded-[999px] font-sans text-[10px] font-semibold">
                Unverified
              </span>
            )}
          </div>
        </SettingsRow>

        <SettingsRow label="Phone number">
          <div className="flex items-center gap-3">
            <span className="font-sans text-[13.5px] text-[var(--ink)]">{displayPhone}</span>
            <PillButton size="sm" variant="ghost">Edit</PillButton>
          </div>
        </SettingsRow>

        <SettingsRow label="Language" description="Choose your preferred language for the dashboard.">
          <SegmentedGroup
            options={[
              { value: "en", label: "English" },
              { value: "rw", label: "Kinyarwanda" },
              { value: "fr", label: "Français" },
            ]}
            value={language}
            onChange={(value) => setLanguage(value as AuthLanguage)}
          />
        </SettingsRow>
      </SettingsSection>

      {/* ---------------------------------------------------------------- */}
      {/* Notifications                                                     */}
      {/* ---------------------------------------------------------------- */}
      <SettingsSection
        title="Notifications"
        subtitle="Choose how you receive updates about your applications."
      >
        <SettingsRow
          label="WhatsApp notifications"
          description="Get real-time updates via WhatsApp from your assigned agent."
        >
          <Switch
            checked={notifPrefs.whatsapp}
            onChange={(v) => setNotif("whatsapp", v)}
            name="notif-whatsapp"
          />
        </SettingsRow>

        <SettingsRow
          label="SMS notifications"
          description="Receive SMS alerts for status changes and action items."
        >
          <Switch
            checked={notifPrefs.sms}
            onChange={(v) => setNotif("sms", v)}
            name="notif-sms"
          />
        </SettingsRow>

        <SettingsRow
          label="Email notifications"
          description="Receive email summaries and document delivery confirmations."
        >
          <Switch
            checked={notifPrefs.email}
            onChange={(v) => setNotif("email", v)}
            name="notif-email"
          />
        </SettingsRow>
      </SettingsSection>

      {/* ---------------------------------------------------------------- */}
      {/* Security                                                          */}
      {/* ---------------------------------------------------------------- */}
      <SettingsSection
        title="Security"
        subtitle="Manage your password, two-factor authentication, and active sessions."
      >
        <SettingsRow label="Password">
          <div className="flex items-center gap-3">
            <span className="font-sans text-[13.5px] text-[var(--ink-muted)] tracking-[0.15em]">
              ••••••••
            </span>
            <PillButton size="sm" variant="ghost">Change</PillButton>
          </div>
        </SettingsRow>

        <SettingsRow
          label="Two-factor authentication"
          description="Add an extra layer of security with OTP on every login."
        >
          <PillButton size="sm" variant="default">Enable 2FA</PillButton>
        </SettingsRow>

        {/* Active devices */}
        <div className="pt-2">
          <p className="font-sans text-[13px] font-semibold text-[var(--ink)] mb-1">
            Active sessions
          </p>
          <p className="font-sans text-[12px] text-[var(--ink-muted)] mb-4">
            These devices are currently signed in to your account.
          </p>
          <div>
            {devices.map((device) => (
              <DeviceTile
                key={device.id}
                deviceName={device.deviceName}
                meta={device.meta}
                isCurrentDevice={device.isCurrent}
                onRevoke={device.isCurrent ? undefined : () => revokeDevice(device.id)}
              />
            ))}
            {devices.length <= 1 && (
              <p className="font-sans text-[12.5px] text-[var(--ink-muted)] pt-2">
                No other active sessions.
              </p>
            )}
          </div>
        </div>
      </SettingsSection>

      {/* ---------------------------------------------------------------- */}
      {/* Danger zone                                                       */}
      {/* ---------------------------------------------------------------- */}
      <SettingsSection
        title="Danger zone"
        subtitle="Irreversible actions. Please proceed with caution."
        isDanger
      >
        <SettingsRow
          label="Close account"
          description="Permanently delete your account and all associated data."
        >
          <PillButton
            variant="ghost"
            size="sm"
            className="border-[var(--danger)] text-[var(--danger)] hover:bg-[var(--danger)] hover:text-white"
            onClick={() => setShowCloseConfirm(true)}
          >
            Close account
          </PillButton>
        </SettingsRow>
      </SettingsSection>

      {/* ---------------------------------------------------------------- */}
      {/* Close account confirm modal                                       */}
      {/* ---------------------------------------------------------------- */}
      <AnimatePresence>
        {showCloseConfirm && (
          <>
            <motion.div
              key="scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 z-[200] bg-[var(--ink)]/60"
              aria-hidden="true"
              onClick={() => setShowCloseConfirm(false)}
            />
            <motion.div
              key="dialog"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="close-acct-title"
              className="fixed inset-0 z-[201] flex items-center justify-center p-5"
            >
              <div className="w-full max-w-[400px] bg-[var(--paper)] border border-[var(--danger)] rounded-[var(--r-xl)] p-10 text-center">
                <h3
                  id="close-acct-title"
                  className="font-serif text-[20px] font-medium text-[var(--danger)] mb-3"
                >
                  Close your account?
                </h3>
                <p className="font-sans text-[13.5px] text-[var(--ink-muted)] mb-7 leading-relaxed">
                  This will permanently delete all your applications, documents, and account data.
                  This action cannot be undone.
                </p>
                <div className="flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={() => setShowCloseConfirm(false)}
                    className={cn(
                      "w-full px-5 py-3 rounded-[999px] font-sans text-[14px] font-semibold",
                      "bg-[var(--danger)] text-white",
                      "hover:opacity-90 transition-opacity duration-[var(--m-fast)]",
                      "focus-visible:outline-none focus-visible:[box-shadow:var(--focus-ring)]"
                    )}
                  >
                    Yes, close my account
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCloseConfirm(false)}
                    className={cn(
                      "w-full px-5 py-3 rounded-[999px] font-sans text-[14px] font-semibold",
                      "bg-transparent text-[var(--ink-muted)] border border-[var(--rule)]",
                      "hover:border-[var(--ink)] hover:text-[var(--ink)]",
                      "transition-colors duration-[var(--m-fast)]",
                      "focus-visible:outline-none focus-visible:[box-shadow:var(--focus-ring)]"
                    )}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

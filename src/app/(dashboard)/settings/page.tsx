"use client";

import * as React from "react";
import { useSignOut } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { SettingsSection } from "@/components/molecules/dashboard/SettingsSection";
import { SettingsRow } from "@/components/molecules/dashboard/SettingsRow";
import { TrustedDeviceRow } from "@/components/molecules/dashboard/TrustedDeviceRow";
import { DangerZone } from "@/components/molecules/admin/DangerZone";
import { Switch } from "@/components/atoms/shared/Switch";
import { SegmentedGroup } from "@/components/atoms/wizard/SegmentedGroup";
import {
  MOCK_USER,
  MOCK_TRUSTED_DEVICES,
  MOCK_NOTIF_PREFS,
} from "@/lib/dashboard-data";
import type { NotificationPrefs } from "@/lib/types/dashboard";

// ─── Inline action link ───────────────────────────────────────────────────────

function ActionLink({
  children,
  onClick,
  danger,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "font-sans text-[13px] font-medium underline underline-offset-2",
        "transition-opacity hover:opacity-70",
        "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] rounded-[var(--r-sm)]",
        danger ? "text-[var(--danger)]" : "text-[var(--brand-ink)]"
      )}
    >
      {children}
    </button>
  );
}

// ─── Language options ─────────────────────────────────────────────────────────

const LANGUAGE_OPTIONS = [
  { value: "en", label: "English" },
  { value: "rw", label: "RW" },
  { value: "fr", label: "FR" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SettingsPage() {
  const signOutMutation = useSignOut();

  const [language, setLanguage] = React.useState<"en" | "rw" | "fr">(MOCK_USER.language);
  const [notifPrefs, setNotifPrefs] = React.useState<NotificationPrefs>(MOCK_NOTIF_PREFS);
  const [twoFAEnabled, setTwoFAEnabled] = React.useState(false);
  const [devices, setDevices] = React.useState(MOCK_TRUSTED_DEVICES);

  const handleRevokeDevice = React.useCallback((deviceId: string) => {
    setDevices((prev) => prev.filter((d) => d.id !== deviceId));
  }, []);

  const toggleNotif = React.useCallback((key: keyof NotificationPrefs) => {
    if (key === "sms") return;
    setNotifPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  return (
    <div className="flex flex-col">

      {/* ── Page header ── */}
      <div className="px-[24px] pt-[28px] pb-[24px] min-[980px]:px-[40px] border-b border-[var(--rule)]">
        <p className="font-mono text-[10px] tracking-[0.08em] uppercase text-[var(--ink-muted)] mb-[6px]">
          Account · Settings
        </p>
        <h1 className="font-serif text-[clamp(26px,3vw,36px)] font-normal text-[var(--ink)] leading-[1.1]">
          Your <em className="italic font-normal">settings</em>.
        </h1>
        <p className="font-serif text-[clamp(14px,1.5vw,17px)] text-[var(--ink-muted)] mt-[6px] leading-[1.5]">
          Manage how we reach you, your sign-in, and what we keep on file.{" "}
          <em className="italic">Changes save instantly.</em>
        </p>
      </div>

      {/* ── Settings sections — full width, no max-w ── */}
      <div className="px-[24px] py-[28px] min-[980px]:px-[40px] flex flex-col gap-[20px]">

        {/* 1. Profile */}
        <SettingsSection
          title="Your"
          titleItalic="profile"
          subtitle="As it appears on government documents. Changes are reviewed by an agent before applying."
        >
          <SettingsRow
            label="Full name"
            value={MOCK_USER.fullName}
            action={<ActionLink>Request change →</ActionLink>}
          />
          <SettingsRow
            label="National ID"
            value={MOCK_USER.nationalId}
            action={
              <span className="inline-flex items-center gap-[5px] font-sans text-[13px] text-[var(--ok)]">
                Verified ✓
              </span>
            }
          />
          <SettingsRow
            label="Date of birth"
            value={MOCK_USER.dateOfBirth}
            action={<ActionLink>Request change →</ActionLink>}
          />
        </SettingsSection>

        {/* 2. Contact details */}
        <SettingsSection
          title="Contact"
          titleItalic="details"
          subtitle="Where your agent and our system reach you."
        >
          <SettingsRow
            label="Phone"
            description="Used for WhatsApp updates"
            value={
              <span>
                {MOCK_USER.phone}{" "}
                <span className="font-mono text-[11px]">· WhatsApp on</span>
              </span>
            }
            action={<ActionLink>Update →</ActionLink>}
          />
          <SettingsRow
            label="Email"
            value={
              <span>
                {MOCK_USER.email}{" "}
                <span className="text-[var(--ok)]">· Verified</span>
              </span>
            }
            action={<ActionLink>Update →</ActionLink>}
          />
          <SettingsRow
            label="Language"
            description="Used in messages from us"
            action={
              <SegmentedGroup
                name="language"
                value={language}
                onChange={(v) => setLanguage(v as "en" | "rw" | "fr")}
                options={LANGUAGE_OPTIONS}
              />
            }
          />
        </SettingsSection>

        {/* 3. Notifications */}
        <SettingsSection
          title="Notifications"
          subtitle="Pick how we let you know about status changes and messages."
        >
          <SettingsRow
            label="WhatsApp updates"
            description="Status changes, agent replies, action needed"
            action={
              <Switch
                checked={notifPrefs.whatsapp}
                onChange={() => toggleNotif("whatsapp")}
              />
            }
          />
          <SettingsRow
            label="SMS updates"
            description="Critical only — always on"
            action={
              <Switch
                checked={true}
                onChange={() => {}}
                disabled
              />
            }
          />
          <SettingsRow
            label="Email notifications"
            description="Summaries and receipts"
            action={
              <Switch
                checked={notifPrefs.email}
                onChange={() => toggleNotif("email")}
              />
            }
          />
          <SettingsRow
            label="Tips & news"
            description="Occasional product updates"
            action={
              <Switch
                checked={notifPrefs.tips}
                onChange={() => toggleNotif("tips")}
              />
            }
          />
        </SettingsSection>

        {/* 4. Sign-in & security */}
        <SettingsSection
          title="Sign-in"
          titleItalic="& security"
          subtitle="How you access your account, and how we keep it safe."
        >
          <SettingsRow
            label="Password"
            description="Last changed 3 months ago"
            action={<ActionLink>Change →</ActionLink>}
          />
          <SettingsRow
            label="Two-factor authentication"
            description={twoFAEnabled ? "Enabled — app or SMS" : "Off — your account has no 2FA"}
            action={
              <Switch
                checked={twoFAEnabled}
                onChange={() => setTwoFAEnabled((v) => !v)}
              />
            }
          />
          {/* Trusted devices subsection */}
          <div className="border-t border-[var(--rule)]">
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--ink-muted)] px-[28px] pt-[14px] pb-[6px]">
              Trusted devices
            </p>
            {devices.map((device) => (
              <TrustedDeviceRow
                key={device.id}
                device={device}
                onRevoke={handleRevokeDevice}
              />
            ))}
          </div>
        </SettingsSection>

        {/* 5. Privacy & your data */}
        <SettingsSection
          title="Privacy"
          titleItalic="& your data"
          subtitle="Your documents and personal data stay in your control."
        >
          <SettingsRow
            label="Download my data"
            description="Export all your personal data as a ZIP archive"
            action={<ActionLink>Request export →</ActionLink>}
          />
          <SettingsRow
            label="Document retention"
            description="How long we keep your uploaded documents on file"
            value="24 months (default)"
          />
        </SettingsSection>

        {/* 6. Danger zone */}
        <DangerZone />

        {/* Sign out link */}
        <div className="pt-[4px] pb-[12px]">
          <button
            type="button"
            onClick={() => signOutMutation.mutate()}
            disabled={signOutMutation.isPending}
            className="font-sans text-[13px] text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors focus-visible:outline-none disabled:opacity-50"
          >
            {signOutMutation.isPending ? "Signing out…" : "← Sign out"}
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import * as React from "react";
import { Shield, Smartphone, User, Lock, Info } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";

// ─── Section wrapper ──────────────────────────────────────────────────────────

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

// ─── Row ──────────────────────────────────────────────────────────────────────

function SettingsRow({
  label,
  description,
  control,
}: {
  label: string;
  description?: string;
  control?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-[16px] py-[14px] border-b border-[var(--rule)] last:border-0">
      <div>
        <p className="font-sans text-[14px] font-medium text-[var(--ink)]">{label}</p>
        {description && <p className="font-sans text-[12px] text-[var(--ink-muted)] mt-0.5">{description}</p>}
      </div>
      {control && <div className="shrink-0">{control}</div>}
    </div>
  );
}

// ─── Read-only field ──────────────────────────────────────────────────────────

function ReadOnlyField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-[16px] py-[14px] border-b border-[var(--rule)] last:border-0">
      <p className="font-sans text-[13px] text-[var(--ink-muted)]">{label}</p>
      <p className="font-sans text-[13px] text-[var(--ink)] font-medium">{value || "—"}</p>
    </div>
  );
}

// ─── Info notice ──────────────────────────────────────────────────────────────

function Notice({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2.5 px-4 py-3 rounded-[var(--r-md)] bg-[var(--brand-soft)]/40 border border-[var(--brand)]/20 mb-5">
      <Info size={13} className="text-[var(--brand)] mt-0.5 shrink-0" />
      <p className="font-sans text-[12px] text-[var(--ink-muted)] leading-relaxed">{children}</p>
    </div>
  );
}

// ─── Password change form ─────────────────────────────────────────────────────

function PasswordChangeForm() {
  const [current, setCurrent] = React.useState("");
  const [next, setNext] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (next.length < 8) { setError("New password must be at least 8 characters."); return; }
    if (next !== confirm) { setError("Passwords do not match."); return; }
    // Endpoint PATCH /api/auth/change-password is not yet implemented on the backend.
    setError("Password change is not yet available. Ask your administrator to reset your password.");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 py-[14px]">
      {error && (
        <p className="font-sans text-[12px] text-[var(--danger)] bg-[var(--danger)]/8 border border-[var(--danger)]/20 rounded-[var(--r-md)] px-3 py-2">
          {error}
        </p>
      )}
      {[
        { id: "cp-current", label: "Current password", value: current, onChange: setCurrent, auto: "current-password" },
        { id: "cp-new", label: "New password", value: next, onChange: setNext, auto: "new-password" },
        { id: "cp-confirm", label: "Confirm new password", value: confirm, onChange: setConfirm, auto: "new-password" },
      ].map(({ id, label, value, onChange, auto }) => (
        <div key={id} className="flex flex-col gap-1.5">
          <label htmlFor={id} className="font-sans text-[12px] font-medium text-[var(--ink)]">{label}</label>
          <input
            id={id}
            type="password"
            autoComplete={auto}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="h-9 px-3 rounded-[var(--r-md)] border border-[var(--rule)] bg-[var(--cream)] font-sans text-[13px] text-[var(--ink)] placeholder:text-[var(--ink-subtle)] focus:outline-none focus:border-[var(--brand)] transition-colors"
          />
        </div>
      ))}
      <div className="flex justify-end pt-1">
        <button
          type="submit"
          className="h-9 px-4 rounded-[var(--r-pill)] bg-[var(--ink)] hover:bg-[var(--ink-2)] text-white font-sans text-[13px] font-medium transition-colors"
        >
          Update password
        </button>
      </div>
    </form>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AgentSettingsPage() {
  const { session } = useAuth();

  return (
    <div className="px-[20px] min-[980px]:px-[32px] py-[28px] max-w-[720px]">
      {/* Header */}
      <div className="mb-[32px]">
        <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--ink-subtle)] mb-1">SETTINGS</p>
        <h1 className="font-serif text-[28px] min-[980px]:text-[34px] text-[var(--ink)] leading-none">
          Your <em>account</em>
        </h1>
      </div>

      {/* Profile */}
      <SettingsSection title="Profile">
        <ReadOnlyField label="Full name" value={session?.name ?? ""} />
        <ReadOnlyField label="Work email" value={session?.email ?? ""} />
        <ReadOnlyField label="Phone" value={session?.phone ?? "Not set"} />
        <div className="py-3">
          <Notice>
            Profile changes (name, email) must be requested from your administrator. They can update your account from the admin panel.
          </Notice>
        </div>
      </SettingsSection>

      {/* Security */}
      <SettingsSection title="Security">
        <div className="pt-1 pb-2">
          <p className="font-sans text-[13px] font-medium text-[var(--ink)] mb-3">Change password</p>
          <PasswordChangeForm />
        </div>
      </SettingsSection>

      {/* 2FA */}
      <SettingsSection title="Two-factor authentication">
        <SettingsRow
          label="Authenticator app"
          description="TOTP-based two-factor authentication. Required for all staff accounts."
          control={
            <span
              className={cn(
                "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[10px] font-medium",
                "bg-[var(--ok)]/12 text-[var(--ok)]",
              )}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--ok)]" />
              Enrolled
            </span>
          }
        />
        <SettingsRow
          label="Backup codes"
          description="Single-use recovery codes for when your authenticator is unavailable."
          control={
            <button
              className="h-8 px-3 rounded-[var(--r-pill)] border border-[var(--rule)] bg-[var(--cream)] hover:bg-[var(--paper)] font-sans text-[12px] text-[var(--ink)] transition-colors"
              onClick={() => {
                // Regenerate backup codes — requires backend endpoint
                alert("Backup code regeneration will be available in the next update.");
              }}
            >
              Regenerate
            </button>
          }
        />
        <div className="py-3">
          <Notice>
            To reset your 2FA setup (e.g., if you lose your authenticator device), contact your administrator. They can force a 2FA re-enrollment from the agent management panel.
          </Notice>
        </div>
      </SettingsSection>

      {/* Trusted devices */}
      <SettingsSection title="Trusted devices">
        <div className="py-6 text-center">
          <Smartphone size={20} className="mx-auto mb-2 text-[var(--ink-subtle)]" />
          <p className="font-sans text-[13px] text-[var(--ink-muted)] mb-1">No trusted devices</p>
          <p className="font-sans text-[12px] text-[var(--ink-subtle)]">
            Devices you trust during 2FA verification appear here.
            Device trust listing will be available in the next update.
          </p>
        </div>
      </SettingsSection>
    </div>
  );
}

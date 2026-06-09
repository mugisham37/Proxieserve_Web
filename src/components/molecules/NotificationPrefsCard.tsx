"use client";

import * as React from "react";
import { Switch } from "@/components/atoms/shared/Switch";
import { getItem, setItem } from "@/lib/storage";

interface NotificationPrefsCardProps {
  code: string;
}

interface Prefs {
  whatsapp: boolean;
  sms: boolean;
  email: boolean;
}

const defaultPrefs: Prefs = { whatsapp: true, sms: false, email: false };

function loadPrefs(code: string): Prefs {
  const raw = getItem(`proxi:tracker:prefs:${code}`);
  if (!raw) return defaultPrefs;
  try {
    return { ...defaultPrefs, ...JSON.parse(raw) };
  } catch {
    return defaultPrefs;
  }
}

export function NotificationPrefsCard({ code }: NotificationPrefsCardProps) {
  const [prefs, setPrefs] = React.useState<Prefs>(defaultPrefs);

  React.useEffect(() => {
    setPrefs(loadPrefs(code));
  }, [code]);

  function handleChange(key: keyof Prefs, value: boolean) {
    const next = { ...prefs, [key]: value };
    setPrefs(next);
    setItem(`proxi:tracker:prefs:${code}`, JSON.stringify(next));
  }

  const rows: Array<{ key: keyof Prefs; label: string; icon: string }> = [
    { key: "whatsapp", label: "WhatsApp", icon: "💬" },
    { key: "sms", label: "SMS", icon: "📱" },
    { key: "email", label: "Email", icon: "✉️" },
  ];

  return (
    <section
      className="bg-[var(--cream-2)] border border-[var(--rule)] rounded-[var(--r-lg)] px-6 py-5 mt-4"
      aria-labelledby="notif-heading"
    >
      <h4 id="notif-heading" className="font-serif font-medium text-[16px] italic m-0 mb-1 text-[var(--ink)]">
        Get notified
      </h4>
      <p className="font-sans text-[12.5px] text-[var(--ink-muted)] m-0 mb-[14px]">
        Choose how you&apos;d like to receive status updates.
      </p>

      <div>
        {rows.map(({ key, label, icon }) => (
          <div
            key={key}
            className="grid grid-cols-[1fr_auto] gap-3 items-center py-2 border-t border-[var(--rule)] first:border-t-0 text-[13.5px]"
          >
            <span className="flex items-center gap-2 text-[var(--ink-2)]">
              <span aria-hidden="true">{icon}</span>
              {label}
            </span>
            <Switch
              checked={prefs[key]}
              onChange={(v) => handleChange(key, v)}
              aria-label={`${label} notifications ${prefs[key] ? "on" : "off"}`}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

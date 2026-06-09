"use client";

import * as React from "react";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { AppButton } from "@/components/atoms/AppButton";

interface MaintenancePanelProps {
  enabled: boolean;
  onToggle: () => void;
}

const CONFIRM_PHRASE = "MAINTENANCE";

export function MaintenancePanel({ enabled, onToggle }: MaintenancePanelProps) {
  const [typed, setTyped] = React.useState("");
  const [showConfirm, setShowConfirm] = React.useState(false);

  const canEnable = typed === CONFIRM_PHRASE;

  function handleAttemptEnable() {
    setShowConfirm(true);
    setTyped("");
  }

  function handleConfirm() {
    onToggle();
    setShowConfirm(false);
    setTyped("");
  }

  function handleDisable() {
    onToggle();
  }

  return (
    <div
      className={cn(
        "rounded-[var(--r-md)] border p-[16px] flex flex-col gap-[12px]",
        enabled
          ? "border-[var(--danger)] bg-[var(--danger-soft)]/30"
          : "border-[var(--rule)] bg-[var(--paper)]"
      )}
    >
      <div className="flex items-start gap-[10px]">
        <AlertTriangle
          size={16}
          className={cn(
            "shrink-0 mt-[1px]",
            enabled ? "text-[var(--danger)]" : "text-[var(--warn)]"
          )}
          aria-hidden="true"
        />
        <div className="flex-1">
          <p className="font-sans text-[13px] font-medium text-[var(--ink)]">
            Maintenance mode
          </p>
          <p className="font-sans text-[12px] text-[var(--ink-muted)] mt-[2px]">
            {enabled
              ? "The platform is currently in maintenance mode. New applications are paused."
              : "Enabling maintenance mode pauses all new applications and shows a maintenance notice to clients."}
          </p>
        </div>
        <div
          className={cn(
            "shrink-0 px-[8px] py-[3px] rounded-[var(--r-pill)]",
            "font-mono text-[10px] uppercase",
            enabled
              ? "bg-[var(--danger)] text-white"
              : "bg-[var(--ok-soft)] text-[var(--ok)]"
          )}
        >
          {enabled ? "ON" : "OFF"}
        </div>
      </div>

      {/* Enable flow */}
      {!enabled && !showConfirm && (
        <AppButton
          variant="ghost"
          size="sm"
          onClick={handleAttemptEnable}
          className="self-start border-[var(--warn)] text-[var(--warn)] hover:bg-[var(--warn-soft)] hover:text-[var(--warn)] hover:border-[var(--warn)]"
        >
          Enable maintenance mode
        </AppButton>
      )}

      {!enabled && showConfirm && (
        <div className="flex flex-col gap-[8px]">
          <p className="font-sans text-[12px] text-[var(--danger)]">
            Type{" "}
            <code className="font-mono font-bold px-[4px] bg-[var(--danger-soft)] rounded-[var(--r-sm)]">
              {CONFIRM_PHRASE}
            </code>{" "}
            to confirm
          </p>
          <div className="flex gap-[8px]">
            <input
              type="text"
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              placeholder={CONFIRM_PHRASE}
              aria-label={`Type ${CONFIRM_PHRASE} to enable maintenance mode`}
              autoFocus
              className={cn(
                "flex-1 h-[34px] px-[10px]",
                "bg-[var(--cream)] border rounded-[var(--r-md)]",
                "font-mono text-[12px] text-[var(--ink)]",
                "placeholder:text-[var(--ink-subtle)]",
                "focus:outline-none transition-colors duration-[var(--m-fast)]",
                canEnable
                  ? "border-[var(--danger)] focus:border-[var(--danger)]"
                  : "border-[var(--rule)] focus:border-[var(--ink)]"
              )}
            />
            <AppButton
              variant="ghost"
              size="sm"
              disabled={!canEnable}
              onClick={handleConfirm}
              className={cn(
                "shrink-0",
                canEnable &&
                  "border-[var(--danger)] text-[var(--danger)] hover:bg-[var(--danger)] hover:text-white hover:border-[var(--danger)]"
              )}
            >
              Confirm
            </AppButton>
            <AppButton
              variant="ghost"
              size="sm"
              onClick={() => {
                setShowConfirm(false);
                setTyped("");
              }}
            >
              Cancel
            </AppButton>
          </div>
        </div>
      )}

      {enabled && (
        <AppButton
          variant="default"
          size="sm"
          onClick={handleDisable}
          className="self-start"
        >
          Disable maintenance mode
        </AppButton>
      )}
    </div>
  );
}

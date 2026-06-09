"use client";

import * as React from "react";
import { AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { AppButton } from "@/components/atoms/shared/AppButton";
import { Switch } from "@/components/atoms/shared/Switch";
import { PhonePreview } from "@/components/molecules/system/PhonePreview";
import { BroadcastConfirmDialog } from "@/components/molecules/admin/BroadcastConfirmDialog";
import { useAdminState, useAdminDispatch } from "@/lib/admin-context";

const MAX_CHARS = 1000;

const AUDIENCE_OPTIONS = [
  "All clients",
  "Clients with pending applications",
  "Clients with completed applications",
  "All agents",
  "Clients with overdue payment",
];

const CHANNELS = [
  { id: "whatsapp", label: "WhatsApp" },
  { id: "sms", label: "SMS" },
  { id: "email", label: "Email" },
  { id: "in-app", label: "In-app" },
];

export function BroadcastComposer() {
  const { broadcastConfirm } = useAdminState();
  const dispatch = useAdminDispatch();

  const [audience, setAudience] = React.useState(AUDIENCE_OPTIONS[0]);
  const [activeChannels, setActiveChannels] = React.useState<string[]>(["whatsapp"]);
  const [message, setMessage] = React.useState("");
  const [scheduleMode, setScheduleMode] = React.useState(false);
  const previewChannel = activeChannels[0] ?? "whatsapp";

  function toggleChannel(id: string) {
    setActiveChannels((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  }

  function handleSend() {
    if (!message.trim() || activeChannels.length === 0) return;
    dispatch({
      type: "SET_BROADCAST_CONFIRM",
      payload: {
        reach: 1180,
        estimatedCost: "RWF 29,500",
        optOuts: 42,
        channels: activeChannels,
      },
    });
  }

  function handleConfirmSend() {
    // In production: submit broadcast to backend
    dispatch({ type: "SET_BROADCAST_CONFIRM", payload: null });
    setMessage("");
  }

  const canSend = message.trim().length > 0 && activeChannels.length > 0;

  return (
    <>
      <div
        className={cn(
          "rounded-[var(--r-lg)] border border-[var(--rule)] bg-[var(--paper)]",
          "overflow-hidden"
        )}
      >
        <div className="px-[20px] py-[14px] border-b border-[var(--rule)]">
          <h3 className="font-sans text-[14px] font-medium text-[var(--ink)]">
            New broadcast
          </h3>
        </div>

        <div className="grid grid-cols-1 min-[980px]:grid-cols-[1fr_220px]">
          {/* Composer form */}
          <div className="p-[20px] flex flex-col gap-[16px] border-r border-[var(--rule)]">
            {/* Audience */}
            <div className="flex flex-col gap-[5px]">
              <label
                htmlFor="bc-audience"
                className="font-mono text-[10px] tracking-[0.06em] uppercase text-[var(--ink-muted)]"
              >
                Audience
              </label>
              <select
                id="bc-audience"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className={cn(
                  "w-full h-[36px] px-[12px]",
                  "bg-[var(--cream)] border border-[var(--rule)]",
                  "rounded-[var(--r-md)] font-sans text-[13px] text-[var(--ink)]",
                  "focus:outline-none focus:border-[var(--ink)]",
                  "transition-colors duration-[var(--m-fast)]"
                )}
              >
                {AUDIENCE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Channels */}
            <div className="flex flex-col gap-[8px]">
              <span className="font-mono text-[10px] tracking-[0.06em] uppercase text-[var(--ink-muted)]">
                Channels
              </span>
              <div
                className="flex flex-wrap gap-[6px]"
                role="group"
                aria-label="Select broadcast channels"
              >
                {CHANNELS.map((ch) => {
                  const isActive = activeChannels.includes(ch.id);
                  return (
                    <button
                      key={ch.id}
                      type="button"
                      role="checkbox"
                      aria-checked={isActive}
                      onClick={() => toggleChannel(ch.id)}
                      className={cn(
                        "px-[12px] py-[6px] rounded-[var(--r-pill)]",
                        "font-sans text-[12px] font-medium",
                        "transition-colors duration-[var(--m-fast)]",
                        "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]",
                        isActive
                          ? "bg-[var(--ink)] text-[var(--paper)]"
                          : "bg-[var(--paper-2)] text-[var(--ink-muted)] border border-[var(--rule)] hover:text-[var(--ink)]"
                      )}
                    >
                      {ch.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-[5px]">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="bc-message"
                  className="font-mono text-[10px] tracking-[0.06em] uppercase text-[var(--ink-muted)]"
                >
                  Message
                </label>
                <span
                  className={cn(
                    "font-mono text-[10px]",
                    message.length > MAX_CHARS * 0.9
                      ? "text-[var(--warn)]"
                      : "text-[var(--ink-muted)]"
                  )}
                >
                  {message.length}/{MAX_CHARS}
                </span>
              </div>
              <textarea
                id="bc-message"
                value={message}
                onChange={(e) =>
                  setMessage(e.target.value.slice(0, MAX_CHARS))
                }
                rows={5}
                placeholder="Type your broadcast message…"
                className={cn(
                  "w-full resize-none px-[12px] py-[10px]",
                  "bg-[var(--cream)] border border-[var(--rule)]",
                  "rounded-[var(--r-md)] font-sans text-[13px] text-[var(--ink)]",
                  "placeholder:text-[var(--ink-subtle)]",
                  "focus:outline-none focus:border-[var(--ink)]",
                  "transition-colors duration-[var(--m-fast)]"
                )}
              />
            </div>

            {/* Schedule toggle */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-[1px]">
                <span className="font-sans text-[13px] font-medium text-[var(--ink)]">
                  Schedule send
                </span>
                <span className="font-sans text-[11px] text-[var(--ink-muted)]">
                  Send later instead of immediately
                </span>
              </div>
              <Switch
                checked={scheduleMode}
                onChange={setScheduleMode}
              />
            </div>

            {/* Send / Schedule button */}
            <AppButton
              variant="brand"
              size="md"
              disabled={!canSend}
              onClick={handleSend}
              className="self-start"
            >
              <Send size={14} aria-hidden="true" />
              {scheduleMode ? "Schedule" : "Send now"}
            </AppButton>
          </div>

          {/* Phone preview — desktop only */}
          <div className="hidden min-[980px]:flex items-start justify-center p-[24px] bg-[var(--paper-2)]">
            <PhonePreview message={message} channel={previewChannel} />
          </div>
        </div>
      </div>

      {/* Broadcast confirm dialog — state #5 */}
      <AnimatePresence>
        {broadcastConfirm && (
          <BroadcastConfirmDialog
            state={broadcastConfirm}
            onSend={handleConfirmSend}
            onCancel={() =>
              dispatch({ type: "SET_BROADCAST_CONFIRM", payload: null })
            }
          />
        )}
      </AnimatePresence>
    </>
  );
}

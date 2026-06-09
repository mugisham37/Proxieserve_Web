"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Clock, CheckCircle, MessageSquare, AlertCircle, Megaphone } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Notification, NotifType } from "@/lib/notification-context";

// ─── Icon by type ─────────────────────────────────────────────────────────────

const TYPE_ICON: Record<NotifType, React.ElementType> = {
  status_change: Clock,
  payment: CheckCircle,
  message: MessageSquare,
  action_required: AlertCircle,
  broadcast: Megaphone,
};

const TYPE_COLOR: Record<NotifType, string> = {
  status_change: "bg-[var(--brand-soft)] text-[var(--brand)]",
  payment: "bg-[var(--ok-soft)] text-[var(--ok)]",
  message: "bg-[var(--info-soft)] text-[var(--info)]",
  action_required: "bg-[var(--warn-soft)] text-[var(--warn)]",
  broadcast: "bg-[var(--cream-2)] text-[var(--ink-muted)]",
};

// ─── Relative time ────────────────────────────────────────────────────────────

function relativeTime(date: Date): string {
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "now";
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  const days = Math.floor(hrs / 24);
  return `${days}d`;
}

// ─── Component ────────────────────────────────────────────────────────────────

interface NotificationRowProps {
  notification: Notification;
  onMarkRead: (id: string) => void;
  onClose: () => void;
}

export function NotificationRow({ notification, onMarkRead, onClose }: NotificationRowProps) {
  const router = useRouter();
  const Icon = TYPE_ICON[notification.type];

  function handleClick() {
    onMarkRead(notification.id);
    onClose();
    if (notification.applicationCode) {
      router.push(`/app/${notification.applicationCode}`);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "w-full text-left px-[16px] py-[12px]",
        "grid grid-cols-[32px_1fr] gap-[10px]",
        "border-b border-[var(--rule-soft)] last:border-b-0",
        "transition-colors duration-[var(--m-fast)]",
        "hover:bg-[var(--cream-2)] focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-1 focus-visible:ring-[var(--focus)]",
        "relative",
        notification.read ? "bg-transparent" : "bg-[var(--brand-soft)]"
      )}
      aria-label={`${notification.title}${notification.read ? "" : " (unread)"}`}
    >
      {/* Unread dot */}
      {!notification.read && (
        <span
          aria-hidden="true"
          className="absolute left-[5px] top-[16px] w-[5px] h-[5px] rounded-full bg-[var(--brand)]"
        />
      )}

      {/* Icon */}
      <span
        className={cn(
          "mt-[2px] w-[30px] h-[30px] rounded-full flex items-center justify-center shrink-0",
          TYPE_COLOR[notification.type]
        )}
        aria-hidden="true"
      >
        <Icon size={14} />
      </span>

      {/* Text */}
      <div>
        <div className="flex items-baseline gap-[6px]">
          <span className="font-sans text-[13px] font-medium text-[var(--ink)] leading-[1.35]">
            {notification.title}
          </span>
          <span className="font-sans text-[11px] text-[var(--ink-subtle)] shrink-0">
            · {relativeTime(notification.createdAt)}
          </span>
        </div>
        <p className="font-sans text-[12px] text-[var(--ink-muted)] leading-[1.45] mt-[1px] m-0">
          {notification.body}
        </p>
      </div>
    </button>
  );
}

"use client";

import * as React from "react";
import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNotifications } from "@/lib/notification-context";
import { NotificationPanel } from "@/components/molecules/NotificationPanel";

interface NotificationBellProps {
  className?: string;
  size?: number;
}

export function NotificationBell({ className, size = 18 }: NotificationBellProps) {
  const { unreadCount } = useNotifications();
  const [open, setOpen] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  // Live region tracks unread count for screen readers
  const prevUnread = React.useRef(unreadCount);
  const [liveMsg, setLiveMsg] = React.useState("");

  React.useEffect(() => {
    if (unreadCount > prevUnread.current) {
      setLiveMsg(`${unreadCount - prevUnread.current} new notification${unreadCount - prevUnread.current > 1 ? "s" : ""}`);
    }
    prevUnread.current = unreadCount;
  }, [unreadCount]);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={
          unreadCount > 0
            ? `Notifications — ${unreadCount} unread`
            : "Notifications"
        }
        aria-expanded={open}
        aria-haspopup="dialog"
        className={cn(
          "relative flex items-center justify-center",
          "w-[36px] h-[36px] rounded-[var(--r-md)]",
          "text-[var(--ink-muted)]",
          "transition-colors duration-[var(--m-fast)]",
          "hover:bg-[var(--paper-2)] hover:text-[var(--ink)]",
          "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]",
          open && "bg-[var(--paper-2)] text-[var(--ink)]",
          className
        )}
      >
        <Bell size={size} />
        {unreadCount > 0 && (
          <span
            aria-hidden="true"
            className={cn(
              "absolute top-[7px] right-[7px]",
              "min-w-[14px] h-[14px] px-[3px]",
              "rounded-full bg-[var(--brand)] text-white",
              "font-mono text-[9px] font-bold leading-[14px] text-center",
              "flex items-center justify-center"
            )}
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Screen reader live region */}
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        {liveMsg}
      </span>

      <NotificationPanel
        open={open}
        onClose={() => setOpen(false)}
        anchorRef={buttonRef}
      />
    </div>
  );
}

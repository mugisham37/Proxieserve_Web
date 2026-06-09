"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useNotifications } from "@/lib/notification-context";
import { NotificationRow } from "@/components/molecules/NotificationRow";

interface NotificationPanelProps {
  open: boolean;
  onClose: () => void;
  /** Position anchor — panel opens below this ref */
  anchorRef: React.RefObject<HTMLElement | null>;
}

export function NotificationPanel({ open, onClose, anchorRef }: NotificationPanelProps) {
  const { notifications, unreadCount, markRead, markAllRead } = useNotifications();
  const panelRef = React.useRef<HTMLDivElement>(null);

  // Close on Escape or outside click
  React.useEffect(() => {
    if (!open) return;

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    function handleClick(e: MouseEvent) {
      const target = e.target as Node;
      if (
        panelRef.current &&
        !panelRef.current.contains(target) &&
        anchorRef.current &&
        !anchorRef.current.contains(target)
      ) {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKey);
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("mousedown", handleClick);
    };
  }, [open, onClose, anchorRef]);

  // Keep focus inside when panel is open
  React.useEffect(() => {
    if (open) {
      panelRef.current
        ?.querySelector<HTMLElement>("button, a, [tabindex]")
        ?.focus();
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-label="Notifications"
          aria-modal="false"
          initial={{ opacity: 0, y: -6, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -4, scale: 0.97 }}
          transition={{ duration: 0.15, ease: [0.2, 0, 0, 1] }}
          className={cn(
            "absolute right-0 top-[calc(100%+8px)] z-50",
            "w-[380px] max-w-[calc(100vw-24px)]",
            "bg-[var(--paper)] border border-[var(--rule-strong)]",
            "rounded-[var(--r-lg)] shadow-[var(--sh-overlay)]",
            "overflow-hidden"
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-[16px] py-[12px] border-b border-[var(--rule)]">
            <div className="flex items-center gap-[8px]">
              <h2 className="font-serif font-medium text-[15px] text-[var(--ink)] m-0">
                Notifications
              </h2>
              {unreadCount > 0 && (
                <span
                  className="font-mono text-[10px] bg-[var(--brand)] text-white px-[5px] py-[1px] rounded-full"
                  aria-live="polite"
                >
                  {unreadCount}
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllRead}
                className="font-sans text-[12px] text-[var(--brand-ink)] hover:underline focus-visible:outline-none focus-visible:underline"
              >
                Mark all read
              </button>
            )}
          </div>

          {/* List */}
          <div
            className="max-h-[400px] overflow-y-auto"
            role="list"
            aria-label={`${notifications.length} notifications`}
          >
            {notifications.length === 0 ? (
              <div className="py-[40px] text-center">
                <p className="font-serif italic text-[16px] text-[var(--ink-muted)] m-0">
                  All caught up.
                </p>
              </div>
            ) : (
              notifications.map((notif) => (
                <div role="listitem" key={notif.id}>
                  <NotificationRow
                    notification={notif}
                    onMarkRead={markRead}
                    onClose={onClose}
                  />
                </div>
              ))
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

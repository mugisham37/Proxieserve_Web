import type { DashNotification, EventType } from "@/types";

const typeColor: Record<EventType, string> = {
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
  info: "var(--info)",
};

interface NotifItemProps {
  notif: DashNotification;
}

export function NotifItem({ notif }: NotifItemProps) {
  const color = typeColor[notif.type];

  return (
    <div
      className="flex gap-2.5 p-3 rounded-[var(--radius-md)] transition-colors cursor-default"
      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--surface-2)")}
      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
    >
      <div
        className="w-2 h-2 rounded-full mt-[6px] flex-shrink-0"
        style={{ background: color }}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 text-[12px] mb-1">
          <span className="font-medium" style={{ color }}>
            {notif.agent}
          </span>
          <span style={{ color: "var(--text-subtle)" }}>{notif.time}</span>
        </div>
        <p className="text-[13px] m-0" style={{ color: "var(--text-muted)" }}>
          {notif.msg}
        </p>
      </div>
    </div>
  );
}

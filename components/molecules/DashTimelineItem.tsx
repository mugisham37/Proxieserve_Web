import type { TimelineEvent, EventType } from "@/types";

const typeColor: Record<EventType, string> = {
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
  info: "var(--info)",
};

interface DashTimelineItemProps {
  event: TimelineEvent;
  isLast?: boolean;
  whyOpen: boolean;
  onWhyToggle: () => void;
}

export function DashTimelineItem({ event, isLast, whyOpen, onWhyToggle }: DashTimelineItemProps) {
  const color = typeColor[event.type];

  return (
    <div
      className="flex gap-2.5 py-2.5"
      style={{ borderBottom: isLast ? "none" : "1px solid var(--border)" }}
    >
      <div
        className="w-2 h-2 rounded-full mt-[6px] flex-shrink-0"
        style={{ background: color }}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 text-[12px] mb-1">
          <span className="font-medium" style={{ color }}>
            {event.agent}
          </span>
          <span style={{ color: "var(--text-subtle)" }}>{event.time}</span>
          <button
            className="ml-auto text-[11px] font-medium px-1.5 py-0.5 rounded bg-transparent border-none cursor-pointer"
            style={{ color: "var(--brand)", fontFamily: "inherit" }}
            onClick={onWhyToggle}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--brand-soft)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            Why?
          </button>
        </div>
        <p className="text-[13px] m-0" style={{ color: "var(--text-muted)" }}>
          {event.msg}
        </p>
        {whyOpen && event.whyHeadline && (
          <div
            className="mt-2 rounded-[var(--radius-md)] p-3"
            style={{ background: "var(--bg)", border: "1px solid var(--border)" }}
          >
            <p className="text-[12px] font-medium mb-1.5" style={{ color: "var(--text)" }}>
              {event.whyHeadline}
            </p>
            {event.whyPoints && (
              <ul className="list-none p-0 m-0 mb-2">
                {event.whyPoints.map((p, i) => (
                  <li
                    key={i}
                    className="text-[11px] py-0.5 pl-3 relative"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <span className="absolute left-0.5 font-bold" style={{ color: "var(--text-subtle)" }}>·</span>
                    {p}
                  </li>
                ))}
              </ul>
            )}
            <div className="flex items-center gap-2 text-[11px]">
              <span className="font-medium" style={{ color: "var(--brand)" }}>
                {event.whyAgent}
              </span>
              <code
                className="font-mono text-[10px]"
                style={{ color: "var(--text-subtle)", fontFamily: "var(--font-jetbrains-mono), monospace" }}
              >
                {event.whyRunId}
              </code>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

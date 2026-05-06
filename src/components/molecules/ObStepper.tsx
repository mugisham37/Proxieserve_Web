import { MkIcon } from "@/components/atoms/MkIcon";

interface ObStepperProps {
  steps: string[];
  current: number;
}

export function ObStepper({ steps, current }: ObStepperProps) {
  return (
    <div className="flex items-center flex-1 justify-center">
      {steps.map((label, i) => {
        const state = i < current ? "done" : i === current ? "active" : "pending";
        return (
          <div key={i} className="flex flex-col items-center relative flex-1">
            {/* Line before */}
            {i !== 0 && (
              <span
                className="absolute top-[14px] h-[2px] right-1/2 left-0 z-0"
                style={{
                  background:
                    state === "done" || (state === "active")
                      ? "var(--brand)"
                      : "var(--border)",
                }}
              />
            )}
            {/* Line after */}
            {i !== steps.length - 1 && (
              <span
                className="absolute top-[14px] h-[2px] left-1/2 right-0 z-0"
                style={{
                  background: state === "done" ? "var(--brand)" : "var(--border)",
                }}
              />
            )}
            {/* Circle */}
            <div
              className="w-[28px] h-[28px] rounded-full flex items-center justify-center text-[12px] font-semibold border-2 relative z-[1] transition-all duration-200"
              style={{
                background:
                  state === "done"
                    ? "var(--brand)"
                    : "var(--bg)",
                borderColor:
                  state === "done" || state === "active"
                    ? "var(--brand)"
                    : "var(--border)",
                color:
                  state === "done"
                    ? "#fff"
                    : state === "active"
                    ? "var(--brand)"
                    : "var(--text-subtle)",
                boxShadow:
                  state === "active"
                    ? "0 0 0 4px var(--brand-soft)"
                    : "none",
              }}
            >
              {state === "done" ? <MkIcon name="check" size={14} /> : <span>{i + 1}</span>}
            </div>
            {/* Label — hidden on small screens */}
            <span
              className="text-[10px] mt-1 text-center whitespace-nowrap hidden md:block"
              style={{
                color:
                  state === "active"
                    ? "var(--brand)"
                    : state === "done"
                    ? "var(--text-muted)"
                    : "var(--text-subtle)",
                fontWeight: state === "active" ? 500 : 400,
              }}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

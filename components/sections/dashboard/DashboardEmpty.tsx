import { MkIcon } from "@/components/atoms/MkIcon";

export function DashboardEmpty() {
  return (
    <div className="flex flex-col gap-6">
      <div className="text-center py-12 px-6">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
          style={{ background: "var(--brand-soft)", color: "var(--brand)" }}
        >
          <MkIcon name="zap" size={40} />
        </div>
        <h2 className="text-[22px] font-semibold mb-2">Your dashboard is waiting</h2>
        <p className="text-[15px] max-w-[480px] mx-auto mb-6" style={{ color: "var(--text-muted)" }}>
          Upload your first product and SolAI will create your campaigns, start conversations,
          and close orders — all automatically.
        </p>
        <div className="flex gap-3 justify-center mb-10">
          <button
            className="inline-flex items-center gap-1.5 px-5 py-2.5 text-[14px] font-semibold rounded-[var(--radius-md)] text-white cursor-pointer border-none transition-colors"
            style={{ background: "var(--brand)", fontFamily: "inherit" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#4A6BEE")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--brand)")}
          >
            <MkIcon name="arrowRight" size={16} /> Upload first product
          </button>
          <button
            className="inline-flex items-center gap-1.5 px-5 py-2.5 text-[14px] font-medium rounded-[var(--radius-md)] cursor-pointer transition-colors"
            style={{
              background: "transparent",
              color: "var(--text)",
              border: "1px solid var(--border)",
              fontFamily: "inherit",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface-2)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            Watch a demo
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3 max-w-[800px] mx-auto opacity-40">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-[var(--radius-lg)] p-4"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <div
                className="h-[10px] w-[60%] rounded mb-2 animate-pulse"
                style={{ background: "var(--surface-2)" }}
              />
              <div
                className="h-[22px] w-[50%] rounded mb-2.5 animate-pulse"
                style={{ background: "var(--surface-2)" }}
              />
              <div
                className="h-[4px] w-full rounded-full animate-pulse"
                style={{ background: "var(--surface-2)" }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

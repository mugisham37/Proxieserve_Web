import { MkIcon } from "@/src/components/atoms/MkIcon";

export default function ReportsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center"
        style={{ background: "var(--brand-soft)", color: "var(--brand)" }}
      >
        <MkIcon name="pieChart" size={32} />
      </div>
      <h1 className="text-[20px] font-semibold">Reports</h1>
      <p className="text-[14px]" style={{ color: "var(--text-muted)" }}>
        Analytics and reporting coming soon.
      </p>
    </div>
  );
}

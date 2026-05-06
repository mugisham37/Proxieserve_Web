import { MkIcon } from "@/components/atoms/MkIcon";

export default function ConversationsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center"
        style={{ background: "var(--brand-soft)", color: "var(--brand)" }}
      >
        <MkIcon name="messageCircle" size={32} />
      </div>
      <h1 className="text-[20px] font-semibold">Conversations</h1>
      <p className="text-[14px]" style={{ color: "var(--text-muted)" }}>
        Sales conversation management coming soon.
      </p>
    </div>
  );
}

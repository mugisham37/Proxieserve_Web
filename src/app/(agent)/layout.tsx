import type { Metadata } from "next";
import { AgentShell } from "@/components/organisms/agent/AgentShell";

export const metadata: Metadata = {
  title: "Agent Workspace — Hebuza",
  description: "Hebuza agent case management workspace",
};

export default function AgentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AgentShell>{children}</AgentShell>;
}

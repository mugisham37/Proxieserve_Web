import type { Metadata } from "next";
import { AgentShell } from "@/components/organisms/AgentShell";

export const metadata: Metadata = {
  title: "Agent Workspace — ProxiServe",
  description: "ProxiServe agent case management workspace",
};

export default function AgentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AgentShell>{children}</AgentShell>;
}

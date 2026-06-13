import type { AgentCase } from "@/lib/types/agent";

export function getAgentStats(cases: AgentCase[]) {
  const actionRequired = cases.filter((c) => c.status === "action-required").length;
  const inProgress = cases.filter((c) => c.status === "in-progress").length;
  const awaitingAuthority = cases.filter(
    (c) => c.status === "awaiting-response" || c.status === "submitted-to-authority"
  ).length;
  const doneThisWeek = cases.filter((c) => c.status === "completed").length;
  const overSLA = cases.filter((c) => c.slaState === "over").length;

  return { actionRequired, inProgress, awaitingAuthority, doneThisWeek, overSLA };
}

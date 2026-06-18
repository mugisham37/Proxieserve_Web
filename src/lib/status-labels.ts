export { getStatusLabel, mapBackendStatusToTrackStatus } from "@/lib/tracker-adapters";

const APPLICATION_STATUS_LABELS: Record<string, string> = {
  received: "Received",
  under_review: "Under review",
  in_progress: "In progress",
  action_required: "Action required",
  on_hold: "On hold",
  completed: "Completed",
  rejected: "Rejected",
  cancelled: "Cancelled",
};

export function getApplicationStatusLabel(status: string): string {
  return APPLICATION_STATUS_LABELS[status] ?? status.replace(/_/g, " ");
}

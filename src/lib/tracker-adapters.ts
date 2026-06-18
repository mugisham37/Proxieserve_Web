import type { TrackerResponse } from "@/lib/api/types";
import type { TrackStatus, TrackerViewData, TimelineStep } from "@/lib/tracker-ui-types";

const STATUS_LABELS: Record<string, string> = {
  received: "Application received",
  under_review: "Under review",
  in_progress: "In progress",
  action_required: "Action required",
  on_hold: "On hold",
  completed: "Completed",
  rejected: "Rejected",
  cancelled: "Cancelled",
};

export function mapBackendStatusToTrackStatus(status: string): TrackStatus {
  const map: Record<string, TrackStatus> = {
    received: "received",
    under_review: "received",
    in_progress: "in-progress",
    action_required: "action-required",
    on_hold: "on-hold",
    completed: "completed",
    rejected: "rejected",
    cancelled: "rejected",
  };
  return map[status] ?? "received";
}

export function getStatusLabel(status: string): string {
  return STATUS_LABELS[status] ?? status.replace(/_/g, " ");
}

function buildTimeline(data: TrackerResponse): TimelineStep[] {
  const steps: TimelineStep[] = [
    {
      id: "submitted",
      title: "Application submitted",
      status: "done",
      date: new Date(data.submitted_at).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    },
  ];

  if (data.current_step_title) {
    steps.push({
      id: "current",
      title: data.current_step_title,
      status: data.status === "completed" ? "done" : "current",
      date:
        data.status === "completed"
          ? new Date(data.updated_at).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })
          : undefined,
    });
  }

  if (data.estimated_completion && data.status !== "completed") {
    steps.push({
      id: "estimated",
      title: "Estimated completion",
      description: data.estimated_completion,
      status: "upcoming",
      estimated: true,
    });
  }

  return steps;
}

export function adaptTrackerResponse(data: TrackerResponse): TrackerViewData {
  const statusLabel = getStatusLabel(data.status);
  const trackStatus = mapBackendStatusToTrackStatus(data.status);

  return {
    code: data.code,
    serviceName: data.service_name,
    serviceCategory: data.service_name,
    status: trackStatus,
    statusLabel,
    headline: statusLabel,
    subheadline: data.current_step_title ?? `Your ${data.service_name} application is being processed.`,
    updatedAt: new Date(data.updated_at).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    submittedAt: new Date(data.submitted_at).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    currentStepTitle: data.current_step_title,
    estimatedCompletion: data.estimated_completion ?? undefined,
    timeline: buildTimeline(data),
    meta: {
      serviceType: data.service_name,
      tier: "Standard",
      submittedAt: new Date(data.submitted_at).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      serviceFee: 0,
      governmentFee: 0,
    },
  };
}

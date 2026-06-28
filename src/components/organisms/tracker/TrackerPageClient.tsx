"use client";

import { useTrackerLookup } from "@/hooks/useApplications";
import { adaptTrackerResponse } from "@/lib/tracker-adapters";
import { TrackerView } from "@/components/organisms/tracker/TrackerView";
import { SkeletonBlock } from "@/components/atoms/shared/SkeletonBlock";

interface TrackerPageClientProps {
  code: string;
}

export function TrackerPageClient({ code }: TrackerPageClientProps) {
  const { data, isLoading, isError, refetch, isFetching } = useTrackerLookup(code);

  if (isLoading) {
    return (
      <div className="container py-16 space-y-6">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.06em] text-[var(--ink-muted)] mb-2">
            Tracking {code}
          </p>
          <h1 className="font-serif text-[28px] text-[var(--ink)]">Loading application status…</h1>
        </div>
        <SkeletonBlock className="h-[320px] rounded-[var(--r-lg)]" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="container py-16 text-center">
        <h1 className="font-serif text-[24px] text-[var(--ink)] mb-2">Application not found</h1>
        <p className="font-sans text-[14px] text-[var(--ink-muted)]">
          Check your tracking code and try again. If the server was offline, wait a moment and refresh.
        </p>
      </div>
    );
  }

  return (
    <TrackerView
      application={adaptTrackerResponse(data)}
      onRefresh={() => void refetch()}
      isRefreshing={isFetching}
    />
  );
}

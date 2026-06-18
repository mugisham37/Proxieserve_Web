"use client";

import { useTrackerLookup } from "@/hooks/useApplications";
import { adaptTrackerResponse } from "@/lib/tracker-adapters";
import { TrackerView } from "@/components/organisms/tracker/TrackerView";
import { ServiceSkeletonCard } from "@/components/molecules/marketing/ServiceSkeletonCard";

interface TrackerPageClientProps {
  code: string;
}

export function TrackerPageClient({ code }: TrackerPageClientProps) {
  const { data, isLoading, isError, refetch, isFetching } = useTrackerLookup(code);

  if (isLoading) {
    return (
      <div className="container py-16">
        <ServiceSkeletonCard />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="container py-16 text-center">
        <h1 className="font-serif text-[24px] text-[var(--ink)] mb-2">Application not found</h1>
        <p className="font-sans text-[14px] text-[var(--ink-muted)]">
          Check your tracking code and try again.
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

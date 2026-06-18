export function WizShellSkeleton() {
  return (
    <div className="container py-12 animate-pulse">
      <div className="h-8 w-48 bg-[var(--rule)] rounded mb-4" />
      <div className="h-4 w-96 bg-[var(--rule-soft)] rounded mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
        <div className="h-96 bg-[var(--rule-soft)] rounded-[var(--r-lg)]" />
        <div className="h-64 bg-[var(--rule-soft)] rounded-[var(--r-lg)] hidden lg:block" />
      </div>
    </div>
  );
}

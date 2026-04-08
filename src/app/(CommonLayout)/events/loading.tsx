function EventCardSkeleton() {
  return (
    <div className="h-full overflow-hidden rounded-2xl border border-border bg-card">
      <div className="h-44 w-full animate-pulse bg-muted" />
      <div className="space-y-3 p-5">
        <div className="h-4 w-24 animate-pulse rounded bg-muted" />
        <div className="h-5 w-4/5 animate-pulse rounded bg-muted" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
        <div className="h-10 w-full animate-pulse rounded bg-muted" />
        <div className="h-16 w-full animate-pulse rounded bg-muted" />
        <div className="h-8 w-32 animate-pulse rounded bg-muted" />
      </div>
    </div>
  );
}

export default function EventsLoading() {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8 h-9 w-40 animate-pulse rounded bg-muted" />
      <div className="mb-8 h-10 w-full max-w-3xl animate-pulse rounded bg-muted" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <EventCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}

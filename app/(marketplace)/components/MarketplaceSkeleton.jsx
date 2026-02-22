export const MarketplaceSkeleton = () => {
  return (
    <div className="min-h-screen">
      {/* Header skeleton */}
      <div className="h-16 border-b bg-background animate-pulse" />

      <main className="py-4 sm:py-6 px-3 sm:px-6">
        <div className="flex gap-6">
          {/* Sidebar skeleton */}
          <div className="hidden lg:block w-64 space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-6 rounded-md bg-muted animate-pulse"
              />
            ))}
          </div>

          {/* Product grid skeleton */}
          <div className="grid flex-1 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-64 rounded-lg border bg-muted animate-pulse"
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}


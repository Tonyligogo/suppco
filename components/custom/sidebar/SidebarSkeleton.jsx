import React from 'react';

// Skeleton utility component
const Skeleton = ({ className = "", ...props }) => {
  return (
    <div
      className={`animate-pulse rounded-md bg-muted ${className}`}
      {...props}
    />
  );
};

// Individual sidebar item skeleton
const SidebarItemSkeleton = () => {
  return (
    <li className="my-1">
      <div className="flex items-center gap-2 p-[8px] rounded-lg">
        {/* Icon skeleton */}
        <Skeleton className="h-4 w-4" />
        {/* Text skeleton with varying widths for natural look */}
        <Skeleton className="h-4 flex-1 max-w-[120px]" />
      </div>
    </li>
  );
};

// Main sidebar skeleton component
const SidebarSkeleton = ({ className = "", itemCount = 6 }) => {
  return (
    <div className={`w-64 ${className}`}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          {/* Header/Title skeleton */}
          <div className="mb-4 px-4">
            <Skeleton className="h-6 w-32 mb-2" />
          </div>
          
          {/* Menu items skeleton */}
          <div className="space-y-1">
            <ul>
              {Array.from({ length: itemCount }, (_, index) => (
                <SidebarItemSkeleton key={index} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// Alternative: More detailed skeleton with sections
const DetailedSidebarSkeleton = ({ className = "" }) => {
  return (
    <div className={`w-64 ${className}`}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          {/* Header skeleton */}
          <div className="mb-4 px-4">
            <Skeleton className="h-6 w-28 mb-2" />
            <Skeleton className="h-3 w-20" />
          </div>
          
          {/* Main section */}
          <div className="space-y-1 mb-6">
            <ul>
              {/* Dashboard item (usually first and prominent) */}
              <li className="my-1">
                <div className="flex items-center gap-2 p-[8px] rounded-lg bg-muted/50">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </li>
              
              {/* Regular menu items */}
              {Array.from({ length: 4 }, (_, index) => (
                <SidebarItemSkeleton key={index} />
              ))}
            </ul>
          </div>
          
          {/* Secondary section */}
          <div className="space-y-1 pt-4 border-t border-muted">
            <div className="px-4 mb-2">
              <Skeleton className="h-3 w-16" />
            </div>
            <ul>
              {Array.from({ length: 2 }, (_, index) => (
                <SidebarItemSkeleton key={`secondary-${index}`} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sidebar skeleton with shimmer effect (enhanced version)
const ShimmerSidebarSkeleton = ({ className = "", itemCount = 6 }) => {
  return (
    <div className={`w-64 ${className}`}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          {/* Header skeleton */}
          <div className="mb-4 px-4">
            <div className="relative overflow-hidden rounded-md bg-muted h-6 w-32 mb-2">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
          </div>
          
          {/* Menu items with shimmer */}
          <div className="space-y-1">
            <ul>
              {Array.from({ length: itemCount }, (_, index) => (
                <li key={index} className="my-1">
                  <div className="flex items-center gap-2 p-[8px] rounded-lg">
                    {/* Icon skeleton with shimmer */}
                    <div className="relative overflow-hidden rounded-md bg-muted h-4 w-4">
                      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" style={{ animationDelay: `${index * 0.1}s` }} />
                    </div>
                    {/* Text skeleton with shimmer and varying widths */}
                    <div className={`relative overflow-hidden rounded-md bg-muted h-4 ${
                      index % 3 === 0 ? 'w-24' : index % 3 === 1 ? 'w-20' : 'w-28'
                    }`}>
                      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" style={{ animationDelay: `${index * 0.1}s` }} />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add custom CSS for shimmer animation (add this to your global CSS or component)
const shimmerStyles = `
  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }
`;

export default SidebarSkeleton;
export { DetailedSidebarSkeleton, ShimmerSidebarSkeleton, Skeleton };

// Usage examples:
// Basic: <SidebarSkeleton />
// Custom count: <SidebarSkeleton itemCount={8} />
// Detailed: <DetailedSidebarSkeleton />
// With shimmer: <ShimmerSidebarSkeleton />
// Custom styling: <SidebarSkeleton className="border-r bg-card" />
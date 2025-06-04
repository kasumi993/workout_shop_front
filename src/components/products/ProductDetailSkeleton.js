// Skeleton component for loading state
export default function ProductDetailSkeleton() {
  return (
    <div className="mt-8 animate-pulse px-4">
      <div className="container mx-auto">
        {/* Navigation skeleton */}
        <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
          <div className="flex flex-wrap items-center space-x-4">
            <div className="h-10 w-24 bg-gray-200 rounded-full"></div>
            <div className="h-4 w-64 bg-gray-200 rounded"></div>
          </div>
          <div className="flex flex-wrap items-center space-x-4">
            <div className="h-10 w-32 bg-gray-200 rounded"></div>
            <div className="h-10 w-40 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* Main content skeleton */}
        <div className="mt-12 flex flex-col lg:flex-row gap-12">
          {/* Images skeleton */}
          <div className="w-full lg:w-3/5">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="hidden md:flex flex-col space-y-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-20 h-20 bg-gray-200 rounded"></div>
                ))}
              </div>
              <div className="flex-1 h-80 md:h-[500px] bg-gray-200 rounded-lg"></div>
            </div>
          </div>

          {/* Details skeleton */}
          <div className="w-full lg:w-2/5">
            <div className="h-10 bg-gray-200 rounded mb-4"></div>
            <div className="flex items-center mb-4">
              <div className="h-6 w-32 bg-gray-200 rounded"></div>
            </div>
            <div className="h-8 w-48 bg-gray-200 rounded mb-8"></div>
            <div className="space-y-2 mb-8">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
            <div className="h-12 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 w-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

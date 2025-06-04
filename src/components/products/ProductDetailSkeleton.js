// Skeleton component for loading state
export default function ProductDetailSkeleton() {
  return (
    <div className="mt-4 md:mt-8 animate-pulse">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation skeleton */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <div className="flex flex-wrap items-center space-x-2 sm:space-x-4 flex-1">
            <div className="h-8 sm:h-10 w-20 sm:w-24 bg-gray-200 rounded-full"></div>
            <div className="h-4 w-48 sm:w-64 bg-gray-200 rounded hidden sm:block"></div>
          </div>
          <div className="flex flex-wrap items-center space-x-2 sm:space-x-4">
            <div className="h-8 sm:h-10 w-24 sm:w-32 bg-gray-200 rounded"></div>
            <div className="h-8 sm:h-10 w-32 sm:w-40 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* Main content skeleton */}
        <div className="mt-6 md:mt-8 lg:mt-12 xl:mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8 lg:gap-12 xl:gap-16">
            {/* Images skeleton */}
            <div className="lg:col-span-3">
              {/* Mobile/Desktop Image Layout */}
              <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                {/* Thumbnail strip - hidden on mobile */}
                <div className="hidden md:flex flex-col space-y-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-16 h-16 lg:w-20 lg:h-20 bg-gray-200 rounded"></div>
                  ))}
                </div>
                
                {/* Main image */}
                <div className="flex-1 aspect-square md:h-80 lg:h-[500px] bg-gray-200 rounded-lg"></div>
              </div>

              {/* Mobile thumbnail strip */}
              <div className="md:hidden mt-3 flex gap-2 overflow-x-auto px-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-16 h-16 bg-gray-200 rounded flex-shrink-0"></div>
                ))}
              </div>

              {/* Tabs skeleton - Desktop only */}
              <div className="hidden xl:block mt-8 md:mt-12 lg:mt-16">
                <div className="flex space-x-4 md:space-x-8 mb-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-4 w-16 sm:w-20 md:w-24 bg-gray-200 rounded"></div>
                  ))}
                </div>
                <div className="space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            </div>

            {/* Details skeleton */}
            <div className="lg:col-span-2">
              <div className="space-y-4 sm:space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <div className="h-8 sm:h-10 bg-gray-200 rounded w-full"></div>
                  <div className="h-6 sm:h-8 bg-gray-200 rounded w-3/4"></div>
                </div>
                
                {/* Rating */}
                <div className="flex items-center space-x-2">
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                  <div className="h-4 w-16 bg-gray-200 rounded"></div>
                </div>
                
                {/* Price */}
                <div className="flex items-center space-x-2">
                  <div className="h-8 sm:h-10 w-32 sm:w-40 bg-gray-200 rounded"></div>
                  <div className="h-4 w-16 bg-gray-200 rounded"></div>
                  <div className="h-4 w-20 bg-gray-200 rounded"></div>
                </div>
                
                {/* Description */}
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                </div>
                
                {/* Options */}
                <div className="space-y-3">
                  <div className="h-4 w-20 bg-gray-200 rounded"></div>
                  <div className="flex gap-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-10 w-16 bg-gray-200 rounded"></div>
                    ))}
                  </div>
                </div>
                
                {/* Quantity */}
                <div className="space-y-3">
                  <div className="h-4 w-16 bg-gray-200 rounded"></div>
                  <div className="flex items-center gap-3">
                    <div className="h-10 sm:h-12 w-10 sm:w-12 bg-gray-200 rounded"></div>
                    <div className="h-10 sm:h-12 w-16 sm:w-20 bg-gray-200 rounded"></div>
                    <div className="h-10 sm:h-12 w-10 sm:w-12 bg-gray-200 rounded"></div>
                  </div>
                </div>
                
                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <div className="h-12 sm:h-14 flex-1 bg-gray-200 rounded"></div>
                  <div className="h-12 sm:h-14 flex-1 bg-gray-200 rounded"></div>
                </div>
                
                {/* Delivery info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-5 bg-gray-200 rounded"></div>
                    <div className="h-4 flex-1 bg-gray-200 rounded"></div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-5 bg-gray-200 rounded"></div>
                    <div className="h-3 flex-1 bg-gray-200 rounded"></div>
                  </div>
                </div>
                
                {/* Feature cards */}
                <div className="p-4 sm:p-6 bg-gray-100 rounded-lg space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-start gap-3 sm:gap-4">
                      <div className="h-6 w-6 bg-gray-200 rounded flex-shrink-0"></div>
                      <div className="space-y-1 flex-1">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Tabs skeleton - After product details */}
          <div className="xl:hidden mt-8 md:mt-12 lg:mt-16">
            <div className="flex space-x-4 md:space-x-8 mb-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-4 w-16 sm:w-20 md:w-24 bg-gray-200 rounded"></div>
              ))}
            </div>
            <div className="space-y-4">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        </div>
        
        {/* Related products skeleton */}
        <div className="mt-12 md:mt-16">
          <div className="h-6 sm:h-8 w-48 bg-gray-200 rounded mb-6"></div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm">
                <div className="aspect-square bg-gray-200"></div>
                <div className="p-3 sm:p-4 space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
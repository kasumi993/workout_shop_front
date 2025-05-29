export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md animate-pulse">
      {/* Image Skeleton */}
      <div className="relative overflow-hidden">
        <div className="w-full h-50 bg-gray-200"></div>
      </div>
      
      {/* Content Skeleton */}
      <div className="p-4">
        {/* Title */}
        <div className="h-6 bg-gray-200 rounded mb-2"></div>
        
        {/* Description */}
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
        
        {/* Price */}
        <div className="flex gap-2 items-center mb-6">
          <div className="h-5 bg-gray-200 rounded w-24"></div>
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </div>
        
        {/* Button */}
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}
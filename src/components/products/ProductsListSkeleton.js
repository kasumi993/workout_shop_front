import ProductCardSkeleton from './ProductCardSkeleton';

export default function ProductsListSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 gap-6">
      {[...Array(count)].map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}
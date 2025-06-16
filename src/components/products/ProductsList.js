import { useEffect, useRef } from 'react';
import ProductCard from './ProductCard';
import ProductCardSkeleton from './ProductCardSkeleton';
import LoadingSpinner from '../globalComponents/LoadingSpinner';
import { HiOutlineAdjustmentsHorizontal, HiOutlineShoppingBag } from 'react-icons/hi2';
import Link from 'next/link';

export default function ProductsList({ 
  products = [],
  hasMore = false,
  loading = false,
  loadMore,
  hasActiveFilters = false,
  onResetFilters,
  error = null,
  totalCount = 0
}) {
  const loaderRef = useRef(null);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const currentRef = loaderRef.current;
    
    if (!currentRef || !hasMore || loading || products.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore?.();
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    observer.observe(currentRef);
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasMore, loading, loadMore, products.length]);

  // Error state
  if (error) {
    return (
      <div className="text-center py-16 px-4">
        <div className="max-w-md mx-auto">
          <div className="text-red-500 text-6xl mx-auto mb-6">⚠️</div>
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-600 mb-3">
            Erreur de chargement
          </h3>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-6">
            Une erreur s&apos;est produite lors du chargement des produits.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gray-900 text-white px-6 py-3 rounded-md hover:bg-gray-800 transition duration-300"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  // Empty state - no products at all
  if (!loading && products.length === 0 && !hasActiveFilters) {
    return (
      <div className="text-center py-16 px-4">
        <div className="max-w-md mx-auto">
          <HiOutlineShoppingBag className="text-gray-300 text-6xl mx-auto mb-6" />
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-600 mb-3">
            Aucun produit disponible
          </h3>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
            Notre catalogue est en cours de mise à jour. 
            Revenez bientôt pour découvrir nos nouveaux produits !
          </p>
        </div>
      </div>
    );
  }

  // Empty state - filters return no results
  if (!loading && products.length === 0 && hasActiveFilters) {
    return (
      <div className="text-center py-16 px-4">
        <div className="max-w-md mx-auto">
          <HiOutlineAdjustmentsHorizontal className="text-gray-300 text-6xl mx-auto mb-6" />
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-600 mb-3">
            Aucun produit trouvé
          </h3>
          <p className="text-gray-500 text-sm sm:text-base mb-6 leading-relaxed">
            Aucun produit ne correspond à vos critères de recherche. 
            Essayez de modifier vos filtres ou votre recherche.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Results info */}
      <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
        <span>
          {loading && products.length === 0 ? (
            <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
          ) : (
            `${products.length}${totalCount ? ` sur ${totalCount}` : ''} produit${products.length > 1 ? 's' : ''}`
          )}
        </span>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        
        {/* Loading skeletons for initial load */}
        {loading && products.length === 0 && Array.from({ length: 8 }).map((_, index) => (
          <ProductCardSkeleton key={`skeleton-${index}`} />
        ))}
      </div>

      {/* Load more trigger / Loading indicator */}
      {(hasMore || loading) && products.length > 0 && (
        <div ref={loaderRef} className="flex justify-center py-8">
          {loading ? (
            <LoadingSpinner size="md" message="Chargement des produits..." />
          ) : (
            <button
              onClick={loadMore}
              className="bg-gray-900 text-white px-6 py-3 rounded-md hover:bg-gray-800 transition duration-300"
            >
              Voir plus de produits
            </button>
          )}
        </div>
      )}
    </div>
  );
}
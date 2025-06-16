import { useEffect, useRef, useCallback, useState } from 'react';
import { FixedSizeGrid as Grid } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import ProductCard from './ProductCard';
import ProductCardSkeleton from './ProductCardSkeleton';
import LoadingSpinner from '../globalComponents/LoadingSpinner';
import { HiOutlineAdjustmentsHorizontal, HiOutlineShoppingBag } from 'react-icons/hi2';
import Link from 'next/link';

// Virtual Grid Item Component
const GridItem = ({ columnIndex, rowIndex, style, data }) => {
  const { products, columnsCount, loading, hasMore, itemWidth } = data;
  const index = rowIndex * columnsCount + columnIndex;
  
  // Show skeleton for loading items
  if (index >= products.length) {
    if (loading && hasMore) {
      return (
        <div style={style}>
          <div className="p-2">
            <ProductCardSkeleton />
          </div>
        </div>
      );
    }
    return <div style={style} />;
  }

  const product = products[index];
  
  return (
    <div style={style}>
      <div className="p-2">
        <ProductCard product={product} />
      </div>
    </div>
  );
};

export default function InfiniteProductsList({ 
  products = [],
  hasMore = false,
  loading = false,
  loadMore,
  hasActiveFilters = false,
  onResetFilters,
  error = null,
  totalCount = 0,
  useVirtualization = true
}) {
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);
  const loaderRef = useRef(null);

  // Calculate grid dimensions
  const getGridDimensions = useCallback(() => {
    if (!containerSize.width) return { columnsCount: 1, itemWidth: 300, itemHeight: 400 };
    
    const minItemWidth = 280;
    const gap = 16;
    const columnsCount = Math.max(1, Math.floor((containerSize.width + gap) / (minItemWidth + gap)));
    const itemWidth = Math.floor((containerSize.width - (gap * (columnsCount - 1))) / columnsCount);
    const itemHeight = 450; // Fixed height for product cards
    
    return { columnsCount, itemWidth, itemHeight };
  }, [containerSize.width]);

  const { columnsCount, itemWidth, itemHeight } = getGridDimensions();

  // Update container size on resize
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setContainerSize({ width, height: Math.max(height, 600) });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Intersection Observer for infinite scroll (fallback)
  useEffect(() => {
    if (!useVirtualization && loaderRef.current && hasMore && !loading) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            loadMore?.();
          }
        },
        { threshold: 0.1 }
      );

      observer.observe(loaderRef.current);
      return () => observer.disconnect();
    }
  }, [hasMore, loading, loadMore, useVirtualization]);

  // Calculate row count for virtual grid
  const rowCount = Math.ceil((products.length + (loading ? columnsCount : 0)) / columnsCount);

  // Check if item is loaded for infinite loader
  const isItemLoaded = useCallback((index) => {
    return index < products.length;
  }, [products.length]);

  // Load more items
  const loadMoreItems = useCallback(() => {
    if (!loading && hasMore) {
      return loadMore?.();
    }
    return Promise.resolve();
  }, [loading, hasMore, loadMore]);

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
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={onResetFilters}
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 hover:border-blue-300 transition-all duration-200"
            >
              <HiOutlineAdjustmentsHorizontal className="w-4 h-4 mr-2" />
              Réinitialiser les filtres
            </button>
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 hover:border-gray-300 transition-all duration-200"
            >
              Voir tous les produits
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Results info
  const ResultsInfo = () => (
    <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
      <span>
        {loading && products.length === 0 ? (
          <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
        ) : (
          `${products.length}${totalCount ? ` sur ${totalCount}` : ''} produit${products.length > 1 ? 's' : ''}`
        )}
      </span>
      {useVirtualization && (
        <span className="text-xs text-gray-400">Affichage optimisé</span>
      )}
    </div>
  );

  // Virtual Grid Component
  const VirtualGrid = () => (
    <div ref={containerRef} className="w-full" style={{ height: '800px' }}>
      {containerSize.width > 0 && (
        <InfiniteLoader
          isItemLoaded={isItemLoaded}
          itemCount={hasMore ? products.length + columnsCount : products.length}
          loadMoreItems={loadMoreItems}
          threshold={2}
        >
          {({ onItemsRendered, ref }) => (
            <Grid
              ref={ref}
              columnCount={columnsCount}
              columnWidth={itemWidth}
              height={800}
              rowCount={rowCount}
              rowHeight={itemHeight}
              onItemsRendered={({
                visibleRowStartIndex,
                visibleRowStopIndex,
                visibleColumnStartIndex,
                visibleColumnStopIndex,
              }) => {
                const startIndex = visibleRowStartIndex * columnsCount + visibleColumnStartIndex;
                const stopIndex = visibleRowStopIndex * columnsCount + visibleColumnStopIndex;
                onItemsRendered({
                  visibleStartIndex: startIndex,
                  visibleStopIndex: stopIndex,
                });
              }}
              itemData={{
                products,
                columnsCount,
                loading,
                hasMore,
                itemWidth
              }}
              width={containerSize.width}
            >
              {GridItem}
            </Grid>
          )}
        </InfiniteLoader>
      )}
    </div>
  );

  // Standard Grid Component (fallback)
  const StandardGrid = () => (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 sm:gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        
        {/* Loading skeletons */}
        {loading && Array.from({ length: 8 }).map((_, index) => (
          <ProductCardSkeleton key={`skeleton-${index}`} />
        ))}
      </div>

      {/* Load more trigger */}
      <div ref={loaderRef} className="flex justify-center py-8">
        {loading && (
          <LoadingSpinner size="md" message="Chargement des produits..." />
        )}
        {!loading && hasMore && (
          <button
            onClick={loadMore}
            className="bg-gray-900 text-white px-6 py-3 rounded-md hover:bg-gray-800 transition duration-300"
          >
            Voir plus de produits
          </button>
        )}
      </div>
    </>
  );

  return (
    <div>
      <ResultsInfo />
      {useVirtualization && products.length > 20 ? <VirtualGrid /> : <StandardGrid />}
    </div>
  );
}
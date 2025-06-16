import { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import AnimatedElement from '../animations/AnimatedElement';
import StaggerContainer from '../animations/StaggerContainer';
import AnimatedButton from '../animations/AnimatedButton';
import ProductCard from './ProductCard';
import ProductCardSkeleton from './ProductCardSkeleton';
import FiltersAndSearch from '@/components/filters/FiltersAndSearch';
import LoadingSpinner from '../globalComponents/LoadingSpinner';
import productsService from '@/services/productsService';
import { useToast } from '@/context/ToastContext';

export default function ProductsSection() {
  const router = useRouter();
  const { showError } = useToast();
  const title = useRef(null);
  const filtersBar = useRef(null);
  
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasActiveFilters, setHasActiveFilters] = useState(false);
  const [resetFilters, setResetFilters] = useState(null);
  const [showCount, setShowCount] = useState(8); // Initial count for homepage
  const [totalAvailable, setTotalAvailable] = useState(0);

  // Fetch products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await productsService.getProducts({ 
        limit: 50, // Fetch more for better filtering experience
        page: 1 
      });
      
      const productsData = response.products || response; // Handle both paginated and simple response
      setProducts(productsData);
      setFilteredProducts(productsData);
      setTotalAvailable(productsData.length);
      
      // Show initial products
      setDisplayedProducts(productsData.slice(0, showCount));
    } catch (error) {
      console.error('Failed to fetch products:', error);
      showError('Erreur lors du chargement des produits');
      setProducts([]);
      setFilteredProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle filtered products change
  const handleSetFilteredProducts = useCallback((filtered, hasFilters, resetFunction) => {
    setFilteredProducts(filtered);
    setHasActiveFilters(hasFilters);
    setResetFilters(() => resetFunction);
    setTotalAvailable(filtered.length);
    
    // Reset display count when filters change
    setShowCount(8);
    setDisplayedProducts(filtered.slice(0, 8));
  }, []);

  // Load more products
  const handleLoadMore = useCallback(async () => {
    if (loadingMore) return;
    
    setLoadingMore(true);
    
    // Simulate loading delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newCount = showCount + 8;
    setShowCount(newCount);
    setDisplayedProducts(filteredProducts.slice(0, newCount));
    setLoadingMore(false);
  }, [showCount, filteredProducts, loadingMore]);

  // Navigate to full products page
  const handleViewAllProducts = () => {
    router.push('/products');
  };

  const hasMoreProducts = displayedProducts.length < filteredProducts.length;
  const canShowMore = hasMoreProducts && displayedProducts.length < 24; // Limit to 24 on homepage

  return (
    <section id="products" className="py-12 sm:py-16 lg:py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <AnimatedElement animation="slideUp" className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div ref={title}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800 mb-3 sm:mb-4">
              Nos Produits Exclusifs
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Plus d&apos;excuses, le sport s&apos;invite chez vous. Commandez dès maintenant.
            </p>
          </div>
        </AnimatedElement>

        {/* Filters Bar */}
        <AnimatedElement animation="slideUp" delay={0.1} className="mb-8 sm:mb-12 lg:mb-16">
          <div ref={filtersBar}>
            <FiltersAndSearch 
              products={products}
              setFilteredProducts={handleSetFilteredProducts}
            />
          </div>
        </AnimatedElement>

        {/* Products Grid */}
        <div className="relative">
          {loading ? (
            // Loading Skeletons
            <StaggerContainer className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-4 gap-4 sm:gap-6">
              {[...Array(8)].map((_, index) => (
                <AnimatedElement key={index} animation="scaleIn" delay={index * 0.05}>
                  <ProductCardSkeleton />
                </AnimatedElement>
              ))}
            </StaggerContainer>
          ) : displayedProducts.length > 0 ? (
            <>
              {/* Products Grid */}
              <StaggerContainer className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-4 gap-4 sm:gap-6">
                {displayedProducts.map((product, index) => (
                  <AnimatedElement 
                    key={product.id} 
                    animation="scaleIn"
                    delay={index * 0.05}
                  >
                    <ProductCard product={product} />
                  </AnimatedElement>
                ))}
              </StaggerContainer>

              {/* Loading More Indicator */}
              {loadingMore && (
                <div className="flex justify-center py-8">
                  <LoadingSpinner size="md" message="Chargement..." />
                </div>
              )}

              {/* Action Buttons */}
              <AnimatedElement animation="slideUp" delay={0.3} className="text-center mt-8 sm:mt-12">
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  
                  {/* Show More Button */}
                  {canShowMore && (
                    <AnimatedButton
                      onClick={handleLoadMore}
                      disabled={loadingMore}
                      variant="outline"
                      size="lg"
                      loading={loadingMore}
                      className="w-full sm:w-auto"
                    >
                      {loadingMore ? 'Chargement...' : `Voir plus (${filteredProducts.length - displayedProducts.length} restants)`}
                    </AnimatedButton>
                  )}

                  {/* View All Button */}
                  <AnimatedButton
                    onClick={handleViewAllProducts}
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    Voir tous les produits ({totalAvailable})
                  </AnimatedButton>
                </div>

                {/* Results Info */}
                <p className="text-sm text-gray-500 mt-4">
                  Affichage de {displayedProducts.length} sur {filteredProducts.length} produits
                </p>
              </AnimatedElement>
            </>
          ) : (
            // Empty State
            <AnimatedElement animation="scaleIn">
              <div className="text-center py-12 sm:py-16">
                <div className="max-w-md mx-auto">
                  <div className="text-6xl mb-6">🏃‍♂️</div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-600 mb-3">
                    {hasActiveFilters ? 'Aucun produit trouvé' : 'Aucun produit disponible'}
                  </h3>
                  <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-6">
                    {hasActiveFilters 
                      ? 'Essayez de modifier vos critères de recherche.'
                      : 'Notre catalogue est en cours de mise à jour.'
                    }
                  </p>
                  {hasActiveFilters && resetFilters && (
                    <AnimatedButton
                      onClick={resetFilters}
                      variant="primary"
                      size="md"
                    >
                      Réinitialiser les filtres
                    </AnimatedButton>
                  )}
                </div>
              </div>
            </AnimatedElement>
          )}
        </div>
      </div>
    </section>
  );
}
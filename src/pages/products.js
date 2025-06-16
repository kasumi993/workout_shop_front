import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import MainLayout from '@/layouts/MainLayout';
import SEOHead from '@/components/seo/SEOHead';
import AnimatedElement from '@/components/animations/AnimatedElement';
import PageTransition from '@/components/animations/PageTransition';
import FiltersAndSearch from '@/components/filters/FiltersAndSearch';
import ProductsList from '@/components/products/ProductsList';
import { useProducts } from '@/hooks/useProducts';
import { generateBreadcrumbs } from '@/utils/seo';

export default function ProductsPage() {
  const router = useRouter();
  const [hasActiveFilters, setHasActiveFilters] = useState(false);
  
  // Get initial params from URL
  const getInitialParams = () => {
    const params = {
      page: 1,
      limit: 12,
      sortBy: 'featured'
    };
    
    // Only parse URL params on client side
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      
      if (urlParams.get('search')) params.search = urlParams.get('search');
      if (urlParams.get('category') && urlParams.get('category') !== 'all') {
        params.category = urlParams.get('category');
      }
      if (urlParams.get('minPrice')) params.minPrice = parseInt(urlParams.get('minPrice'));
      if (urlParams.get('maxPrice')) params.maxPrice = parseInt(urlParams.get('maxPrice'));
      if (urlParams.get('sortBy')) params.sortBy = urlParams.get('sortBy');
    }
    
    return params;
  };

  const {
    products,
    pagination,
    filters,
    loading,
    error,
    hasMore,
    loadMore,
    refetch
  } = useProducts(getInitialParams());

  // Handle filter changes from FiltersAndSearch component
  const handleFiltersChange = useCallback((newParams, hasFilters) => {
    setHasActiveFilters(hasFilters);
    
    // Update URL without page reload
    if (typeof window !== 'undefined') {
      const url = new URL(window.location);
      
      // Clear all params first
      url.search = '';
      
      // Add only non-default params
      Object.entries(newParams).forEach(([key, value]) => {
        if (key === 'page' || key === 'limit') return; // Skip pagination params
        
        // Skip default values
        if (key === 'sortBy' && value === 'featured') return;
        if (key === 'category' && value === 'all') return;
        if ((key === 'minPrice' && value === 0) || (key === 'maxPrice' && value === 100000)) return;
        if (!value) return;
        
        url.searchParams.set(key, value.toString());
      });
      
      window.history.replaceState({}, '', url.pathname + url.search);
    }
    
    // Refetch products with new filters
    refetch(newParams);
  }, [refetch]);

  // Handle reset filters
  const handleResetFilters = useCallback(() => {
    setHasActiveFilters(false);
    
    // Clear URL params
    if (typeof window !== 'undefined') {
      window.history.replaceState({}, '', window.location.pathname);
    }
    
    // Reset to default params
    refetch({ page: 1, limit: 12, sortBy: 'featured' });
  }, [refetch]);

  // Generate SEO data
  const selectedCategory = filters?.categories?.find(cat => {
    const currentCategory = getInitialParams().category;
    return cat.id === currentCategory || cat.slug === currentCategory;
  });
  
  const breadcrumbs = generateBreadcrumbs(router, null, selectedCategory);
  
  const seoTitle = selectedCategory 
    ? `${selectedCategory.name} - ${pagination.total || products.length} produits | Workout Shop`
    : `Équipements de Sport & Fitness - ${pagination.total || products.length} produits | Workout Shop`;
    
  const seoDescription = selectedCategory
    ? `Découvrez notre sélection de ${selectedCategory.name.toLowerCase()} (${pagination.total || products.length} produits). Équipements de sport de qualité avec livraison rapide au Sénégal.`
    : `Découvrez notre large gamme d'équipements de sport et fitness (${pagination.total || products.length} produits). Musculation, cardio, yoga et plus encore. Livraison rapide à Dakar.`;

  return (
    <PageTransition>
      <MainLayout>
        <SEOHead
          title={seoTitle}
          description={seoDescription}
          breadcrumbs={breadcrumbs}
        />

        <div className="min-h-screen bg-gray-50">
          {/* Page Header */}
          <div className="bg-white shadow-sm">
            <div className="container mx-auto px-4 py-6 sm:py-8 lg:py-12">
              <AnimatedElement animation="slideUp">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2 sm:mb-3">
                  {selectedCategory ? selectedCategory.name : 'Nos Produits'}
                </h1>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                  {selectedCategory 
                    ? `Découvrez notre sélection de ${selectedCategory.name.toLowerCase()}`
                    : 'Découvrez notre large gamme d\'équipements de sport et fitness de qualité'
                  }
                </p>
                
                {/* Breadcrumbs */}
                {breadcrumbs.length > 1 && (
                  <nav className="mt-4 sm:mt-6" aria-label="Breadcrumb">
                    <ol className="flex space-x-2 text-sm text-gray-500">
                      {breadcrumbs.map((crumb, index) => (
                        <li key={crumb.href} className="flex items-center">
                          {index > 0 && <span className="mr-2">/</span>}
                          {index === breadcrumbs.length - 1 ? (
                            <span className="text-gray-900 font-medium">{crumb.name}</span>
                          ) : (
                            <a 
                              href={crumb.href}
                              className="hover:text-gray-700 transition-colors"
                            >
                              {crumb.name}
                            </a>
                          )}
                        </li>
                      ))}
                    </ol>
                  </nav>
                )}
              </AnimatedElement>
            </div>
          </div>

          <div className="container mx-auto px-4 py-6 sm:py-8">
            {/* Filters and Search */}
            <AnimatedElement animation="slideUp" delay={0.1}>
              <FiltersAndSearch
                hideAllProductsBtn={true}
                onFiltersChange={handleFiltersChange}
                initialFilters={getInitialParams()}
              />
            </AnimatedElement>

            {/* Products List */}
            <AnimatedElement animation="slideUp" delay={0.2}>
              <ProductsList
                products={products}
                hasMore={hasMore}
                loading={loading}
                loadMore={loadMore}
                hasActiveFilters={hasActiveFilters}
                onResetFilters={handleResetFilters}
                error={error}
                totalCount={pagination?.total}
              />
            </AnimatedElement>
          </div>
        </div>
      </MainLayout>
    </PageTransition>
  );
}
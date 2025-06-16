import { useState, useEffect, useCallback } from 'react';
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
  const [filterParams, setFilterParams] = useState({});
  const [hasActiveFilters, setHasActiveFilters] = useState(false);
  
  // Get initial params from URL
  const getInitialParams = useCallback(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      return {
        page: parseInt(urlParams.get('page')) || 1,
        limit: 12,
        search: urlParams.get('search') || '',
        category: urlParams.get('category') || 'all',
        minPrice: parseInt(urlParams.get('minPrice')) || undefined,
        maxPrice: parseInt(urlParams.get('maxPrice')) || undefined,
        sortBy: urlParams.get('sortBy') || 'featured'
      };
    }
    return { page: 1, limit: 12 };
  }, []);

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
    setFilterParams(newParams);
    setHasActiveFilters(hasFilters);
    refetch(newParams);
  }, [refetch]);

  // Handle reset filters
  const handleResetFilters = useCallback(() => {
    const defaultParams = { page: 1, limit: 12 };
    setFilterParams(defaultParams);
    setHasActiveFilters(false);
    refetch(defaultParams);
  }, [refetch]);

  // Generate SEO data
  const selectedCategory = filters?.categories?.find(cat => 
    cat.id === filterParams.category || cat.name.toLowerCase() === filterParams.category
  );
  
  const breadcrumbs = generateBreadcrumbs(router, null, selectedCategory);
  
  const seoTitle = selectedCategory 
    ? `${selectedCategory.name} - ${products.length} produits | Workout Shop`
    : `Équipements de Sport & Fitness - ${products.length} produits | Workout Shop`;
    
  const seoDescription = selectedCategory
    ? `Découvrez notre sélection de ${selectedCategory.name.toLowerCase()} (${products.length} produits). Équipements de sport de qualité avec livraison rapide au Sénégal.`
    : `Découvrez notre large gamme d'équipements de sport et fitness (${products.length} produits). Musculation, cardio, yoga et plus encore. Livraison rapide à Dakar.`;

  // Structured data for products listing
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": seoTitle,
    "description": seoDescription,
    "url": `${process.env.NEXT_PUBLIC_SITE_URL}/products`,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": products.length,
      "itemListElement": products.slice(0, 10).map((product, index) => ({
        "@type": "Product",
        "position": index + 1,
        "name": product.title,
        "description": product.description,
        "image": product.images?.[0],
        "offers": {
          "@type": "Offer",
          "price": product.price,
          "priceCurrency": "XOF",
          "availability": "https://schema.org/InStock"
        }
      }))
    }
  };

  return (
    <PageTransition>
      <MainLayout>
        <SEOHead
          title={seoTitle}
          description={seoDescription}
          structuredData={structuredData}
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
                availableFilters={filters}
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
                useVirtualization={products.length > 20}
              />
            </AnimatedElement>
          </div>
        </div>
      </MainLayout>
    </PageTransition>
  );
}
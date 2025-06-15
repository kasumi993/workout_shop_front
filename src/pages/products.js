import { useState, useEffect } from 'react';
import ProductsList from '@/components/products/ProductsList';
import MainLayout from '@/layouts/MainLayout';
import productsService from '@/services/productsService';
import FiltersAndSearch from '@/components/filters/FiltersAndSearch';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasActiveFilters, setHasActiveFilters] = useState(false);
  const [resetFilters, setResetFilters] = useState(null);

  // Fetch products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await productsService.getProducts();
      setProducts(data || []);
      setFilteredProducts(data || []);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setProducts([]);
      setFilteredProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle filtered products change with additional info
  const handleSetFilteredProducts = (filtered, hasFilters, resetFunction) => {
    setFilteredProducts(filtered);
    setHasActiveFilters(hasFilters);
    setResetFilters(() => resetFunction);
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Page Header */}
        <div className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Nos Produits</h1>
            <p className="text-gray-600">Découvrez notre sélection d&apos;équipements sportifs de qualité</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Search and Filter Bar */}
          <FiltersAndSearch 
            hideAllProductsBtn={true}
            products={products}
            setFilteredProducts={handleSetFilteredProducts}
          />

          {/* Results Count */}
          <div className="mb-4 text-gray-600">
            {loading ? (
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
            ) : (
              <span>{filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}</span>
            )}
          </div>

          {/* Products List with all states handled */}
          <ProductsList 
            products={filteredProducts} 
            allProducts={products}
            isLoading={loading}
            hasActiveFilters={hasActiveFilters}
            onResetFilters={resetFilters}
          />
        </div>
      </div>
    </MainLayout>
  );
}
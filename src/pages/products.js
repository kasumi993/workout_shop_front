import { useState, useEffect } from 'react';
import ProductCard from '@/components/products/ProductCard';
import ProductsListSkeleton from '@/components/products/ProductsListSkeleton';
import MainLayout from '@/layouts/MainLayout';
import productsService from '@/services/productsService';
import FiltersAndSearch from '@/components/filters/FiltersAndSearch';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
  const [searchQuery, setSearchQuery] = useState('');



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

  const isLoading = loading;

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
            setFilteredProducts={setFilteredProducts}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          {/* Results Count */}
          <div className="mb-4 text-gray-600">
            {isLoading ? (
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
            ) : (
              <span>{filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}</span>
            )}
          </div>

          {/* Products Grid */}
          {isLoading ? (
            <ProductsListSkeleton count={8} />
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Aucun produit trouvé</p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setPriceRange({ min: 0, max: 100000 });
                  setSearchQuery('');
                }}
                className="mt-4 text-blue-600 hover:text-blue-800"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
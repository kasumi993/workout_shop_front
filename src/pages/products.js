import { useState, useEffect } from 'react';
import ProductCard from '@/components/products/ProductCard';
import ProductsListSkeleton from '@/components/products/ProductsListSkeleton';
import { HiOutlineFunnel } from 'react-icons/hi2';
import MainLayout from '@/layouts/MainLayout';
import productsService from '@/services/productsService';
import SearchBar from '@/components/filters/SearchBar';
import FiltersMenu from '@/components/filters/FiltersMenu';
import SortBtn from '@/components/filters/SortBtn';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('featured');


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

  // Filter products
  useEffect(() => {
    let filtered = [...products];

    // Category filter - now works with both parent and child categories
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => {
        // Check if product matches selected category or its parent
        return p.category === selectedCategory || 
               p.categorySlug === selectedCategory ||
               p.parentCategorySlug === selectedCategory;
      });
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Price filter
    filtered = filtered.filter(p => 
      p.price >= priceRange.min && p.price <= priceRange.max
    );

    // Sort
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchQuery, priceRange, sortBy]);

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
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

              {/* Sort */}
              <SortBtn sortBy={sortBy} setSortBy={setSortBy} />

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-200"
              >
                <HiOutlineFunnel />
                Filtres
                {(selectedCategory !== 'all' || priceRange.max < 100000) && (
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    {[selectedCategory !== 'all', priceRange.max < 100000].filter(Boolean).length}
                  </span>
                )}
              </button>
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <FiltersMenu 
                selectedCategory={selectedCategory} 
                setSelectedCategory={setSelectedCategory} 
                priceRange={priceRange} 
                setPriceRange={setPriceRange} 
                setSearchQuery={setSearchQuery} 
              />
            )}
          </div>

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
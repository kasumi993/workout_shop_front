import { useEffect, useRef, useState } from 'react';
import SlideOnScroll from '../animations/SlideOnScroll';
import ProductsList from './ProductsList';
import FiltersAndSearch from '@/components/filters/FiltersAndSearch';
import ProductsService from '@/services/productsService';

export default function ProductsSection() {
  const title = useRef(null);
  const filtersBar = useRef(null);
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
      const data = await ProductsService.getProducts();
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
    <section id="products" className="py-16 bg-white">
      <div className="container mx-auto">
        <SlideOnScroll ref={title} animationType="slide-top" start="top 90%">
          <div ref={title} className="text-center mb-15 mt-5 px-8">
            <h2 className="text-5xl font-bold text-gray-800 mb-2">Nos Produits Exclusifs</h2>
            <p className="mt-5 font-light text-xl text-gray-600 mx-auto">
              Plus d&apos;excuses, le sport s&apos;invite chez vous. Commandez dès maintenant.
            </p>
          </div>
        </SlideOnScroll>
        

        <SlideOnScroll ref={filtersBar} animationType="slide-top" start="top 80%">
          <div ref={filtersBar} className="mb-12 lg:mb-25">
            <FiltersAndSearch 
              products={products}
              setFilteredProducts={handleSetFilteredProducts}
             />
          </div>
        </SlideOnScroll>
        <div>
          <ProductsList 
            products={filteredProducts} 
            allProducts={products}
            isLoading={loading}
            hasActiveFilters={hasActiveFilters}
            onResetFilters={resetFilters}
          />
        </div>
      </div>
    </section>
  );
}
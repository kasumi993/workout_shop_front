import { useEffect, useRef, useState } from 'react';
import SlideOnScroll from '../animations/SlideOnScroll';
import ProductsList from './ProductsList';
import FiltersAndSearch from '@/components/filters/FiltersAndSearch';
import ProductsService from '@/services/productsService';

export default function Products() {
  const title = useRef(null);
  const filtersBar = useRef(null);
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

  return (
    <section id="products" className="py-16 bg-white">
      <div className="container mx-auto">
        <SlideOnScroll ref={title} animationType="slide-top" start="top 90%">
          <div ref={title} className="text-center mb-15 mt-5">
            <h2 className="text-5xl font-bold text-gray-800 mb-2">Nos Produits Exclusifs</h2>
            <p className="mt-5 font-light text-xl text-gray-600 mx-auto">
              Plus d’excuses, le sport s’invite chez vous. Commandez dès maintenant.
            </p>
          </div>
        </SlideOnScroll>
        

        <SlideOnScroll ref={filtersBar} animationType="slide-top" start="top 80%">
          <div ref={filtersBar} className="mb-12 lg:mb-25">
            <FiltersAndSearch 
              products={products}
              setFilteredProducts={setFilteredProducts}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery} 
             />
          </div>
        </SlideOnScroll>
        <div>
          <ProductsList products={filteredProducts} />
        </div>
      </div>
    </section>
  );
}
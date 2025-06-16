import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AnimatedElement from '../animations/AnimatedElement';
import StaggerContainer from '../animations/StaggerContainer';
import AnimatedButton from '../animations/AnimatedButton';
import ProductCard from './ProductCard';
import ProductCardSkeleton from './ProductCardSkeleton';
import productsService from '@/services/productsService';
import { useToast } from '@/context/ToastContext';

export default function ProductsSection() {
  const router = useRouter();
  const { showError } = useToast();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await productsService.getProducts({ 
        limit: 8, // Show only 8 products on homepage
        page: 1,
        sortBy: 'featured'
      });
      
      const productsData = response.products || response;
      setProducts(productsData.slice(0, 8)); // Ensure we only show 8
    } catch (error) {
      console.error('Failed to fetch products:', error);
      showError('Erreur lors du chargement des produits');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Navigate to full products page
  const handleViewAllProducts = () => {
    router.push('/products');
  };

  return (
    <section id="products" className="py-12 sm:py-16 lg:py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <AnimatedElement animation="slideUp" className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800 mb-3 sm:mb-4">
            Nos Produits Exclusifs
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Plus d&apos;excuses, le sport s&apos;invite chez vous. Commandez dès maintenant.
          </p>
        </AnimatedElement>

        {/* Products Grid */}
        <div className="relative">
          {loading ? (
            // Loading Skeletons
            <StaggerContainer className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[...Array(8)].map((_, index) => (
                <AnimatedElement key={index} animation="scaleIn" delay={index * 0.05}>
                  <ProductCardSkeleton />
                </AnimatedElement>
              ))}
            </StaggerContainer>
          ) : products.length > 0 ? (
            <>
              {/* Products Grid */}
              <StaggerContainer className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {products.map((product, index) => (
                  <AnimatedElement 
                    key={product.id} 
                    animation="scaleIn"
                    delay={index * 0.05}
                  >
                    <ProductCard product={product} />
                  </AnimatedElement>
                ))}
              </StaggerContainer>

              {/* View All Button */}
              <AnimatedElement animation="slideUp" delay={0.3} className="text-center mt-8 sm:mt-12">
                <AnimatedButton
                  onClick={handleViewAllProducts}
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Voir tous les produits
                </AnimatedButton>
              </AnimatedElement>
            </>
          ) : (
            // Empty State
            <AnimatedElement animation="scaleIn">
              <div className="text-center py-12 sm:py-16">
                <div className="max-w-md mx-auto">
                  <div className="text-6xl mb-6">🏃‍♂️</div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-600 mb-3">
                    Aucun produit disponible
                  </h3>
                  <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                    Notre catalogue est en cours de mise à jour.
                  </p>
                </div>
              </div>
            </AnimatedElement>
          )}
        </div>
      </div>
    </section>
  );
}
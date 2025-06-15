import { createRef, useRef } from 'react';
import SlideOnScroll from '../animations/SlideOnScroll';
import ProductCard from './ProductCard';
import ProductsListSkeleton from './ProductsListSkeleton';
import { HiOutlineAdjustmentsHorizontal, HiOutlineShoppingBag } from 'react-icons/hi2';
import Link from 'next/link';

export default function ProductsList({ 
  products, 
  allProducts = [], 
  isLoading = false,
  hasActiveFilters = false,
  onResetFilters = () => {}
}) {
  const productRefs = useRef(products?.map(() => createRef()));

  // Show loading state
  if (isLoading) {
    return <ProductsListSkeleton count={4} />;
  }

  // No products at all (empty database/API)
  if (!allProducts || allProducts.length === 0) {
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

  // Products exist but filters return no results
  if (products.length === 0 && hasActiveFilters) {
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

  // Normal state: display products
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 sm:gap-4">
      {products.map((product, index) => {
        const productRef = productRefs.current[index];
        return (
          <div key={product.id} ref={productRef}>
            <SlideOnScroll 
              start='top 180%'
              animationType="slide-top" 
              delay={index * 0.1} 
            >
              <div>
                <ProductCard product={product} />
              </div>
            </SlideOnScroll>
          </div>
        )
      })}
    </div>
  );
}
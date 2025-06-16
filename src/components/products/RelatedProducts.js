import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import ProductCardSkeleton from './ProductCardSkeleton';
import AnimatedElement from '../animations/AnimatedElement';
import StaggerContainer from '../animations/StaggerContainer';
import Link from 'next/link';

export default function RelatedProducts({ product, relatedProducts = [] }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Don't render if no product
  if (!product) return null;

  return (
    <div className="py-6 md:py-8 mt-8 md:mt-12">
      <div className="container mx-auto px-4">
        <AnimatedElement animation="slideUp">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
              Produits similaires
            </h2>
            {relatedProducts.length > 4 && (
              <Link 
                href={`/products?category=${product.categoryId}`}
                className="text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors"
              >
                Voir tout →
              </Link>
            )}
          </div>
        </AnimatedElement>
        
        {loading ? (
          // Loading skeleton
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {[...Array(4)].map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        ) : relatedProducts.length > 0 ? (
          // Related products grid
          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {relatedProducts.slice(0, 4).map((relatedProduct, index) => (
              <AnimatedElement 
                key={relatedProduct.id} 
                animation="scaleIn"
                delay={index * 0.1}
              >
                <ProductCard product={relatedProduct} />
              </AnimatedElement>
            ))}
          </StaggerContainer>
        ) : (
          // No related products found
          <AnimatedElement animation="fadeIn">
            <div className="text-center py-6 md:py-8">
              <p className="text-gray-500 mb-4 text-sm md:text-base">
                Aucun produit similaire trouvé
              </p>
              <Link 
                href="/products" 
                className="inline-block bg-gray-900 text-white px-4 md:px-6 py-2 md:py-3 rounded-md hover:bg-gray-800 transition duration-300 text-sm md:text-base"
              >
                Voir tous nos produits
              </Link>
            </div>
          </AnimatedElement>
        )}
      </div>
    </div>
  );
}
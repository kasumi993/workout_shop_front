// src/components/products/RelatedProducts.js
import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import ProductCardSkeleton from './ProductCardSkeleton';
import productsService from '@/services/productsService';
import Link from 'next/link';

export default function RelatedProducts({ product }) {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (product?.id) {
      fetchRelatedProducts();
    }
  }, [product]);

  const fetchRelatedProducts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch all products
      const allProducts = await productsService.getProducts();
      
      if (!allProducts || allProducts.length === 0) {
        setRelatedProducts([]);
        return;
      }

      // Filter out the current product and find related ones
      let filtered = allProducts.filter(p => p.id !== product.id);
      
      // Strategy 1: Products from the same category
      let categoryMatches = [];
      if (product.categoryId) {
        categoryMatches = filtered.filter(p => p.categoryId === product.categoryId);
      }
      
      // Strategy 2: Products with similar price range (±30%)
      const priceRange = {
        min: product.price * 0.7,
        max: product.price * 1.3
      };
      const priceMatches = filtered.filter(p => 
        p.price >= priceRange.min && p.price <= priceRange.max
      );
      
      // Strategy 3: Products with similar properties (if available)
      let propertyMatches = [];
      if (product.properties && typeof product.properties === 'object') {
        const productProperties = Object.keys(product.properties);
        propertyMatches = filtered.filter(p => {
          if (!p.properties || typeof p.properties !== 'object') return false;
          
          const otherProperties = Object.keys(p.properties);
          const commonProperties = productProperties.filter(prop => 
            otherProperties.includes(prop)
          );
          
          // Consider products with at least 1 common property as related
          return commonProperties.length > 0;
        });
      }
      
      // Combine and prioritize related products
      const related = new Map();
      
      // Add category matches with highest priority (score 3)
      categoryMatches.forEach(p => {
        related.set(p.id, { ...p, score: (related.get(p.id)?.score || 0) + 3 });
      });
      
      // Add price matches with medium priority (score 2)
      priceMatches.forEach(p => {
        related.set(p.id, { ...p, score: (related.get(p.id)?.score || 0) + 2 });
      });
      
      // Add property matches with lower priority (score 1)
      propertyMatches.forEach(p => {
        related.set(p.id, { ...p, score: (related.get(p.id)?.score || 0) + 1 });
      });
      
      // If we don't have enough related products, add random ones
      if (related.size < 4) {
        const remaining = filtered.filter(p => !related.has(p.id));
        const shuffled = remaining.sort(() => 0.5 - Math.random());
        
        shuffled.slice(0, 4 - related.size).forEach(p => {
          related.set(p.id, { ...p, score: 0 });
        });
      }
      
      // Convert to array, sort by score (highest first), and take top 4
      const sortedRelated = Array.from(related.values())
        .sort((a, b) => b.score - a.score)
        .slice(0, 4);
      
      setRelatedProducts(sortedRelated);
      
    } catch (error) {
      console.error('Error fetching related products:', error);
      setError('Erreur lors du chargement des produits similaires');
      setRelatedProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Don't render if no product or if loading failed
  if (!product || error) {
    return null;
  }

  return (
    <div className="py-6 md:py-8 mt-8 md:mt-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            Produits similaires
          </h2>
        </div>
        
        {loading ? (
          // Loading skeleton - responsive grid
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {[...Array(4)].map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        ) : relatedProducts.length > 0 ? (
          // Related products grid - responsive
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard
                key={relatedProduct.id}
                product={relatedProduct}
              />
            ))}
          </div>
        ) : (
          // No related products found
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
        )}
      </div>
    </div>
  );
}
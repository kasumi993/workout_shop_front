import { useRef } from 'react';
import SlideOnScroll from '../animations/SlideOnScroll';
import ProductCard from './ProductCard';

export default function Products({ products }) {
  const productsCard = useRef(null);
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 gap-6">
      {products.map((product) => (
        <SlideOnScroll key={product.id} ref={productsCard} animationType="slide-top" start="top 130%">
          <div ref={productsCard}>
            <ProductCard product={product} key={product.id} />
          </div>
        </SlideOnScroll>
      ))}
    </div>
  );
}
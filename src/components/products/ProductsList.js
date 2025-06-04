import { createRef, useRef } from 'react';
import SlideOnScroll from '../animations/SlideOnScroll';
import ProductCard from './ProductCard';

export default function ProductsList({ products }) {
  const productRefs = useRef(products?.map(() => createRef()));
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 sm:gap-4">
      {products.map((product, index) => {
        const productRef = productRefs.current[index];
        return (
        <div key={product.id} ref={productRef}>
            <SlideOnScroll 
              start = 'top 180%'
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
import { useRef } from 'react';
import SlideOnScroll from '../animations/SlideOnScroll';
import ProductsList from './ProductsList';
import FiltersAndSearch from '@/components/filters/FiltersAndSearch';

export default function Products({ products }) {
  const title = useRef(null);
  const filtersBar = useRef(null);

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
          <div ref={filtersBar}>
            <FiltersAndSearch  />
          </div>
        </SlideOnScroll>
        <div>
          <ProductsList products={products} />
        </div>
      </div>
    </section>
  );
}
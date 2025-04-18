import ProductsList from './ProductsList';
import FiltersAndSearch from '@/components/globalComponents/FiltersAndSearch';

export default function Products({ products }) {
  return (
    <section id="products" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-15 mt-5">
          <h2 className="text-5xl font-bold text-gray-800 mb-2">Nos Produits Exclusifs</h2>
          <p className="mt-5 font-light text-xl text-gray-600 mx-auto">
          Plus d’excuses, le sport s’invite chez vous. Commandez dès maintenant.
          </p>
        </div>

        <FiltersAndSearch />
        <ProductsList products={products} />
      
      </div>
    </section>
  );
}
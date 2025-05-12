import ProductCard from './ProductCard';

export default function Products({ products }) {
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 gap-6">
      {products.map((product) => (
       <ProductCard product={product} key={product._id}/>
      ))}
    </div>
  );
}
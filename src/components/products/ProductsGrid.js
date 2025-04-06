import ProductBox from "@/components/products/ProductBox";

export default function ProductsGrid({products}) {
  return (
    <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
      {products?.length > 0 && products.map(product => (
        <ProductBox key={product._id} {...product} />
      ))}
    </div>
  );
}
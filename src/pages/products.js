import Header from "@/components/header/Header";
import {mongooseConnect} from "@/lib/mongoose";
import {Product} from "@/models/Product";
import ProductsGrid from "@/components/products/ProductsGrid";

export default function ProductsPage({products}) {
  return (
    <>
      <Header />
      <div className="p-20 center">
        <div className="text-[1.5em]">All products</div>
        <ProductsGrid products={products} />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const products = await Product.find({}, null, {sort:{'_id':-1}});
  return {
    props:{
      products: JSON.parse(JSON.stringify(products)),
    }
  };
}
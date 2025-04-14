import Header from "@/components/header/Header";
import {mongooseConnect} from "@/lib/mongoose";
import {Product} from "@/models/Product";
import ProductImages from "@/components/products/ProductImages";
import Button from "@/components/globalComponents/Button";
import CartIcon from "@/components/Icons/CartIcon";
import {useContext} from "react";
import {CartContext} from "@/context/CartContext";

export default function ProductPage({product}) {
  const {addProduct} = useContext(CartContext);
  return (
    <>
      <Header />
      {/* Center as direct div */}
      <div className="max-w-[800px] mx-auto px-5">
        <div className="grid grid-cols-1 gap-10 my-10 md:grid-cols-[0.8fr_1.2fr]">
          {/* WhiteBox as direct div */}
          <div className="bg-white rounded-xl p-8">
            <ProductImages images={product.images} />
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
            <p className="text-gray-700 my-4">{product.description}</p>
            <div className="flex gap-5 items-center">
              <div>
                <span className="text-2xl font-semibold">${product.price}</span>
              </div>
              <div>
                <Button primary onClick={() => addProduct(product._id)}>
                  <CartIcon />Add to cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps(context) {
  await mongooseConnect();
  const {id} = context.query;
  const product = await Product.findById(id);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
    revalidate: 60,
  }
}
import Header from "@/components/header/Header";
import ProductsGrid from "@/components/products/ProductsGrid";
import productsService from "@/services/productsService";
import { useEffect, useState } from "react";

export default function ProductsPage() {

  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    productsService.getProducts()
    .then((data) => {
      setProducts(data);
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });
  }

  // Fetch products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);


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
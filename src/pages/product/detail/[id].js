import {useContext} from "react";
import {CartContext} from "@/context/CartContext";
import Image from 'next/image';
import { FaStar, FaTruck, FaShieldAlt } from 'react-icons/fa';
import { HiOutlineShoppingCart, HiArrowLeft, HiOutlineShare, HiOutlineHeart, HiClock, HiOutlineClock } from "react-icons/hi2";
import {mongooseConnect} from "@/lib/mongoose";
import {Product} from "@/models/Product";
import MainLayout from '@/layouts/MainLayout';
import Avatar from "@/components/globalComponents/Avatar";
import RelatedProducts from "@/components/products/RelatedProducts";
import ProductDetailTopNav from "@/components/navigation/ProductDetailTopNav";
import ProductImages from "@/components/products/ProductImages";

function ProductPage({product}) {
  const {addProduct} = useContext(CartContext);

  const reviewsData = [
    {
      name: 'Benjamin Marie',
      rating: 4,
      date: '12/04/2024',
      comment: 'Lorem ipsum dolor sit amet...',
      // avatar: '/images/benjamin.jpg', // Optionnel
    },
    {
      name: 'Sophie Dubois',
      rating: 5,
      date: '15/04/2024',
      comment: 'Excellent produit !...',
      // avatar: '/images/sophie.png', // Optionnel
    },
    {
      name: 'Antoine Leroy',
      rating: 4,
      date: '18/04/2024',
      comment: 'Très satisfait de mon achat...',
      // avatar: '/images/antoine.jpg', // Optionnel
    },
    // ... d'autres avis ...
  ];

  return (
    <MainLayout>
      <div className="mt-8">
        <div className="container mx-auto">
          {/* Navigation secondaire */}
          <ProductDetailTopNav />

          {/* Section principale du produit */}
          <div className="mt-18 flex gap-20">
            {/* Galerie d'images miniatures */}
            <ProductImages images={product.images} className={'w-[70%]'} />

            {/* Informations sur le produit */}
            <div className="col-span-1 md:col-span-1">
              <h1 className="text-5xl font-normal text-gray-900 mb-2">{product.title}</h1>
              <div className="flex items-center text-yellow-500 text-sm">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar className="text-gray-300" />
                  <span className="text-gray-500 ml-1">(4.0)</span>
                </div>
              <p className="text-gray-500 text-xl font-light mb-16 mt-8">{product.description}</p>
              <div className="flex items-center mb-4">
                <span className="text-2xl font-bold text-gray-900 mr-2">{product.price} Fr Cfa</span>
              </div>
              <div className="flex mb-4 gap-3">
                <button className="flex gap-3 bg-black hover:bg-primary text-white font-light py-2 px-5 rounded-md" onClick={() => addProduct(product.id)}>
                  <HiOutlineShoppingCart className="text-[24px]"/> Ajouter au Panier
                </button>
                <div className="flex text-gray-700 text-sm mt-2">
                  <HiOutlineClock className="mr-2 text-primary text-xl" /> Livré sous 1 ou 2 jours à Dakar 🇸🇳
                  </div>
              </div>
              
              <div className="flex items-center text-gray-400 text-sm">
                Veuillez nous contacter avant de passer commande si vous habitez hors de dakar.
              </div>
            </div>
          </div>

          {/* Section "Avis clients" */}
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-12">Avis clients</h2>
            <div className="space-y-6">
              {/* Avis*/}
              {reviewsData.map((review, index) => (
                <div className="flex gap-12 items-center" key={index}>
                  <div className="flex gap-6 w-[300px]">
                    <Avatar size="w-20 h-20" name={review.name} />
                    <div className="flex flex-col gap-2 justify-center items-center mb-1">
                      <span className="font-semibold text-gray-800 mr-2">{review.name}</span>
                      <div className="flex items-center text-yellow-500 text-sm mr-2">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar className="text-gray-300" />
                      </div>
                      <span className="text-gray-500 text-xs">{review.date}</span>
                    </div>
                  </div>
                  <div>
                    
                    <p className="text-gray-400 text-lg font-light">{`"${review.comment}"`}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Pagination */}
            <div className="flex justify-center mt-6">
              <button className="text-gray-500 hover:text-gray-700 mr-2">&lt;</button>
              <span className="text-gray-700 font-semibold mr-2">1</span>
              <button className="text-gray-500 hover:text-gray-700 mr-2">2</button>
              <button className="text-gray-500 hover:text-gray-700 mr-2">3</button>
              <button className="text-gray-500 hover:text-gray-700">&gt;</button>
            </div>
          </div>

          {/* Section "Autres Produits" */}
          <RelatedProducts product={product}/>
        </div>
      </div>
    </MainLayout>
  );
}

export default ProductPage;


export async function getServerSideProps(context) {
  await mongooseConnect();
  const {id} = context.query;
  const product = await Product.findById(id);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}



import {useContext} from "react";
import {CartContext} from "@/context/CartContext";
import Image from 'next/image';
import { FaArrowLeft, FaShareAlt, FaHeart, FaStar, FaTruck, FaShieldAlt } from 'react-icons/fa';
import { HiOutlineShoppingCart } from "react-icons/hi2";
import {mongooseConnect} from "@/lib/mongoose";
import {Product} from "@/models/Product";
import MainLayout from '@/layouts/MainLayout';
import Avatar from "@/components/globalComponents/Avatar";
import RelatedProducts from "@/components/products/RelatedProducts";

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
      <div className="bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Navigation secondaire */}
          <div className="flex items-center justify-between mb-6">
            <button className="flex items-center text-gray-600 hover:text-gray-800">
              <FaArrowLeft className="mr-2" /> Retour
            </button>
            <div className="text-sm text-gray-500">Catégorie / Haltères / <span className="font-semibold">10kg</span></div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-800 flex items-center">
                <FaShareAlt className="mr-2" /> Partager
              </button>
              <button className="text-gray-600 hover:text-gray-800 flex items-center">
                <FaHeart className="mr-2" /> Ajouter aux favoris
              </button>
            </div>
          </div>

          {/* Section principale du produit */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* Galerie d'images miniatures */}
            <div className="hidden md:block flex flex-col space-y-2">
              <div className="w-20 h-20 border rounded-md overflow-hidden">
                <Image src="/images/placeholder.png" width={80} height={80} alt="Miniature haltère" className="object-cover" />
              </div>
              <div className="w-20 h-20 border rounded-md overflow-hidden">
                <Image src="/images/placeholder.png" width={80} height={80} alt="Miniature haltère" className="object-cover" />
              </div>
              <div className="w-20 h-20 border rounded-md overflow-hidden">
                <Image src="/images/placeholder.png" width={80} height={80} alt="Miniature haltère" className="object-cover" />
              </div>
              {/* ... plus de miniatures ... */}
            </div>

            {/* Image principale du produit */}
            <div className="col-span-1 md:col-span-3 rounded-md overflow-hidden shadow-md">
              <Image src="/images/placeholder.png" width={600} height={600} alt="Kit Haltères 10kg" className="object-contain" />
            </div>

            {/* Informations sur le produit */}
            <div className="col-span-1 md:col-span-1">
              <h1 className="text-xl font-semibold text-gray-900 mb-2">{product.title}</h1>
              <p className="text-gray-700 text-sm mb-4">{product.description}</p>
              <div className="flex items-center mb-4">
                <span className="text-xl font-bold text-gray-900 mr-2">{product.price}</span>
                <div className="flex items-center text-yellow-500 text-sm">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar className="text-gray-300" />
                  <span className="text-gray-500 ml-1">(4.0)</span>
                </div>
              </div>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-md w-full mb-4" onClick={() => addProduct(product.id)}>
                <HiOutlineShoppingCart className="text-[24px]"/> Ajouter au Panier
              </button>
              <div className="text-green-500 text-sm mb-2">Livré sous 1 ou 2 jours à Dakar</div>
              <div className="flex items-center text-gray-600 text-sm mb-2">
                <FaTruck className="mr-2" /> Livraison partout à Dakar 🇸🇳
              </div>
              <div className="flex items-center text-gray-600 text-sm">
                <FaShieldAlt className="mr-2" /> Paiement sécurisé
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



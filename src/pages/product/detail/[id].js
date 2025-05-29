import { FaStar} from 'react-icons/fa';
import MainLayout from '@/layouts/MainLayout';
import Avatar from "@/components/globalComponents/Avatar";
import RelatedProducts from "@/components/products/RelatedProducts";
import ProductDetailTopNav from "@/components/navigation/ProductDetailTopNav";
import ProductImages from "@/components/products/ProductImages";
import ProductDetails from "@/components/products/ProductDetails";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import productsService from '@/services/productsService';

function ProductPage() {
  const [product, setProduct] = useState({});

  const router = useRouter();
  const productId = router.query.id;

    const fetchProductById = async (id) => {
      await productsService.getProductById(id)
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }

  useEffect(() => {
    fetchProductById(productId);
  }, [productId]);


  // const reviewsData = [
  //   {
  //     name: 'Benjamin Marie',
  //     rating: 4,
  //     date: '12/04/2024',
  //     comment: 'Lorem ipsum dolor sit amet...',
  //     // avatar: '/images/benjamin.jpg', // Optionnel
  //   },
  //   {
  //     name: 'Sophie Dubois',
  //     rating: 5,
  //     date: '15/04/2024',
  //     comment: 'Excellent produit !...',
  //     // avatar: '/images/sophie.png', // Optionnel
  //   },
  //   {
  //     name: 'Antoine Leroy',
  //     rating: 4,
  //     date: '18/04/2024',
  //     comment: 'Très satisfait de mon achat...',
  //     // avatar: '/images/antoine.jpg', // Optionnel
  //   },
  // ];

  return (
    <MainLayout>
      <div className="mt-8">
        <div className="container mx-auto">
          {/* Navigation secondaire */}
          <ProductDetailTopNav />

          {/* Section principale du produit */}
          <div className="mt-18 flex gap-20">
            {/* Galerie d'images miniatures */}
            <div className='w-[60%]'>
              <ProductImages images={product.images} />
            </div>

            {/* Informations sur le produit */}
            <div className='w-[40%]'>
              <ProductDetails product={product}/>
            </div>
          </div>

          {/* Section "Avis clients" */}
          {/* <div className="mt-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-12">Avis clients</h2>
            <div className="space-y-6"> */}
              {/* Avis*/}
              {/* {reviewsData.map((review, index) => ( */}
                {/* <div className="flex gap-12 items-center" key={index}>
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
                </div> */}
              {/* ))} */}
            {/* </div> */}
            {/* Pagination */}
            {/* <div className="flex justify-center mt-6">
              <button className="text-gray-500 hover:text-gray-700 mr-2">&lt;</button>
              <span className="text-gray-700 font-semibold mr-2">1</span>
              <button className="text-gray-500 hover:text-gray-700 mr-2">2</button>
              <button className="text-gray-500 hover:text-gray-700 mr-2">3</button>
              <button className="text-gray-500 hover:text-gray-700">&gt;</button>
            </div> */}
          {/* </div> */}

          {/* Section "Autres Produits" */}
          <RelatedProducts product={product}/>
        </div>
      </div>
    </MainLayout>
  );
}

export default ProductPage;


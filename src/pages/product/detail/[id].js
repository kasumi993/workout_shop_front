import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import ProductDetailTopNav from '@/components/navigation/ProductDetailTopNav';
import ProductImages from '@/components/products/ProductImages';
import ProductDetails from '@/components/products/ProductDetails';
import RelatedProducts from '@/components/products/RelatedProducts';
import CustomerReviews from '@/components/products/ProductReview';
import productsService from '@/services/productsService';
import ProductDetailSkeleton from '@/components/products/ProductDetailSkeleton';

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    if (id) {
      fetchProductById(id);
    }
  }, [id]);

  const fetchProductById = async (productId) => {
    setLoading(true);
    try {
      const data = await productsService.getProductById(productId);
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product:", error);
      setError("Produit non trouvé");
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Oops!</h1>
          <p className="text-gray-600 mb-8">{error}</p>
          <button
            onClick={() => router.push('/products')}
            className="bg-gray-900 text-white px-6 py-3 rounded-md hover:bg-gray-800 transition duration-300"
          >
            Retour aux produits
          </button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {loading ? (
        <ProductDetailSkeleton />
      ) : (
        <div className="mt-8">
          <div className="container mx-auto px-4">
            {/* Navigation secondaire */}
            <ProductDetailTopNav />

            {/* Section principale du produit */}
            <div className="mt-8 lg:mt-18 flex flex-col lg:flex-row gap-8 lg:gap-20">
              {/* Galerie d'images */}
              <div className="w-full lg:w-[60%]">
                <ProductImages images={product?.images || []} />
              </div>

              {/* Informations sur le produit */}
              <div className="w-full lg:w-[40%]">
                <ProductDetails product={product || {}} />
              </div>
            </div>

            {/* Tabs Section */}
            <div className="mt-16 border-t pt-8">
              <div className="flex border-b">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`px-6 py-3 font-medium transition-colors ${
                    activeTab === 'description'
                      ? 'text-gray-900 border-b-2 border-gray-900'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('specifications')}
                  className={`px-6 py-3 font-medium transition-colors ${
                    activeTab === 'specifications'
                      ? 'text-gray-900 border-b-2 border-gray-900'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Spécifications
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`px-6 py-3 font-medium transition-colors ${
                    activeTab === 'reviews'
                      ? 'text-gray-900 border-b-2 border-gray-900'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Avis clients
                </button>
              </div>

              <div className="py-8">
                {activeTab === 'description' && (
                  <div className="prose max-w-none">
                    <p className="text-gray-600 leading-relaxed">
                      {product?.description || 'Aucune description disponible.'}
                    </p>
                    {product?.features && (
                      <div className="mt-6">
                        <h3 className="font-semibold text-gray-900 mb-4">Caractéristiques principales</h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-600">
                          {product.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'specifications' && (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <tbody>
                        {product?.specifications ? (
                          Object.entries(product.specifications).map(([key, value], index) => (
                            <tr key={key} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                              <td className="px-4 py-3 font-medium text-gray-700 w-1/3">{key}</td>
                              <td className="px-4 py-3 text-gray-600">{value}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td className="text-center text-gray-500 py-8">
                              Aucune spécification disponible
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <CustomerReviews productId={product?.id} />
                )}
              </div>
            </div>

            {/* Section "Autres Produits" */}
            <RelatedProducts product={product} />
          </div>
        </div>
      )}
    </MainLayout>
  );
}
import { useRouter } from 'next/router';
import { useEffect, useState, useContext } from 'react';
import MainLayout from '@/layouts/MainLayout';
import ProductDetailTopNav from '@/components/navigation/ProductDetailTopNav';
import ProductImages from '@/components/products/ProductImages';
import RelatedProducts from '@/components/products/RelatedProducts';
import productsService from '@/services/productsService';
import ProductDetailSkeleton from '@/components/products/ProductDetailSkeleton';
import { FaStar } from 'react-icons/fa';
import OopsPage from '@/components/globalComponents/OopsPage';
import ProductDetails from '@/components/products/ProductDetails';

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProperties, setSelectedProperties] = useState({});
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
      
      // Initialize selected properties with first value of each property
      if (data.properties && typeof data.properties === 'object') {
        const initialProperties = {};
        Object.entries(data.properties).forEach(([key, values]) => {
          if (Array.isArray(values) && values.length > 0) {
            initialProperties[key] = values[0];
          }
        });
        setSelectedProperties(initialProperties);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      setError("Produit non trouvé");
    } finally {
      setLoading(false);
    }
  };

  const handlePropertyChange = (propertyName, value) => {
    setSelectedProperties(prev => ({
      ...prev,
      [propertyName]: value
    }));
  };

  if (error) {
    return (
      <OopsPage />
    );
  }

  return (
    <MainLayout>
      {loading ? (
        <ProductDetailSkeleton />
      ) : (
        <div className="mt-8">
          <div className="container mx-auto px-4">
            {/* Navigation - Pass product to get category info */}
            <ProductDetailTopNav product={product} />

            {/* Main Product Section */}
            <div className="mt-8 lg:mt-18 flex flex-col lg:flex-row gap-8 lg:gap-20">
              {/* Left: Images */}
              <div className='w-full lg:w-[60%]'>
                <ProductImages images={product?.images || []} />

                {/* Description Tabs */}
                <div className="mt-16">
                  <div className="border-b">
                    <div className="flex space-x-8">
                      {['description', 'shipping', 'reviews'].map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`py-4 px-2 font-medium transition-colors relative ${
                            activeTab === tab
                              ? 'text-gray-900'
                              : 'text-gray-500 hover:text-gray-700'
                          }`}
                        >
                          {tab === 'description' && 'Description'}
                          {tab === 'shipping' && 'Livraison & Retours'}
                          {tab === 'reviews' && 'Avis (127)'}
                          {activeTab === tab && (
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="py-8">
                    {activeTab === 'description' && (
                      <div className="prose max-w-none">
                        <h3 className="text-lg font-semibold mb-4">À propos de ce produit</h3>
                        <p className="text-gray-600 mb-6">
                          {product?.description || 'Aucune description disponible.'}
                        </p>
                        
                        {product?.features && (
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Points forts</h4>
                            <ul className="list-disc list-inside space-y-2 text-gray-600">
                              <li>Matériaux de haute qualité</li>
                              <li>Design ergonomique pour un confort optimal</li>
                              <li>Facile à utiliser et à entretenir</li>
                              <li>Convient aux débutants et aux professionnels</li>
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    {activeTab === 'shipping' && (
                      <div className="prose max-w-none">
                        <h3 className="text-lg font-semibold mb-4">Informations de livraison</h3>
                        <div className="space-y-4 text-gray-600">
                          <div>
                            <h4 className="font-medium text-gray-800 mb-2">Délais de livraison</h4>
                            <ul className="list-disc list-inside space-y-1">
                              <li>Dakar : 1-2 jours ouvrables</li>
                              <li>Banlieue Dakar : 2-3 jours ouvrables</li>
                              <li>Autres régions : 3-5 jours ouvrables</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-gray-800 mb-2">Frais de livraison</h4>
                            <ul className="list-disc list-inside space-y-1">
                              <li>Gratuit pour les commandes de plus de 150.000 FCFA</li>
                              <li>Entre 2000 - 5000 FCFA pour les commandes en dessous de 150.000 FCFA</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-gray-800 mb-2">Politique de retour</h4>
                            <p>Nous acceptons les retours dans les 7 jours suivant la livraison si le produit est dans son état d&apos;origine.</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'reviews' && (
                      <div>
                        <div className="mb-6">
                          <div className="flex items-center gap-4">
                            <div className="text-center">
                              <div className="text-4xl font-bold">4.5</div>
                              <div className="flex text-yellow-400 my-1">
                                {[...Array(5)].map((_, i) => (
                                  <FaStar key={i} className={i < 4 ? '' : 'text-gray-300'} />
                                ))}
                              </div>
                              <div className="text-sm text-gray-600">127 avis</div>
                            </div>
                            
                            <div className="flex-1">
                              {[5, 4, 3, 2, 1].map((stars) => (
                                <div key={stars} className="flex items-center gap-2 mb-1">
                                  <span className="text-sm w-4">{stars}</span>
                                  <FaStar className="text-yellow-400 text-xs" />
                                  <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                                    <div 
                                      className="bg-yellow-400 h-full"
                                      style={{ width: `${stars === 5 ? 60 : stars === 4 ? 30 : stars === 3 ? 10 : 0}%` }}
                                    ></div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="border-t pt-6 space-y-6">
                          {[
                            {
                              name: 'Marie D.',
                              date: '15 Mars 2024',
                              rating: 5,
                              comment: 'Excellent produit! La qualité est au rendez-vous et la livraison était rapide.',
                            },
                            {
                              name: 'Amadou S.',
                              date: '10 Mars 2024',
                              rating: 4,
                              comment: 'Très bon produit, conforme à la description. Je recommande!',
                            }
                          ].map((review, index) => (
                            <div key={index} className="border-b pb-6 last:border-0">
                              <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                  <span className="font-medium text-gray-700">{review.name[0]}</span>
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-2">
                                    <div>
                                      <span className="font-medium">{review.name}</span>
                                      <span className="text-gray-500 text-sm ml-2">{review.date}</span>
                                    </div>
                                    <div className="flex text-yellow-400 text-sm">
                                      {[...Array(5)].map((_, i) => (
                                        <FaStar key={i} className={i < review.rating ? '' : 'text-gray-300'} />
                                      ))}
                                    </div>
                                  </div>
                                  <p className="text-gray-600">{review.comment}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right: Product Info */}
              <div className='w-full lg:w-[40%]'>
                <ProductDetails product={product} selectedProperties={selectedProperties} handlePropertyChange={handlePropertyChange} />
              </div>
            </div>

            {/* Related Products */}
            <RelatedProducts product={product} />
          </div>
        </div>
      )}
    </MainLayout>
  );
}
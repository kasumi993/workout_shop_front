import { useRouter } from 'next/router';
import { useEffect, useState, useContext } from 'react';
import MainLayout from '@/layouts/MainLayout';
import ProductDetailTopNav from '@/components/navigation/ProductDetailTopNav';
import ProductImages from '@/components/products/ProductImages';
import ProductDescTabs from '@/components/products/ProductDescTabs';
import RelatedProducts from '@/components/products/RelatedProducts';
import productsService from '@/services/productsService';
import ProductDetailSkeleton from '@/components/products/ProductDetailSkeleton';
import OopsPage from '@/components/globalComponents/OopsPage';
import ProductDetails from '@/components/products/ProductDetails';

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProperties, setSelectedProperties] = useState({});
  const [reviews, setReviews] = useState([]); // Reviews state - empty for now

  useEffect(() => {
    if (id) {
      fetchProductById(id);
      // TODO: Fetch reviews when backend is ready
      // fetchProductReviews(id);
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

  // TODO: Implement when reviews backend is ready
  // const fetchProductReviews = async (productId) => {
  //   try {
  //     const reviewsData = await reviewsService.getProductReviews(productId);
  //     setReviews(reviewsData || []);
  //   } catch (error) {
  //     console.error("Error fetching reviews:", error);
  //     setReviews([]);
  //   }
  // };

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
        <div className="mt-4 md:mt-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Navigation - Pass product to get category info */}
            <ProductDetailTopNav product={product} />

            {/* Main Product Section */}
            <div className="mt-6 md:mt-8 lg:mt-12 xl:mt-16">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8 lg:gap-12 xl:gap-16">
                {/* Left: Images - Takes 3/5 of width on XL screens */}
                <div className='lg:col-span-3'>
                  <ProductImages images={product?.images || []} />

                  {/* Product Tabs - Show on desktop only, positioned after images */}
                  <div className="hidden lg:block">
                    <ProductDescTabs product={product} reviews={reviews} />
                  </div>
                </div>

                {/* Right: Product Info - Takes 2/5 of width on XL screens */}
                <div className='lg:col-span-2'>
                  <div className="">
                    <ProductDetails 
                      product={product} 
                      selectedProperties={selectedProperties} 
                      handlePropertyChange={handlePropertyChange}
                      reviews={reviews}
                    />
                  </div>
                </div>
              </div>

              {/* Product Tabs - Show on mobile/tablet only, positioned after product details */}
              <div className="lg:hidden">
                <ProductDescTabs product={product} reviews={reviews} />
              </div>
            </div>

            {/* Related Products */}
            <RelatedProducts product={product} />
          </div>
          
          {/* Remove custom scrollbar styles since they're now in ProductTabs component */}
        </div>
      )}
    </MainLayout>
  );
}
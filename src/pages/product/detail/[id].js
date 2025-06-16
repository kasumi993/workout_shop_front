import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import SEOHead from '@/components/seo/SEOHead';
import PageTransition from '@/components/animations/PageTransition';
import AnimatedElement from '@/components/animations/AnimatedElement';
import StaggerContainer from '@/components/animations/StaggerContainer';
import ProductDetailTopNav from '@/components/navigation/ProductDetailTopNav';
import ProductImages from '@/components/products/ProductImages';
import ProductDetails from '@/components/products/ProductDetails';
import ProductDescTabs from '@/components/products/ProductDescTabs';
import RelatedProducts from '@/components/products/RelatedProducts';
import productsService from '@/services/productsService';
import ProductDetailSkeleton from '@/components/products/ProductDetailSkeleton';
import { generateProductSEO, generateBreadcrumbs } from '@/utils/seo';
import { useToast } from '@/context/ToastContext';

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const { showError } = useToast();
  
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProperties, setSelectedProperties] = useState({});
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (id) {
      fetchProductData(id);
    }
  }, [id]);

  const fetchProductData = async (productId) => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch product and related products in parallel
      const [productData, relatedData] = await Promise.all([
        productsService.getProductById(productId),
        productsService.getRelatedProducts(productId, 4).catch(() => [])
      ]);

      setProduct(productData);
      setRelatedProducts(relatedData);
      
      // Initialize selected properties with first value of each property
      if (productData.properties && typeof productData.properties === 'object') {
        const initialProperties = {};
        Object.entries(productData.properties).forEach(([key, values]) => {
          if (Array.isArray(values) && values.length > 0) {
            initialProperties[key] = values[0];
          }
        });
        setSelectedProperties(initialProperties);
      }
      
    } catch (error) {
      console.error("Error fetching product:", error);
      setError("Produit non trouvé");
      showError("Erreur lors du chargement du produit");
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

  // Generate SEO data
  const breadcrumbs = generateBreadcrumbs(router, product, product?.category);
  const seoData = generateProductSEO(product);

  // Structured data for product
  const productStructuredData = product ? {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.title,
    "description": product.description,
    "image": product.images?.map(img => 
      img.startsWith('http') ? img : `${process.env.NEXT_PUBLIC_SITE_URL}${img}`
    ),
    "sku": product.id,
    "gtin": product.id,
    "brand": {
      "@type": "Brand",
      "name": "Workout Shop"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "Workout Shop"
    },
    "offers": {
      "@type": "Offer",
      "price": product.price,
      "priceCurrency": "XOF",
      "availability": "https://schema.org/InStock",
      "priceValidUntil": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days
      "seller": {
        "@type": "Organization",
        "name": "Workout Shop"
      },
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": "2500",
          "currency": "XOF"
        },
        "deliveryTime": {
          "@type": "ShippingDeliveryTime",
          "handlingTime": {
            "@type": "QuantitativeValue",
            "minValue": 1,
            "maxValue": 2,
            "unitCode": "DAY"
          },
          "transitTime": {
            "@type": "QuantitativeValue",
            "minValue": 1,
            "maxValue": 2,
            "unitCode": "DAY"
          }
        }
      }
    },
    "category": product.category?.name,
    "aggregateRating": reviews.length > 0 ? {
      "@type": "AggregateRating",
      "ratingValue": reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length,
      "reviewCount": reviews.length
    } : undefined
  } : null;

  if (loading) {
    return (
      <MainLayout>
        <ProductDetailSkeleton />
      </MainLayout>
    );
  }

  if (error || !product) {
    return (
      <PageTransition>
        <MainLayout>
          <SEOHead 
            title="Produit non trouvé | Workout Shop"
            description="Le produit que vous recherchez n'existe pas ou n'est plus disponible."
            noindex={true}
          />
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center px-4">
              <AnimatedElement animation="scaleIn">
                <div className="text-6xl mb-4">😔</div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Produit non trouvé</h1>
                <p className="text-gray-600 mb-6">Le produit que vous recherchez n&apos;existe pas ou n&apos;est plus disponible.</p>
                <button
                  onClick={() => router.push('/products')}
                  className="bg-gray-900 text-white px-6 py-3 rounded-md hover:bg-gray-800 transition duration-300"
                >
                  Retour aux produits
                </button>
              </AnimatedElement>
            </div>
          </div>
        </MainLayout>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <MainLayout>
        <SEOHead
          {...seoData}
          product={product}
          breadcrumbs={breadcrumbs}
          structuredData={productStructuredData}
        />

        <div className="mt-4 md:mt-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Navigation */}
            <AnimatedElement animation="slideDown">
              <ProductDetailTopNav product={product} />
            </AnimatedElement>

            {/* Main Product Section */}
            <div className="mt-6 md:mt-8 lg:mt-12 xl:mt-16">
              <StaggerContainer className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8 lg:gap-12 xl:gap-16">
                
                {/* Left: Images */}
                <AnimatedElement 
                  animation="slideLeft" 
                  className="lg:col-span-3"
                  delay={0.1}
                >
                  <ProductImages images={product?.images || []} />

                  {/* Product Tabs - Desktop */}
                  <div className="hidden lg:block">
                    <AnimatedElement animation="slideUp" delay={0.4}>
                      <ProductDescTabs product={product} reviews={reviews} />
                    </AnimatedElement>
                  </div>
                </AnimatedElement>

                {/* Right: Product Info */}
                <AnimatedElement 
                  animation="slideRight" 
                  className="lg:col-span-2"
                  delay={0.2}
                >
                  <ProductDetails 
                    product={product} 
                    selectedProperties={selectedProperties} 
                    handlePropertyChange={handlePropertyChange}
                    reviews={reviews}
                  />
                </AnimatedElement>
              </StaggerContainer>

              {/* Product Tabs - Mobile */}
              <div className="lg:hidden">
                <AnimatedElement animation="slideUp" delay={0.3}>
                  <ProductDescTabs product={product} reviews={reviews} />
                </AnimatedElement>
              </div>
            </div>

            {/* Related Products */}
            <AnimatedElement animation="slideUp" delay={0.4}>
              <RelatedProducts 
                product={product} 
                relatedProducts={relatedProducts}
              />
            </AnimatedElement>
          </div>
        </div>
      </MainLayout>
    </PageTransition>
  );
}
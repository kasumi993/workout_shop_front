import Head from 'next/head';
import { useRouter } from 'next/router';

const DEFAULT_SEO = {
  title: 'Workout Shop - Équipement Sport & Fitness au Sénégal',
  description: 'Découvrez notre large gamme d\'équipements de sport et fitness. Livraison rapide à Dakar. Musculation, cardio, yoga et plus encore.',
  image: '/logo/logo.svg',
  type: 'website',
  locale: 'fr_SN',
  siteName: 'Workout Shop'
};

export default function SEOHead({
  title,
  description,
  image,
  type = 'website',
  noindex = false,
  nofollow = false,
  canonicalUrl,
  structuredData,
  product,
  breadcrumbs
}) {
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://workout-shop.com';
  
  const seo = {
    title: title || DEFAULT_SEO.title,
    description: description || DEFAULT_SEO.description,
    image: image || DEFAULT_SEO.image,
    url: canonicalUrl || `${baseUrl}${router.asPath}`,
    type: type || DEFAULT_SEO.type
  };

  // Ensure image is absolute URL
  if (seo.image && !seo.image.startsWith('http')) {
    seo.image = `${baseUrl}${seo.image}`;
  }

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* Robots */}
      <meta 
        name="robots" 
        content={`${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'}`} 
      />
      
      {/* Canonical URL */}
      <link rel="canonical" href={seo.url} />
      
      {/* Open Graph */}
      <meta property="og:type" content={seo.type} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:site_name" content={DEFAULT_SEO.siteName} />
      <meta property="og:locale" content={DEFAULT_SEO.locale} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      
      {/* Additional Meta Tags for E-commerce */}
      <meta name="language" content="French" />
      <meta name="geo.region" content="SN" />
      <meta name="geo.placename" content="Dakar" />
      <meta name="author" content="Workout Shop" />
      
      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
      
      {/* Product Structured Data */}
      {product && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              "name": product.title,
              "description": product.description,
              "image": product.images?.map(img => img.startsWith('http') ? img : `${baseUrl}${img}`),
              "sku": product.id,
              "brand": {
                "@type": "Brand",
                "name": "Workout Shop"
              },
              "offers": {
                "@type": "Offer",
                "price": product.price,
                "priceCurrency": "XOF",
                "availability": "https://schema.org/InStock",
                "seller": {
                  "@type": "Organization",
                  "name": "Workout Shop"
                }
              },
              "category": product.category?.name
            })
          }}
        />
      )}
      
      {/* Breadcrumb Structured Data */}
      {breadcrumbs && breadcrumbs.length > 1 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": breadcrumbs.map((crumb, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": crumb.name,
                "item": `${baseUrl}${crumb.href}`
              }))
            })
          }}
        />
      )}
    </Head>
  );
}
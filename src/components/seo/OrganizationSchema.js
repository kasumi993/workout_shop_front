import Head from 'next/head';

export default function OrganizationSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://workout-shop.com';
  
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Store",
    "name": "Workout Shop",
    "description": "Votre premier fournisseur de matériel de sport maison au Sénégal",
    "url": baseUrl,
    "logo": `${baseUrl}/logo/logo.svg`,
    "image": `${baseUrl}/images/og-image.jpg`,
    "telephone": "+221761978060",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "SN",
      "addressLocality": "Dakar",
      "addressRegion": "Dakar"
    },
    "openingHours": "Mo-Su 08:00-19:00",
    "paymentAccepted": ["Orange Money", "Wave", "WhatsApp"],
    "priceRange": "$$",
    "currenciesAccepted": "XOF",
    "sameAs": [
      "https://www.facebook.com/people/Workout-shop/100064445059229/"
    ]
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
    </Head>
  );
}

import { useState, useEffect } from 'react';
import MainLayout from '@/layouts/MainLayout';
import SEOHead from '@/components/seo/SEOHead';
import OrganizationSchema from '@/components/seo/OrganizationSchema';
import PageTransition from '@/components/animations/PageTransition';
import AnimatedElement from '@/components/animations/AnimatedElement';
import HomeTopSection from '@/components/home/HomeTopSection';
import ProductsSection from '@/components/products/ProductsSection';
import AboutSection from '@/components/globalComponents/AboutSection';
import PaymentMethodsSection from '@/components/payment/PaymentMethodsSection';
import Testimonials from '@/components/globalComponents/Testimonials';

export default function HomePage() {
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero');
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        setIsScrolledPastHero(window.scrollY > heroBottom);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Workout Shop",
    "description": "Votre premier fournisseur de matériel de sport maison au Sénégal",
    "url": process.env.NEXT_PUBLIC_SITE_URL,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${process.env.NEXT_PUBLIC_SITE_URL}/products?search={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <PageTransition>
      <MainLayout headerFixed={true} isScrolledPastSection={isScrolledPastHero}>
        <SEOHead
          title="Workout Shop - Équipement Sport & Fitness au Sénégal | Livraison Dakar"
          description="🏋️ N°1 des équipements de sport au Sénégal ! Musculation, cardio, yoga, fitness. Livraison rapide à Dakar. Paiement Orange Money & Wave. ⭐ +1000 clients satisfaits"
          structuredData={structuredData}
        />
        <OrganizationSchema />

        <HomeTopSection />
        
        <AnimatedElement animation="slideUp" threshold={0.2}>
          <ProductsSection />
        </AnimatedElement>
        
        <AnimatedElement animation="slideUp" threshold={0.2}>
          <AboutSection />
        </AnimatedElement>
        
        <AnimatedElement animation="slideLeft" threshold={0.2}>
          <PaymentMethodsSection />
        </AnimatedElement>
        
        <AnimatedElement animation="slideUp" threshold={0.2}>
          <Testimonials />
        </AnimatedElement>
      </MainLayout>
    </PageTransition>
  );
}
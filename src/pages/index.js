import HomeTopSection from '@/components/home/HomeTopSection';
import ProductsSection from '@/components/products/ProductsSection';
import AboutSection from '@/components/globalComponents/AboutSection';
import PaymentMethodsSection from '@/components/payment/PaymentMethodsSection';
import Testimonials from '@/components/globalComponents/Testimonials';
import MainLayout from '@/layouts/MainLayout';
import { useState, useEffect } from 'react';
import SlideOnScroll from '@/components/animations/SlideOnScroll';

export default function Home({ products }) {

  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero');
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        if (window.scrollY > heroBottom) {
          setIsScrolledPastHero(true);
        } else {
          setIsScrolledPastHero(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Nettoyage de l'écouteur d'événements lors du démontage du composant
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
      <MainLayout headerFixed={true} isScrolledPastSection={isScrolledPastHero}>
          <HomeTopSection />
          <ProductsSection />
          <SlideOnScroll animationType="slide-top" start="top 140%">
            <div>
              <AboutSection />
            </div>
          </SlideOnScroll>
          <SlideOnScroll animationType="slide-left" start="top 90%">
            <div>
              <PaymentMethodsSection />
            </div>
          </SlideOnScroll>
          <SlideOnScroll animationType="slide-top" start="top 140%">
            <div>
              <Testimonials />
            </div>
          </SlideOnScroll>
      </MainLayout>
  );
}

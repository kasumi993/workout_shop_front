import {useEffect, useState} from 'react';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import WhatsAppFloat from '@/components/globalComponents/WhatsAppFloat';

const MainLayout = ({ children, headerFixed }) => {
    const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
    const headerClasses = `fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolledPastHero ? 'bg-white shadow-md' : 'bg-transparent'
      }`;

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
        <div className="bg-gray-50">
            <div className={headerClasses}>
                <Header />
            </div>
            <main className="">
                {children}
            </main>
            <Footer />
            <WhatsAppFloat />
        </div>
    );
};

export default MainLayout;
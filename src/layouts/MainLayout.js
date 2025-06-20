import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import WhatsAppFloat from '@/components/globalComponents/WhatsAppFloat';
import { Analytics } from '@vercel/analytics/next';

const MainLayout = ({ children, headerFixed, isScrolledPastSection }) => {
    const headerClasses = `${headerFixed ? 'fixed' : 'relative'} top-0 w-full z-50 transition-all duration-300 ${
        isScrolledPastSection ? 'bg-white shadow-md' : 'bg-transparent'
      }`;


    return (
        <div>
            <div className={headerClasses}>
                <Header />
            </div>
            <main className="">
                {children}
                {/* Analytics Component */}
                <Analytics />
            </main>
            <Footer />
            <WhatsAppFloat />
        </div>
    );
};

export default MainLayout;
import Header from '@/components/header/Header';
import Hero from '@/components/globalComponents/Hero';
import About from '@/components/globalComponents/AboutSection';
import PaymentMethods from '@/components/payment/PaymentMethodsSection';
import Testimonials from '@/components/globalComponents/Testimonials';
import Contact from '@/components/globalComponents/Contact';
import Footer from '@/components/footer/Footer';
import WhatsAppFloat from '@/components/globalComponents/WhatsAppFloat';

export default function AboutPage() {
  return (
    <div className="bg-gray-50">
      <Header />
      <main>
        <About />
        <PaymentMethods />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

import About from '@/components/globalComponents/AboutSection';
import PaymentMethods from '@/components/payment/PaymentMethodsSection';
import Testimonials from '@/components/globalComponents/Testimonials';
import Contact from '@/components/contact/Contact';
import MainLayout from '@/layouts/MainLayout';

export default function AboutPage() {
  return (
    <MainLayout>
      <About />
        <PaymentMethods />
        <Testimonials />
        <Contact />
    </MainLayout>
  );
}

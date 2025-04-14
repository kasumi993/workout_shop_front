import Header from '@/components/header/Header';
import Hero from '@/components/globalComponents/Hero';
import Products from '@/components/products/Products';
import About from '@/components/globalComponents/About';
import PaymentMethods from '@/components/payment/PaymentMethods';
import Testimonials from '@/components/globalComponents/Testimonials';
import Contact from '@/components/globalComponents/Contact';
import Footer from '@/components/footer/Footer';
import WhatsAppFloat from '@/components/globalComponents/WhatsAppFloat';
import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';

export default function Home() {
  return (
    <div className="bg-gray-50">
      <Header />
      <main>
        <Hero />
        <Products />
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

export async function getStaticProps() {
  const featuredProductId = '67ee475d268f8c2d62cdbd54';
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {sort: {'_id':-1}, limit:10});
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
    revalidate: 60, // Regenerate page at most once per minute
  };
}
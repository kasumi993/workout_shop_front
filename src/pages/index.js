import HomeTopSection from '@/components/home/HomeTopSection';
import ProductsSection from '@/components/products/ProductsSection';
import AboutSection from '@/components/globalComponents/AboutSection';
import PaymentMethodsSection from '@/components/payment/PaymentMethodsSection';
import Testimonials from '@/components/globalComponents/Testimonials';
import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';
import MainLayout from '@/layouts/MainLayout';

export default function Home({ featuredProduct, newProducts }) {
  return (
      <MainLayout headerFixed={true}>
          <HomeTopSection />
          <ProductsSection products={newProducts} />
          <AboutSection />
          <PaymentMethodsSection />
          <Testimonials />
      </MainLayout>
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
import HomeTopSection from '@/components/home/HomeTopSection';
import Products from '@/components/products/Products';
import About from '@/components/globalComponents/About';
import PaymentMethods from '@/components/payment/PaymentMethods';
import Testimonials from '@/components/globalComponents/Testimonials';
import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';
import MainLayout from '@/layouts/MainLayout';

export default function Home({ featuredProduct, newProducts }) {
  return (
      <MainLayout className='relative top-0'>
          <HomeTopSection />
          <Products products={newProducts} />
          <About />
          <PaymentMethods />
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
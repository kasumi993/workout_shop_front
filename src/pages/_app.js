import { CartContextProvider } from '@/context/CartContext';
import { CategoriesProvider } from '@/context/CategoriesContext';
import '../styles/globals.css';
import { Roboto } from 'next/font/google';
import { Roboto_Condensed } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-roboto',
});

const robotoCondensed = Roboto_Condensed({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-roboto-condensed',
});

function MyApp({ Component, pageProps }) {
  return (
    <CategoriesProvider>
      <CartContextProvider>
        <div className={`${roboto.variable} ${robotoCondensed.variable} font-roboto`}>
          <Component {...pageProps} />
        </div>
      </CartContextProvider>
    </CategoriesProvider>
  );
}

export default MyApp;
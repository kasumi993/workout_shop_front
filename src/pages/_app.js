// src/pages/_app.js
import { CartContextProvider } from '@/context/CartContext';
import { CategoriesProvider } from '@/context/CategoriesContext';
import { WishlistContextProvider } from '@/context/WishlistContext';
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
        <WishlistContextProvider>
          <div className={`${roboto.variable} ${robotoCondensed.variable} font-roboto`}>
            <Component {...pageProps} />
          </div>
        </WishlistContextProvider>
      </CartContextProvider>
    </CategoriesProvider>
  );
}

export default MyApp;
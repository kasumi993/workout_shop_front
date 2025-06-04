import { HiOutlineShoppingCart } from 'react-icons/hi';
import Link from 'next/link';

export default function EmptyCart() {
  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
        <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8">Votre Panier</h1>
            
            <div className="bg-white rounded-lg shadow p-8 sm:p-12 text-center">
            <HiOutlineShoppingCart
            className="text-gray-300 text-4xl sm:text-6xl mx-auto mb-4" />
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-600 mb-2">Votre panier est vide</h2>
            <p className="text-gray-500 mb-6 text-sm sm:text-base">Découvrez nos produits et commencez vos achats!</p>
            <Link href="/products" className="inline-block bg-gray-900 text-white px-6 py-3 rounded-md hover:bg-gray-800 transition duration-300 text-sm sm:text-base">
                Voir nos produits
            </Link>
            </div>
        </div>
    </div>
  );
}
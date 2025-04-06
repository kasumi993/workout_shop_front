import { useContext, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaShoppingCart, FaBars } from 'react-icons/fa';
import { CartContext } from '@/context/CartContext';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartProducts } = useContext(CartContext);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo.svg" alt="Logo" width={150} height={150}/>\
        </Link>
        
        <nav className={`${mobileMenuOpen ? 'block' : 'hidden'} md:flex md:space-x-8 fixed md:static inset-0 md:inset-auto bg-white md:bg-transparent pt-16 md:pt-0 px-4 md:px-0`}>
          <Link href="#home" className="block md:inline text-gray-800 hover:text-blue-500 font-medium py-2 md:py-0">Home</Link>
          <Link href="#products" className="block md:inline text-gray-800 hover:text-blue-500 font-medium py-2 md:py-0">Products</Link>
          <Link href="#about" className="block md:inline text-gray-800 hover:text-blue-500 font-medium py-2 md:py-0">About Us</Link>
          <Link href="#contact" className="block md:inline text-gray-800 hover:text-blue-500 font-medium py-2 md:py-0">Contact</Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <FaShoppingCart className="text-gray-700 text-xl cursor-pointer" />
            {cartProducts.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartProducts.length}
              </span>
            )}
          </div>
          <button 
            className="md:hidden text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <FaBars className="text-xl" />
          </button>
        </div>
      </div>
    </header>
  );
}
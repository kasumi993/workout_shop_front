import { useContext, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HiOutlineShoppingCart, HiBars3, HiXMark} from 'react-icons/hi2'
import { CartContext } from '@/context/CartContext';
import { useRouter } from 'next/router';
import { PiListHeartLight } from "react-icons/pi";
import { useWishlist } from '@/context/WishlistContext';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartItems } = useContext(CartContext);
  const { getWishlistCount } = useWishlist();
  const [searchQuery, setSearchQuery] = useState('');

  const router = useRouter();
  const wishlistCount = getWishlistCount();

  const navLinks = [
    { href: '/', label: 'Accueil' },
    { href: '/products', label: 'Nos Produits' },
    { href: '/about', label: 'A propos de nous' },
    { href: '/contact', label: 'Nous contacter' },
  ];

  return (
    <header className="relative top-0 bg-transparent w-full py-2 md:py-3 z-50">
      <div className="px-4 sm:px-6 lg:px-8 xl:px-25 flex justify-between items-center">
        {/* Logo à gauche */}
        <Link href="/" className="flex items-center flex-shrink-0">
          <Image 
            src="/logo/logo.svg" 
            alt="Workout Shop Logo" 
            width={120} 
            height={40}
            className="w-16 h-auto sm:w-20 md:w-24 lg:w-[120px]"
          />
        </Link>

        {/* Desktop Navigation Container */}
        <div className='hidden md:flex bg-gray-900 rounded-[30px] flex-1 max-w-4xl mx-4 lg:mx-8 justify-between py-2 px-4 lg:px-6 gap-4 lg:gap-12'>
          {/* Liens de navigation */}
          <div className="flex items-center">
            <nav className="flex space-x-4 lg:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-white font-light hover:text-gray-300 cursor-pointer text-sm lg:text-base transition-colors ${
                    router.pathname === link.href ? 'text-gray-300 !font-normal' : ''
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Desktop Icons */}
          <div className="flex items-center space-x-3 lg:space-x-4">
            {/* Wishlist Link with Counter */}
            <Link href="/wishlist" className="text-white hover:text-gray-300 relative group"> 
              <PiListHeartLight className="text-xl lg:text-[24px] transition-transform group-hover:scale-110"/>
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 lg:w-5 lg:h-5 flex items-center justify-center text-xs font-medium">
                  {wishlistCount}
                </span>
              )}
            </Link>
            
            {/* Cart Link with Counter */}
            <Link href="/cart" className="relative text-white hover:text-gray-300 group">
              <HiOutlineShoppingCart className="text-xl lg:text-[24px] transition-transform group-hover:scale-110" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 lg:w-5 lg:h-5 flex items-center justify-center text-xs font-medium">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-900 focus:outline-none p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <HiXMark className="text-2xl" />
          ) : (
            <HiBars3 className="text-2xl" />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Mobile Menu Slide-in */}
      <div className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
        mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <Image 
              src="/logo/logo.svg" 
              alt="Workout Shop Logo" 
              width={100} 
              height={33}
              className="w-20 h-auto"
            />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              <HiXMark className="text-2xl" />
            </button>
          </div>

          {/* Mobile Menu Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Mobile Navigation Links */}
            <nav className="py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-6 py-4 text-gray-800 hover:bg-gray-100 transition-colors ${
                    router.pathname === link.href ? 'bg-gray-100 font-medium border-r-4 border-blue-500' : ''
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Mobile Account & Shopping Links */}
            <div className="border-t py-4">
              {/* Mobile Wishlist with Counter */}
              <Link 
                href="/wishlist" 
                className="flex items-center justify-between px-6 py-4 text-gray-800 hover:bg-gray-100 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="flex items-center">
                  <PiListHeartLight className="text-2xl mr-3" />
                  <span className="font-medium">Liste de souhaits</span>
                </div>
                {wishlistCount > 0 && (
                  <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              
              {/* Mobile Cart with Counter */}
              <Link 
                href="/cart" 
                className="flex items-center justify-between px-6 py-4 text-gray-800 hover:bg-gray-100 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="flex items-center">
                  <HiOutlineShoppingCart className="text-2xl mr-3" />
                  <span className="font-medium">Panier</span>
                </div>
                {cartItems.length > 0 && (
                  <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                    {cartItems.length}
                  </span>
                )}
              </Link>

              {/* Mobile Account Link */}
              {/* <Link 
                href="/account" 
                className="flex items-center px-6 py-4 text-gray-800 hover:bg-gray-100 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <HiOutlineUserCircle className="text-2xl mr-3" />
                <span className="font-medium">Mon Compte</span>
              </Link> */}
            </div>

            {/* Mobile Search */}
            {/* <div className="border-t p-4">
              <form onSubmit={handleSearchSubmit} className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
                <input
                  type="text"
                  placeholder="Chercher..."
                  className="flex-1 outline-none bg-transparent text-gray-800 placeholder-gray-500"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <button type="submit" className="text-gray-500 hover:text-gray-700 ml-2">
                  <HiOutlineMagnifyingGlass className="text-xl" />
                </button>
              </form>
            </div> */}
          </div>

          {/* Mobile Menu Footer */}
          <div className="border-t p-4 bg-gray-50">
            <div className="text-center text-sm text-gray-600">
              <p>Contactez-nous</p>
              <p className="font-medium text-gray-800">+221 76 197 80 60</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
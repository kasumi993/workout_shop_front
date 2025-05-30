import { useContext, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HiOutlineUserCircle, HiOutlineMagnifyingGlass, HiOutlineShoppingCart, HiBars3} from 'react-icons/hi2'
import { CartContext } from '@/context/CartContext';
import { useRouter } from 'next/router';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartItems } = useContext(CartContext);
  const [searchQuery, setSearchQuery] = useState('');

  const router = useRouter();

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log('Recherche pour :', searchQuery);
    // Ici, implémente la navigation vers la page de résultats de recherche
  };

  const navLinks = [
    { href: '/', label: 'Accueil' },
    { href: '/products', label: 'Nos Produits' },
    { href: '/about', label: 'A propos de nous' },
    { href: '/contact', label: 'Nous contacter' },
  ];

  return (
    <header className="relative top-0 bg-transparent w-full md:py-3 z-50"> {/* Fond noir et bords arrondis */}
      <div className="lg:px-25 md:px-5 flex justify-between items-center">
        {/* Logo à gauche */}
        <Link href="/" className="flex items-center">
          <Image src="/logo/logo.svg" alt="Workout Shop Logo" width={120} height={40} />
        </Link>

        <div className='bg-gray-900 rounded-[30px] lg:w-3/4 md:w-fit flex justify-between py-2 px-6 gap-12'>
          {/* Liens de navigation */}
          <div className="flex items-center space-x-6">
            <nav className="hidden lg:flex space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-white font-light hover:text-gray-300 cursor-pointer ${router.pathname === link.href ? 'text-gray-300 !font-normal' : ''}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Barre de recherche Icônes de compte et panier */}
          <div className="flex items-center space-x-4">
            {/* Barre de recherche */}
            <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center px-1 py-1 gap-3"> {/* Fond gris clair */}
              <input
                type="text"
                placeholder="Chercher..."
                className="bg-[rgba(209,213,219,0.25)] rounded-[20px] outline-none w-32 sm:w-48 text-white px-3"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button type="submit" className="text-white hover:text-gray-300"> {/* Icône de loupe blanche */}
                <HiOutlineMagnifyingGlass className="text-[24px]" />
              </button>
            </form>
            {/* <Link href="/account" className="hidden text-white md:block hover:text-gray-300"> Icône blanche
              <HiOutlineUserCircle className="text-[24px]"/>
            </Link> */}
            <Link href="/cart" className="relative text-white hover:text-gray-300"> {/* Icône blanche */}
              <HiOutlineShoppingCart className="text-[24px]" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* Menu mobile */}
            <button
              className="md:hidden text-white focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <HiBars3 className="text-xl" />
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile déroulant */}
      {mobileMenuOpen && (
        <div className="bg-gray-800 py-2 px-4 md:hidden"> {/* Fond plus foncé pour le menu mobile */}
          <Link href="/" className="block py-2 text-white hover:text-gray-300">Accueil</Link>
          <Link href="/products" className="block py-2 text-white hover:text-gray-300">Nos Produits</Link>
          <Link href="/about" className="block py-2 text-white hover:text-gray-300">A propos de nous</Link>
          <Link href="/contact" className="block py-2 text-white hover:text-gray-300">Nous contacter</Link>
          <Link href="/account" className="block py-2 text-white hover:text-gray-300">Mon Compte</Link>
          <Link href="/cart" className="block py-2 text-white hover:text-gray-300 relative">
            Panier
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartItems.length}
              </span>
            )}
          </Link>
          <form onSubmit={handleSearchSubmit} className="mt-2 flex items-center bg-gray-300 rounded-md px-2 py-1">
            <input
              type="text"
              placeholder="Chercher..."
              className="outline-none w-full text-gray-600 bg-transparent"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button type="submit" className="text-white hover:text-gray-300">
              <HiOutlineMagnifyingGlass className="text-lg" />
            </button>
          </form>
        </div>
      )}
    </header>
  );
}
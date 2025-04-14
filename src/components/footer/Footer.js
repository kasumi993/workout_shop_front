import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-18">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Image src="/logo/logo-blue-white.svg" alt="Logo" width={180} height={129} className="object-contain" />
            </div>
            <p className="text-gray-400 mb-4">
              Votre premier fournisseur de matériel de sport au Senegal.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-center">Nous contacter</h4>
            <div className='cursor-pointer flex flex-col items-center justify-center space-x-2 mb-2'>
              <div className='flex gap-2'>
                <Image src={'/icones/whatsapp.svg'} width={20} height={20} alt='image' className='object-contain' />
                <span className='text-gray-400 hover:text-white transition duration-300'> +221 76 197 80 60 </span>
              </div>
              <Link href="https://api.whatsapp.com/send?phone=221761978060" target="_blank" className='mt-5 rounded-[10px] bg-[#1EBD4B] px-5 py-3 text-[15px] text-white'>
                Envoyer un message
              </Link>
            </div>
            <div className="mt-5 flex space-x-4 justify-center">
              <a href="https://www.facebook.com/people/Workout-shop/100064445059229/" target="_blank" className="text-gray-400 hover:text-white text-xl">
                <FaFacebookF />
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-xl">
                <FaInstagram />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Méthodes de paiement</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-700 p-3 rounded flex items-center justify-center">
                <Image 
                  src="/images/om.svg" 
                  alt="Orange Money" 
                  width={80}
                  height={54}
                />
              </div>
              <div className="bg-gray-700 p-3 rounded flex items-center justify-center">
                <Image 
                  src="/images/wave.svg" 
                  alt="Wave" 
                  width={80}
                  height={54}
                />
              </div>
            </div>
            <p className="mt-5 text-gray-400 mb-4">
              Livraison à domicile partout dans dakar.
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Workout-Shop. All rights reserved. Created with passion in Senegal.</p>
        </div>
      </div>
    </footer>
  );
}
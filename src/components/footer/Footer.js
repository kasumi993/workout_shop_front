import { FaEnvelope, FaFacebookF, FaInstagram } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-18">
          
          {/* Brand Section */}
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start space-x-2 mb-4">
              <Image 
                src="/logo/logo-blue-white.svg" 
                alt="Logo" 
                width={180} 
                height={129} 
                className="object-contain w-32 sm:w-40 md:w-44 lg:w-[180px] h-auto" 
              />
            </div>
            <p className="text-gray-400 mb-4 text-sm sm:text-base max-w-xs mx-auto sm:mx-0">
              Votre premier fournisseur de matériel de sport maison au Senegal.
            </p>
          </div>
          
          {/* Contact Section */}
          <div className="text-center">
            <h4 className="text-base sm:text-lg font-semibold mb-4">Nous contacter</h4>
            <div className='cursor-pointer flex flex-col items-center justify-center space-y-3 mb-4'>
              <div className='flex items-center gap-2'>
                <Image 
                  src={'/icones/whatsapp.svg'} 
                  width={20} 
                  height={20} 
                  alt='WhatsApp' 
                  className='object-contain w-4 sm:w-5' 
                />
                <span className='text-gray-400 hover:text-white transition duration-300 text-sm sm:text-base'> 
                  +221 76 197 80 60 
                </span>
              </div>
              <Link 
                href="https://api.whatsapp.com/send?phone=221761978060" 
                target="_blank" 
                className='rounded-[10px] bg-[#1EBD4B] px-4 sm:px-5 py-2 sm:py-3 text-sm sm:text-[15px] text-white hover:bg-green-600 transition duration-300'
              >
                Envoyer un message
              </Link>
            </div>
            
            {/* Social Media */}
            <div className="flex space-x-4 justify-center">
              <a 
                href="https://www.facebook.com/people/Workout-shop/100064445059229/" 
                target="_blank" 
                className="text-gray-400 hover:text-white text-lg sm:text-xl transition duration-300"
                rel="noopener noreferrer"
              >
                <FaFacebookF />
              </a>
              <a 
                href="https://www.instagram.com/workout_shop_sn/" 
                className="text-gray-400 hover:text-white text-lg sm:text-xl transition duration-300"
              >
                <FaInstagram />
              </a>
              <a 
                href="mailto:service.workoutshop@gmail.com" 
                target="_blank" 
                className="text-gray-400 hover:text-white text-lg sm:text-xl transition duration-300"
                rel="noopener noreferrer"
              >
                <FaEnvelope />
              </a>
            </div>
          </div>
          
          {/* Payment Methods */}
          <div className="text-center lg:text-left">
            <h4 className="text-base sm:text-lg font-semibold mb-4">Méthodes de paiement</h4>
            <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto lg:mx-0">
              <div className="bg-gray-700 p-2 sm:p-3 rounded flex items-center justify-center h-12 sm:h-16">
                <Image 
                  src="/images/om.svg" 
                  alt="Orange Money" 
                  width={80}
                  height={54}
                  className="object-contain w-12 sm:w-16 lg:w-20 h-auto"
                />
              </div>
              <div className="bg-gray-700 p-2 sm:p-3 rounded flex items-center justify-center h-12 sm:h-16">
                <Image 
                  src="/images/wave.svg" 
                  alt="Wave" 
                  width={80}
                  height={54}
                  className="object-contain w-12 sm:w-16 lg:w-20 h-auto"
                />
              </div>
            </div>
            <p className="mt-4 sm:mt-5 text-gray-400 text-sm sm:text-base">
              Livraison à domicile partout dans dakar.
            </p>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 sm:mt-10 pt-4 sm:pt-6 text-center text-gray-400">
          <p className="text-xs sm:text-sm">
            &copy; {new Date().getFullYear()} Workout-Shop. All rights reserved. Created with passion in Senegal.
          </p>
        </div>
      </div>
    </footer>
  );
}
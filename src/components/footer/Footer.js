import { FaDumbbell, FaFacebookF, FaInstagram, FaTwitter, FaCcVisa, FaCcMastercard } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <FaDumbbell className="text-blue-400 text-2xl" />
              <h3 className="text-xl font-bold">WORKOUT<span className="text-blue-400">-SHOP</span></h3>
            </div>
            <p className="text-gray-400 mb-4">
              Your trusted source for quality home workout equipment in Senegal.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white text-xl">
                <FaFacebookF />
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-xl">
                <FaInstagram />
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-xl">
                <FaTwitter />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="#home" className="text-gray-400 hover:text-white transition duration-300">Home</Link></li>
              <li><Link href="#products" className="text-gray-400 hover:text-white transition duration-300">Products</Link></li>
              <li><Link href="#about" className="text-gray-400 hover:text-white transition duration-300">About Us</Link></li>
              <li><Link href="#contact" className="text-gray-400 hover:text-white transition duration-300">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-white transition duration-300">Shipping Policy</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition duration-300">Return Policy</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition duration-300">FAQ</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition duration-300">Privacy Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Payment Methods</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-700 p-3 rounded flex items-center justify-center">
                <FaCcVisa className="text-2xl text-gray-300" />
              </div>
              <div className="bg-gray-700 p-3 rounded flex items-center justify-center">
                <FaCcMastercard className="text-2xl text-gray-300" />
              </div>
              <div className="bg-gray-700 p-3 rounded flex items-center justify-center">
                <Image 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Orange_Money_logo.svg/1200px-Orange_Money_logo.svg.png" 
                  alt="Orange Money" 
                  width={60}
                  height={24}
                  className="h-6"
                />
              </div>
              <div className="bg-gray-700 p-3 rounded flex items-center justify-center">
                <Image 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Wave_logo.png/640px-Wave_logo.png" 
                  alt="Wave" 
                  width={60}
                  height={24}
                  className="h-6"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Workout-Shop. All rights reserved. Created with passion in Senegal.</p>
        </div>
      </div>
    </footer>
  );
}
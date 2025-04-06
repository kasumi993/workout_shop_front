import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section id="home" className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white py-16 md:py-24">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Build Your Dream Home Gym</h2>
          <p className="text-lg mb-6">Quality workout equipment delivered to your door in Senegal. Start your fitness journey today!</p>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <Link 
              href="#products" 
              className="bg-white text-blue-600 font-bold py-3 px-6 rounded-lg text-center hover:bg-gray-100 transition duration-300"
            >
              Shop Now
            </Link>
            <Link 
              href="#about" 
              className="border-2 border-white text-white font-bold py-3 px-6 rounded-lg text-center hover:bg-white hover:bg-opacity-10 transition duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <Image 
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
            alt="Home gym equipment" 
            width={600}
            height={400}
            className="rounded-lg shadow-2xl max-w-full h-auto max-h-96 object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
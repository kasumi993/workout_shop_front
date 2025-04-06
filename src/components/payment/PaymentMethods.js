import Image from 'next/image';
import { FaWhatsapp } from 'react-icons/fa';

export default function PaymentMethods() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Easy Payment Options</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">We accept multiple payment methods for your convenience</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="bg-gray-50 p-6 rounded-lg flex flex-col items-center justify-center hover:transform hover:scale-105 transition duration-300">
            <Image 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/2560px-Stripe_Logo%2C_revised_2016.svg.png" 
              alt="Stripe" 
              width={120}
              height={40}
              className="h-12 object-contain mb-3"
            />
            <span className="text-gray-700 font-medium">Credit/Debit Cards</span>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg flex flex-col items-center justify-center hover:transform hover:scale-105 transition duration-300">
            <Image 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Orange_Money_logo.svg/1200px-Orange_Money_logo.svg.png" 
              alt="Orange Money" 
              width={120}
              height={40}
              className="h-12 object-contain mb-3"
            />
            <span className="text-gray-700 font-medium">Orange Money</span>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg flex flex-col items-center justify-center hover:transform hover:scale-105 transition duration-300">
            <Image 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Wave_logo.png/640px-Wave_logo.png" 
              alt="Wave" 
              width={120}
              height={40}
              className="h-12 object-contain mb-3"
            />
            <span className="text-gray-700 font-medium">Wave</span>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg flex flex-col items-center justify-center hover:transform hover:scale-105 transition duration-300">
            <FaWhatsapp className="text-green-500 text-5xl mb-3" />
            <span className="text-gray-700 font-medium">WhatsApp Order</span>
          </div>
        </div>
      </div>
    </section>
  );
}
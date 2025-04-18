import Image from 'next/image';
import { FaWhatsapp } from 'react-icons/fa';

export default function PaymentMethods() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Des moyens de paiement adaptés</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Nous acceptons plusieurs moyens de paiement. Le choix est le vôtre !</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* <div className="bg-gray-50 p-6 rounded-lg flex flex-col items-center justify-center hover:transform hover:scale-105 transition duration-300">
            <Image 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/2560px-Stripe_Logo%2C_revised_2016.svg.png" 
              alt="Stripe" 
              width={120}
              height={40}
              className="h-12 object-contain mb-3"
            />
            <span className="text-gray-700 font-medium">Cartes Credit/Debit</span>
          </div> */}
          
          <div className="bg-gray-50 p-6 rounded-lg flex flex-col items-center justify-center hover:transform hover:scale-105 transition duration-300">
            <Image 
              src="/images/om.svg" 
              alt="Orange Money" 
              width={120}
              height={40}
              className="object-contain mb-3"
            />
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg flex flex-col items-center justify-center hover:transform hover:scale-105 transition duration-300">
            <Image 
              src="/images/wave.svg" 
              alt="Wave" 
              width={120}
              height={40}
              className="object-contain mb-3"
            />
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg flex flex-col items-center justify-center hover:transform hover:scale-105 transition duration-300">
            <FaWhatsapp className="text-green-500 text-5xl mb-3" />
            <span className="text-gray-700 font-medium">Commande WhatsApp</span>
          </div>
        </div>
      </div>
    </section>
  );
}
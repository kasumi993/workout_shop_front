import { FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

export default function ContactComponent() {
  return (
    <section id="contact" className="py-8 sm:py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Contact Info */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 text-center lg:text-left">
              Nous contacter
            </h2>
            <p className="text-gray-600 mb-6 text-sm sm:text-base text-center lg:text-left">
              Vous avez des questions, projet de partenariat ou suggestions? Contactez nous.
            </p>
            
            <div className="space-y-6 sm:space-y-8">
              {/* Location */}
              <div className="flex items-start justify-center lg:justify-start">
                <div className="text-primary mt-1 mr-4 text-lg">📍</div>
                <div className="text-center lg:text-left">
                  <h4 className="font-semibold text-gray-800 text-sm sm:text-base">Lieu</h4>
                  <p className="text-gray-600 text-sm sm:text-base">Dakar, Senegal</p>
                </div>
              </div>
              
              {/* Phone */}
              <div className="flex items-start justify-center lg:justify-start">
                <div className="text-primary mt-1 mr-4 text-lg">📞</div>
                <div className="text-center lg:text-left">
                  <h4 className="font-semibold text-gray-800 text-sm sm:text-base">Numéro de Téléphone</h4>
                  <p className="text-gray-600 text-sm sm:text-base">+221 76 197 80 60</p>
                </div>
              </div>
              
              {/* WhatsApp */}
              <div className="flex items-start justify-center lg:justify-start">
                <div className="text-green-500 mt-1 mr-4 text-xl">💬</div>
                <div className="text-center lg:text-left">
                  <h4 className="font-semibold text-gray-800 text-sm sm:text-base">WhatsApp</h4>
                  <p className="text-gray-600 text-sm sm:text-base mb-2">+221 76 197 80 60</p>
                  <a 
                    href="https://wa.me/221761978060" 
                    target='_blank'
                    className="inline-block bg-green-500 text-white px-4 py-2 rounded text-sm hover:bg-green-600 transition duration-300"
                    rel="noopener noreferrer"
                  >
                    💬 Envoyer un message
                  </a>
                </div>
              </div>
              
              {/* Email */}
              <div className="flex items-start justify-center lg:justify-start">
                <div className="text-primary mt-1 mr-4 text-lg">✉️</div>
                <div className="text-center lg:text-left">
                  <h4 className="font-semibold text-gray-800 text-sm sm:text-base">Email</h4>
                  <p className="text-gray-600 text-sm sm:text-base">contact.workoutshop@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="w-full lg:w-1/2">
            <div className="bg-gray-50 p-4 sm:p-6 lg:p-8 rounded-lg shadow-sm">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 text-center lg:text-left">
                Envoyez nous un Message
              </h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                    Votre nom
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                    Adresse Email
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                    Numéro de Téléphone
                  </label>
                  <input 
                    type="tel" 
                    id="phone" 
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                    Votre Message
                  </label>
                  <textarea 
                    id="message" 
                    rows="4" 
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-primary text-white font-bold py-3 px-4 rounded hover:shadow-lg cursor-pointer transition duration-300 text-sm sm:text-base"
                >
                  Envoyer un Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
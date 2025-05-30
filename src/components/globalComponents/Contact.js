import { FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

export default function ContactComponent() {
  return (
    <section id="contact" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Nous contacter</h2>
            <p className="text-gray-600 mb-6">
              Vous avez des questions, projet de partenariat ou suggestions? Contactez nous.
            </p>
            
            <div className="mt-12 space-y-8">
              <div className="flex items-start">
                <FaMapMarkerAlt className="text-primary mt-1 mr-4" />
                <div>
                  <h4 className="font-semibold text-gray-800">Lieu</h4>
                  <p className="text-gray-600">Dakar, Senegal</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <FaPhoneAlt className="text-primary mt-1 mr-4" />
                <div>
                  <h4 className="font-semibold text-gray-800">Numéro de Téléphone</h4>
                  <p className="text-gray-600">+221 76 197 80 60</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <FaWhatsapp className="text-green-500 mt-1 mr-4 text-xl" />
                <div>
                  <h4 className="font-semibold text-gray-800">WhatsApp</h4>
                  <p className="text-gray-600">+221 76 197 80 60</p>
                  <a 
                    href="https://wa.me/221761978060" target='_blank'
                    className="inline-block bg-green-500 text-white px-4 py-2 rounded mt-2 text-sm hover:bg-green-600 transition duration-300"
                  >
                    <FaWhatsapp className="inline mr-2" /> Envoyer un message
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <FaEnvelope className="text-primary mt-1 mr-4" />
                <div>
                  <h4 className="font-semibold text-gray-800">Email</h4>
                  <p className="text-gray-600">contact.workoutshop@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Envoyez nous un Message</h3>
              <form>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Votre nom</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Adresse Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Numéro de Téléphone</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Votre Message</label>
                  <textarea 
                    id="message" 
                    rows="4" 
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-primary text-white font-bold py-3 px-4 rounded hover:shadow-lg cursor-pointer transition duration-300"
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
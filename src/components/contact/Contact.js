import ContactInfo from './ContactInfo';
import ContactForm from './ContactForm';

export default function Contact() {
  return (
    <section id="contact" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* En-tête de section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Restons en Contact
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Que vous ayez une question, un projet ou simplement envie de discuter sport, 
            notre équipe passionnée est là pour vous accompagner dans votre parcours fitness.
          </p>
        </div>

        {/* Contenu principal */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Informations de contact */}
          <div className="order-2 lg:order-1">
            <ContactInfo />
          </div>

          {/* Formulaire de contact */}
          <div className="order-1 lg:order-2">
            <ContactForm />
          </div>
        </div>

        {/* Section des avantages en bas */}
        <div className="mt-20">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="font-bold text-gray-800 mb-2">Réponse Rapide</h3>
              <p className="text-gray-600 text-sm">
                Nous répondons à tous les messages dans les 24h ouvrées
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="font-bold text-gray-800 mb-2">Conseils Personnalisés</h3>
              <p className="text-gray-600 text-sm">
                Notre équipe vous guide selon vos objectifs fitness
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300">
              <div className="text-3xl mb-4">🚚</div>
              <h3 className="font-bold text-gray-800 mb-2">Livraison Flexible</h3>
              <p className="text-gray-600 text-sm">
                Options de livraison adaptées à vos besoins partout au Sénégal
              </p>
            </div>
          </div>
        </div>

        {/* Call-to-action final */}
        <div className="mt-16 text-center">
          <div className="bg-primary p-8 rounded-lg text-white">
            <h3 className="text-2xl font-bold mb-4">
              🏆 Rejoignez nos sportifs satisfaits
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Faites confiance à Workout Shop pour vos équipements de sport. 
              Qualité garantie, service client exceptionnel et passion partagée !
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.open('https://wa.me/221761978060?text=Bonjour,%20je%20souhaite%20découvrir%20vos%20produits', '_blank')}
                className="bg-white text-primary px-8 py-3 rounded-md font-bold hover:shadow-lg transition-all duration-300"
              >
                💬 Chatter sur WhatsApp
              </button>
              <button 
                onClick={() => window.open('tel:+221761978060', '_self')}
                className="border-2 border-white text-white px-8 py-3 rounded-md font-bold hover:bg-white hover:text-primary transition-all duration-300"
              >
                📞 Appeler directement
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
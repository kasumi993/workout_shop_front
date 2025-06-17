import { useState } from 'react';

export default function ContactInfo() {
  const [copied, setCopied] = useState(null);

  const contactItems = [
    {
      id: 'location',
      icon: '📍',
      title: 'Notre Localisation',
      content: 'Dakar, Sénégal',
      subtitle: 'Livraison dans toute la région'
    },
    {
      id: 'phone',
      icon: '📞',
      title: 'Téléphone',
      content: '+221 76 197 80 60',
      subtitle: 'Lun-Sam: 8h-20h',
      action: () => window.open('tel:+221761978060', '_self')
    },
    {
      id: 'whatsapp',
      icon: '💬',
      title: 'WhatsApp',
      content: '+221 76 197 80 60',
      subtitle: 'Réponse rapide garantie',
      action: () => window.open('https://wa.me/221761978060', '_blank')
    },
    {
      id: 'email',
      icon: '✉️',
      title: 'Email',
      content: 'service.workoutshop@gmail.com',
      subtitle: 'Réponse sous 24h',
      action: () => {
        navigator.clipboard.writeText('service.workoutshop@gmail.com');
        setCopied('email');
        setTimeout(() => setCopied(null), 2000);
      }
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center lg:text-left">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-blue-900 bg-clip-text text-transparent mb-4">
          Parlons de votre projet
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          Notre équipe est là pour vous accompagner dans vos objectifs fitness. 
          Contactez-nous pour découvrir nos solutions personnalisées.
        </p>
      </div>

      <div className="grid gap-4">
        {contactItems.map((item) => (
          <div
            key={item.id}
            className={`group relative p-6 rounded-2xl border border-gray-100 bg-white hover:shadow-lg transition-all duration-300 ${
              item.action ? 'cursor-pointer hover:border-blue-200' : ''
            }`}
            onClick={item.action}
          >
            <div className="flex items-start space-x-4">
              <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 text-lg mb-1">
                  {item.title}
                </h4>
                <p className="text-gray-900 font-medium mb-1">
                  {item.content}
                </p>
                <p className="text-sm text-gray-500">
                  {item.subtitle}
                </p>
                
                {copied === item.id && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs animate-pulse">
                    Copié !
                  </div>
                )}
              </div>
              
              {item.action && (
                <div className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-100">
        <div className="text-center">
          <h3 className="font-bold text-gray-800 mb-2">
            🏃‍♂️ Prêt à commencer votre transformation ?
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Découvrez nos équipements de qualité professionnelle
          </p>
          <button 
            onClick={() => window.open('https://wa.me/221761978060?text=Bonjour,%20je%20souhaite%20en%20savoir%20plus%20sur%20vos%20équipements%20de%20sport', '_blank')}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            💬 Commencer la conversation
          </button>
        </div>
      </div>
    </div>
  );
}
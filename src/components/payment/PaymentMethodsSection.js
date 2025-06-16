import Image from 'next/image';
import { FaWhatsapp } from 'react-icons/fa';
import AnimatedElement from '../animations/AnimatedElement';
import StaggerContainer from '../animations/StaggerContainer';
import Link from 'next/link';

export default function PaymentMethods() {
  const paymentMethods = [
    {
      id: 'orange-money',
      name: 'Orange Money',
      image: '/images/om.svg',
      description: 'Paiement instantané et sécurisé',
      color: 'orange'
    },
    {
      id: 'wave',
      name: 'Wave',
      image: '/images/wave.svg',
      description: 'Solution de paiement mobile',
      color: 'blue'
    },
    {
      id: 'whatsapp',
      name: 'Commande WhatsApp',
      icon: FaWhatsapp,
      description: 'Finaliser votre commande par message',
      color: 'green'
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedElement animation="slideUp" className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-800 mb-3 sm:mb-4">
            Des moyens de paiement adaptés
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Nous acceptons plusieurs moyens de paiement. Le choix est le vôtre !
          </p>
        </AnimatedElement>
        
        {/* Payment Methods Grid */}
        <StaggerContainer className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {paymentMethods.map((method, index) => (
              <AnimatedElement
                key={method.id}
                animation="scaleIn"
                delay={index * 0.1}
                className="group"
              >
                <div className="bg-gray-50 hover:bg-white border-2 border-transparent hover:border-gray-200 p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl transition-all duration-300 hover:shadow-lg h-full flex flex-col items-center justify-center text-center min-h-[160px] sm:min-h-[180px] lg:min-h-[200px]">
                  {/* Icon/Image Container */}
                  <div className="flex items-center justify-center mb-3 sm:mb-4 h-12 sm:h-16 lg:h-20">
                    {method.icon ? (
                      <method.icon 
                        className={`text-4xl sm:text-5xl lg:text-6xl text-${method.color}-500 group-hover:scale-110 transition-transform duration-300`}
                      />
                    ) : (
                      <div className="relative w-16 sm:w-20 lg:w-24 h-8 sm:h-10 lg:h-12 group-hover:scale-110 transition-transform duration-300">
                        <Image
                          src={method.image}
                          alt={method.name}
                          fill
                          className="object-contain"
                          sizes="(max-width: 640px) 64px, (max-width: 1024px) 80px, 96px"
                        />
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base lg:text-lg mb-1 sm:mb-2">
                      {method.name}
                    </h3>
                    <p className="text-xs sm:text-sm lg:text-base text-gray-600 leading-relaxed">
                      {method.description}
                    </p>
                  </div>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </StaggerContainer>

        {/* Additional Features */}
        <AnimatedElement animation="slideUp" delay={0.4} className="mt-8 sm:mt-12 lg:mt-16">
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-center">
              {/* Text Content */}
              <div className="text-center md:text-left">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">
                  Paiement sécurisé et livraison rapide
                </h3>
                <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed mb-4 sm:mb-6">
                  Tous nos paiements sont sécurisés et nous livrons partout à Dakar en 1-2 jours ouvrables.
                </p>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center justify-center md:justify-start text-sm sm:text-base text-gray-700">
                    <span className="text-green-500 mr-2 text-lg">✓</span>
                    Transactions 100% sécurisées
                  </div>
                  <div className="flex items-center justify-center md:justify-start text-sm sm:text-base text-gray-700">
                    <span className="text-green-500 mr-2 text-lg">✓</span>
                    Livraison gratuite dès 50.000 FCFA
                  </div>
                  <div className="flex items-center justify-center md:justify-start text-sm sm:text-base text-gray-700">
                    <span className="text-green-500 mr-2 text-lg">✓</span>
                    Support client réactif
                  </div>
                </div>
              </div>

              {/* Visual Element */}
              <div className="flex justify-center items-center">
                <div className="relative w-48 sm:w-64 lg:w-80 h-32 sm:h-40 lg:h-48">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-green-400 rounded-2xl opacity-20 animate-pulse-slow"></div>
                  <div className="absolute inset-2 bg-white rounded-xl shadow-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl sm:text-4xl lg:text-5xl mb-2">🛡️</div>
                      <p className="text-xs sm:text-sm lg:text-base font-medium text-gray-700">
                        Paiement sécurisé
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedElement>

        {/* Call to Action */}
        <AnimatedElement animation="slideUp" delay={0.6} className="text-center mt-8 sm:mt-12 lg:mt-16">
          <div className="bg-gray-900 rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-10 text-white">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">
              Prêt à commencer votre fitness journey ?
            </h3>
            <p className="text-sm sm:text-base lg:text-lg text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Découvrez notre large gamme d&apos;équipements de sport et commencez dès aujourd&apos;hui !
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base w-full sm:w-auto"
              >
                Voir nos produits
              </Link>
              <a
                href="https://wa.me/221761978060"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base w-full sm:w-auto"
              >
                <FaWhatsapp className="mr-2 text-lg sm:text-xl" />
                Contactez-nous
              </a>
            </div>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
}
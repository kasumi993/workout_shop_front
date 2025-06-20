import Image from 'next/image';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import Avatar from './Avatar';


export default function Testimonials() {

    const testimonials = [
        {
            name: "Aminata D.",
            image: "/images/aminata.jpg",
            rating: 5,
            comment: "Je voulais des équipements de sport maison et je les ai contactés via Facebook au temps. Ils m'ont répondu rapidement et m'ont aidé à choisir les meilleurs produits. Livraison rapide et service client exceptionnel !"
        },
        {
            name: "Ibrahima S.",
            image: "/images/ibrahima.jpg",
            rating: 4.5,
            comment: "Des jeunes réactifs et disponibles. Livraison le jour même de ma commande. Bonne qualité de produits. Je recommande."
        },
        {
          name: "Malick S.",
          image: "/images/ibrahima.jpg",
          rating: 5,
          comment: "Livraison le jour même. Super efficace. J'ai acheté un vélo de course maison et je l'ai toujours. Il fonctionne bien et ne prend pas trop de place.",
      },
        ];

  return (
    <section className="pt-16 pb-28 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Ce que disent nos client</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Les premiers clients qui nous ont fait confiance.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden mr-4">
                  <Avatar name={testimonial.name} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      i < Math.floor(testimonial.rating) ? (
                        <FaStar key={i} />
                      ) : i === Math.floor(testimonial.rating) && testimonial.rating % 1 >= 0.5 ? (
                        <FaStarHalfAlt key={i} />
                      ) : (
                        <FaStar key={i} className="text-gray-300" />
                      )
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">{testimonial.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
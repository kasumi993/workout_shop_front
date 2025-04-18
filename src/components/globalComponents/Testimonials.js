import Image from 'next/image';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import Avatar from './Avatar';


export default function Testimonials() {

    const testimonials = [
        {
            name: "Aminata D.",
            image: "/images/aminata.jpg",
            rating: 5,
            comment: "The adjustable dumbbells have been a game-changer for my home workouts. They save so much space and the quality is excellent. Delivery was quick too!"
        },
        {
            name: "Ibrahima S.",
            image: "/images/ibrahima.jpg",
            rating: 4.5,
            comment: "Great customer service! When I had an issue with my order, the brothers responded quickly on WhatsApp and resolved it immediately. Will definitely shop here again."
        },
        {
          name: "Ibrahima S.",
          image: "/images/ibrahima.jpg",
          rating: 4.5,
          comment: "Great customer service! When I had an issue with my order, the brothers responded quickly on WhatsApp and resolved it immediately. Will definitely shop here again."
      },
        // Add more testimonials...
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
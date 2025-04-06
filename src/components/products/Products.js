import { CartContext } from '@/context/CartContext';
import { useContext } from 'react';

export default function Products() {
  const { addProduct } = useContext(CartContext);

  const products = [
    {
      id: 1,
      name: "Adjustable Dumbbells",
      description: "5-25kg adjustable weights in one compact set",
      price: "45,000",
      image: "/images/adjustable-dumbbells.jpg",
      badge: {
        text: "NEW",
        color: "bg-blue-500"
      }
    },
    {
      id: 2,
      name: "Premium Yoga Mat",
      description: "Non-slip, extra thick for maximum comfort",
      price: "15,000",
      image: "/images/yoga-mat.jpg"
    },
    // Add more products...
  ];

  return (
    <section id="products" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Our Featured Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Quality equipment for your home workouts at affordable prices
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md transition duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg">
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
                {product.badge && (
                  <div className={`absolute top-2 right-2 text-white text-xs font-bold px-2 py-1 rounded-full ${product.badge.color}`}>
                    {product.badge.text}
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-600 font-bold">{product.price} FCFA</span>
                  <button 
                    onClick={() => addProduct(product)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition duration-300"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-block border-2 border-blue-500 text-blue-500 font-bold py-2 px-6 rounded hover:bg-blue-500 hover:text-white transition duration-300"
          >
            View All Products
          </a>
        </div>
      </div>
    </section>
  );
}
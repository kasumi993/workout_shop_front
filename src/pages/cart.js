import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/context/CartContext";
import { HiOutlineTrash, HiOutlineShoppingCart, HiOutlineCheckCircle } from "react-icons/hi2";

export default function CartPage() {
  const { cartItems, setCartItems, addProduct, removeProduct, clearCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'save10') {
      setDiscount(0.1);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 50000 ? 0 : 2500;
  const discountAmount = subtotal * discount;
  const total = subtotal - discountAmount + deliveryFee;

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <HiOutlineCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Commande confirmée!</h1>
            <p className="text-gray-600 mb-6">Nous vous enverrons un email avec les détails de votre commande.</p>
            <button className="inline-block bg-gray-900 text-white px-6 py-3 rounded-md hover:bg-gray-800 transition duration-300">
              Continuer vos achats
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Votre Panier</h1>
        
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <HiOutlineShoppingCart className="text-gray-300 text-6xl mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">Votre panier est vide</h2>
            <p className="text-gray-500 mb-6">Découvrez nos produits et commencez vos achats!</p>
            <button className="inline-block bg-gray-900 text-white px-6 py-3 rounded-md hover:bg-gray-800 transition duration-300">
              Voir nos produits
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow">
                {cartItems.map(item => (
                  <div key={item.id} className="border-b last:border-b-0">
                    <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      {/* Product Image */}
                      <div className="w-24 h-24 flex-shrink-0">
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      
                      {/* Product Info */}
                      <div className="flex-grow">
                        <h3 className="font-semibold text-gray-800 mb-1">{item.title}</h3>
                        <p className="text-gray-500 text-sm mb-2">{item.description}</p>
                        
                        {/* Mobile Layout */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => addProduct(item.id, -1)}
                              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition duration-200"
                            >
                              -
                            </button>
                            <span className="font-medium w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => addProduct(item.id, 1)}
                              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition duration-200"
                            >
                              +
                            </button>
                          </div>
                          
                          <div className="flex items-center justify-between sm:gap-6">
                            <span className="font-bold text-lg text-gray-900">
                              {(item.quantity * item.price).toLocaleString('fr-FR')} FCFA
                            </span>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-red-500 hover:text-red-700 transition duration-200"
                              title="Retirer du panier"
                            >
                              <HiOutlineTrash className="text-xl" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6 sticky top-4">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Résumé de la commande</h2>
                
                {/* Promo Code */}
                <div className="mb-6">
                  <label className="text-sm text-gray-600 mb-2 block">Code promo</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Entrer le code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={applyPromoCode}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition duration-200"
                    >
                      Appliquer
                    </button>
                  </div>
                </div>
                
                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Sous-total</span>
                    <span>{subtotal.toLocaleString('fr-FR')} FCFA</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Réduction</span>
                      <span>-{discountAmount.toLocaleString('fr-FR')} FCFA</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-600">
                    <span>Livraison</span>
                    <span>{deliveryFee === 0 ? 'Gratuite' : `${deliveryFee.toLocaleString('fr-FR')} FCFA`}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                      <span>Total</span>
                      <span>{total.toLocaleString('fr-FR')} FCFA</span>
                    </div>
                  </div>
                </div>
                
                {/* Checkout Button */}
                <button
                  onClick={() => setIsSuccess(true)}
                  className="block w-full bg-gray-900 text-white text-center py-3 rounded-md hover:bg-gray-800 transition duration-300 font-medium"
                >
                  Procéder au paiement
                </button>
                
                {/* Continue Shopping */}
                <button className="block w-full text-center text-gray-600 hover:text-gray-800 mt-3 text-sm">
                  Continuer vos achats
                </button>
                
                {/* Security Info */}
                <div className="mt-6 pt-6 border-t">
                  <p className="text-xs text-gray-500 text-center">
                    Paiement sécurisé avec Wave et Orange Money
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
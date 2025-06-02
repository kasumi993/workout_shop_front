import { useContext, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { CartContext } from "@/context/CartContext";
import { HiOutlineTrash, HiOutlineShoppingCart, HiOutlineCheckCircle } from "react-icons/hi2";
import MainLayout from "@/layouts/MainLayout";
import LoadingSpinner from "@/components/globalComponents/LoadingSpinner";
import { FaWhatsapp } from "react-icons/fa";
import { HiOutlineArrowCircleLeft, HiOutlineArrowRight, HiOutlineCheck } from "react-icons/hi";

export default function CartPage() {
  const router = useRouter();
  const { 
    cartItems, 
    updateQuantity, 
    removeProduct, 
    clearCart, 
    getCartTotals,
    isLoading 
  } = useContext(CartContext);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const { subtotal, deliveryFee, total } = getCartTotals();
  const discountAmount = subtotal * discount;
  const finalTotal = total - discountAmount;

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'save10') {
      setDiscount(0.1);
    } else {
      alert('Code promo invalide');
    }
  };

  const handleCheckout = async () => {
    setIsProcessing(true);
    // Simulate checkout process
    setTimeout(() => {
      router.push('/checkout');
    }, 500);
  };

  const handleWhatsappCheckout = () => {
    setIsProcessing(true);
    
    const message = `Bonjour, je souhaite finaliser ma commande. Voici les détails :\n\n` +
                    `Produits :\n` +
                    cartItems.map(item => 
                      `- ${item.title} (${item.quantity} x ${parseFloat(item.price).toLocaleString('fr-FR')} FCFA)${item.selectedProperties ? ` - ${JSON.stringify(item.selectedProperties)}` : ''}`
                    ).join('\n') + `\n\n` +
                    `Résumé de la commande :\n` +
                    `Sous-total : ${subtotal.toLocaleString('fr-FR')} FCFA\n` +
                    `Livraison : ${deliveryFee === 0 ? 'Gratuite' : `${deliveryFee.toLocaleString('fr-FR')} FCFA`}\n` +
                    `Total : ${total.toLocaleString('fr-FR')} FCFA\n\n` +
                    `Merci !`;
    
    const whatsappUrl = `https://wa.me/221761978060?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setIsProcessing(false);
  };

  const formatProperties = (properties) => {
    if (!properties || Object.keys(properties).length === 0) return null;
    
    return Object.entries(properties).map(([key, value]) => (
      <span key={key} className="text-sm text-gray-500">
        {key}: <span className="font-medium">{value}</span>
      </span>
    ));
  };

  if (isLoading) {
    return (
      <MainLayout>
        <LoadingSpinner />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Votre Panier</h1>
          
          {cartItems.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <HiOutlineShoppingCart className="text-gray-300 text-6xl mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-600 mb-2">Votre panier est vide</h2>
              <p className="text-gray-500 mb-6">Découvrez nos produits et commencez vos achats!</p>
              <Link href="/products" className="inline-block bg-gray-900 text-white px-6 py-3 rounded-md hover:bg-gray-800 transition duration-300">
                Voir nos produits
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow">
                  {cartItems.map((item, index) => (
                    <div key={`${item.id}-${JSON.stringify(item.selectedProperties)}-${index}`} className="border-b last:border-b-0">
                      <div className="p-6">
                        <div className="flex gap-4">
                          {/* Product Image */}
                          <Link href={`/product/detail/${item.id}`} className="flex-shrink-0">
                            <div className="w-24 h-24 relative">
                              <Image
                                src={item.images?.[0] || '/images/noimage.png'}
                                alt={item.title}
                                fill
                                className="object-cover rounded-lg"
                              />
                            </div>
                          </Link>
                          
                          {/* Product Info */}
                          <div className="flex-grow">
                            <Link href={`/product/detail/${item.id}`}>
                              <h3 className="font-semibold text-gray-800 hover:text-primary transition-colors cursor-pointer">
                                {item.title}
                              </h3>
                            </Link>
                            
                            {/* Selected Properties */}
                            <div className="flex flex-wrap gap-2 mt-1">
                              {formatProperties(item.selectedProperties)}
                            </div>
                            
                            <p className="text-gray-500 text-sm mt-1 line-clamp-2">{item.description}</p>
                            
                            <div className="flex items-center justify-between mt-4">
                              {/* Quantity Controls */}
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedProperties)}
                                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition duration-200"
                                  disabled={item.quantity <= 1}
                                >
                                  -
                                </button>
                                <span className="font-medium w-8 text-center">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedProperties)}
                                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition duration-200"
                                >
                                  +
                                </button>
                              </div>
                              
                              {/* Price and Remove */}
                              <div className="flex items-center gap-4">
                                <span className="font-bold text-lg text-gray-900">
                                  {(item.quantity * parseFloat(item.price)).toLocaleString('fr-FR')} FCFA
                                </span>
                                <button
                                  onClick={() => removeProduct(item.id, item.selectedProperties)}
                                  className="text-red-500 hover:text-red-700 transition duration-200 p-2"
                                  title="Retirer du panier"
                                >
                                  <HiOutlineTrash className="text-xl" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Clear Cart Button */}
                <div className="mt-4 text-right">
                  <button
                    onClick={clearCart}
                    className="text-gray-500 hover:text-gray-700 text-sm"
                  >
                    Vider le panier
                  </button>
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
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
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
                    {deliveryFee > 0 && (
                      <p className="text-xs text-gray-500">
                        Livraison gratuite pour les commandes de plus de 50.000 FCFA
                      </p>
                    )}
                    <div className="border-t pt-3">
                      <div className="flex justify-between text-lg font-bold text-gray-900">
                        <span>Total</span>
                        <span>{finalTotal.toLocaleString('fr-FR')} FCFA</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Checkout Button */}
                  {/* <button
                    onClick={handleCheckout}
                    disabled={isProcessing}
                    className="block w-full bg-gray-900 text-white text-center py-3 rounded-md hover:bg-gray-800 transition duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? 'Traitement...' : 'Procéder au paiement'}
                  </button> */}
                  {/* WhatsApp */}
                  <button
                    onClick={handleWhatsappCheckout}
                    className='flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all border-green-500 bg-green-50 hover:bg-green-100 w-full'
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <FaWhatsapp className="text-3xl text-green-500 mr-3" />
                        <div className="flex flex-col items-start">
                          <p className="font-medium">Commande WhatsApp</p>
                          <p className="text-sm text-gray-500">Finaliser sur whatsapp</p>
                        </div>
                      </div>
                      <div className='flex justify-center items-center w-5 h-5 rounded-full bg-green-500'>
                          <HiOutlineArrowRight className="text-white text-xs" />
                      </div>
                    </div>
                  </button>
                  
                  {/* Continue Shopping */}
                  <Link href="/products" className="block w-full text-center text-gray-600 hover:text-gray-800 mt-3 text-sm">
                    Continuer vos achats
                  </Link>
                  
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
    </MainLayout>
  );
}
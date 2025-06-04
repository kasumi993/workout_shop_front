import CartItem from "@/components/cart/CartItem";
import EmptyCart from "@/components/cart/EmptyCart";
import OrderSummary from "@/components/cart/OrderSummary";
import { CartContext } from "@/context/CartContext";
import MainLayout from "@/layouts/MainLayout";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

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

  if (cartItems.length === 0) {
    return (
    <MainLayout>
      <EmptyCart />
    </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8">Votre Panier</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              {cartItems.map((item, index) => (
                <CartItem 
                  key={`${item.id}-${JSON.stringify(item.selectedProperties)}-${index}`}
                  item={item}
                  updateQuantity={updateQuantity}
                  removeProduct={removeProduct}
                />
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
            <OrderSummary 
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              total={total}
              finalTotal={finalTotal}
              discount={discount}
              discountAmount={discountAmount}
              promoCode={promoCode}
              setPromoCode={setPromoCode}
              applyPromoCode={applyPromoCode}
              handleWhatsappCheckout={handleWhatsappCheckout}
            />
          </div>
        </div>
      </div>
      </div>
    </MainLayout>
  );
}
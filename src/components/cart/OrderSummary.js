import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { HiOutlineArrowRight } from "react-icons/hi2";

export default function OrderSummary({ subtotal, deliveryFee, total, finalTotal, discount, discountAmount, promoCode, setPromoCode, applyPromoCode, handleWhatsappCheckout }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 sm:p-6 sticky top-4">
      <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">Résumé de la commande</h2>
      
      {/* Promo Code */}
      <div className="mb-4 sm:mb-6">
        <label className="text-sm text-gray-600 mb-2 block">Code promo</label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Entrer le code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />
          <button
            onClick={applyPromoCode}
            className="px-3 sm:px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition duration-200 text-sm whitespace-nowrap"
          >
            Appliquer
          </button>
        </div>
      </div>
      
      {/* Price Breakdown */}
      <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
        <div className="flex justify-between text-gray-600 text-sm sm:text-base">
          <span>Sous-total</span>
          <span>{subtotal.toLocaleString('fr-FR')} FCFA</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600 text-sm sm:text-base">
            <span>Réduction</span>
            <span>-{discountAmount.toLocaleString('fr-FR')} FCFA</span>
          </div>
        )}
        <div className="flex justify-between text-gray-600 text-sm sm:text-base">
          <span>Livraison</span>
          {/* <span>{deliveryFee === 0 ? 'Gratuite' : `${deliveryFee.toLocaleString('fr-FR')} FCFA`}</span> */}
          <span>Variable</span>
        </div>
        <p className="text-xs text-gray-500">
          Livraison gratuite pour les commandes de plus de 150.000 FCFA
        </p>
        <div className="border-t pt-2 sm:pt-3">
          <div className="flex justify-between text-base sm:text-lg font-bold text-gray-900">
            <span>Total</span>
            <span>{finalTotal.toLocaleString('fr-FR')} FCFA</span>
          </div>
        </div>
      </div>
      
      {/* WhatsApp Checkout Button */}
      <button
        onClick={handleWhatsappCheckout}
        className='flex items-center p-3 sm:p-4 border-2 rounded-lg cursor-pointer transition-all border-green-500 bg-green-50 hover:bg-green-100 w-full'
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <FaWhatsapp className="text-2xl sm:text-3xl text-green-500 mr-3" />
            <div className="flex flex-col items-start">
              <p className="font-medium text-sm sm:text-base">Commande WhatsApp</p>
              <p className="text-xs sm:text-sm text-gray-500">Finaliser sur whatsapp</p>
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
      <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t">
        <p className="text-xs text-gray-500 text-center">
          Paiement sécurisé avec Wave et Orange Money
        </p>
      </div>
    </div>
  );
}
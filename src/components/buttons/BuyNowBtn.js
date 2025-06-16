import { useContext } from "react";
import { useRouter } from "next/router";
import { CartContext } from "@/context/CartContext";

export default function BuyNowBtn({ productId, quantity = 1, selectedProperties = {}, className = "" }) {
    const { addProduct, isLoading: cartLoading } = useContext(CartContext);
    const router = useRouter();
    
    const handleBuyNow = async (e) => {
        e.preventDefault(); // Prevent navigation when clicking the button
        e.stopPropagation();
        
        try {
            await addProduct(productId, quantity, selectedProperties);
            router.push('/cart');
        } catch (error) {
            console.error('Failed to add product and redirect to checkout:', error);
        }
    };

    return (
        <button 
            onClick={handleBuyNow} 
            disabled={cartLoading}
            className={`flex items-center justify-center gap-2 bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300 font-medium ${className}`}
        >
            {cartLoading ? (
                <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Traitement...</span>
                </>
            ) : (
                <span>Acheter maintenant</span>
            )}
        </button>
    )
}
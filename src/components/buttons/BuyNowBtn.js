import { useContext } from "react";
import { CartContext } from "@/context/CartContext";

export default function BuyNowBtn(productId, quantity, selectedProperties) {
    const { addProduct, isLoading: cartLoading } = useContext(CartContext);
    
    const handleBuyNow = async (e) => {
        e.preventDefault(); // Prevent navigation when clicking the button
        e.stopPropagation();
        await addProduct(productId, quantity, selectedProperties);
        router.push('/checkout');
    };
    return (
        <button onClick={handleBuyNow} className="flex-1 bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 transition duration-300">
            Acheter maintenant
        </button>
    )
}
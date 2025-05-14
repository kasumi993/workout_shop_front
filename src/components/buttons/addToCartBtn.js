import { useRef } from 'react';
import { CartContext } from '@/context/CartContext';
import { useContext} from 'react';
import { HiOutlineShoppingCart } from 'react-icons/hi';

const AddToCartBtn = ({ className,iconClass, productId, onAddToCart }) => {
    const { addProduct } = useContext(CartContext);
    const buttonRef = useRef(null);

    // Function to handle adding the product to the cart
    const handleAddToCart = () => {
        addProduct(productId);
        // Change button text temporarily to show feedback
        if (buttonRef.current) {
            const originalText = buttonRef.current.textContent;
            buttonRef.current.textContent = "Ajouté !";
            setTimeout(() => {
                buttonRef.current.textContent = originalText;
            }, 3000);
        }

        // Call the onAddToCart callback if provided
        if (onAddToCart) {
            onAddToCart(productId);
        }
    };

    return (
        <button ref={buttonRef}
            className={`${className ? className : ''} flex gap-3 bg-gray-900 hover:scale-105 hover:shadow-xl text-white font-light py-2 px-5 rounded-md cursor-pointer transition duration-300 ease-in-out`}
            onClick={() => handleAddToCart(productId)}
        >
            <HiOutlineShoppingCart  className={`${iconClass} text-[24px]`}/>
            Ajouter au Panier
        </button>
    );
};

export default AddToCartBtn;
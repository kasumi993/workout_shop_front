import React from 'react';
import { CartContext } from '@/context/CartContext';
import { useContext} from 'react';
import { HiOutlineShoppingCart } from 'react-icons/hi';

const AddToCartBtn = ({ className,iconClass, productId, onAddToCart }) => {
    const { addProduct } = useContext(CartContext);

    // Function to handle adding the product to the cart
    const handleAddToCart = () => {
        addProduct(productId);
        onAddToCart(productId);
    };

    const buttonClass = `flex gap-3 bg-black hover:bg-primary text-white font-light py-2 px-5 rounded-md ${className}`;

    return (
        <button 
            className={`${className} flex gap-3 bg-black hover:bg-primary text-white font-light py-2 px-5 rounded-md `}
            onClick={() => handleAddToCart(productId)}
        >
            <HiOutlineShoppingCart  className={`${iconClass} text-[24px]`}/>
            Ajouter au Panier
        </button>
    );
};

export default AddToCartBtn;
import { CartContext } from '@/context/CartContext';
import { useContext, useState} from 'react';
import Img from "@/components/globalComponents/Img";
import { HiOutlineHeart, HiHeart } from "react-icons/hi2";
import Link from 'next/link';

export default function ProductCard({ product }) {
    const { addProduct } = useContext(CartContext);
    const [ wishlist, setWishlist ] = useState([]);
    const [isHovered, setIsHovered] = useState(false);


    const handleAddToWishlist = (e, productId) => {
        e.stopPropagation(); // Prevent the card's onClick
        if (wishlist.includes(productId)) {
            // If the product is already in the wishlist, remove it
            setWishlist(wishlist.filter(id => id !== productId));
            console.log(`Product ${productId} removed from wishlist:`, wishlist); // For debugging
            return;
        }
        setWishlist([...wishlist, productId]);
        console.log(`Product ${productId} added to wishlist:`, wishlist); // For debugging
    };

    return (
        <Link href={'/product/detail/'+product.id} className="cursor-pointer bg-white rounded-lg overflow-hidden shadow-md transition duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg" 
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                >
            <div className="relative overflow-hidden">
                <Img
                    src={product.images?.[0]}
                    alt={product.name}
                    className="w-full h-50 object-contain"
                />
                {product.badge && (
                    <div className={`absolute top-2 right-2 text-white text-xs font-bold px-2 py-1 rounded-full ${product.badge.color}`}>
                    {product.badge.text}
                    </div>
                )}
                <div className={`cursor-pointer absolute top-2 right-2 transition duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                    <button
                        onClick={(e) => {handleAddToWishlist(e, product.id)}}
                        className="bg-white border border-solid border-gray-200 bg-opacity-75 rounded-full p-1 text-gray-600 hover:text-primary transition duration-300">
                        {wishlist?.includes(product.id) ? <HiHeart size={20} className="text-red-700" /> : <HiOutlineHeart size={20} />}
                    </button>
                </div>
            </div>
            <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.title}</h3>
            <p className="text-gray-600 text-sm mb-3">{product.description}</p>
            <div className="flex justify-between items-center">
                <span className="text-primary font-bold">{product.price} FCFA</span>
                <button 
                onClick={() => addProduct(product)}
                className="bg-primary hover:bg-prmary text-white px-3 py-1 rounded text-sm transition duration-300"
                >
                Add to Cart
                </button>
            </div>
            </div>
        </Link>
    )
}
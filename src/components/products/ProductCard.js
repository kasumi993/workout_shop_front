
import Img from "@/components/globalComponents/Img";
import { HiOutlineHeart, HiHeart } from "react-icons/hi2";
import Link from 'next/link';
import { useState } from "react";
import AddToCartBtn from "../buttons/AddToCartBtn";

export default function ProductCard({ product }) {
    const [ wishlist, setWishlist ] = useState([]);
    const [isHovered, setIsHovered] = useState(false);


    const handleAddToWishlist = (e, productId) => {
        e.preventDefault(); // Prevent navigation when clicking the button
        e.stopPropagation();
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
            <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">{product.title}</h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
            <div className="flex gap-2 items-center">
                <span className="text-green-700 font-bold">{product.price} FCFA</span>
                {product.originalPrice && (
                    <>
                        <span className="text-sm text-gray-500 font-light">
                            (-{Math.round((1 - product.price / product.originalPrice) * 100)}%)
                        </span>
                        <span className="text-sm text-gray-500 font-light line-through">
                            {parseFloat(product.originalPrice).toLocaleString('fr-FR')} FCFA
                        </span>
                    </>
                )}
            </div>
            <AddToCartBtn className="mt-6 py-2 px-2 text-[12px]" iconClass="!text-sm" productId={product.id}/>
            </div>
        </Link>
    )
}
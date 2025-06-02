import Img from "@/components/globalComponents/Img";
import { HiOutlineHeart, HiHeart } from "react-icons/hi2";
import Link from 'next/link';
import { useState } from "react";
import AddToCartBtn from "../buttons/AddToCartBtn";
import { useWishlist } from '@/context/WishlistContext';

export default function ProductCard({ product }) {
    const { toggleWishlist, isInWishlist, isLoading: wishlistLoading } = useWishlist();
    const [isHovered, setIsHovered] = useState(false);
    const [isToggling, setIsToggling] = useState(false);

    const handleToggleWishlist = async (e) => {
        e.preventDefault(); // Prevent navigation when clicking the button
        e.stopPropagation();
        
        if (isToggling || wishlistLoading) return;
        
        setIsToggling(true);
        try {
            const added = await toggleWishlist(product.id);
            console.log(added ? `Product ${product.id} added to wishlist` : `Product ${product.id} removed from wishlist`);
        } catch (error) {
            console.error('Failed to toggle wishlist:', error);
        } finally {
            setIsToggling(false);
        }
    };

    const isProductInWishlist = isInWishlist(product.id);

    return (
        <Link 
            href={'/product/detail/'+product.id} 
            className="cursor-pointer bg-white rounded-lg overflow-hidden shadow-md transition duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg" 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative overflow-hidden">
                <Img
                    src={product.images?.[0]}
                    alt={product.title}
                    className="w-full h-50 object-contain"
                />
                {product.badge && (
                    <div className={`absolute top-2 left-2 text-white text-xs font-bold px-2 py-1 rounded-full ${product.badge.color}`}>
                        {product.badge.text}
                    </div>
                )}
                
                {/* Wishlist Button */}
                <div className={`cursor-pointer absolute top-2 right-2 transition duration-300 ${isHovered || isProductInWishlist ? 'opacity-100' : 'opacity-20'}`}>
                    <button
                        onClick={handleToggleWishlist}
                        disabled={isToggling || wishlistLoading}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition duration-300 ${
                            isProductInWishlist 
                                ? 'bg-red-50 border border-red-200 text-red-600 hover:bg-red-100' 
                                : 'bg-white/90 backdrop-blur-sm border border-gray-200 text-gray-600 hover:text-red-500 hover:bg-white'
                        } ${isToggling ? 'opacity-50 cursor-not-allowed' : ''}`}
                        title={isProductInWishlist ? 'Retirer de la liste de souhaits' : 'Ajouter à la liste de souhaits'}
                    >
                        {isToggling ? (
                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                        ) : isProductInWishlist ? (
                            <HiHeart size={18} className="text-red-500" />
                        ) : (
                            <HiOutlineHeart size={18} />
                        )}
                    </button>
                </div>
            </div>
            
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">{product.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                <div className="flex gap-2 items-center">
                    <span className="text-green-700 font-bold">{parseFloat(product.price).toLocaleString('fr-FR')} FCFA</span>
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
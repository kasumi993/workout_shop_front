import React, { useState } from 'react';
import { HiArrowLeft, HiOutlineShare, HiOutlineHeart, HiHeart } from 'react-icons/hi';
import { useWishlist } from '@/context/WishlistContext';

const ProductDetailTopNav = ({ product }) => {
    const { toggleWishlist, isInWishlist, isLoading: wishlistLoading } = useWishlist();
    const [isToggling, setIsToggling] = useState(false);

    const handleToggleWishlist = async () => {
        if (!product?.id || isToggling || wishlistLoading) return;
        
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

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: product?.title || 'Produit',
                text: product?.description || 'Découvrez ce produit sur Workout Shop',
                url: window.location.href,
            }).catch(err => console.log('Error sharing:', err));
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(window.location.href)
                .then(() => alert('Lien copié dans le presse-papiers!'))
                .catch(err => console.log('Error copying:', err));
        }
    };

    const isProductInWishlist = product?.id ? isInWishlist(product.id) : false;

    return (
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
                <button  
                    onClick={() => window.history.back()} 
                    className="flex items-center text-primary hover:text-gray-800 px-4 py-2 border border-gray-400 rounded-3xl transition duration-200"
                >
                    <HiArrowLeft className="mr-2 text-black" /> Retour
                </button>
                <div className="text-sm text-gray-500">
                    Catégorie / {product?.category?.name || 'Produit'} / <span className="font-semibold text-primary">{product?.title || 'Détails'}</span>
                </div>
            </div>
        
            <div className="flex items-center space-x-4">
                <button 
                    onClick={handleShare}
                    className="text-gray-600 hover:text-gray-800 flex items-center transition duration-200"
                >
                    Partager 
                    <span className="ml-2 border border-gray-400 rounded-[100%] p-2 hover:border-gray-600 transition duration-200">
                        <HiOutlineShare className="text-primary text-xl" />
                    </span>
                </button>
                
                <button 
                    onClick={handleToggleWishlist} 
                    disabled={isToggling || wishlistLoading || !product?.id}
                    className={`text-gray-600 hover:text-gray-800 flex items-center cursor-pointer transition duration-200 ${
                        (isToggling || wishlistLoading) ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                    {isProductInWishlist ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                    <span className={`ml-2 border rounded-[100%] p-2 transition duration-200 ${
                        isProductInWishlist 
                            ? 'border-red-400 bg-red-50' 
                            : 'border-gray-400 hover:border-gray-600'
                    }`}>
                        {isToggling ? (
                            <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                        ) : isProductInWishlist ? (
                            <HiHeart className="text-red-500 text-xl" />
                        ) : (
                            <HiOutlineHeart className="text-primary text-xl" />
                        )}
                    </span>
                </button>
            </div>
        </div>
    );
};

export default ProductDetailTopNav;
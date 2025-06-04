import React, { useState } from 'react';
import { HiArrowLeft, HiOutlineShare, HiOutlineHeart, HiHeart, HiEllipsisVertical } from 'react-icons/hi2';
import { useWishlist } from '@/context/WishlistContext';

const ProductDetailTopNav = ({ product }) => {
    const { toggleWishlist, isInWishlist, isLoading: wishlistLoading } = useWishlist();
    const [isToggling, setIsToggling] = useState(false);
    const [showMobileActions, setShowMobileActions] = useState(false);

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
        setShowMobileActions(false);
    };

    const isProductInWishlist = product?.id ? isInWishlist(product.id) : false;

    return (
        <div className="flex items-center justify-between mb-4 md:mb-6">
            {/* Left side - Back button and breadcrumb */}
            <div className="flex items-center space-x-2 md:space-x-4 flex-1 min-w-0">
                <button  
                    onClick={() => window.history.back()} 
                    className="flex items-center text-primary hover:text-gray-800 px-2 md:px-4 py-2 border border-gray-400 rounded-full md:rounded-3xl transition duration-200 text-sm md:text-base"
                >
                    <HiArrowLeft className="mr-1 md:mr-2 text-black text-sm md:text-base" /> 
                    <span className="hidden sm:inline">Retour</span>
                </button>
                
                {/* Breadcrumb - Hidden on very small screens */}
                <div className="text-xs md:text-sm text-gray-500 truncate hidden sm:block">
                    <span className="hidden md:inline">Catégorie / </span>
                    {product?.category?.name || 'Produit'} / 
                    <span className="font-semibold text-primary ml-1">{product?.title || 'Détails'}</span>
                </div>
            </div>
        
            {/* Right side - Action buttons */}
            <div className="flex items-center space-x-2 md:space-x-4">
                {/* Desktop Actions */}
                <div className="hidden md:flex items-center space-x-4">
                    <button 
                        onClick={handleShare}
                        className="text-gray-600 hover:text-gray-800 flex items-center transition duration-200"
                    >
                        Partager 
                        <span className="ml-2 border border-gray-400 rounded-full p-2 hover:border-gray-600 transition duration-200">
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
                        <span className={`ml-2 border rounded-full p-2 transition duration-200 ${
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

                {/* Mobile Actions - Dropdown */}
                <div className="md:hidden relative">
                    <button
                        onClick={() => setShowMobileActions(!showMobileActions)}
                        className="p-2 border border-gray-400 rounded-full hover:border-gray-600 transition duration-200"
                    >
                        <HiEllipsisVertical className="text-gray-600 text-lg" />
                    </button>

                    {/* Mobile Dropdown Menu */}
                    {showMobileActions && (
                        <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                            <button
                                onClick={handleToggleWishlist}
                                disabled={isToggling || wishlistLoading || !product?.id}
                                className={`w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-gray-50 transition duration-200 ${
                                    (isToggling || wishlistLoading) ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            >
                                {isToggling ? (
                                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                                ) : isProductInWishlist ? (
                                    <HiHeart className="text-red-500 text-lg" />
                                ) : (
                                    <HiOutlineHeart className="text-gray-600 text-lg" />
                                )}
                                <span className="text-sm">
                                    {isProductInWishlist ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                                </span>
                            </button>
                            
                            <button
                                onClick={handleShare}
                                className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-gray-50 transition duration-200 border-t border-gray-100"
                            >
                                <HiOutlineShare className="text-gray-600 text-lg" />
                                <span className="text-sm">Partager</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetailTopNav;
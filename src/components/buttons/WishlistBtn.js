import { useState } from 'react';
import { HiOutlineHeart, HiHeart } from 'react-icons/hi2';
import { useWishlist } from '@/context/WishlistContext';

const WishlistBtn = ({ 
  productId, 
  className = '',
  iconClassName = '',
  showText = false,
  size = 'md',
  variant = 'default'
}) => {
  const { toggleWishlist, isInWishlist, isLoading: wishlistLoading } = useWishlist();
  const [isToggling, setIsToggling] = useState(false);

  const handleToggleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isToggling || wishlistLoading || !productId) return;
    
    setIsToggling(true);
    try {
      const added = await toggleWishlist(productId);
      console.log(added ? `Product ${productId} added to wishlist` : `Product ${productId} removed from wishlist`);
    } catch (error) {
      console.error('Failed to toggle wishlist:', error);
    } finally {
      setIsToggling(false);
    }
  };

  const isProductInWishlist = isInWishlist(productId);

  // Size configurations
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-12 h-12'
  };

  const iconSizes = {
    sm: 14,
    md: 18,
    lg: 22,
    xl: 26
  };

  // Variant configurations
  const variantClasses = {
    default: isProductInWishlist 
      ? 'bg-red-50 border border-red-200 text-red-600 hover:bg-red-100' 
      : 'bg-white/90 backdrop-blur-sm border border-gray-200 text-gray-600 hover:text-red-500 hover:bg-white',
    solid: isProductInWishlist
      ? 'bg-red-500 text-white hover:bg-red-600'
      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-red-500',
    minimal: isProductInWishlist
      ? 'text-red-500 hover:text-red-600'
      : 'text-gray-400 hover:text-red-500'
  };

  const baseClasses = `
    ${sizeClasses[size]} 
    ${variantClasses[variant]}
    rounded-full flex items-center justify-center transition duration-300 cursor-pointer
    ${isToggling ? 'opacity-50 cursor-not-allowed' : ''}
    ${className}
  `;

  const iconClass = `${iconClassName}`;

  return (
    <button
      onClick={handleToggleWishlist}
      disabled={isToggling || wishlistLoading || !productId}
      className={baseClasses}
      title={isProductInWishlist ? 'Retirer de la liste de souhaits' : 'Ajouter à la liste de souhaits'}
    >
      {showText ? (
        <div className="flex items-center gap-2">
          {isToggling ? (
            <div className={`border-2 border-current border-t-transparent rounded-full animate-spin`} 
                 style={{ width: iconSizes[size], height: iconSizes[size] }}></div>
          ) : isProductInWishlist ? (
            <HiHeart size={iconSizes[size]} className={`text-red-500 ${iconClass}`} />
          ) : (
            <HiOutlineHeart size={iconSizes[size]} className={iconClass} />
          )}
          <span className="text-sm font-medium">
            {isProductInWishlist ? 'Dans la liste' : 'Ajouter'}
          </span>
        </div>
      ) : (
        isToggling ? (
          <div className={`border-2 border-current border-t-transparent rounded-full animate-spin`} 
               style={{ width: iconSizes[size] - 4, height: iconSizes[size] - 4 }}></div>
        ) : isProductInWishlist ? (
          <HiHeart size={iconSizes[size]} className={`text-red-500 ${iconClass}`} />
        ) : (
          <HiOutlineHeart size={iconSizes[size]} className={iconClass} />
        )
      )}
    </button>
  );
};

export default WishlistBtn;
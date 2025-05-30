import React, { useState } from 'react';
import { HiArrowLeft, HiOutlineShare, HiOutlineHeart, HiHeart } from 'react-icons/hi';

const ProductDetailTopNav = () => {
    const [isWishlist, setIsWishlist] = useState(false);

    return (
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
                <button  onClick={() => window.history.back()} className="flex items-center text-primary hover:text-gray-800 px-4 py-2 border border-gray-400 rounded-3xl">
                    <HiArrowLeft className="mr-2 text-black" /> Retour
                </button>
                <div className="text-sm text-gray-500">
                    Catégorie / Haltères / <span className="font-semibold text-primary">10kg</span>
                </div>
            </div>
        
            <div className="flex items-center space-x-4">
                <button className="text-gray-600 hover:text-gray-800 flex items-center">
                    Partager <span className="ml-2 border border-gray-400 rounded-[100%] p-2">
                        <HiOutlineShare className="text-primary text-xl" />
                    </span>
                </button>
                <button onClick={() => setIsWishlist(!isWishlist)} className="text-gray-600 hover:text-gray-800 flex items-center cursor-pointer">
                    Ajouter aux favoris <span className="ml-2 border border-gray-400 rounded-[100%] p-2">
                        {isWishlist ? (
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
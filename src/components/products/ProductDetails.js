import { FaStar } from "react-icons/fa";
import ProductOptions from "./ProductOptions";
import AddToCartBtn from "../buttons/AddToCartBtn";
import { HiOutlineClock, HiOutlineShieldCheck, HiOutlineTruck } from "react-icons/hi";
import { useState } from "react";
import BuyNowBtn from "../buttons/BuyNowBtn";

export default function ProductDetails({ product, selectedProperties, handlePropertyChange, reviews = [] }) {
    const [quantity, setQuantity] = useState(1);

    // Calculate reviews statistics
    const reviewsCount = reviews.length;
    const averageRating = reviewsCount > 0 
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviewsCount
        : 0;

    // Helper function to render stars
    const renderStars = (rating, size = "sm") => {
        return [...Array(5)].map((_, i) => (
            <FaStar 
                key={i} 
                className={`${size === 'sm' ? 'text-sm' : 'text-base'} ${
                    i < Math.floor(rating) ? 'text-yellow-500' : 
                    i === Math.floor(rating) && rating % 1 >= 0.5 ? 'text-yellow-400' : 'text-gray-300'
                }`} 
            />
        ));
    };

    return (
        <div className="w-full">
            {/* Product Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-900 mb-3 sm:mb-4 leading-tight">
                {product.title}
            </h1>
            
            {/* Rating - Only show if there are reviews */}
            {reviewsCount > 0 && (
                <div className="flex items-center mb-4 sm:mb-6">
                    <div className="flex items-center text-yellow-500 text-sm sm:text-base">
                        {renderStars(averageRating)}
                        <span className="text-gray-500 ml-2 text-sm sm:text-base">
                            {averageRating.toFixed(1)} ({reviewsCount} avis)
                        </span>
                    </div>
                </div>
            )}

            {/* Price */}
            <div className="flex flex-wrap gap-2 items-center mb-4 sm:mb-6">
                <span className="text-green-700 font-bold text-xl sm:text-2xl lg:text-3xl">
                    {parseFloat(product.price).toLocaleString('fr-FR')} FCFA
                </span>
                {product.originalPrice && (
                    <>
                        <span className="text-sm sm:text-base text-gray-500 font-light">
                            (-{Math.round((1 - product.price / product.originalPrice) * 100)}%)
                        </span>
                        <span className="text-sm sm:text-base text-gray-500 font-light line-through">
                            {parseFloat(product.originalPrice).toLocaleString('fr-FR')} FCFA
                        </span>
                    </>
                )}
            </div>

            {/* Description */}
            <p className="text-gray-500 text-base sm:text-lg lg:text-xl font-light mb-6 sm:mb-8 leading-relaxed">
                {product.description}
            </p>

            {/* Product Options */}
            <div className="mb-6 sm:mb-8">
                <ProductOptions 
                    product={product} 
                    selectedProperties={selectedProperties} 
                    handlePropertyChange={handlePropertyChange} 
                />
            </div>

            {/* Quantity Selector */}
            <div className="mb-6 sm:mb-8">
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-3">
                    Quantité
                </label>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-md border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition duration-200 text-lg sm:text-xl font-medium"
                        disabled={quantity <= 1}
                    >
                        -
                    </button>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-16 sm:w-20 text-center border border-gray-300 rounded-md py-2 sm:py-3 text-sm sm:text-base font-medium"
                        min="1"
                    />
                    <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-md border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition duration-200 text-lg sm:text-xl font-medium"
                    >
                        +
                    </button>
                </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
                <AddToCartBtn 
                    className="flex-1 justify-center py-3 sm:py-4 text-sm sm:text-base font-medium" 
                    iconClass="text-lg sm:text-xl"
                    productId={product.id}
                />
                <BuyNowBtn 
                    className="flex-1 justify-center py-3 sm:py-4 text-sm sm:text-base font-medium" 
                    productId={product.id} 
                    quantity={quantity} 
                    selectedProperties={selectedProperties}
                />
            </div>

            {/* Delivery Info */}
            <div className="space-y-3 mb-6 sm:mb-8">
                <div className="flex items-start gap-3 text-gray-700 text-sm sm:text-base">
                    <HiOutlineClock className="text-primary text-lg sm:text-xl mt-0.5 flex-shrink-0" /> 
                    <span>Livré sous 1 ou 2 jours à Dakar 🇸🇳</span>
                </div>
                
                <div className="flex items-start gap-3 text-gray-400 text-xs sm:text-sm leading-relaxed">
                    <span className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0"></span>
                    <span>Veuillez nous contacter avant de passer commande si vous habitez hors de Dakar.</span>
                </div>
            </div>

            {/* Feature Cards */}
            <div className="space-y-4 p-4 sm:p-6 bg-gray-50 rounded-lg">
                <div className="flex items-start gap-3 sm:gap-4">
                    <HiOutlineTruck className="text-green-600 text-xl sm:text-2xl mt-0.5 flex-shrink-0" />
                    <div className="min-w-0">
                        <p className="font-medium text-gray-800 text-sm sm:text-base">Livraison rapide</p>
                        <p className="text-xs sm:text-sm text-gray-600">Livré en 1-2 jours à Dakar</p>
                    </div>
                </div>
                
                <div className="flex items-start gap-3 sm:gap-4">
                    <HiOutlineShieldCheck className="text-green-600 text-xl sm:text-2xl mt-0.5 flex-shrink-0" />
                    <div className="min-w-0">
                        <p className="font-medium text-gray-800 text-sm sm:text-base">Qualité garantie</p>
                        <p className="text-xs sm:text-sm text-gray-600">30 jours de garantie</p>
                    </div>
                </div>
                
                <div className="flex items-start gap-3 sm:gap-4">
                    <HiOutlineClock className="text-green-600 text-xl sm:text-2xl mt-0.5 flex-shrink-0" />
                    <div className="min-w-0">
                        <p className="font-medium text-gray-800 text-sm sm:text-base">Support client</p>
                        <p className="text-xs sm:text-sm text-gray-600">Réponse rapide sur WhatsApp</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

 
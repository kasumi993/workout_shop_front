import { FaStar } from "react-icons/fa";
import ProductOptions from "./ProductOptions";
import AddToCartBtn from "../buttons/AddToCartBtn";
import { HiOutlineClock, HiOutlineShieldCheck, HiOutlineTruck } from "react-icons/hi";
import { useState } from "react";
import BuyNowBtn from "../buttons/BuyNowBtn";


export default function ProductDetails({ product, selectedProperties, handlePropertyChange }) {
    const [quantity, setQuantity] = useState(1);

    return (
        <div className="col-span-1 md:col-span-1">
            <h1 className="text-4xl font-light text-gray-900 mb-2">{product.title}</h1>
             {/* Rating */}
            <div className="flex items-center text-yellow-500 text-sm">
                {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < 4 ? '' : 'text-gray-300'} />
                ))}
                <span className="text-gray-500 ml-1">(127 avis)</span>
            </div>

            {/* Price */}
            <div className="flex gap-2 items-center mb-4 mt-5">
                <span className="text-green-700 font-bold text-2xl">{product.price} FCFA</span>
                <span  className="text-sm text-gray-500 font-light" >( -25 %)</span>
                <span className="text-sm text-gray-500 font-light line-through">{product.price} FCFA</span>
            </div>

            {/* Description */}
            <p className="text-gray-500 text-xl font-light mb-8 mt-8">{product.description}</p>
           

            {/* Product Options */}
            <ProductOptions product={product} selectedProperties={selectedProperties} handlePropertyChange={handlePropertyChange} />

            {/* Quantity Selector */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantité
                </label>
                <div className="flex items-center gap-3">
                <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-md border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                >
                    -
                </button>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 text-center border border-gray-300 rounded-md py-2"
                />
                <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-md border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                >
                    +
                </button>
                </div>
            </div>
            
            {/* Add to Cart Button */}
            <div className="flex mb-4 gap-3">
                <AddToCartBtn className="flex-1 justify-center py-4" productId={product.id}/>
                <BuyNowBtn className="flex-1 justify-center py-4" productId={product.id} quantity={quantity} selectedProperties={selectedProperties}/>
            </div>

            {/* Delivery Info */}
            <div className="flex text-gray-700 text-sm mt-2">
                <HiOutlineClock className="mr-2 text-primary text-xl" /> Livré sous 1 ou 2 jours à Dakar 🇸🇳
            </div>
            
            <div className="flex items-center text-gray-400 text-sm mt-2">
                Veuillez nous contacter avant de passer commande si vous habitez hors de dakar.
            </div>

            {/* Shipping Info */}
            <div className="mt-10 space-y-3 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start gap-3">
                <HiOutlineTruck className="text-green-600 text-xl mt-0.5" />
                <div>
                    <p className="font-medium text-gray-800">Livraison rapide</p>
                    <p className="text-sm text-gray-600">Livré en 1-2 jours à Dakar</p>
                </div>
                </div>
                <div className="flex items-start gap-3">
                <HiOutlineShieldCheck className="text-green-600 text-xl mt-0.5" />
                <div>
                    <p className="font-medium text-gray-800">Qualité garantie</p>
                    <p className="text-sm text-gray-600">30 jours de garantie</p>
                </div>
                </div>
                <div className="flex items-start gap-3">
                <HiOutlineClock className="text-green-600 text-xl mt-0.5" />
                <div>
                    <p className="font-medium text-gray-800">Support client</p>
                    <p className="text-sm text-gray-600">Réponse rapide sur WhatsApp</p>
                </div>
                </div>
            </div>
        </div>
    )
}
import { FaStar } from "react-icons/fa";
import ProductOptions from "./ProductOptions";
import AddToCartBtn from "../buttons/AddToCartBtn";
import { HiOutlineClock } from "react-icons/hi";

export default function ProductDetails({ product }) {
    return (
        <div className="col-span-1 md:col-span-1">
            <h1 className="text-4xl font-light text-gray-900 mb-2">{product.title}</h1>
            <div className="flex items-center text-yellow-500 text-sm">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar className="text-gray-300" />
                <span className="text-gray-500 ml-1">(4.0)</span>
            </div>

            <div className="flex gap-2 items-center mb-4 mt-5">
                <span className="text-green-700 font-bold text-2xl">{product.price} FCFA</span>
                <span  className="text-sm text-gray-500 font-light" >( -25 %)</span>
                <span className="text-sm text-gray-500 font-light line-through">{product.price} FCFA</span>
            </div>
            <p className="text-gray-500 text-xl font-light mb-8 mt-8">{product.description}</p>
            <ProductOptions product={product} />
            
            <div className="flex mb-4 gap-3">
                <AddToCartBtn className="w-full justify-center py-4" />
            </div>
            <div className="flex text-gray-700 text-sm mt-2">
                <HiOutlineClock className="mr-2 text-primary text-xl" /> Livré sous 1 ou 2 jours à Dakar 🇸🇳
            </div>
            
            <div className="flex items-center text-gray-400 text-sm">
                Veuillez nous contacter avant de passer commande si vous habitez hors de dakar.
            </div>
        </div>
    )
}
import Image from "next/image";
import Link from "next/link";
import { HiOutlineTrash } from "react-icons/hi2";

export default function CartItem({ item, updateQuantity, removeProduct }) {
  const formatProperties = (properties) => {
    if (!properties || Object.keys(properties).length === 0) return null;
    
    return Object.entries(properties).map(([key, value]) => (
      <span key={key} className="text-xs sm:text-sm text-gray-500">
        {key}: <span className="font-medium">{value}</span>
      </span>
    ));
  };

  return (
    <div className="border-b last:border-b-0">
      <div className="p-3 sm:p-4 md:p-6">
        <div className="flex gap-3 sm:gap-4">
          {/* Product Image */}
          <Link href={`/product/detail/${item.id}`} className="flex-shrink-0">
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 relative">
              <Image
                src={item.images?.[0] || '/images/noimage.png'}
                alt={item.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </Link>
          
          {/* Product Info */}
          <div className="flex-grow min-w-0">
            <Link href={`/product/detail/${item.id}`}>
              <h3 className="font-semibold text-gray-800 hover:text-primary transition-colors cursor-pointer text-sm sm:text-base md:text-lg line-clamp-2">
                {item.title}
              </h3>
            </Link>
            
            {/* Selected Properties */}
            <div className="flex flex-wrap gap-1 sm:gap-2 mt-1">
              {formatProperties(item.selectedProperties)}
            </div>
            
            <p className="text-gray-500 text-xs sm:text-sm mt-1 line-clamp-2 hidden sm:block">{item.description}</p>
            
            {/* Mobile Price Display */}
            <div className="sm:hidden mt-2">
              <span className="font-bold text-base text-gray-900">
                {(item.quantity * parseFloat(item.price)).toLocaleString('fr-FR')} FCFA
              </span>
            </div>
            
            <div className="flex items-center justify-between mt-3 sm:mt-4">
              {/* Quantity Controls */}
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedProperties)}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition duration-200 text-sm sm:text-base"
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span className="font-medium w-6 sm:w-8 text-center text-sm sm:text-base">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedProperties)}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition duration-200 text-sm sm:text-base"
                >
                  +
                </button>
              </div>
              
              {/* Desktop Price and Remove */}
              <div className="hidden sm:flex items-center gap-3 md:gap-4">
                <span className="font-bold text-lg md:text-xl text-gray-900">
                  {(item.quantity * parseFloat(item.price)).toLocaleString('fr-FR')} FCFA
                </span>
                <button
                  onClick={() => removeProduct(item.id, item.selectedProperties)}
                  className="text-red-500 hover:text-red-700 transition duration-200 p-2"
                  title="Retirer du panier"
                >
                  <HiOutlineTrash className="text-lg md:text-xl" />
                </button>
              </div>
              
              {/* Mobile Remove Button */}
              <button
                onClick={() => removeProduct(item.id, item.selectedProperties)}
                className="sm:hidden text-red-500 hover:text-red-700 transition duration-200 p-2"
                title="Retirer du panier"
              >
                <HiOutlineTrash className="text-lg" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
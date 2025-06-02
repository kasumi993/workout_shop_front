import { useWishlist } from '@/context/WishlistContext';
import MainLayout from "@/layouts/MainLayout";
import Link from 'next/link';
import Image from 'next/image';
import { HiOutlineHeart, HiOutlineShoppingCart, HiOutlineTrash, HiOutlineSparkles } from 'react-icons/hi2';
import { useContext } from 'react';
import { CartContext } from '@/context/CartContext';
import LoadingSpinner from '@/components/globalComponents/LoadingSpinner';
import AddToCartBtn from '@/components/buttons/AddToCartBtn';

export default function WishlistPage() {
    const { wishlistItems, removeFromWishlist, clearWishlist, isLoading } = useWishlist();
    const { addProduct } = useContext(CartContext);

    const handleAddToCart = async (productId) => {
        try {
            removeFromWishlist(productId);
        } catch (error) {
            console.error('Failed to add to cart:', error);
        }
    };

    const handleMoveAllToCart = async () => {
        try {
            for (const item of wishlistItems) {
                await addProduct(item.id);
            }
            clearWishlist();
        } catch (error) {
            console.error('Failed to move all to cart:', error);
        }
    };

    if (isLoading) {
        return (
            <MainLayout>
                <LoadingSpinner />
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <HiOutlineHeart className="text-3xl text-red-500" />
                            <h1 className="text-3xl font-bold text-gray-800">Ma Liste de Souhaits</h1>
                        </div>
                        <p className="text-gray-600">
                            Retrouvez tous vos produits favoris en un seul endroit
                        </p>
                    </div>

                    {wishlistItems.length === 0 ? (
                        /* Empty State */
                        <div className="bg-white rounded-lg shadow p-12 text-center">
                            <div className="w-24 h-24 mx-auto mb-6 relative">
                                <HiOutlineSparkles className="text-gray-300 text-6xl mx-auto" />
                                <HiOutlineHeart className="text-gray-300 text-4xl absolute bottom-0 right-0" />
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-600 mb-2">
                                Votre liste de souhaits est vide
                            </h2>
                            <p className="text-gray-500 mb-6 max-w-md mx-auto">
                                Découvrez nos produits et cliquez sur le cœur pour ajouter vos favoris à votre liste de souhaits!
                            </p>
                            <Link 
                                href="/products" 
                                className="inline-block bg-gray-900 text-white px-6 py-3 rounded-md hover:bg-gray-800 transition duration-300"
                            >
                                Découvrir nos produits
                            </Link>
                        </div>
                    ) : (
                        <>
                            {/* Wishlist Actions */}
                            <div className="bg-white rounded-lg shadow p-4 mb-6">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                    <div className="flex items-center gap-4">
                                        <span className="text-gray-600">
                                            <strong>{wishlistItems.length}</strong> produit{wishlistItems.length > 1 ? 's' : ''} dans votre liste
                                        </span>
                                        <button
                                            onClick={clearWishlist}
                                            className="text-gray-500 hover:text-red-500 text-sm flex items-center gap-1 transition duration-200"
                                        >
                                            <HiOutlineTrash className="text-sm" />
                                            Vider la liste
                                        </button>
                                    </div>
                                    <button
                                        onClick={handleMoveAllToCart}
                                        className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition duration-300"
                                    >
                                        <HiOutlineShoppingCart />
                                        Tout ajouter au panier
                                    </button>
                                </div>
                            </div>

                            {/* Wishlist Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {wishlistItems.map((product) => (
                                    <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 group">
                                        {/* Product Image */}
                                        <div className="relative aspect-square overflow-hidden">
                                            <Link href={`/product/detail/${product.id}`}>
                                                <Image
                                                    src={product.images?.[0] || '/images/noimage.png'}
                                                    alt={product.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition duration-300"
                                                />
                                            </Link>
                                            
                                            {/* Remove from wishlist button */}
                                            <button
                                                onClick={() => removeFromWishlist(product.id)}
                                                className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-red-500 hover:bg-white hover:text-red-600 transition duration-200 opacity-0 group-hover:opacity-100"
                                                title="Retirer de la liste de souhaits"
                                            >
                                                <HiOutlineTrash className="text-sm" />
                                            </button>

                                            {/* Quick add to cart on hover */}
                                            <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition duration-200">
                                                <AddToCartBtn className={'w-full justify-center items-center py-2 px-3 text-sm'} iconClass={'text-lg'} productId={product.id} onAddToCart={handleAddToCart} />
                                            </div>
                                        </div>

                                        {/* Product Info */}
                                        <div className="p-4">
                                            <Link href={`/product/detail/${product.id}`}>
                                                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 hover:text-primary transition-colors cursor-pointer">
                                                    {product.title}
                                                </h3>
                                            </Link>
                                            
                                            <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                                                {product.description}
                                            </p>
                                            
                                            {/* Price */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex gap-2 items-center">
                                                    <span className="text-green-700 font-bold text-lg">
                                                        {parseFloat(product.price).toLocaleString('fr-FR')} FCFA
                                                    </span>
                                                    {product.originalPrice && (
                                                        <span className="text-xs text-gray-500 line-through">
                                                            {parseFloat(product.originalPrice).toLocaleString('fr-FR')} FCFA
                                                        </span>
                                                    )}
                                                </div>
                                                
                                                {/* Heart indicator */}
                                                <HiOutlineHeart className="text-red-500 text-xl" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Continue Shopping */}
                            <div className="mt-8 text-center">
                                <Link 
                                    href="/products" 
                                    className="inline-block text-gray-600 hover:text-gray-800 border border-gray-300 hover:border-gray-400 px-6 py-3 rounded-md transition duration-300"
                                >
                                    Continuer mes achats
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
import Image from 'next/image';
import { FaHeart } from 'react-icons/fa';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import ProductCard from './ProductCard';



export default function RelatedProducts({ product }) {

    const products = [
        {
            id: 1,
            name: 'Haltères 10kg',
            price: 29.99,
            image: '/images/weights.jpg',
            rating: 4.5,
            reviews: 120,
        },
        {
            id: 2,
            name: 'Tapis de Yoga',
            price: 19.99,
            image: '/images/yoga-mat.jpg',
            rating: 4.8,
            reviews: 200,
        },
        {
            id: 3,
            name: 'Bouteille d\'Eau Isotherme',
            price: 14.99,
            image: '/images/water-bottle.jpg',
            rating: 4.7,
            reviews: 150,
        },
        {
            id: 4,
            name: 'Corde à Sauter',
            price: 9.99,
            image: '/images/jump-rope.jpg',
            rating: 4.6,
            reviews: 180,
        },
    ]


    return (
        <div className="py-8 mt-12">
            <div className="container mx-auto px-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Autres Produits</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
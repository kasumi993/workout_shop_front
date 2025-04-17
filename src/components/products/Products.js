import { CartContext } from '@/context/CartContext';
import { useContext, useState } from 'react';
import Button from '@/components/globalComponents/Button';
import { CloseSvg } from '@/components/globalComponents/CloseSvg';
import Img from '@/components/globalComponents/Img';
import Input from '@/components/globalComponents/Input';
import { HiOutlineFunnel, HiOutlineMagnifyingGlass } from 'react-icons/hi2';

export default function Products({ products }) {
  const { addProduct } = useContext(CartContext);
  const [searchValue, setSearchValue] = useState("");

  return (
    <section id="products" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-15 mt-5">
          <h2 className="text-5xl font-bold text-gray-800 mb-2">Nos Produits Exclusifs</h2>
          <p className="mt-5 font-light text-xl text-gray-600 mx-auto">
          Plus d’excuses, le sport s’invite chez vous. Commandez dès maintenant.
          </p>
        </div>

        <div className="mb-25 flex items-end justify-center gap-6">
          <Button className="px-5 py-4 rounded-lg bg-black text-white cursor-pointer">
            Tous les produits
          </Button>

        <div className='w-[60%]'>
          <Input
              name="SearchBar"
              placeholder={`Chercher...`}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              suffix={
                searchValue.length > 0 ? (
                  <CloseSvg
                    onClick={() => setSearchValue("")}
                    height={24}
                    width={24}
                    fillColor="#000000ff"
                  />
                ) : (
                  <HiOutlineMagnifyingGlass/>
                )
              }
              className="h-[54px] justify-center rounded-lg border border-solid border-gray-300 text-[21px]"
            />
        </div>

          <Button
            leftIcon={
              <HiOutlineFunnel/>
            }
            className="flex h-[50px] min-w-[114px] flex-row items-center justify-center gap-0.5 rounded-lg bg-gray-100 px-5 text-center font-inter text-[18px] font-medium text-black_900"
          >
            Filtres
          </Button>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md transition duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg">
              <div className="relative overflow-hidden">
                <Img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
                {product.badge && (
                  <div className={`absolute top-2 right-2 text-white text-xs font-bold px-2 py-1 rounded-full ${product.badge.color}`}>
                    {product.badge.text}
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-600 font-bold">{product.price} FCFA</span>
                  <button 
                    onClick={() => addProduct(product)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition duration-300"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-block border-2 border-blue-500 text-blue-500 font-bold py-2 px-6 rounded hover:bg-blue-500 hover:text-white transition duration-300"
          >
            View All Products
          </a>
        </div>
      </div>
    </section>
  );
}
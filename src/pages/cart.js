import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/context/CartContext";
import axios from "axios";
import Header from "@/components/header/Header";

export default function CartPage() {
  const { cartProducts, addProduct, removeProduct, clearCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [country, setCountry] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post('/api/cart', { ids: cartProducts })
        .then(response => {
          setProducts(response.data);
        })
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    if (window?.location.href.includes('success')) {
      setIsSuccess(true);
      clearCart();
    }
  }, []);

  function moreOfThisProduct(id) {
    addProduct(id);
  }

  function lessOfThisProduct(id) {
    removeProduct(id);
  }

  async function goToPayment() {
    const response = await axios.post('/api/checkout', {
      name, email, city, postalCode, streetAddress, country,
      cartProducts,
    });
    if (response.data.url) {
      window.location = response.data.url;
    }
  }

  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find(p => p.id === productId)?.price || 0;
    total += price;
  }

  if (isSuccess) {
    return (
      <>
        <Header />
        {/* Center implementation directly */}
        <div className="max-w-[800px] mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-10 mt-10">
            <div className="bg-white rounded-lg p-8">
              <h1 className="text-2xl font-bold">Thanks for your order!</h1>
              <p className="mt-2">We will email you when your order will be sent.</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      {/* Center implementation directly */}
      <div className="max-w-[800px] mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-10 mt-10">
          <div className="bg-white rounded-lg p-8">
            <h2 className="text-xl font-bold mb-4">Cart</h2>
            {!cartProducts?.length && (
              <div>Your cart is empty</div>
            )}
            {products?.length > 0 && (
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left pb-2">Product</th>
                    <th className="text-left pb-2">Quantity</th>
                    <th className="text-left pb-2">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.id} className="border-b">
                      <td className="py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-[70px] h-[100px] p-1 border border-gray-200 rounded-lg flex items-center justify-center md:w-[100px] md:p-2">
                            <img 
                              src={product.images[0]} 
                              alt="" 
                              className="max-w-[60px] max-h-[60px] md:max-w-[80px] md:max-h-[80px]"
                            />
                          </div>
                          {product.title}
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          {/* Button implementation directly */}
                          <button 
                            onClick={() => lessOfThisProduct(product.id)}
                            className="border-0 py-1 px-3 rounded cursor-pointer inline-flex items-center no-underline font-medium font-roboto bg-black text-white"
                          >
                            -
                          </button>
                          <span className="block md:inline-block px-4 md:px-2">
                            {cartProducts.filter(id => id === product.id).length}
                          </span>
                          <button 
                            onClick={() => moreOfThisProduct(product.id)}
                            className="border-0 py-1 px-3 rounded cursor-pointer inline-flex items-center no-underline font-medium font-roboto bg-black text-white"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-4">
                        ${cartProducts.filter(id => id === product.id).length * product.price}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td className="pt-4"></td>
                    <td className="pt-4"></td>
                    <td className="pt-4 font-bold">${total}</td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>

          {!!cartProducts?.length && (
            <div className="bg-white rounded-lg p-8">
              <h2 className="text-xl font-bold mb-4">Order information</h2>
              <input
                type="text"
                placeholder="Name"
                value={name}
                name="name"
                onChange={ev => setName(ev.target.value)}
                className="w-full mb-4 p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Email"
                value={email}
                name="email"
                onChange={ev => setEmail(ev.target.value)}
                className="w-full mb-4 p-2 border rounded"
              />
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  name="city"
                  onChange={ev => setCity(ev.target.value)}
                  className="flex-1 p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Postal Code"
                  value={postalCode}
                  name="postalCode"
                  onChange={ev => setPostalCode(ev.target.value)}
                  className="flex-1 p-2 border rounded"
                />
              </div>
              <input
                type="text"
                placeholder="Street Address"
                value={streetAddress}
                name="streetAddress"
                onChange={ev => setStreetAddress(ev.target.value)}
                className="w-full mb-4 p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Country"
                value={country}
                name="country"
                onChange={ev => setCountry(ev.target.value)}
                className="w-full mb-4 p-2 border rounded"
              />
              {/* Button implementation directly with black and block properties */}
              <button 
                onClick={goToPayment}
                className="w-full border-0 py-1 px-3 rounded cursor-pointer flex items-center justify-center no-underline font-medium font-roboto bg-black text-white mt-4"
              >
                Continue to payment
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
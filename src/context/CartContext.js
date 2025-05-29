import {createContext, useEffect, useState} from "react";

export const CartContext = createContext({});

export function CartContextProvider({children}) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    if (cartItems?.length > 0) {
      ls?.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems, ls]);
  useEffect(() => {
    if (ls && ls.getItem('cart')) {
      setCartItems(JSON.parse(ls.getItem('cart')));
    }
  }, []);
  function addProduct(productId, delta = 1) {
    setCartItems(prev => {
      const itemExists = prev.some(item => item.id === productId);

      if (itemExists) {
        return prev
          .map(item =>
            item.id === productId
              ? { ...item, quantity: Math.max(0, item.quantity + delta) }
              : item
          )
          .filter(item => item.quantity > 0);
      } else {
        return [...prev, { id: productId, quantity: Math.max(0, delta) }];
      }
    });
  }

  function removeProduct(productId) {
    setCartItems(prev => {
      const pos = prev.indexOf(productId);
      if (pos !== -1) {
        return prev.filter((value,index) => index !== pos);
      }
      return prev;
    });
  }
  function clearCart() {
    setCartItems([]);
  }
  
  return (
    <CartContext.Provider value={{cartItems, setCartItems, addProduct, removeProduct, clearCart}}>
      {children}
    </CartContext.Provider>
  );
}
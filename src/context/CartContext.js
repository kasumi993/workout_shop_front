import { createContext, use, useCallback, useEffect, useState } from "react";
import productsService from "@/services/productsService";

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const setLocalStorage = useCallback((cartItems) => {
    if (!ls) return;
    ls.setItem('cart', JSON.stringify(cartItems));
  }, [ls]);

  const deleteLocalStorage = useCallback(() => {
    ls?.removeItem('cart');
  }, [ls]);

  const getLocalStorage = useCallback(() => {
    return ls?.getItem('cart');
  }, [ls]);

  // Load cart from localStorage on mount
  useEffect(() => {
    if (getLocalStorage()) {
      const savedCart = JSON.parse(ls.getItem('cart'));
      loadCartWithProductData(savedCart);
    }
  }, [getLocalStorage, ls]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cartItems?.length > 0) {
      // Save only essential data to localStorage
      const cartToSave = cartItems.map(item => ({
        id: item.id,
        quantity: item.quantity,
        selectedProperties: item.selectedProperties
      }));
      setLocalStorage(cartToSave);
    } else {
      deleteLocalStorage();
    }
  }, [cartItems, deleteLocalStorage, setLocalStorage]);

  // Load cart items with full product data
  const loadCartWithProductData = async (savedCart) => {
    setIsLoading(true);
    try {
      const itemsWithData = await Promise.all(
        savedCart.map(async (item) => {
          try {
            const product = await productsService.getProductById(item.id);
            return {
              ...product,
              quantity: item.quantity,
              selectedProperties: item.selectedProperties || {}
            };
          } catch (error) {
            console.error(`Failed to load product ${item.id}:`, error);
            return null;
          }
        })
      );
      // Filter out any null items (failed to load)
      setCartItems(itemsWithData.filter(item => item !== null));
    } catch (error) {
      console.error('Failed to load cart data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Add product to cart with selected properties
  async function addProduct(productId, quantity = 1, selectedProperties = {}) {
    setIsLoading(true);
    try {
      // Check if item already exists with same properties
      const existingItemIndex = cartItems.findIndex(item => 
        item.id === productId && 
        JSON.stringify(item.selectedProperties) === JSON.stringify(selectedProperties)
      );

      if (existingItemIndex !== -1) {
        // Update quantity of existing item
        const updatedItems = [...cartItems];
        updatedItems[existingItemIndex].quantity += quantity;
        setCartItems(updatedItems);
      } else {
        // Add new item
        const product = await productsService.getProductById(productId);
        const newItem = {
          ...product,
          quantity,
          selectedProperties
        };
        setCartItems(prev => [...prev, newItem]);
      }
    } catch (error) {
      console.error('Failed to add product to cart:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  // Update quantity for a specific cart item
  function updateQuantity(productId, quantity, selectedProperties = {}) {
    setCartItems(prev => {
      return prev.map(item => {
        if (item.id === productId && 
            JSON.stringify(item.selectedProperties) === JSON.stringify(selectedProperties)) {
          return { ...item, quantity: Math.max(0, quantity) };
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  }

  // Remove product from cart
  function removeProduct(productId, selectedProperties = {}) {
    setCartItems(prev => {
      return prev.filter(item => !(
        item.id === productId && 
        JSON.stringify(item.selectedProperties) === JSON.stringify(selectedProperties)
      ));
    });
  }

  // Clear entire cart
  function clearCart() {
    setCartItems([]);
    ls?.removeItem('cart');
  }

  // Get cart totals
  function getCartTotals() {
    const subtotal = cartItems.reduce((sum, item) => 
      sum + (parseFloat(item.price) * item.quantity), 0
    );
    const deliveryFee = subtotal > 50000 ? 0 : 2500;
    const total = subtotal + deliveryFee;
    
    return {
      subtotal,
      deliveryFee,
      total,
      itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0)
    };
  }

  return (
    <CartContext.Provider value={{
      cartItems,
      setCartItems,
      addProduct,
      updateQuantity,
      removeProduct,
      clearCart,
      getCartTotals,
      isLoading
    }}>
      {children}
    </CartContext.Provider>
  );
}
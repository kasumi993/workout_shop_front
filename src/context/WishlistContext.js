import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import productsService from '@/services/productsService';

const WishlistContext = createContext({});

export function WishlistContextProvider({ children }) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const setLocalStorage = useCallback((items) => {
    if (!ls) return;
    ls.setItem('wishlist', JSON.stringify(items));
  }, [ls]);

  const deleteLocalStorage = useCallback(() => {
    ls?.removeItem('wishlist');
  }, [ls]);

  const getLocalStorage = useCallback(() => {
    return ls?.getItem('wishlist');
  }, [ls]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    if (getLocalStorage()) {
      const savedWishlist = JSON.parse(ls.getItem('wishlist'));
      loadWishlistWithProductData(savedWishlist);
    }
  }, [getLocalStorage, ls]);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (wishlistItems?.length > 0) {
      // Save only product IDs to localStorage
      const wishlistToSave = wishlistItems.map(item => item.id);
      setLocalStorage(wishlistToSave);
    } else {
      deleteLocalStorage();
    }
  }, [wishlistItems, deleteLocalStorage, setLocalStorage]);

  // Load wishlist items with full product data
  const loadWishlistWithProductData = async (savedWishlist) => {
    if (!savedWishlist || !Array.isArray(savedWishlist)) return;
    
    setIsLoading(true);
    try {
      const itemsWithData = await Promise.all(
        savedWishlist.map(async (productId) => {
          try {
            const product = await productsService.getProductById(productId);
            return product;
          } catch (error) {
            console.error(`Failed to load product ${productId}:`, error);
            return null;
          }
        })
      );
      // Filter out any null items (failed to load)
      setWishlistItems(itemsWithData.filter(item => item !== null));
    } catch (error) {
      console.error('Failed to load wishlist data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Add product to wishlist
  async function addToWishlist(productId) {
    setIsLoading(true);
    try {
      // Check if item already exists
      const existingItem = wishlistItems.find(item => item.id === productId);
      
      if (existingItem) {
        // Item already in wishlist, don't add again
        return false;
      }

      // Add new item
      const product = await productsService.getProductById(productId);
      setWishlistItems(prev => [...prev, product]);
      return true;
    } catch (error) {
      console.error('Failed to add product to wishlist:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  // Remove product from wishlist
  function removeFromWishlist(productId) {
    setWishlistItems(prev => prev.filter(item => item.id !== productId));
  }

  // Toggle product in wishlist
  async function toggleWishlist(productId) {
    const isInWishlist = wishlistItems.some(item => item.id === productId);
    
    if (isInWishlist) {
      removeFromWishlist(productId);
      return false;
    } else {
      const added = await addToWishlist(productId);
      return added;
    }
  }

  // Check if product is in wishlist
  function isInWishlist(productId) {
    return wishlistItems.some(item => item.id === productId);
  }

  // Clear entire wishlist
  function clearWishlist() {
    setWishlistItems([]);
    ls?.removeItem('wishlist');
  }

  // Get wishlist count
  function getWishlistCount() {
    return wishlistItems.length;
  }

  return (
    <WishlistContext.Provider value={{
      wishlistItems,
      addToWishlist,
      removeFromWishlist,
      toggleWishlist,
      isInWishlist,
      clearWishlist,
      getWishlistCount,
      isLoading
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistContextProvider');
  }
  return context;
}
import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Create the context
export const CartContext = createContext();

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Load cart and favorites from localStorage on mount
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('ecoSprout_cart') || '[]');
    const savedFavorites = JSON.parse(localStorage.getItem('ecoSprout_favorites') || '[]');
    setCartItems(savedCart);
    setFavorites(savedFavorites);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('ecoSprout_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('ecoSprout_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToCart = (item, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem._id === item._id);
      
      if (existingItem) {
        return prevItems.map(cartItem =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      } else {
        return [...prevItems, { ...item, quantity }];
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item._id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item._id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const addToFavorites = (item) => {
    setFavorites(prevFavorites => {
      const existingItem = prevFavorites.find(fav => fav._id === item._id);
      if (existingItem) {
        return prevFavorites; // Already in favorites
      }
      return [...prevFavorites, item];
    });
    return true;
  };

  const removeFromFavorites = (itemId) => {
    setFavorites(prevFavorites => prevFavorites.filter(fav => fav._id !== itemId));
  };

  const toggleFavorite = (item) => {
    const existingItem = favorites.find(fav => fav._id === item._id);
    if (existingItem) {
      removeFromFavorites(item._id);
      return false; // Removed from favorites
    } else {
      addToFavorites(item);
      return true; // Added to favorites
    }
  };

  const isInFavorites = (itemId) => {
    return favorites.some(fav => fav._id === itemId);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartItemsCount = () => {
    return cartItems.length;
  };

  const value = {
    // Cart state
    cartItems,
    favorites,
    
    // Cart actions
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    
    // Favorites actions
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isInFavorites,
    
    // Computed values
    getCartTotal,
    getCartItemCount,
    getCartItemsCount,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CartContext;

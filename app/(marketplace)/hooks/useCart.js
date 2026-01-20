import { useState, useCallback } from 'react';

export function useCart() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = useCallback((product, quantity = 1) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.product.reference === product.reference);
      
      if (existingItem) {
        const updated = prev.map((item) =>
          item.product.reference === product.reference
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        return updated;
      }
      
      return [...prev, { product, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((productRef) => {
    setCartItems((prev) => {
      return prev.filter((item) => item.product.reference !== productRef);
    });
  }, []);

  const updateQuantity = useCallback((productRef, quantity) => {
    if (quantity < 1) {
      removeFromCart(productRef);
      return;
    }
    
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.reference === productRef ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const cartTotal = cartItems.reduce((total, item) => {
    const price = item.product.specifications.price || 0;
    return total + price * item.quantity;
  }, 0);

  const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartItemCount,
  };
}

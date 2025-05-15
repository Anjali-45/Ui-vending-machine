import React, { createContext, useState, useContext, ReactNode } from 'react';
import { CartItem, Part } from '../types/types';

interface CartContextType {
  items: CartItem[];
  addToCart: (part: Part, quantity: number) => void;
  removeFromCart: (partId: string) => void;
  updateQuantity: (partId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (part: Part, quantity: number) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === part.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === part.id
            ? { ...item, requestedQuantity: item.requestedQuantity + quantity }
            : item
        );
      }
      return [...prevItems, { ...part, requestedQuantity: quantity }];
    });
  };

  const removeFromCart = (partId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== partId));
  };

  const updateQuantity = (partId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(partId);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === partId ? { ...item, requestedQuantity: quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.requestedQuantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
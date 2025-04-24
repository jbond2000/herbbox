import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CartContextType {
  cartCount: number;
  addToCart: (quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartCount, setCartCount] = useState(0);

  const addToCart = (quantity: number) => {
    setCartCount((prev) => prev + quantity);
    // Simple success message (could replace with toast library if desired)
    const div = document.createElement('div');
    div.innerText = 'Added to cart!';
    div.className =
      'fixed top-6 right-6 bg-green-600 text-white px-4 py-2 rounded shadow z-50';
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 2000);
  };

  return (
    <CartContext.Provider value={{ cartCount, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

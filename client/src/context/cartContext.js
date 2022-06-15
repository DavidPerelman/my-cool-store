import { createContext, useContext, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const CartContext = createContext();
export function useCart() {
  return useContext(CartContext);
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage('cartItems', []);

  const addCartItem = () => {
    const id = Math.random() * (1000 - 1) + 1;

    setCartItems((prevCartItems) => {
      if (prevCartItems.find((cartItem) => cartItem.id === id)) {
        return prevCartItems;
      }
      return [...prevCartItems, { id: id, name: `item ${id}` }];
    });
  };

  const removeCartItem = ({ id }) => {
    setCartItems((prevCartItems) => {
      return prevCartItems.filter((cartItem) => cartItem.id !== id);
    });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        // getCartItems,
        addCartItem,
        removeCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

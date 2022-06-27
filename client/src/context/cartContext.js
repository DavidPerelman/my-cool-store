import { createContext, useContext, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const CartContext = createContext();
export function useCart() {
  return useContext(CartContext);
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage('cartItems', []);
  const [cartItemsLength, setCartItemsLength] = useState(cartItems.length);

  const addCartItem = (product) => {
    console.log(cartItemsLength);
    setCartItems((prevCartItems) => {
      if (prevCartItems.find((cartItem) => cartItem._id === product._id)) {
        return prevCartItems;
      }
      return [...prevCartItems, product];
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
        setCartItemsLength,
        addCartItem,
        removeCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

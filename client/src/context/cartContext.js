import { createContext, useContext, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const CartContext = createContext();
export function useCart() {
  return useContext(CartContext);
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage('cartItems', []);
  const [cartItemQuantity, setCartItemQuantity] = useState(1);

  const addCartItem = (product) => {
    setCartItems((prevCartItems) => {
      console.log(prevCartItems);

      if (prevCartItems.find((cartItem) => cartItem._id === product._id)) {
        return prevCartItems;
      }
      return [
        ...prevCartItems,
        { product: product, quantity: cartItemQuantity },
      ];
    });
  };

  const addCartItemQuantity = (productId) => {
    const items = localStorage.getItem('cartItems');
    const cartItems = JSON.parse(items);

    for (let i = 0; i < cartItems.length; i++) {
      if (productId === cartItems[i].product['_id']) {
        if (cartItems[i].quantity === 99) {
          return;
        } else {
          cartItems[i].quantity += 1;
        }
      }
    }

    setCartItems(cartItems);
  };

  const removeCartItemQuantity = (productId) => {
    const items = localStorage.getItem('cartItems');
    const cartItems = JSON.parse(items);

    for (let i = 0; i < cartItems.length; i++) {
      if (productId === cartItems[i].product['_id']) {
        if (cartItems[i].quantity === 1) {
          return;
        } else {
          cartItems[i].quantity -= 1;
        }
      }
    }

    setCartItems(cartItems);
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
        addCartItemQuantity,
        removeCartItemQuantity,
        addCartItem,
        removeCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

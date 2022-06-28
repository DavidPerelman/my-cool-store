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
      if (
        prevCartItems.find((cartItem) => cartItem.product._id === product._id)
      ) {
        alert('The product is already in the cart');
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

  const removeCartItem = (productId) => {
    setCartItems((prevCartItems) => {
      return prevCartItems.filter(
        (cartItem) => cartItem.product._id !== productId
      );
    });
  };

  function checkIfExistInCart(productId) {
    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].product['_id'] === productId) {
        return true;
      }
    }
    return false;
  }

  // const existInCart = checkIfExistInCart();

  return (
    <CartContext.Provider
      value={{
        cartItems,
        checkIfExistInCart,
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

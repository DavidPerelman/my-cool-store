import { createContext, useContext, useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const CartContext = createContext();
export function useCart() {
  return useContext(CartContext);
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage('cartItems', []);

  const itemsQuantity = cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0
  );

  const itemsPrice = cartItems.reduce(
    (previousValue, cartItem) =>
      previousValue + cartItem.product.price * cartItem.quantity,
    0
  );

  const addCartItem = (product) => {
    setCartItems((prevCartItems) => {
      if (
        prevCartItems.find((cartItem) => cartItem.product._id === product._id)
      ) {
        alert('The product is already in the cart');
        return prevCartItems;
      }
      return [...prevCartItems, { product: product, quantity: 1 }];
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
    const cartContentPopover = (document.getElementsByClassName(
      'cart-content'
    )[0].style.visibility = 'hidden');
    console.log(cartContentPopover);
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

  return (
    <CartContext.Provider
      value={{
        cartItems,
        itemsPrice,
        itemsQuantity,
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

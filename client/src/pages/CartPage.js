import React from 'react';
import { useCart } from '../context/cartContext';

const CartPage = () => {
  const {
    cartItems,
    addCartItemQuantity,
    removeCartItemQuantity,
    removeCartItem,
  } = useCart();

  console.log(cartItems);

  return <div>CartPage</div>;
};

export default CartPage;

import React from 'react';
import Button from '../components/Button/Button';
import { useCart } from '../context/cartContext';

const CartQuantityCounter = ({ item }) => {
  const { addCartItemQuantity, removeCartItemQuantity } = useCart();
  console.log(item.quantity);

  return (
    <div className='cart-popover-quantity-counter'>
      <Button
        color='button--primary'
        buttonStyle='circle-button'
        onClick={() => removeCartItemQuantity(item.product._id)}
      >
        -
      </Button>
      <p className='quantity-counter'>{item.quantity}</p>
      <Button
        color='button--primary'
        buttonStyle='circle-button'
        onClick={() => addCartItemQuantity(item.product._id)}
      >
        +
      </Button>
    </div>
  );
};

export default CartQuantityCounter;

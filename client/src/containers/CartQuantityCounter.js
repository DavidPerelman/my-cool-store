import React from 'react';
import Button from '../components/Button/Button';
// import Button from '../components/trash/Button/Button';
import { useCart } from '../context/cartContext';

const CartQuantityCounter = ({ item }) => {
  const { addCartItemQuantity, removeCartItemQuantity } = useCart();

  return (
    <div className='cart-popover-quantity-counter'>
      <Button
        size='circle-button'
        color='button--primary'
        buttonStyle='circle-button'
        onClick={() => removeCartItemQuantity(item.product._id)}
      >
        -
      </Button>
      <p className='quantity-counter'>{item.quantity}</p>
      <Button
        size='circle-button'
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

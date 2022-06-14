import React from 'react';
import cart from '../asset/cart.png';
import MyPopover from './MyPopover';

const CartPopover = () => {
  let itemsInCart = JSON.parse(localStorage.getItem('cartItems'));

  return (
    <>
      <MyPopover icon={cart} itemsInCart={itemsInCart.length} title='Cart'>
        {itemsInCart.map((item, i) => (
          <h5 key={i}>{item.name}</h5>
        ))}
      </MyPopover>
    </>
  );
};

export default CartPopover;

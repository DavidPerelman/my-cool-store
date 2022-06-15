import React, { useEffect } from 'react';
import cart from '../asset/cart.png';
import MyPopover from '../components/MyPopover/MyPopover';

const CartPopover = () => {
  let itemsInCart = JSON.parse(localStorage.getItem('cartItems'));

  const renderItemsInCart = () => {
    if (itemsInCart === null || itemsInCart.length === 0) {
      return 0;
    } else {
      return itemsInCart.length;
    }
  };

  return (
    <>
      <MyPopover
        type='cart'
        icon={cart}
        itemsInCart={renderItemsInCart()}
        title='Cart'
      >
        {(itemsInCart < 0 &&
          itemsInCart.map((item, i) => <h5 key={i}>{item.name}</h5>)) || (
          <div>Your cart is empty</div>
        )}
      </MyPopover>
    </>
  );
};

export default CartPopover;

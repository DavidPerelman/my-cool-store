import React, { useState } from 'react';
import cart from '../asset/cart.png';
import MyPopover from './Popover';

const CartPopover = () => {
  const cartClick = async () => {
    console.log('cartClick');
  };

  return <MyPopover icon={cart} title='Cart Popover'></MyPopover>;
};

export default CartPopover;

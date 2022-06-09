import React, { useState } from 'react';
import Button from './Button';

const CartButton = () => {
  const cartClick = async () => {
    console.log('cartClick');
  };

  return (
    <div>
      <Button type='button' className='btn btn-primary' onClick={cartClick}>
        Cart
      </Button>
    </div>
  );
};

export default CartButton;

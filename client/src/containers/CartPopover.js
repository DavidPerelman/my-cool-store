import React, { useEffect } from 'react';
import cart from '../asset/cart.png';
import MyPopover from '../components/MyPopover/MyPopover';
import { useCart } from '../context/cartContext';

const CartPopover = () => {
  const { cartItems } = useCart();
  console.log(cartItems);

  return (
    <>
      <MyPopover
        type='cart'
        icon={cart}
        itemsInCart={cartItems.length}
        title='Cart'
      >
        {(cartItems.length === 0 && <div>Your cart is empty</div>) ||
          cartItems.map((item, i) => (
            <>
              <div key={i} className='cart-popover-card'>
                <img src={item.images[0]} className='cart-popover-card-image' />
                <div className='cart-popover-card-title'>
                  <h6>{item.title}</h6>
                  <p>{item.price}$</p>
                </div>
              </div>
            </>
          ))}
      </MyPopover>
    </>
  );
};

export default CartPopover;

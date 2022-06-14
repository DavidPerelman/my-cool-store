import React, { useEffect } from 'react';
import cart from '../asset/cart.png';
import MyPopover from './MyPopover';

const CartPopover = ({ loggedIn, userData }) => {
  let itemsInCart = JSON.parse(localStorage.getItem('cartItems'));

  return (
    <>
      <MyPopover
        icon={cart}
        itemsInCart={itemsInCart.length}
        title='Cart Popover'
      ></MyPopover>
      {/* <div>
        <div>
          <img className='logo' src={cart} alt='Logo' />
          <span className='badge badge-warning' id='lblCartCount'>
            {itemsInCart.length}
          </span>
        </div>
        <div className='content'>
          <div className='title'>
            <h5>Cart</h5>
          </div>
          <div className='popover-body'>
            {(itemsInCart.length < 1 && 'Your cart is empty') || (
              <ul className='popover-ul'>
                <li className='popover-li'></li>
              </ul>
            )}
          </div>
        </div>
      </div> */}
    </>
  );
};

export default CartPopover;

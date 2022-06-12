import React, { useState } from 'react';
import cart from '../asset/cart.png';

const CartPopover = ({ loggedIn, userData }) => {
  const [productsInCart, setProductsInCart] = useState(userData.productsInCart);
  console.log(loggedIn);
  console.log(userData);

  return (
    <>
      <div>
        <div>
          <img className='logo' src={cart} alt='Logo' />
          <span className='badge badge-warning' id='lblCartCount'>
            {productsInCart}
          </span>
        </div>
        <div className='content'>
          <div className='title'>
            <h5>Cart Popover</h5>
          </div>
          <div className='popover-body'>
            <ul className='popover-ul'>
              <li className='popover-li'></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPopover;

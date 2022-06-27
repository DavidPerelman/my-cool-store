import React, { useEffect } from 'react';
import cart from '../asset/cart.png';
import MyPopover from '../components/MyPopover/MyPopover';
import Button from '../components/Button/Button';
import { useCart } from '../context/cartContext';

const CartPopover = () => {
  const { cartItems, addCartItemQuantity, removeCartItemQuantity } = useCart();

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
            <div key={i}>
              <div className='cart-popover-card'>
                <img
                  src={item.product.images[0]}
                  className='cart-popover-card-image'
                />
                <div className='cart-popover-card-title'>
                  <h6>{item.product.title}</h6>
                  <p>{item.product.price}$</p>
                </div>
                <div>
                  <Button onClick={() => addCartItemQuantity(item.product._id)}>
                    +
                  </Button>{' '}
                  {item.quantity}{' '}
                  <Button
                    onClick={() => removeCartItemQuantity(item.product._id)}
                  >
                    -
                  </Button>
                </div>
              </div>
            </div>
          ))}
      </MyPopover>
    </>
  );
};

export default CartPopover;

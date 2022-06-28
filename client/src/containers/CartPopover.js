import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cart from '../asset/cart.png';
import MyPopover from '../components/MyPopover/MyPopover';
import Button from '../components/Button/Button';
import { useCart } from '../context/cartContext';

const CartPopover = () => {
  const navigate = useNavigate();

  const {
    cartItems,
    addCartItemQuantity,
    removeCartItemQuantity,
    removeCartItem,
  } = useCart();

  const showCartPage = () => {
    navigate('/cart');
  };

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
                <div className='cart-popover-buttons'>
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
                  <Button
                    color='button--salmon'
                    onClick={() => removeCartItem(item.product._id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          ))}
        <div>
          <Button size='show-cart-button' onClick={showCartPage}>
            Show Cart
          </Button>
        </div>
      </MyPopover>
    </>
  );
};

export default CartPopover;

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cart from '../asset/cart.png';
import MyPopover from '../components/MyPopover/MyPopover';
import Button from '../components/Button/NewButton';
import { useCart } from '../context/cartContext';
import CartQuantityCounter from './CartQuantityCounter';

const CartPopover = () => {
  const navigate = useNavigate();

  const {
    cartItems,
    addCartItemQuantity,
    removeCartItemQuantity,
    removeCartItem,
  } = useCart();

  const showCartPage = (e) => {
    const cartContentPopover = (document.getElementsByClassName(
      'cart-content'
    )[0].style.visibility = 'hidden');
    navigate('/cart');
  };

  useEffect(() => {
    const cartWrapper = document.getElementsByClassName('wrapper')[0];
    const cartContent = document.getElementsByClassName('cart-content')[0];

    cartWrapper.addEventListener('mouseover', () => {
      cartContent.style.visibility = 'visible';
    });

    cartWrapper.addEventListener('mouseout', () => {
      cartContent.style.visibility = 'hidden';
    });
  }, [100]);

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
                  <CartQuantityCounter item={item}></CartQuantityCounter>
                  {/* <div className='cart-popover-quantity-counter'>
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
                  </div> */}
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
          {cartItems.length > 0 && (
            <Button size='show-cart-button' onClick={showCartPage}>
              Show Cart
            </Button>
          )}
        </div>
      </MyPopover>
    </>
  );
};

export default CartPopover;

import React from 'react';
import './PopoverStyle.css';

const MyPopover = (props) => {
  console.log(props);
  // const user =
  //   props.loggedIn === true
  //     ? (props.title = props.userData.firstName)
  //     : (props.title = 'Guest');
  const cart = props.title === 'Cart';
  const user = props.title === 'User' || 'Guest';
  return (
    <>
      <div className={user ? 'user-popover' : 'cart-popover'}>
        <div>
          <img className='logo' src={props.icon} alt='Logo' />
          {cart && (
            <span className='badge badge-warning' id='lblCartCount'>
              {props.itemsInCart}
            </span>
          )}
        </div>
        <div className={cart ? 'cart-content' : 'user-content'}>
          <div className='title'>
            <h5>{props.title}</h5>
          </div>
          <div className='popover-body'>
            <ul className='popover-ul'>
              <li className='popover-li'>{props.children}</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPopover;

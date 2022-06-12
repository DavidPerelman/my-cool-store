import React from 'react';
import './PopoverStyle.css';

const MyPopover = (props) => {
  const cartIcon = props.title === 'Cart Popover';
  console.log(props.title === 'Cart Popover');
  return (
    <>
      <div>
        <div>
          <img className='logo' src={props.icon} alt='Logo' />
          {cartIcon && (
            <span className='badge badge-warning' id='lblCartCount'>
              {' '}
              5{' '}
            </span>
          )}
        </div>
        <div className='content'>
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

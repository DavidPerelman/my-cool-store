import React from 'react';
import './MyPopover.css';

const MyPopover = ({ type, title, icon, itemsInCart, children }) => {
  return (
    <>
      <div className={`${type}-popover`}>
        <div>
          <img className='logo' src={icon} alt='Logo' />
          {type === 'cart' && (
            <span className='badge badge-warning' id='lblCartCount'>
              {itemsInCart}
            </span>
          )}
        </div>
        <div className={`${type}-content`}>
          <div className='title'>
            <h5>{title}</h5>
          </div>
          <div className='popover-body'>
            <ul className={`${type}-popover-ul`}>
              <li className={`${type}-popover-li`}>{children}</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPopover;

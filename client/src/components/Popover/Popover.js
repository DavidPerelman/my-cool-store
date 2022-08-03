import React from 'react';
import './Popover.css';

const Popover = ({ keyValue, icon, children, onClick }) => {
  return (
    <div className='wrapper' id={`wrapper-${keyValue}`}>
      <img
        id={`${keyValue}-popover-icon`}
        src={icon}
        alt='icon'
        onClick={onClick}
      />
      <div className='content' id={`${keyValue}-content`}>
        {children}
      </div>
    </div>
  );
};

export default Popover;

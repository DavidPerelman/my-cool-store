import React from 'react';
import './Popover.css';
import ExpandIcon from '../../asset/expand-icon.png';

const Popover = ({ keyValue, icon, children, onClick }) => {
  return (
    <div className='wrapper'>
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

import React from 'react';
import ExpandIcon from '../../asset/expand-icon.png';
import './Popover.css';

const Popover = ({ keyValue, expand, categories, categoryListClick }) => {
  return (
    <div className='wrapper'>
      <img
        id={`${keyValue}-expand-icon`}
        src={ExpandIcon}
        alt='Logo'
        onClick={() => expand(keyValue)}
      />
      <div className='content' id={`${keyValue}-content`}>
        <ul>
          {categories &&
            categories.map((category, i) => (
              <li
                key={i}
                id={category._id}
                onClick={() => categoryListClick(category._id)}
              >
                {category.name}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Popover;

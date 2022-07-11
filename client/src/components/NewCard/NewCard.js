import React from 'react';
import './NewCard.css';

const NewCard = ({ children, img, title }) => {
  return (
    <div>
      <div className='Card'>
        <div className={`cardHeader`}>
          <img className='card-image' src={img} alt='Avatar' />
          <h5>{title}</h5>
        </div>
        <div className='cardContent'>{children}</div>
      </div>
    </div>
  );
};

export default NewCard;

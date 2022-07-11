import React from 'react';
import './Card.css';

const Card = ({ children, img, title }) => {
  return (
    <div className='Card'>
      <div className={`cardHeader`}>
        <img className='card-image' src={img} alt='Avatar' />
      </div>
      <div className='cardContent'>{children}</div>
    </div>
  );
};

export default Card;

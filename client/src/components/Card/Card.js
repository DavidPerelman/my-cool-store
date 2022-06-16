import React from 'react';
import './Card.css';

const Card = ({ id, title, img, description }) => {
  return (
    <>
      <div className='card-container'>
        <div className='cardHeader'>
          <img className='card-image' src={img} alt='Avatar' />
        </div>
        <div className='cardContent'>
          <div className='title'>
            <h5>{title}</h5>
          </div>
          <p>{description}</p>
        </div>
      </div>
    </>
  );
};

export default Card;

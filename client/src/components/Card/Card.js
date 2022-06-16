import React from 'react';
import './Card.css';

const Card = ({ id, title, img, description, category, rating, price }) => {
  return (
    <>
      {/* <div className='card-container'> */}
      <div className='cardHeader'>
        <img className='card-image' src={img} alt='Avatar' />
      </div>
      <div className='cardContent'>
        <div className='title'>
          <h5>{title}</h5>
        </div>
        <div>
          <p>Price: {price}$</p>
          <p>Category: {category}</p>
          <p>Rating: {rating.rate}</p>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default Card;

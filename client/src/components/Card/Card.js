import React from 'react';
import './Card.css';

const Card = ({
  titleSize,
  title,
  img,
  description,
  category,
  rating,
  price,
  detailsSize,
}) => {
  return (
    <>
      {/* <div className='card-container'> */}
      <div className={`cardHeader`}>
        <img className='card-image' src={img} alt='Avatar' />
      </div>
      <div className='cardContent'>
        <div className={`${titleSize}`}>
          <h6>{title}</h6>
        </div>
        <div className={`${detailsSize}`}>
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

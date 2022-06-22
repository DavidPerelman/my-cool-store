import React from 'react';
import './Card.css';
import Button from '../Button/Button';

const Card = ({
  cardButtonClick,
  titleSize,
  title,
  img,
  description,
  category,
  rating,
  price,
  detailsSize,
  color,
  size,
  textButton,
  productId,
  onClick,
}) => {
  return (
    <>
      {/* <div className='card-container'> */}
      <div className={`cardHeader`} id={productId}>
        <img className='card-image' src={img} alt='Avatar' />
      </div>
      <div className='cardContent'>
        <div className={`${titleSize}`}>
          <h6>{title}</h6>
        </div>
        <div className={`${detailsSize}`}>
          <div className='price-div'>
            <p className='bold-text'>Price:</p>
            <p>{price}$</p>
          </div>
          <p className='bold-text'>Category:</p>
          <p>{category}</p>
        </div>
        <br />
        <Button
          color={color}
          size={size}
          onClick={() => {
            onClick(productId);
          }}
        >
          {textButton}
        </Button>
      </div>
      {/* </div> */}
    </>
  );
};

export default Card;

import React from 'react';
import './Card.css';
import Button from '../trash/Button/Button';

const Card = ({
  marginBottom,
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
        <div className={`${titleSize} ${marginBottom}`}>
          <h6 className='product-title-h'>{title}</h6>
        </div>
        <div className={`${detailsSize} ${marginBottom}`}>
          <div className='price-div'>
            <p className='bold-text'>Price:</p>
            <p>{price}$</p>
          </div>
        </div>
        <Button
          marginTop='marginTop'
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

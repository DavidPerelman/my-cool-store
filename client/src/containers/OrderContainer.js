import React from 'react';
import Button from '../components/Button/Button';

const OrderContainer = ({ itemsPrice, itemsQuantity }) => {
  return (
    <div className='order-div'>
      <h1>Your Order</h1>
      <div className='order-details'>
        <div className='order-paragraphs'>
          <h5>Items Quantity:</h5> <h5>{itemsQuantity}</h5>
        </div>
        <div className='order-paragraphs'>
          <h5>Pay:</h5> <h5>{itemsPrice}$</h5>
        </div>
        <Button>Order</Button>
      </div>
    </div>
  );
};

export default OrderContainer;

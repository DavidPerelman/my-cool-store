import React, { useContext } from 'react';
import Button from '../components/Button/Button';
import AuthContext from '../context/authContext';

const OrderContainer = ({ itemsPrice, itemsQuantity }) => {
  const { loggedIn } = useContext(AuthContext);

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
        {(loggedIn && <Button>Order</Button>) || (
          <p>You must be logged in to order!</p>
        )}
      </div>
    </div>
  );
};

export default OrderContainer;

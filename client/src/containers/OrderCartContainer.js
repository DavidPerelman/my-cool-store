import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button/Button';
import AuthContext from '../context/authContext';

const OrderCartContainer = ({ itemsPrice, itemsQuantity }) => {
  const navigate = useNavigate();
  const { loggedIn } = useContext(AuthContext);

  const order = () => {
    const orderId = 1;
    navigate(`/order/${orderId}`);
  };

  return (
    <div className='order-div'>
      <h1>Your Order</h1>
      <div className='order-details'>
        <div className='order-paragraphs'>
          <h5>Items Quantity:</h5>{' '}
          <h5 className='item-quantity-h5'>{itemsQuantity}</h5>
        </div>
        <div className='order-paragraphs pay-paragraphs'>
          <h5>Pay:</h5> <h5>{itemsPrice}$</h5>
        </div>
        {(loggedIn && <Button onClick={order}>Order</Button>) || (
          <p>You must be logged in to order!</p>
        )}
      </div>
    </div>
  );
};

export default OrderCartContainer;

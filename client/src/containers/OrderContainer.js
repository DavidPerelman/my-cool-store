import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button/Button';
import AuthContext from '../context/authContext';

const OrderCartContainer = ({ orderId, itemsPrice, itemsQuantity }) => {
  const navigate = useNavigate();
  const { loggedIn } = useContext(AuthContext);
  console.log(orderId);

  // const checkout = () => {
  //   console.log('checkout');
  // };

  return (
    <div className='order-div'>
      <h1>Order Number: {orderId}</h1>
      <div className='order-details'>
        <div className='order-paragraphs'>
          <h5>Items Quantity:</h5>{' '}
          <h5 className='item-quantity-h5'>{itemsQuantity}</h5>
        </div>
        <div className='order-paragraphs pay-paragraphs'>
          <h5>Payment:</h5> <h5>{itemsPrice}$</h5>
        </div>
        {/* <Button onClick={checkout}>Check Out</Button> */}
      </div>
    </div>
  );
};

export default OrderCartContainer;

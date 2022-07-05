import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button/Button';
import AuthContext from '../context/authContext';
import LoadingGif from '.././asset/loading-gif.gif';

const OrderCartContainer = ({ orderData }) => {
  // const checkout = () => {
  //   console.log('checkout');
  // };

  return (
    <div className='order-div'>
      {(!orderData && (
        <div className='loading-gif'>
          <img src={LoadingGif} alt='loading...' />
        </div>
      )) || (
        <>
          <h1>Order Number: {orderData.orderId}</h1>
          <div className='order-details'>
            <div className='order-paragraphs'>
              <h5>Items Quantity:</h5>{' '}
              <h5 className='item-quantity-h5'>
                {orderData.totalProductsQuantity}
              </h5>
            </div>
            <div className='order-paragraphs pay-paragraphs'>
              <h5>Payment:</h5> <h5>{orderData.totalPayment}$</h5>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderCartContainer;

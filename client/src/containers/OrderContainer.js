import React from 'react';
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
          <h1>Order Number: {orderData.orderNumber}</h1>
          <div className='order-details'>
            <div className='order-paragraphs'>
              <h5>Created At:</h5>{' '}
              <h5 className='item-created-h5'>{orderData.created}</h5>
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

import React from 'react';
import LoadingGif from '.././asset/loading-gif.gif';
import './OrderContainer.css';

const OrderCartContainer = ({
  orderData,
  isAdminControl,
  children,
  orderStatus,
  changeOrderStatus,
}) => {
  return (
    <div className='order-div'>
      {children}
      {(!orderData && (
        <div className='loading-gif'>
          <img src={LoadingGif} alt='loading...' />
        </div>
      )) || (
        <>
          <h1>Order Number: {orderData.orderNumber}</h1>
          <div className='order-details'>
            <div className='order-paragraphs'>
              <h6>Created At:</h6>&nbsp;
              <h6 className='item-created-h6'>{orderData.created}</h6>
            </div>{' '}
            <span style={{ marginBottom: '10px' }}>|</span>
            <div className='order-paragraphs pay-paragraphs'>
              <h6>Payment:</h6>&nbsp;<h6>{orderData.totalPayment}$</h6>
            </div>
            <span
              className='order-paragraphs-span'
              style={{ marginBottom: '10px' }}
            >
              |
            </span>
            <div className='order-paragraphs status-paragraphs'>
              {/* <h6>Status:</h6>&nbsp;<h6>{orderData.status}</h6> */}
              <h6>Status:</h6>&nbsp;{' '}
              {(isAdminControl === true && (
                <h6>
                  <input
                    className='order-status-input cut-text'
                    value={orderStatus}
                    onChange={changeOrderStatus}
                  />
                </h6>
              )) || <h6>{orderStatus}</h6>}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderCartContainer;

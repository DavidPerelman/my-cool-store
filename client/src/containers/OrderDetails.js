import React from 'react';
import OrderTable from './OrderTable/OrderTable';

const OrderDetails = ({ orderData }) => {
  return (
    <div className='order-div'>
      <OrderTable orderData={orderData}></OrderTable>
    </div>
  );
};

export default OrderDetails;

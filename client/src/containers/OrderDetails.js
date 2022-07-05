import React from 'react';
import OrderTable from './OrderTable/OrderTable';

const OrderDetails = ({ editStatus, orderData }) => {
  return (
    <div className='order-div'>
      <OrderTable orderData={orderData} editStatus={editStatus}></OrderTable>
    </div>
  );
};

export default OrderDetails;

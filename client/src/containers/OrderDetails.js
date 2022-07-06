import React from 'react';
import OrderTable from './OrderTable/OrderTable';

const OrderDetails = ({ editStatus, orderData, orderDataBackup }) => {
  return (
    <div className='order-div'>
      <OrderTable
        orderData={orderData}
        orderDataBackup={orderDataBackup}
        editStatus={editStatus}
      ></OrderTable>
    </div>
  );
};

export default OrderDetails;

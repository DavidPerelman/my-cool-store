import React, { useState } from 'react';
import { rowClick } from '../../utils/tablesUtils';

const TableRow = ({ data, onClick }) => {
  //   const rowClick = (type, orderId) => {
  //     if (type === 'userOrders') {
  //       console.log('userOrdersClick');
  //       console.log(type);
  //       console.log(orderId);
  //     }
  //   };

  return (
    <>
      {data.type === 'userOrders'
        ? data.data.map((order, i) => {
            return (
              <tr key={i} onClick={() => rowClick(data.type, order._id)}>
                <td>{order.orderNumber}</td>
                <td>{order.created}</td>
                <td>{order.status}</td>
                <td>{order.totalPayment}</td>
              </tr>
            );
          })
        : console.log(false)}
    </>
  );
};

export default TableRow;

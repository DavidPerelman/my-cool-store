import React, { useState, useReducer } from 'react';
import { reducer } from '../../services/TableClicksReducer';
import { useNavigate } from 'react-router-dom';

// function declartion vs function expression
//myTimer(100).then(() => console.log('after timer'))
// sum(x) recursia sum all  nubmer from 1 to x example sum(4) return 10

const TableRow = ({ data, tableData, rowClick }) => {
  const navigate = useNavigate();

  const handleRowClick = async (type, order) => {
    if (type === 'userOrders') {
      navigate(`/order/${order._id}`, { state: { order } });
    }
  };
  console.log(data);

  return (
    <>
      {data.type === 'userOrders' &&
        data.data.map((order, i) => {
          return (
            <tr key={i} onClick={() => handleRowClick('userOrders', order)}>
              <td>{order.orderNumber}</td>
              <td>{order.created}</td>
              <td>{order.status}</td>
              <td>{order.totalPayment}</td>
            </tr>
          );
        })}
      {data.type === 'order' &&
        data.data.map((product, i) => {
          return (
            <tr key={i}>
              {/* <tr key={i} onClick={() => handleRowClick(product)}> */}
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.totalPayment}</td>
            </tr>
          );
        })}
      {/* {data.type === 'userOrders'
        ? data.data.map((order, i) => {
            return (
              <tr key={i} onClick={() => handleRowClick(order)}>
                <td>{order.orderNumber}</td>
                <td>{order.created}</td>
                <td>{order.status}</td>
                <td>{order.totalPayment}</td>
              </tr>
            );
          })
        : false} */}
    </>
  );
};

export default TableRow;

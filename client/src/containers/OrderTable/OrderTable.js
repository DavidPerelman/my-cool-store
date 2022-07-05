import React, { useEffect } from 'react';
import { useCart } from '../../context/cartContext';
import LoadingGif from '../../asset/loading-gif.gif';
import './OrderTable.css';

const OrderTable = ({ orderData }) => {
  const totalQuantity = () => {
    let counter = 0;
    for (let i = 0; i < orderData.products.length; i++) {
      counter += orderData.products[i].productQuantity;
    }

    return counter;
  };

  return (
    <>
      {(!orderData && (
        <div className='loading-gif'>
          <img src={LoadingGif} alt='loading...' />
        </div>
      )) || (
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {orderData.products.map((product, i) => {
              // let counter = 0;
              // console.log(orderData.products.length);
              // for (let i = 0; i < orderData.products.length; i++) {
              //   console.log(orderData.products[i]);
              //   counter += orderData.products[i].productQuantity;
              // }
              // console.log(counter);
              return (
                <tr key={i}>
                  <td>{product.product.title}</td>
                  <td>{product.product.price}$</td>
                  <td>{product.productQuantity}</td>
                  <td>{product.productQuantity * product.product.price}$</td>
                </tr>
              );
            })}
            <tr className='table-bottom'>
              <td></td>
              <td></td>
              <td>{totalQuantity()}</td>
              <td>{orderData.totalPayment}$</td>
            </tr>
          </tbody>
        </table>
      )}
    </>
  );
};

export default OrderTable;

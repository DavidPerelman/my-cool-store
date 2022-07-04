import React from 'react';
import { useCart } from '../../context/cartContext';
import './OrderTable.css';

const OrderTable = () => {
  const { cartItems, itemsPrice, itemsQuantity } = useCart();

  console.log(cartItems);
  return (
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
        {cartItems.map((product, i) => {
          return (
            <tr key={i}>
              <td>{product.product.title}</td>
              <td>{product.product.price}$</td>
              <td>{product.quantity}</td>
              <td>{product.quantity * product.product.price}$</td>
            </tr>
          );
        })}
        <tr className='table-bottom'>
          <td></td>
          <td></td>
          <td>{itemsQuantity}</td>
          <td>{itemsPrice}$</td>
        </tr>
      </tbody>
    </table>
  );
};

export default OrderTable;

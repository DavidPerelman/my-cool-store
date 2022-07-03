import React from 'react';
import { useParams } from 'react-router-dom';
import OrderContainer from '../containers/OrderContainer';
import OrderDetails from '../containers/OrderDetails';
import { useCart } from '../context/cartContext';

const OrderPage = () => {
  const { itemsPrice, itemsQuantity, addCartItem, cartItems } = useCart();
  const { orderId } = useParams();

  return (
    <>
      <OrderContainer
        orderId={orderId}
        itemsPrice={itemsPrice}
        itemsQuantity={itemsQuantity}
      ></OrderContainer>
      <OrderDetails
        orderId={orderId}
        itemsPrice={itemsPrice}
        itemsQuantity={itemsQuantity}
      ></OrderDetails>
    </>
  );
};

export default OrderPage;

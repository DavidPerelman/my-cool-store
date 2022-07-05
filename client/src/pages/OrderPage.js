import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/Button/Button';
import OrderContainer from '../containers/OrderContainer';
import OrderDetails from '../containers/OrderDetails';
import { useCart } from '../context/cartContext';
import OrdersServices from '../services/OrdersServices';

const OrderPage = () => {
  const [orderData, setOrderData] = useState(null);
  const { itemsPrice, itemsQuantity, addCartItem, cartItems } = useCart();
  const { orderId } = useParams();

  useEffect(() => {
    OrdersServices.getOrder(orderId).then((data) => {
      setTimeout(() => {
        setOrderData(data.order);
      }, 1000);
    });
  }, []);

  const checkout = () => {
    console.log('checkout');
  };

  return (
    <>
      <OrderContainer
        // orderId={orderId}
        // itemsPrice={orderData.totalPayment}
        // itemsQuantity={orderData.totalProductsQuantity}
        orderData={orderData}
      ></OrderContainer>
      <OrderDetails
        orderData={orderData}
        // orderId={orderId}
        // itemsPrice={orderData.totalPayment}
        // itemsQuantity={orderData.totalProductsQuantity}
      ></OrderDetails>
      <Button onClick={checkout}>Check Out</Button>
    </>
  );
};

export default OrderPage;

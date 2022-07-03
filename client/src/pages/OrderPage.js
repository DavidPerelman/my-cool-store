import React from 'react';
import { useParams } from 'react-router-dom';

const OrderPage = () => {
  const { orderId } = useParams();

  return <div>OrderPage</div>;
};

export default OrderPage;

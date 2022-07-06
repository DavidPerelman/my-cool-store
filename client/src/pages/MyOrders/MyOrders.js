import React from 'react';
import { useParams } from 'react-router-dom';

const MyOrders = () => {
  const { userId } = useParams();
  console.log(userId);
  return <div>MyOrders</div>;
};

export default MyOrders;

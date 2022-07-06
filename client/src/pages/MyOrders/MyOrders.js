import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import OrdersServices from '../../services/OrdersServices';

const MyOrders = () => {
  const { userId } = useParams();
  const [userOrders, setUserOrders] = useState(null);

  useEffect(() => {
    OrdersServices.getUserOrders(userId).then((data) => {
      console.log(data);
      setTimeout(() => {
        setUserOrders(data.orders);
      }, 1000);
    });
  }, []);

  //   console.log(userId);
  return <div>MyOrders</div>;
};

export default MyOrders;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Table from '../../components/Table/Table';
import OrdersServices from '../../services/OrdersServices';

const MyOrders = () => {
  const { userId } = useParams();
  const [userOrders, setUserOrders] = useState(null);

  useEffect(() => {
    OrdersServices.getUserOrders(userId).then((data) => {
      setTimeout(() => {
        setUserOrders(data.orders);
      }, 1000);
    });
  }, []);

  return (
    <div>
      <div className='order-div'>
        <h1>My Orders</h1>
        <Table data={userOrders}></Table>
      </div>
    </div>
  );
};

export default MyOrders;

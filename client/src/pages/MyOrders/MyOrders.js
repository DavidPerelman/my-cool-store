import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Table from '../../components/Table/Table';
import OrdersServices from '../../services/OrdersServices';

const MyOrders = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [tableData, setTableData] = useState(null);

  useEffect(() => {
    OrdersServices.getUserOrders(userId).then((data) => {
      setTimeout(() => {
        setTableData(data.orders);
      }, 1000);
    });
  }, []);

  const goToOrder = async (orderId) => {
    navigate(`/order/${orderId}`);
  };

  const column = [
    { heading: 'Order Number', value: 'orderNumber' },
    { heading: 'Date', value: 'created' },
    { heading: 'Status', value: 'status' },
    { heading: 'Payment', value: 'totalPayment' },
  ];

  return (
    <div>
      <div className='order-div'>
        <h1>My Orders</h1>
        <Table data={tableData} column={column} onClick={goToOrder}></Table>
      </div>
    </div>
  );
};

export default MyOrders;

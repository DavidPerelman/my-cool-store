import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button/Button';
import MyTable from '../../../components/MyTable/MyTable';
import OrdersServices from '../../../services/OrdersServices';
import './ManageOrders.css';

const ManageOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState(null);
  const [tableData, setTableData] = useState(null);

  useEffect(() => {
    OrdersServices.getAllOrders().then((data) => {
      setOrders(data.orders);
      setTableData(data.orders);
    });
  }, []);

  const back = async () => {
    navigate(`/admin`);
  };

  const goToOrder = async (orderId) => {
    console.log(orderId);
    // navigate(`/order/${orderId}`);
  };

  const renderHeader = () => {
    let headerData = ['No.', 'Order Number', 'Customer', 'Date', 'Status'];

    return headerData.map((key, i) => {
      return <th key={i}>{key}</th>;
    });
  };

  const renderBody = () => {
    return (
      tableData &&
      tableData.map((order, i) => {
        return (
          <tr
            key={i}
            className='row-data'
            onClick={() => {
              goToOrder(order._id);
            }}
          >
            <td>{i + 1}</td>
            <td>{order.orderNumber}</td>
            <td>{`${order.user.firstName} ${order.user.lastName}`}</td>
            <td>{order.created}</td>
            <td>{order.status}</td>
          </tr>
        );
      })
    );
  };

  return (
    <div className='ManageOrders'>
      <h1>Manage Orders</h1>
      <Button onClick={back}>Back</Button>
      <div className='orders-table' style={{ overflowX: 'auto' }}>
        <MyTable renderHeader={renderHeader} renderBody={renderBody}></MyTable>
      </div>
    </div>
  );
};

export default ManageOrders;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Table from '../../components/Table/Table';
import OrdersServices from '../../services/OrdersServices';
import { dataTableParse } from '../../utils/tablesUtils';

const MyOrders = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [tableData, setTableData] = useState(null);

  useEffect(() => {
    OrdersServices.getUserOrders(userId).then((data) => {
      setTimeout(() => {
        const userOrders = dataTableParse(data);
        setTableData({ data: userOrders, type: 'userOrders' });
      }, 1000);
    });
  }, []);

  const tableHeaders = ['Order Number', 'Date', 'Status', 'Payment'];
  const keys = ['orderNumber', 'created', 'status', 'totalPayment'];

  const rowClick = (id) => {
    console.log(id);
    return;
    // navigate(`/order/${i}`);

    // console.log(i);
  };

  return (
    <div>
      <div className='order-div'>
        <h1>My Orders</h1>
        <Table
          data={tableData}
          rowClick={rowClick}
          keys={keys}
          tableHeaders={tableHeaders}
        ></Table>
      </div>
    </div>
  );
};

export default MyOrders;

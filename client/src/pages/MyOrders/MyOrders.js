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
      setTableData(data.orders);
    });

    setTimeout(() => {
      const trs = document.getElementsByTagName('tr');

      const setup = () => {
        for (let i = 1; i < trs.length; i++) {
          for (let z = 1; z < trs[i].childNodes.length; z++) {
            trs[i].childNodes[0].innerHTML = i;
          }
        }
      };

      setup();
    }, 500);
  }, []);

  const goToOrder = async (orderId) => {
    navigate(`/order/${orderId}`);
  };

  const column = [
    { heading: 'No.', value: '' },
    { heading: 'Order Number', value: 'orderNumber' },
    { heading: 'Date', value: 'created' },
    { heading: 'Status', value: 'status' },
    { heading: 'Payment', value: 'totalPayment' },
  ];

  const classname = 'row-data';

  return (
    <div>
      <div className='order-div'>
        <h1>My Orders</h1>
        <Table
          data={tableData}
          column={column}
          onClick={goToOrder}
          classname={classname}
        ></Table>
      </div>
    </div>
  );
};

export default MyOrders;

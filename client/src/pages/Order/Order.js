import React, { useEffect, useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Table from '../../components/Table/Table';
import OrdersServices from '../../services/OrdersServices';
import { dataTableParse } from '../../utils/tablesUtils';
import AuthContext from '../../context/authContext';
import OrderContainer from '../../containers/OrderContainer';
import OrderDetails from '../../containers/OrderDetails';
import SaveIcon from '../../asset/save-icon.png';
import DeleteIcon from '../../asset/delete-icon.png';
import CreditCardIcon from '../../asset/credit-card-icon.png';
import BackIcon from '../../asset/back-icon.png';
import CancelChangesIcon from '../../asset/cancel-changes-icon.png';
import EditIcon from '../../asset/edit-icon.png';
import OrderFunctions, {
  checkout,
  deleteOrder,
  saveOrder,
  editOrder,
  cancelChanges,
} from '../../services/OrderFunctions';

const Order = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const { userData } = useContext(AuthContext);

  const [tableData, setTableData] = useState(null);
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    OrdersServices.getOrder(orderId).then((data) => {
      setTimeout(() => {
        setOrderData(data.order);
        const order = dataTableParse('order', data.order.products);
        setTableData({ data: order, type: 'order' });
      }, 1000);
    });
  }, []);

  const column = [
    { heading: 'Order Number' },
    { heading: 'Date' },
    { heading: 'Status' },
    { heading: 'Payment' },
  ];

  console.log(column);
  const tableHeaders = ['Product', 'Price', 'Quantity', 'Total'];
  const keys = ['title', 'price', 'productQuantity', 'totalPayment'];

  const backToMyOrders = () => {
    console.log(`/orders/${userData._id}`);
    navigate(`/orders/${userData._id}`);
  };

  return (
    <div className='OrderPage'>
      <Button onClick={backToMyOrders} size={'my-orders-button'}>
        <img
          className='icon-button my-orders-icon'
          src={BackIcon}
          alt='BackIcon'
        />
        My Orders
      </Button>
      <OrderContainer orderData={orderData}></OrderContainer>
      <div className='order-div'>
        <Table
          data={tableData}
          // rowClick={rowClick}
          keys={keys}
          tableHeaders={tableHeaders}
        ></Table>
      </div>

      {/* <Button onClick={deleteOrder}>
        Cancel Order{' '}
        <img
          className='icon-button'
          src={CancelChangesIcon}
          alt='CancelChangesIcon'
        />
      </Button>
      <Button onClick={deleteOrder}>
        Delete Order{' '}
        <img className='icon-button' src={DeleteIcon} alt='DeleteIcon' />
      </Button>
      <Button onClick={checkout}>
        Check Out{' '}
        <img
          className='icon-button'
          src={CreditCardIcon}
          alt='CreditCardIcon'
        />
      </Button> */}
    </div>
  );
};

export default Order;

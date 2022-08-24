import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/Button/Button';
import OrderContainer from '../../containers/OrderContainer';
import OrderDetails from '../../containers/OrderDetails';
import { useCart } from '../../context/cartContext';
import OrdersServices from '../../services/OrdersServices';
import SaveIcon from '../../asset/save-icon.png';
import DeleteIcon from '../../asset/delete-icon.png';
import CreditCardIcon from '../../asset/credit-card-icon.png';
import BackIcon from '../../asset/back-icon.png';
import CancelChangesIcon from '../../asset/cancel-changes-icon.png';
import EditIcon from '../../asset/edit-icon.png';
import './OrderPage.css';
import AuthContext from '../../context/authContext';
import Table from '../../components/Table/Table';
import MyTable from '../../components/MyTable/MyTable';
import CheckoutServices from '../../services/CheckoutServices';

const OrderPage = () => {
  const navigate = useNavigate();
  const { userData } = useContext(AuthContext);
  const [editStatus, setEditStatus] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [dataTable, setDataTable] = useState(null);
  const { orderId } = useParams();

  useEffect(() => {
    OrdersServices.getOrder(orderId).then((data) => {
      setOrderData(data.order);
      setDataTable(data.order.products);
    });

    setTimeout(() => {
      const trs = document.getElementsByTagName('tr');

      const setup = () => {
        for (let y = 1; y < trs.length; y++) {
          for (let x = 1; x < trs[y].childNodes.length; x++) {
            trs[y].childNodes[0].innerHTML = y;
          }
        }

        for (let i = 1; i < trs.length; i++) {
          for (let z = 2; z < trs[i].childNodes.length; z++) {
            trs[i].childNodes[z].style.pointerEvents = 'none';
          }
        }
      };

      setup();
    }, 500);
  }, []);

  const checkout = () => {
    CheckoutServices.checkout(orderData);
    // console.log('checkout');
    setEditStatus(false);
  };

  const deleteOrder = () => {
    console.log('deleteOrder');
    setEditStatus(false);
  };

  const cancelOrder = () => {
    console.log('cancelOrder');
    setEditStatus(false);
  };

  const saveOrder = () => {
    console.log('saveOrder');
    setEditStatus(false);
  };

  const editOrder = () => {
    console.log('editOrder');
    setEditStatus(true);
  };

  const cancelChanges = () => {
    console.log(orderData);
    setEditStatus(false);
  };

  const backToMyOrders = () => {
    navigate(`/orders/${userData._id}`);
  };

  const column = [
    { heading: 'No.', value: '' },
    { heading: 'Product', value: 'product.title' },
    { heading: 'Price', value: 'product.price' },
    { heading: 'Quantity', value: 'productQuantity' },
    { heading: 'Total', value: 'totalPrice' },
  ];

  const classname = '';

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
      <OrderDetails
        orderData={orderData}
        dataTable={dataTable}
        editStatus={editStatus}
      ></OrderDetails>
      <div className='order-div'>
        <Table data={dataTable} column={column} classname={classname}></Table>
      </div>

      <div className='order-page-buttons'>
        {/* <Button onClick={saveOrder}>
          Save Order{' '}
          <img className='icon-button' src={SaveIcon} alt='SaveIcon' />
        </Button> */}
        {/* {(!editStatus && (
          <Button onClick={editOrder}>
            Edit Order{' '}
            <img className='icon-button' src={EditIcon} alt='EditIcon' />
          </Button>
        )) || (
          <Button onClick={cancelChanges} size='edit-order-button'>
            Cancel{' '}
            <img
              className='icon-button'
              src={CancelChangesIcon}
              alt='CancelChangesIcon'
            />
          </Button>
        )} */}
        <Button size='order-buttons' onClick={cancelOrder}>
          Cancel Order{' '}
          <img
            className='icon-button'
            src={CancelChangesIcon}
            alt='CancelChangesIcon'
          />
        </Button>
        <Button size='order-buttons' onClick={deleteOrder}>
          Delete Order{' '}
          <img className='icon-button' src={DeleteIcon} alt='DeleteIcon' />
        </Button>
        <Button size='order-buttons' onClick={checkout}>
          Check Out{' '}
          <img
            className='icon-button'
            src={CreditCardIcon}
            alt='CreditCardIcon'
          />
        </Button>
      </div>
    </div>
  );
};

export default OrderPage;

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

const OrderPage = () => {
  const navigate = useNavigate();
  const { loggedIn, userData } = useContext(AuthContext);
  const [editStatus, setEditStatus] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [orderDataBackup, setOrderDataBackup] = useState(null);
  const { itemsPrice, itemsQuantity, addCartItem, cartItems } = useCart();
  const { orderId } = useParams();

  console.log(userData);
  useEffect(() => {
    OrdersServices.getOrder(orderId).then((data) => {
      setTimeout(() => {
        setOrderData(data.order);
        setOrderDataBackup(data.order);
      }, 1000);
    });
  }, []);

  const checkout = () => {
    console.log('checkout');
    setEditStatus(false);
  };

  const deleteOrder = () => {
    console.log('deleteOrder');
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
    console.log(`/orders/${userData._id}`);
    // return;
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
      <OrderDetails
        orderData={orderData}
        orderDataBackup={orderDataBackup}
        editStatus={editStatus}
      ></OrderDetails>
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
        <Button onClick={deleteOrder}>
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
        </Button>
      </div>
    </div>
  );
};

export default OrderPage;

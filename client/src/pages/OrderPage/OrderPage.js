import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../components/Button/Button';
import OrderContainer from '../../containers/OrderContainer';
import OrderDetails from '../../containers/OrderDetails';
import { useCart } from '../../context/cartContext';
import OrdersServices from '../../services/OrdersServices';
import SaveIcon from '../../asset/save-icon.png';
import DeleteIcon from '../../asset/delete-icon.png';
import CreditCardIcon from '../../asset/credit-card-icon.png';
import cancelChangesIcon from '../../asset/cancel-changes-icon.png';
import EditIcon from '../../asset/edit-icon.png';
import './OrderPage.css';

const OrderPage = () => {
  const [editStatus, setEditStatus] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const { itemsPrice, itemsQuantity, addCartItem, cartItems } = useCart();
  const { orderId } = useParams();

  useEffect(() => {
    OrdersServices.getOrder(orderId).then((data) => {
      setTimeout(() => {
        setOrderData(data.order);
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
    console.log('cancelChanges');
    setEditStatus(false);
  };

  return (
    <>
      <OrderContainer orderData={orderData}></OrderContainer>
      <OrderDetails
        orderData={orderData}
        editStatus={editStatus}
      ></OrderDetails>
      <div className='order-page-buttons'>
        <img />
        <Button onClick={saveOrder}>
          Save Order{' '}
          <img className='icon-button' src={SaveIcon} alt='SaveIcon' />
        </Button>
        {(!editStatus && (
          <Button onClick={editOrder}>
            Edit Order{' '}
            <img className='icon-button' src={EditIcon} alt='EditIcon' />
          </Button>
        )) || (
          <Button onClick={cancelChanges} size='edit-order-button'>
            Cancel{' '}
            <img
              className='icon-button'
              src={cancelChangesIcon}
              alt='cancelChangesIcon'
            />
          </Button>
        )}
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
    </>
  );
};

export default OrderPage;

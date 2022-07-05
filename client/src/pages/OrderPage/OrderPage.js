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
import './OrderPage.css';

const OrderPage = () => {
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
  };

  const deleteOrder = () => {
    console.log('deleteOrder');
  };

  const saveOrder = () => {
    console.log('saveOrder');
  };

  return (
    <>
      <OrderContainer
        // orderId={orderId}
        // itemsPrice={orderData.totalPayment}
        // itemsQuantity={orderData.totalProductsQuantity}
        orderData={orderData}
      ></OrderContainer>
      <OrderDetails
        orderData={orderData}
        // orderId={orderId}
        // itemsPrice={orderData.totalPayment}
        // itemsQuantity={orderData.totalProductsQuantity}
      ></OrderDetails>
      <div className='order-page-buttons'>
        <img />
        <Button onClick={saveOrder}>
          Save Order{' '}
          <img className='icon-button' src={SaveIcon} alt='SaveIcon' />
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
    </>
  );
};

export default OrderPage;

import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button/Button';
import AuthContext from '../context/authContext';
import { useCart } from '../context/cartContext';
import OrdersServices from '../services/OrdersServices';

const OrderCartContainer = () => {
  const navigate = useNavigate();
  const { cartItems, itemsPrice, itemsQuantity } = useCart();
  const { loggedIn, userData } = useContext(AuthContext);

  const order = async () => {
    let productsArray = [];
    for (let i = 0; i < cartItems.length; i++) {
      console.log(cartItems[i].product._id);
      productsArray.push({
        product: cartItems[i].product._id,
        productQuantity: cartItems[i].quantity,
      });
    }

    const orderData = {
      user: userData._id,
      products: productsArray,
      totalPayment: itemsPrice,
    };

    try {
      const res = await OrdersServices.createOrder(orderData);
      const orderId = res;
      navigate(`/order/${orderId}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='order-div'>
      <h1>Your Order</h1>
      <div className='order-details'>
        <div className='order-paragraphs'>
          <h5>Items Quantity:</h5>{' '}
          <h5 className='item-quantity-h5'>{itemsQuantity}</h5>
        </div>
        <div className='order-paragraphs pay-paragraphs'>
          <h5>Pay:</h5> <h5>{itemsPrice}$</h5>
        </div>
        {(loggedIn && <Button onClick={order}>Order</Button>) || (
          <p>You must be logged in to order!</p>
        )}
      </div>
    </div>
  );
};

export default OrderCartContainer;

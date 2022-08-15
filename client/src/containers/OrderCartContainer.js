import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button/Button';
import AuthContext from '../context/authContext';
import { useCart } from '../context/cartContext';
import OrdersServices from '../services/OrdersServices';

const OrderCartContainer = () => {
  const navigate = useNavigate();
  const { cartItems, itemsPrice, itemsQuantity, clearCartItem } = useCart();
  const { loggedIn, userData } = useContext(AuthContext);
  console.log(userData);

  const order = async () => {
    let productsArray = [];
    for (let i = 0; i < cartItems.length; i++) {
      productsArray.push({
        product: cartItems[i].product._id,
        productQuantity: cartItems[i].quantity,
        totalPrice: cartItems[i].quantity * cartItems[i].product.price,
      });
    }

    const orderData = {
      user: userData._id,
      products: productsArray,
      totalPayment: itemsPrice,
    };

    try {
      console.log(cartItems);
      const res = await OrdersServices.createOrder(orderData);
      const orderId = res;
      clearCartItem();
      navigate(`/order/${orderId}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='order-div' style={{ marginBottom: '0' }}>
      <h1>Your Order</h1>
      <div className='order-details'>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div className='order-paragraphs'>
            <h5>Items Quantity:&nbsp;</h5>{' '}
            <h5 className='item-quantity-h5' style={{ margin: '0' }}>
              {itemsQuantity}
            </h5>
          </div>
          <span style={{ marginRight: '10px', marginLeft: '10px' }}>|</span>
          <div className='order-paragraphs'>
            <h5>Pay:&nbsp;</h5> <h5>{itemsPrice}$</h5>
          </div>
        </div>
        {(loggedIn && <Button onClick={order}>Order</Button>) || (
          <p style={{ color: 'red', marginBottom: '10px' }}>
            You must be logged in to order!
          </p>
        )}
      </div>
    </div>
  );
};

export default OrderCartContainer;

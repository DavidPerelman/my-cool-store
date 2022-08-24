import React, { useEffect, useContext, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Table from '../../components/Table/Table';
import OrdersServices from '../../services/OrdersServices';
import AuthContext from '../../context/authContext';
import OrderContainer from '../../containers/OrderContainer';
import OrderDetails from '../../containers/OrderDetails';
import SaveIcon from '../../asset/save-icon.png';
import CancelChangesIcon from '../../asset/cancel-changes-icon.png';
import DeleteIcon from '../../asset/delete-icon.png';
import CreditCardIcon from '../../asset/credit-card-icon.png';
import BackIcon from '../../asset/back-icon.png';
import {
  increment,
  decrement,
  renderHeader,
} from '../../utils/orderTableUtils';
import MyTable from '../../components/MyTable/MyTable';
import './Order.css';
import CheckoutServices from '../../services/CheckoutServices';
import Modal from '../../components/Modal/Modal';
import { loadStripe } from '@stripe/stripe-js';

const Order = () => {
  const stripePromise = loadStripe(
    'pk_test_51LMHebHwuFGjgD9FMmRH7NI5bEHperWkMoj16LBUtb8dsSOHrTvzNHWPivT7BMMwdi7SPhhUtbV8CIoawQfPwgzj00wFX0StK2'
  );

  const navigate = useNavigate();
  const location = useLocation();
  const isAdminControl = location.state.isAdmin;
  const { orderId } = useParams();
  const { userData } = useContext(AuthContext);
  const [dataTable, setDataTable] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const [changesHappend, setChangesHappend] = useState(false);
  const [checkoutSesessionSuccess, setCheckoutSesessionSuccess] =
    useState(false);

  useEffect(() => {
    console.log(isAdminControl);
    OrdersServices.getOrder(orderId).then((data) => {
      console.log(data);
      setOrderData(data.order);
      setDataTable(data.order.products);
    });
  }, []);

  const backToMyOrders = () => {
    console.log(`/orders/${userData._id}`);
    navigate(`/orders/${userData._id}`);
  };

  const backToAdminOrders = () => {
    console.log(`backToAdminOrders`);
    navigate(`/admin/manage-orders`);
  };

  const decrementProductQuantity = async (dataTable, product) => {
    setChangesHappend(true);
    const updatedProducts = await decrement(dataTable, product);
    setDataTable(updatedProducts);
  };

  const incrementProductQuantity = async (dataTable, product) => {
    setChangesHappend(true);
    const updatedProducts = await increment(dataTable, product);
    setDataTable(updatedProducts);
  };

  const cancelOrder = () => {
    console.log('cancelOrder');
  };

  const deleteOrder = () => {
    console.log('deleteOrder');
  };

  const cancelChanges = () => {
    OrdersServices.getOrder(orderId).then((data) => {
      setOrderData(data.order);
      setDataTable(data.order.products);
    });
    setChangesHappend(false);
  };

  const saveChanges = () => {
    let totalPayment = document.getElementById('totalPayment').innerHTML;

    totalPayment = parseInt(totalPayment.slice(0, totalPayment.length - 1));

    OrdersServices.updateOrder(orderId, dataTable, totalPayment).then(
      (data) => {
        console.log(data.order.products);
        OrdersServices.getOrder(orderId).then((data) => {
          setOrderData(data.order);
          setDataTable(data.order.products);
        });
      }
    );

    setChangesHappend(false);
  };

  const renderBody = () => {
    return (
      dataTable &&
      dataTable.map((product, i) => {
        return (
          <tr key={i}>
            <td>{i + 1}</td>
            <td>{product.product.title}</td>
            <td>{product.product.price}$</td>
            <td className='quantity-table-data-cell'>
              {orderData.status === 'Open' && (
                <Button
                  size='circle-button'
                  onClick={() => decrementProductQuantity(dataTable, product)}
                >
                  -
                </Button>
              )}{' '}
              {product.productQuantity}{' '}
              {orderData.status === 'Open' && (
                <Button
                  size='circle-button'
                  onClick={() => incrementProductQuantity(dataTable, product)}
                >
                  +
                </Button>
              )}
            </td>
            <td>{product.product.price * product.productQuantity}$</td>
          </tr>
        );
      })
    );
  };

  const renderFooter = () => {
    let sumQuantity = 0;
    let sumPrice = 0;

    dataTable &&
      dataTable.forEach((product) => {
        sumQuantity += product.productQuantity;
      });

    dataTable &&
      dataTable.forEach((product) => {
        sumPrice += product.product.price * product.productQuantity;
      });

    return (
      <tr>
        <td colSpan='3'></td>
        <td>{sumQuantity}</td>
        <td id='totalPayment'>{sumPrice}$</td>
      </tr>
    );
  };

  const checkout = async () => {
    const stripe = await stripePromise;

    let line_items = [];

    for (let i = 0; i < orderData.products.length; i++) {
      let item = {};
      item['price'] = orderData.products[i].product.price_id;
      item['quantity'] = orderData.products[i].productQuantity;
      line_items.push(item);
    }

    await fetch(
      `${process.env.REACT_APP_API_URL}/payment/create-checkout-session`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          line_items,
          orderId,
          userData,
        }),
      }
    )
      .then((res) => res.json())
      .then((session) => {
        stripe.redirectToCheckout({
          sessionId: session.id,
        });
      });
  };

  return (
    <div className='OrderPage'>
      {(isAdminControl === true && (
        <Button onClick={backToAdminOrders} size={'my-orders-button'}>
          <img
            className='icon-button my-orders-icon'
            src={BackIcon}
            alt='BackIcon'
          />
          All Orders
        </Button>
      )) || (
        <Button onClick={backToMyOrders} size={'my-orders-button'}>
          <img
            className='icon-button my-orders-icon'
            src={BackIcon}
            alt='BackIcon'
          />
          My Orders
        </Button>
      )}

      <OrderContainer orderData={orderData}></OrderContainer>
      <div className='order-div'>
        <MyTable
          renderHeader={renderHeader}
          renderBody={renderBody}
          renderFooter={renderFooter}
        ></MyTable>
      </div>
      <div className='order-buttons-control'>
        <div className='order-page-buttons' style={{ height: '40px' }}>
          <Button onClick={cancelOrder}>
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
          {orderData && orderData.status === 'Open' && (
            <Button onClick={checkout}>
              Check Out{' '}
              <img
                className='icon-button'
                src={CreditCardIcon}
                alt='CreditCardIcon'
              />
            </Button>
          )}
        </div>
        {(changesHappend && (
          <div className='order-changes-buttons'>
            <Button onClick={cancelChanges}>
              Cancel Changes{' '}
              <img className='icon-button' src={SaveIcon} alt='SaveIcon' />
            </Button>
            <Button onClick={saveChanges}>
              Save Changes{' '}
              <img className='icon-button' src={SaveIcon} alt='SaveIcon' />
            </Button>
          </div>
        )) || <div></div>}
      </div>
    </div>
  );
};

export default Order;

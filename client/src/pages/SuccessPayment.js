import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { renderHeader } from '../utils/orderTableUtils';
import Button from '../components/Button/Button';
import OrdersServices from '../services/OrdersServices';
import OrderContainer from '../containers/OrderContainer';
import CancelChangesIcon from '../asset/cancel-changes-icon.png';
import DeleteIcon from '../asset/delete-icon.png';
import BackIcon from '../asset/back-icon.png';
import MyTable from '../components/MyTable/MyTable';
import './Order/Order.css';
import AuthContext from '../context/authContext';

const SuccessPayment = () => {
  const navigate = useNavigate();
  const { orderId, paymentId } = useParams();
  const { userData } = useContext(AuthContext);
  const [dataTable, setDataTable] = useState(null);
  const [orderData, setOrderData] = useState(null);

  // const { paymentId } = useParams();
  const [sessionData, setSessionData] = useState(null);
  useEffect(() => {
    // console.log(paymentId);
    // const id = paymentId.slice(0, paymentId.length);

    // console.log(id);
    // return;
    fetch(
      `${process.env.REACT_APP_API_URL}/payment/checkout-session/${paymentId}`
    )
      .then((res) => res.json())
      .then((session) => {
        console.log(session);
        setSessionData(session);
      });

    OrdersServices.getOrder(orderId).then((data) => {
      console.log(data);
      setOrderData(data.order);
      setDataTable(data.order.products);
    });
  }, []);

  console.log(sessionData);

  const backToMyOrders = () => {
    console.log(`/orders/${userData._id}`);
    navigate(`/orders/${userData._id}`);
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
              {product.productQuantity}
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

  const cancelOrder = () => {
    console.log('cancelOrder');
  };

  const deleteOrder = () => {
    console.log('deleteOrder');
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
      <OrderContainer orderData={orderData}>
        <h1>Thank You!</h1>
        <h5>{sessionData.payment_intent}</h5>
      </OrderContainer>
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
        </div>
      </div>
    </div>
    // <div>
    //   <h1>Thank You!</h1>
    //   <p>{sessionData}</p>
    // </div>
  );
};

export default SuccessPayment;

import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button/Button';
import AuthContext from '../context/authContext';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { userData } = useContext(AuthContext);

  const home = () => {
    navigate('/');
  };

  const backToMyOrders = () => {
    console.log(`/orders/${userData._id}`);
    navigate(`/orders/${userData._id}`);
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <h1>Payment Success!</h1>
      <p>Please Check your email.</p>
      <div style={{ marginTop: '20px' }}>
        <Button onClick={backToMyOrders} size={'my-orders-button'}>
          My Orders
        </Button>
      </div>
    </div>
  );
};

export default PaymentSuccess;

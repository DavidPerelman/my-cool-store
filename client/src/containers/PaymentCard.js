import React from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import Modal from '../components/Modal/Modal';

const PaymentCard = () => {
  return (
    <div>
      <form>
        <CardElement />
      </form>
    </div>
  );
};

export default PaymentCard;

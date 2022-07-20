import React from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import Modal from '../components/Modal/Modal';
import Button from '../components/Button/Button';

const PaymentForm = () => {
  return (
    <div>
      <form>
        <CardElement />
      </form>
    </div>
  );
};

export default PaymentForm;

import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import Button from '../components/Button/Button';
import Modal from '../components/Modal/Modal';

const PaymentModal = ({ setPaymentModalOpen }) => {
  const elements = useElements();
  const stripe = useStripe();

  const handleClose = () => {
    setPaymentModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { clientSecret } = await fetch(
      `${process.env.REACT_APP_API_URL}/checkout/create-payment-intent`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethodType: 'card',
          currency: 'usd',
        }),
      }
    ).then((res) => {
      if (res.status !== 401) {
        return res.json().then((data) => data);
      } else {
        return { message: 'error' };
      }
    });

    const cardElement = elements.getElement(CardElement);
    console.log(cardElement);
  };

  return (
    <>
      <Modal onClose={handleClose} title='Payment'>
        <form onSubmit={handleSubmit}>
          <CardElement />
        </form>
        <div className='modal-footer'>
          <Button
            size='user-modal-button'
            color='button--close'
            onClick={handleClose}
          >
            Close
          </Button>
          <Button size='user-modal-button' onClick={handleSubmit}>
            Payment
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default PaymentModal;
